/* Career-fit quiz. Pure client-side; nothing is sent anywhere.
   Scoring model (documented on quiz.html):
     - Each chosen option adds `tags` points to careers carrying those tags (negative values penalise).
     - Each option may also nudge dimension weights `w` (D1..D6), starting from equal weights (1 each).
     - Hard constraints (citizen / grad school) filter careers out entirely.
     - final = 0.6 * traitMatch(0..1, normalised to best) + 0.4 * weightedTotal/30.
   State (answers) is kept in the URL hash so a result can be shared / revisited. */
(function () {
  'use strict';
  const { DIMS, load, esc, weightedTotal, tierBadge } = window.CG;
  const $ = (s) => document.querySelector(s);

  const Q = [
    {
      id: 'work', q: 'What kind of work do you want most of your days to look like?',
      opts: [
        { t: 'Building and debugging systems that must not fall over — servers, networks, pipelines', tags: { systems: 3, backend: 2, reliability: 2, operations: 1, scale: 1 } },
        { t: 'Making physical things move or compute — robots, chips, boards, machines', tags: { hardware: 3, physical: 3, 'hands-on': 2 } },
        { t: 'Math-heavy modelling, experiments, and reading papers', tags: { math: 3, research: 2, statistics: 1, frontier: 1 } },
        { t: 'Breaking things, finding holes, thinking like an adversary', tags: { adversarial: 3, puzzles: 3, systems: 1, 'defense-adjacent': 1 } },
        { t: 'Talking to people — customers, users, teams — and turning that into decisions', tags: { people: 3, communication: 3, business: 2, variety: 1 } },
        { t: 'Visual, interactive, or creative output I can show to friends', tags: { visual: 3, creative: 2, products: 2 } },
      ],
    },
    {
      id: 'priority', q: 'When you imagine yourself at 30, which single thing matters most?',
      opts: [
        { t: 'Top-of-market pay', w: { D4: 2 }, tags: { 'high-comp': 2, competitive: 1 } },
        { t: 'Never having to worry about layoffs', w: { D1: 1, D2: 1 }, tags: { stability: 3, 'predictable-hours': 1 } },
        { t: 'Working on something that matters to society', tags: { mission: 3 } },
        { t: 'Being at the frontier of what is technically possible', w: { D3: 1 }, tags: { frontier: 3, research: 1, deep: 1 } },
        { t: 'Maximum optionality — many doors still open', w: { D5: 2 }, tags: { flexible: 2, variety: 1, 'later-pivot': 1 } },
      ],
    },
    {
      id: 'ai', q: 'How do you feel about AI coding tools doing more and more of the routine programming?',
      opts: [
        { t: 'I want a field where AI is a tool, not a substitute — where the hard part is not the code', w: { D2: 2 }, tags: { hardware: 1, physical: 1, systems: 1, people: 1, 'ai-exposed': -3 } },
        { t: 'I want to build the AI itself', w: { D2: 0.5 }, tags: { math: 2, frontier: 2, research: 1, crowded: 0 } },
        { t: 'I will ride the wave — use the tools and outbuild everyone', w: { D4: 1 }, tags: { flexible: 2, products: 1, 'founder-track': 1, 'ai-exposed': -1 } },
        { t: 'I have not thought about it much', w: { D2: 1 } },
      ],
    },
    {
      id: 'math', q: 'Be honest: how much math do you want in your career?',
      opts: [
        { t: 'Bring it on — proofs, probability, linear algebra all day', tags: { math: 3, statistics: 1, physics: 1 } },
        { t: 'Applied math is fine; I do not want to publish theorems', tags: { math: 1, evidence: 1, data: 1 } },
        { t: 'As little as possible — I would rather reason about systems, people, or products', tags: { 'low-math-ok': 3, math: -2, people: 1, systems: 1 } },
      ],
    },
    {
      id: 'grad', q: 'Are you willing to do graduate school (MS 2 yrs, or PhD 5–6 yrs) after the BS?',
      hard: 'grad',
      opts: [
        { t: 'No — I want to be earning at 22 and stay there', v: 'no', w: { D6: 2 } },
        { t: 'A funded MS, maybe. Not a PhD.', v: 'ms', w: { D6: 0.5 } },
        { t: 'Yes, including a PhD if that is what the field needs', v: 'yes', tags: { 'grad-school': 2, research: 1 } },
      ],
    },
    {
      id: 'citizen', q: 'Are you a US citizen (or will be by graduation)?',
      hard: 'citizen',
      opts: [
        { t: 'Yes', v: 'yes' },
        { t: 'No — I will need visa sponsorship', v: 'no', tags: { 'sponsorship-friendly': 2 } },
        { t: 'Permanent resident / other — clearance unlikely, sponsorship not needed', v: 'pr' },
      ],
    },
    {
      id: 'risk', q: 'Pick your risk appetite.',
      opts: [
        { t: 'Low. I want the boring, durable option and a predictable ladder', w: { D1: 1, D2: 1 }, tags: { stability: 2, 'low-competition': 2, 'predictable-hours': 1, risk: -2, competitive: -1 } },
        { t: 'Medium. Solid field, but I want upside if things go well', tags: { 'high-comp': 1, flexible: 1 } },
        { t: 'High. Winner-take-most is fine; I back myself', w: { D4: 1 }, tags: { 'founder-track': 2, risk: 2, competitive: 2, intense: 1, stability: -1 } },
      ],
    },
    {
      id: 'where', q: 'Where do you want to live and how do you want to work?',
      opts: [
        { t: 'Remote, or wherever — location should not dictate my career', tags: { 'remote-friendly': 3, flexible: 1, hub: -1 } },
        { t: 'A big tech hub (Bay Area, Seattle, NYC) — I want the density', tags: { hub: 2, brand: 1, 'high-comp': 1 } },
        { t: 'Somewhere affordable and non-coastal — DC, Austin, Huntsville, Phoenix, Midwest', tags: { 'non-coastal': 2, 'defense-adjacent': 2, hardware: 1, stability: 1 } },
        { t: 'On the road — customer sites, labs, plants, wherever the problem is', tags: { travel: 3, physical: 1, people: 1, variety: 1 } },
      ],
    },
    {
      id: 'competition', q: 'How do you feel about competing in a very crowded field?',
      opts: [
        { t: 'I would rather be a strong candidate in a field few people choose', w: { D1: 1 }, tags: { 'low-competition': 3, unfashionable: 2, hardware: 1, crowded: -3 } },
        { t: 'Fine — if the prize is big enough, I will out-prepare the crowd', tags: { competitive: 2, 'high-comp': 1, crowded: 1 } },
        { t: 'I want to avoid entry-level pile-ons but do not need to be contrarian', tags: { systems: 1, stability: 1, crowded: -1, 'ai-exposed': -1 } },
      ],
    },
    {
      id: 'depth', q: 'Depth or breadth?',
      opts: [
        { t: 'Depth. I want to be the person who understands one hard thing completely', w: { D3: 2 }, tags: { deep: 3, compilers: 1, gpu: 1, semis: 1 } },
        { t: 'Breadth. I want to move between problems, teams, and domains', w: { D5: 1 }, tags: { variety: 3, 'later-pivot': 1, people: 1, business: 1 } },
        { t: 'Depth first, then leverage it into breadth later', w: { D3: 1, D5: 1 }, tags: { deep: 1, 'later-pivot': 1, flexible: 1 } },
      ],
    },
  ];

  let data;
  let answers = {};

  /* ---------- persistence in URL hash: #a=0.1.3... (index per question, '-' = unanswered) */
  function readHash() {
    const m = location.hash.match(/a=([\d.\-]+)/); if (!m) return;
    m[1].split('.').forEach((v, i) => { if (v !== '-' && Q[i] && Q[i].opts[+v]) answers[Q[i].id] = +v; });
  }
  function writeHash() {
    const s = Q.map(q => (answers[q.id] == null ? '-' : answers[q.id])).join('.');
    history.replaceState(null, '', '#a=' + s);
  }

  /* ---------- render questions */
  function renderQuiz() {
    const done = Object.keys(answers).length;
    $('#quiz').innerHTML = `
      <div class="quiz-head">
        <div class="quiz-progress" aria-label="progress"><span style="width:${Math.round(done / Q.length * 100)}%"></span></div>
        <div class="small muted">${done} / ${Q.length} answered · <button type="button" class="linklike" id="quizReset">reset</button></div>
      </div>
      ${Q.map((q, i) => `
        <fieldset class="qblock" id="q-${q.id}">
          <legend><span class="qnum">${i + 1}</span> ${esc(q.q)}</legend>
          ${q.opts.map((o, j) => `
            <label class="qopt ${answers[q.id] === j ? 'on' : ''}">
              <input type="radio" name="${q.id}" value="${j}" ${answers[q.id] === j ? 'checked' : ''}>
              <span>${esc(o.t)}</span>
            </label>`).join('')}
        </fieldset>`).join('')}
      <div class="quiz-actions">
        <button type="button" class="btn primary" id="quizGo" ${done < 4 ? 'disabled' : ''}>Show my shortlist${done < Q.length ? ` (${Q.length - done} unanswered — fine, weights just stay neutral)` : ''}</button>
      </div>`;
    $('#quiz').querySelectorAll('input[type=radio]').forEach(r => r.addEventListener('change', () => {
      answers[r.name] = +r.value; writeHash();
      const fs = r.closest('fieldset'); fs.querySelectorAll('.qopt').forEach(l => l.classList.toggle('on', l.querySelector('input').checked));
      updateHead();
    }));
    $('#quizReset').addEventListener('click', () => { answers = {}; writeHash(); $('#quizResult').innerHTML = ''; renderQuiz(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    $('#quizGo').addEventListener('click', () => { compute(); $('#quizResult').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }
  function updateHead() {
    const done = Object.keys(answers).length;
    $('.quiz-progress span').style.width = Math.round(done / Q.length * 100) + '%';
    $('.quiz-head .small').firstChild.textContent = `${done} / ${Q.length} answered · `;
    const b = $('#quizGo'); b.disabled = done < 4;
    b.textContent = 'Show my shortlist' + (done < Q.length ? ` (${Q.length - done} unanswered — fine, weights just stay neutral)` : '');
  }

  /* ---------- scoring */
  function compute() {
    const w = { D1: 1, D2: 1, D3: 1, D4: 1, D5: 1, D6: 1 };
    const tagPts = {};
    let hardGrad = null, hardCitizen = null;
    for (const q of Q) {
      const j = answers[q.id]; if (j == null) continue;
      const o = q.opts[j];
      if (o.w) for (const k in o.w) w[k] = Math.max(0.25, w[k] + o.w[k]);
      if (o.tags) for (const k in o.tags) tagPts[k] = (tagPts[k] || 0) + o.tags[k];
      if (q.hard === 'grad') hardGrad = o.v;
      if (q.hard === 'citizen') hardCitizen = o.v;
    }
    const maxPossible = Object.values(tagPts).filter(v => v > 0).reduce((a, b) => a + b, 0) || 1;

    const rows = [], removed = [];
    for (const c of data.careers) {
      const why = [];
      if (hardCitizen && hardCitizen !== 'yes' && c.citizen_only) { removed.push([c, 'requires US citizenship (security clearance)']); continue; }
      const gs = (c.grad_school || '').toLowerCase();
      const needsGrad = /required|usually required|md\/do|jd or|phd\)/.test(gs) && !/not required|not needed/.test(gs);
      if (hardGrad === 'no' && needsGrad) { removed.push([c, 'needs graduate/professional school: ' + c.grad_school]); continue; }
      if (hardGrad === 'ms' && /phd|md\/do|jd/.test(gs) && /required/.test(gs)) { removed.push([c, 'needs a doctorate/professional degree: ' + c.grad_school]); continue; }

      let trait = 0;
      const hits = [], misses = [];
      for (const t of c.tags) {
        const p = tagPts[t] || 0;
        if (p > 0) { trait += p; hits.push(t); }
        else if (p < 0) { trait += p; misses.push(t); }
      }
      const traitN = Math.max(0, trait) / maxPossible; // 0..1-ish
      const wt = weightedTotal(c, w);
      const dimN = wt == null ? 0.5 : wt / 30;
      const score = 0.6 * traitN + 0.4 * dimN;
      rows.push({ c, score, traitN, wt, hits: hits.sort((a, b) => (tagPts[b] || 0) - (tagPts[a] || 0)), misses });
    }
    rows.sort((a, b) => b.score - a.score);
    const top = rows[0] ? rows[0].score : 1;
    renderResult(rows, removed, w, top);
  }

  function renderResult(rows, removed, w, top) {
    const pct = (x) => Math.round(x / (top || 1) * 100);
    const wDesc = DIMS.filter(d => w[d] !== 1).map(d => `${d} ${esc(data._meta.dimensions[d].name)} ×${w[d]}`).join(', ') || 'all equal';
    const card = (r, i) => `
      <div class="qres ${i < 3 ? 'top' : ''}">
        <div class="qres-rank">${i + 1}</div>
        <div class="qres-body">
          <div class="qres-title"><a href="${r.c.page}">${esc(r.c.name)}</a> ${tierBadge(r.c.tier)} <span class="muted small">§${r.c.ref}</span></div>
          <div class="qres-bar"><span style="width:${pct(r.score)}%"></span></div>
          <div class="small">${esc(r.c.summary)}</div>
          <div class="small muted">Trait match ${Math.round(r.traitN * 100)}% · weighted score ${r.wt == null ? '—' : r.wt + '/30'}${r.hits.length ? ' · matched: ' + r.hits.slice(0, 5).map(esc).join(', ') : ''}${r.misses.length ? ' · <span class="warn">against: ' + r.misses.map(esc).join(', ') + '</span>' : ''}</div>
          ${i < 3 && r.c.avoid_if && r.c.avoid_if.length ? `<div class="small"><strong>Avoid if:</strong> ${esc(r.c.avoid_if[0])}</div>` : ''}
        </div>
      </div>`;
    const topIds = rows.slice(0, 3).map(r => r.c.id);
    $('#quizResult').innerHTML = `
      <h2 id="results">Your shortlist</h2>
      <p class="small muted">Dimension weights used: ${wDesc}. Bars are relative to your #1. Scores within ~10% of each other are effectively tied — read all of them.</p>
      <div class="qres-list">${rows.slice(0, 3).map(card).join('')}</div>
      <p><a class="btn primary" href="compare.html?ids=${topIds.join(',')}">Compare these three side by side →</a>
         <a class="btn" href="explorer.html">Open the explorer with your own weights →</a></p>
      <details class="qres-more"><summary>Next 7 (ranks 4–10)</summary><div class="qres-list">${rows.slice(3, 10).map((r, i) => card(r, i + 3)).join('')}</div></details>
      ${removed.length ? `<details class="qres-more"><summary>Removed by your hard constraints (${removed.length})</summary><ul class="small">${removed.map(([c, why]) => `<li><a href="${c.page}">${esc(c.name)}</a> — ${esc(why)}</li>`).join('')}</ul></details>` : ''}
      <div class="callout small" style="margin-top:16px"><strong>What to do with this.</strong> Read the top-3 profiles in full (each is 5–10 minutes), then <a href="07-roadmap.html">Section 7</a> for what to do in your first two semesters regardless of which you pick. If the top result surprises you, look at which traits matched — the quiz can only reflect what you told it.</div>`;
  }

  load().then(d => {
    data = d;
    readHash();
    renderQuiz();
    if (Object.keys(answers).length >= 4) compute();
  });
})();
