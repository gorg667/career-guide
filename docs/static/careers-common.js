/* Shared helpers for the interactive tools (explorer, compare, quiz).
   Loads data/careers.json once and exposes window.CG. */
(function () {
  'use strict';
  const DIMS = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'];
  const DIM_SHORT = { D1: 'Demand', D2: 'AI-resist', D3: 'Moat', D4: 'Comp', D5: 'Options', D6: 'BS-ok' };
  const GRADE = { 2: '✔✔', 1: '✔', 0: '~', '-1': '✘', '-2': '✘✘' };
  const GRADE_CLASS = { 2: 'g2', 1: 'g1', 0: 'g0', '-1': 'gm1', '-2': 'gm2' };
  let cache = null;

  function load() {
    if (cache) return Promise.resolve(cache);
    return fetch('data/careers.json').then(r => r.json()).then(d => { cache = d; return d; });
  }
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /** Weighted total rescaled to max 30. Returns null when any needed score is null. */
  function weightedTotal(c, w) {
    let sum = 0, wsum = 0;
    for (const d of DIMS) {
      const s = c.scores[d]; if (s == null) return null;
      sum += s * w[d]; wsum += w[d];
    }
    if (wsum === 0) return 0;
    return Math.round((sum / (wsum * 5)) * 30 * 10) / 10;
  }
  function plainTotal(c) { let t = 0; for (const d of DIMS) { if (c.scores[d] == null) return null; t += c.scores[d]; } return t; }

  function bar(score) {
    if (score == null) return '<span class="muted">—</span>';
    const pct = Math.round(score / 5 * 100);
    return `<span class="score-track" title="${score} / 5"><span class="score-bar" style="width:${pct}%"></span></span><span class="score-num">${score}</span>`;
  }
  function tierBadge(t) { return `<span class="badge t${t}">Tier ${t}</span>`; }
  function grade(g) { return `<span class="grade ${GRADE_CLASS[g] || ''}">${GRADE[g] || '?'}</span>`; }

  function getSel() { try { return JSON.parse(localStorage.getItem('cg-compare') || '[]'); } catch (e) { return []; } }
  function setSel(ids) { try { localStorage.setItem('cg-compare', JSON.stringify(ids.slice(0, 3))); } catch (e) {} }

  /** One-page printable "career card" per career. Renders into a hidden #printCards container,
      flips body.printing-cards (print CSS hides everything else), prints, then cleans up. */
  function printCards(careers, meta) {
    if (!careers || !careers.length) return;
    const dims = (meta && meta.dimensions) || {};
    const scen = (meta && meta.scenarios) || { A: 'A', B: 'B', C: 'C' };
    const gradeWord = { 2: 'very strong', 1: 'strong', 0: 'adequate', '-1': 'weak', '-2': 'very weak' };
    const version = (document.querySelector('meta[name="guide-version"]') || {}).content || '';
    const built = (document.querySelector('meta[name="last-modified"]') || {}).content || '';
    const base = location.href.replace(/[^/]*$/, '');
    const card = (c) => {
      const total = plainTotal(c);
      return `<section class="pcard tier-${c.tier}">
        <header class="pcard-head">
          <div><div class="pcard-kicker">Career card · Tier ${c.tier} · §${esc(c.ref)}</div>
          <h1>${esc(c.short)}</h1><div class="pcard-sub">${esc(c.name)}</div></div>
          <div class="pcard-total"><div class="pcard-total-num">${total == null ? '—' : total}<span>/30</span></div><div class="pcard-kicker">§10.1 score</div></div>
        </header>
        <p class="pcard-summary">${esc(c.summary)}</p>
        <div class="pcard-cols">
          <div>
            <h2>Scorecard</h2>
            <table class="pcard-scores">${DIMS.map(d => `<tr><th>${d} ${esc(dims[d] ? dims[d].name : DIM_SHORT[d])}</th><td>${bar(c.scores[d])}</td></tr>`).join('')}</table>
            <h2>2031 scenarios</h2>
            <table class="pcard-scores">${['A', 'B', 'C'].map(k => `<tr><th>${esc(scen[k])}</th><td>${grade(c.scenario[k])} <span class="muted">${gradeWord[c.scenario[k]] || ''}</span></td></tr>`).join('')}
              <tr><th>Robustness</th><td><strong>${esc(c.robustness)}</strong> — ${esc(c.sensitivity)}</td></tr></table>
          </div>
          <div>
            <h2>Compensation (US total comp, 2026 $)</h2>
            <table class="pcard-scores">
              <tr><th>New grad</th><td>${esc(c.comp.new_grad)}</td></tr>
              <tr><th>Mid (4–6 yrs)</th><td>${esc(c.comp.mid)}</td></tr>
              <tr><th>Senior (8–12 yrs)</th><td>${esc(c.comp.senior)}</td></tr>
              <tr><th>Trend 2026→31</th><td>${esc(c.comp.trend)}</td></tr></table>
            <h2>Path</h2>
            <table class="pcard-scores">
              <tr><th>Best degree</th><td><strong>${esc(c.degree)}</strong> — ${esc(c.degree_note)}</td></tr>
              <tr><th>Grad school</th><td>${esc(c.grad_school)}</td></tr>
              <tr><th>US citizenship</th><td>${c.citizen_only ? 'Required (clearance work)' : 'Not required'}</td></tr></table>
            <h2>Avoid if…</h2>
            <ul>${(c.avoid_if || []).map(x => `<li>${esc(x)}</li>`).join('') || '<li>—</li>'}</ul>
          </div>
        </div>
        <footer class="pcard-foot">
          <span>Full profile: ${esc(base + c.page)}</span>
          <span>${esc('The 2027 CS/CE Career Guide' + (version ? ' v' + version : '') + (built ? ' · built ' + built : ''))} · scores 1–5, 5 best (§2.1) · projections are judgments, not facts</span>
        </footer>
      </section>`;
    };
    let host = document.getElementById('printCards');
    if (!host) { host = document.createElement('div'); host.id = 'printCards'; document.body.appendChild(host); }
    host.innerHTML = careers.map(card).join('');
    document.body.classList.add('printing-cards');
    const done = () => { document.body.classList.remove('printing-cards'); host.innerHTML = ''; window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    setTimeout(() => window.print(), 50);
    setTimeout(done, 60000); // safety: some browsers never fire afterprint
  }

  window.CG = { DIMS, DIM_SHORT, load, esc, weightedTotal, plainTotal, bar, tierBadge, grade, getSel, setSel, printCards };
})();
