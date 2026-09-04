/* Interactive timeline: §7.1 master calendar with a "today" marker and recruiting-window Gantt.
   Data is transcribed from sections/07-roadmap.md §7.1 — keep in sync if that table changes. */
(function () {
  'use strict';
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const D = (y, m, d) => new Date(y, m - 1, d || 1);
  const fmt = (d) => d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });

  // Periods: [label, sub, start, end(exclusive), academic, actions, window, anchor]
  const PERIODS = [
    ['Summer 2027', 'pre-college', D(2027, 6), D(2027, 8, 20), '—', 'Learn Python + one systems language; Linux; Git; build one real thing; read Sections 3–4 and pick 3 candidate tracks.', '—', '07-roadmap.html#sec-7-2'],
    ['Fall 2027', 'Year 1', D(2027, 8, 20), D(2028, 1, 10), 'Intro CS, calculus, physics/discrete', 'Join 1–2 technical clubs (one hardware/competition, one software); attend career fair to observe; start a CTF/Kaggle/Advent-of-Code habit.', 'Y1 programs (Google STEP, Microsoft Explore, Meta University, Amazon Propel, Jane Street INSIGHT, Palantir Path) open Aug–Oct.', '07-roadmap.html#sec-7-3'],
    ['Spring 2028', 'Year 1', D(2028, 1, 10), D(2028, 5, 15), 'Data structures, more math', 'Email 5 professors for summer research; apply to REUs (deadlines Jan–Feb); build project #2.', 'REU deadlines Feb; Y1 programs close.', '07-roadmap.html#sec-7-3'],
    ['Summer 2028', 'after Y1', D(2028, 5, 15), D(2028, 8, 20), '—', 'Research, REU, or a small-company/local internship; if none, a serious self-directed project with users or an open-source contribution streak.', '—', '07-roadmap.html#sec-7-3'],
    ['Fall 2028', 'Year 2', D(2028, 8, 20), D(2029, 1, 10), 'Architecture/OS, algorithms, first specialty elective', 'Apply to 100+ summer-2029 internships Aug–Nov; career fair in earnest; pick your 2 leading tracks.', 'Summer-2029 internships: Aug–Dec 2028 (Big Tech, quant, defense primes all open by Sept).', '07-roadmap.html#sec-7-4'],
    ['Spring 2029', 'Year 2', D(2029, 1, 10), D(2029, 5, 15), 'Systems, specialty course #2', 'Interview; keep applying (smaller companies recruit Jan–Apr); continue research/club; start a flagship project.', 'Late-cycle internships Jan–Apr.', '07-roadmap.html#sec-7-4'],
    ['Summer 2029', 'after Y2', D(2029, 5, 15), D(2029, 8, 20), '—', 'Internship #1 (any relevant, real one). Perform. Get a return offer or a glowing reference.', '—', '07-roadmap.html#sec-7-4'],
    ['Fall 2029', 'Year 3', D(2029, 8, 20), D(2030, 1, 10), 'Specialty courses #3–4; research credits', 'Apply for summer-2030 internships Aug–Oct — target brand names and deep relevance; decide MS/PhD vs industry by Dec.', 'Summer-2030 internships: Aug–Dec 2029.', '07-roadmap.html#sec-7-5'],
    ['Spring 2030', 'Year 3', D(2030, 1, 10), D(2030, 5, 15), 'Capstone planning; advanced electives', 'Publish/ship something visible (paper, tape-out, competition result, open-source release); GRE if grad school (many programs no longer require it).', '—', '07-roadmap.html#sec-7-5'],
    ['Summer 2030', 'after Y3', D(2030, 5, 15), D(2030, 8, 20), '—', 'Internship #2 — the one that converts to a full-time offer. Treat it as a 12-week interview.', 'Return offers extended Aug–Sept 2030.', '07-roadmap.html#sec-7-5'],
    ['Fall 2030', 'Year 4', D(2030, 8, 20), D(2031, 1, 10), 'Capstone; last electives', 'Full-time recruiting Aug–Nov 2030; negotiate using return offer as anchor; grad-school applications due Dec 2030–Jan 2031 (PhD: Dec 1–15 typical; MS: Dec–Mar).', 'New-grad 2031 roles: Aug 2030–Mar 2031.', '07-roadmap.html#sec-7-6'],
    ['Spring 2031', 'Year 4', D(2031, 1, 10), D(2031, 5, 15), 'Finish', 'Accept offer (or grad school) by Mar–Apr; clearance paperwork if defense; move.', 'Late new-grad roles Jan–May.', '07-roadmap.html#sec-7-6'],
    ['May 2031', 'graduate', D(2031, 5, 15), D(2031, 9, 1), 'Graduate', 'Start work Jun–Sept 2031.', '—', '07-roadmap.html#sec-7-6'],
  ];

  // Recruiting windows for Gantt: [label, start, end, kind, note]
  const WINDOWS = [
    ['Y1 programs (STEP, Explore, Meta U, Propel, INSIGHT, Path)', D(2027, 8), D(2027, 11), 'intern', 'Open Aug–Oct 2027; rolling'],
    ['REU applications (summer 2028)', D(2028, 1), D(2028, 3), 'research', 'Deadlines cluster in February'],
    ['Summer-2029 internships — main cycle', D(2028, 8), D(2029, 1), 'intern', 'Big Tech, quant, defense primes open by Sept'],
    ['Summer-2029 internships — late cycle (smaller cos)', D(2029, 1), D(2029, 5), 'intern-late', 'Jan–Apr'],
    ['Summer-2030 internships — main cycle', D(2029, 8), D(2030, 1), 'intern', 'Target brand names + deep relevance'],
    ['Summer-2030 internships — late cycle', D(2030, 1), D(2030, 5), 'intern-late', ''],
    ['Return offers (from internship #2)', D(2030, 8), D(2030, 10), 'offer', 'Aug–Sept 2030'],
    ['New-grad full-time roles (2031 start)', D(2030, 8), D(2031, 4), 'ft', 'Aug 2030–Mar 2031; negotiate with return offer as anchor'],
    ['PhD applications', D(2030, 12), D(2030, 12, 16), 'grad', 'Dec 1–15 typical'],
    ['MS applications', D(2030, 12), D(2031, 4), 'grad', 'Dec–Mar'],
    ['Late new-grad roles', D(2031, 1), D(2031, 6), 'ft-late', 'Jan–May'],
  ];
  const KIND_LABEL = { intern: 'Internship (main)', 'intern-late': 'Internship (late)', research: 'Research / REU', offer: 'Return offers', ft: 'Full-time', 'ft-late': 'Full-time (late)', grad: 'Grad school' };

  const T0 = D(2027, 6), T1 = D(2031, 9);
  const span = T1 - T0;
  const pct = (d) => Math.min(100, Math.max(0, (d - T0) / span * 100));

  // Allow ?today=YYYY-MM-DD for testing / planning ("what would I do in Fall 2029?")
  const qp = new URLSearchParams(location.search).get('today');
  const now = qp && !isNaN(Date.parse(qp)) ? new Date(qp) : new Date();

  /* ---------- now box */
  function renderNow() {
    const cur = PERIODS.find(p => now >= p[2] && now < p[3]);
    const open = WINDOWS.filter(w => now >= w[1] && now < w[2]);
    const soon = WINDOWS.filter(w => w[1] > now && (w[1] - now) < 1000 * 60 * 60 * 24 * 75);
    let html = `<div class="small muted">Today: ${now.toLocaleDateString(undefined, { dateStyle: 'long' })}${qp ? ' (simulated via ?today=)' : ''}</div>`;
    if (now < T0) {
      const days = Math.round((T0 - now) / 864e5);
      html += `<h2 style="margin:.3em 0">${days} days until the timeline starts (June 2027)</h2>
        <p>You are before Summer 2027. The guide's advice for this window is the same as for the pre-college summer: <a href="07-roadmap.html#sec-7-2">Section 7.2</a> — learn Python and one systems language, get comfortable in Linux and Git, and build one real thing. If you are choosing between CS and CE or between schools, read <a href="06-cs-vs-ce.html">Section 6</a> first.</p>`;
    } else if (now >= T1) {
      html += `<h2 style="margin:.3em 0">The Class of 2031 timeline is complete</h2><p>If you are on a later cohort, shift every date by whole years — the shape of the cycle (Aug–Oct openings, Feb REU deadlines, Dec grad-school deadlines) has been stable for a decade.</p>`;
    } else if (cur) {
      html += `<h2 style="margin:.3em 0">You are in: ${esc(cur[0])} <span class="muted" style="font-weight:400">(${esc(cur[1])})</span></h2>
        <p><strong>Do this term:</strong> ${esc(cur[5])} <a href="${cur[7]}">Details →</a></p>`;
    }
    if (now >= T0 && now < T1) {
      html += `<p><strong>Recruiting windows open now:</strong> ${open.length ? '<ul>' + open.map(w => `<li>${esc(w[0])}${w[4] ? ` <span class="muted small">— ${esc(w[4])}</span>` : ''}</li>`).join('') + '</ul>' : '<span class="muted">none — build, study, and prepare for the next opening.</span>'}</p>`;
      if (soon.length) html += `<p><strong>Opening within ~10 weeks:</strong> ${soon.map(w => `${esc(w[0])} (${fmt(w[1])})`).join('; ')}. Have your résumé and project list ready <em>before</em> these open.</p>`;
    }
    document.getElementById('nowBox').innerHTML = html;
  }

  /* ---------- gantt */
  function renderGantt() {
    const years = [];
    for (let y = 2027; y <= 2031; y++) for (const m of [1, 5, 9]) { const d = D(y, m); if (d >= T0 && d < T1) years.push(d); }
    const ticks = years.map(d => `<div class="g-tick" style="left:${pct(d)}%"><span>${d.getMonth() === 8 ? 'Fall' : d.getMonth() === 0 ? 'Spr' : 'Sum'} ${String(d.getFullYear()).slice(2)}</span></div>`).join('');
    const periodShade = PERIODS.map((p, i) => `<div class="g-period ${p[1].startsWith('Year') || p[1] === 'graduate' ? 'term' : 'summer'}" style="left:${pct(p[2])}%;width:${pct(p[3]) - pct(p[2])}%" title="${esc(p[0])}"></div>`).join('');
    const rows = WINDOWS.map(w => {
      const on = now >= w[1] && now < w[2], past = now >= w[2];
      return `<div class="g-row ${on ? 'open' : ''} ${past ? 'past' : ''}">
        <div class="g-label">${esc(w[0])}${on ? ' <span class="badge t1">open now</span>' : ''}</div>
        <div class="g-track">${periodShade}<div class="g-bar k-${w[3]}" style="left:${pct(w[1])}%;width:${Math.max(0.8, pct(w[2]) - pct(w[1]))}%" title="${esc(w[0])}: ${fmt(w[1])} – ${fmt(new Date(w[2] - 1))}${w[4] ? ' · ' + esc(w[4]) : ''}">${pct(w[2]) - pct(w[1]) > 9 ? `<span>${fmt(w[1])}–${fmt(new Date(w[2] - 1))}</span>` : ''}</div>${nowLine()}</div>
      </div>`;
    }).join('');
    const legend = Object.keys(KIND_LABEL).map(k => `<span class="g-leg"><i class="g-bar k-${k}"></i>${KIND_LABEL[k]}</span>`).join('');
    document.getElementById('gantt').innerHTML = `
      <div class="g-row g-head"><div class="g-label"></div><div class="g-track">${ticks}${nowLine(true)}</div></div>
      ${rows}
      <div class="g-legend small">${legend}<span class="g-leg"><i class="g-now-swatch"></i>today</span></div>`;
  }
  function nowLine(label) {
    if (now < T0 || now >= T1) return '';
    return `<div class="g-now" style="left:${pct(now)}%">${label ? '<span>today</span>' : ''}</div>`;
  }

  /* ---------- period list */
  function renderTimeline() {
    const hidePast = document.getElementById('hidePast').checked;
    const items = PERIODS.map(p => {
      const past = now >= p[3], cur = now >= p[2] && now < p[3];
      if (hidePast && past) return '';
      return `<li class="tl-item ${past ? 'past' : ''} ${cur ? 'current' : ''}">
        <div class="tl-when"><strong>${esc(p[0])}</strong><div class="muted small">${esc(p[1])}</div>${cur ? '<div class="badge t1">now</div>' : ''}</div>
        <div class="tl-body">
          <div class="tl-grid">
            <div><div class="tl-k">Academic</div>${esc(p[4])}</div>
            <div><div class="tl-k">Career actions</div>${esc(p[5])}</div>
            <div><div class="tl-k">Recruiting window open</div>${p[6] === '—' ? '<span class="muted">—</span>' : esc(p[6])}</div>
          </div>
          <a class="small" href="${p[7]}">Read the full section →</a>
        </div>
      </li>`;
    }).join('');
    document.getElementById('timeline').innerHTML = items || '<li class="muted">Everything is in the past. Congratulations.</li>';
  }

  renderNow(); renderGantt(); renderTimeline();
  document.getElementById('hidePast').addEventListener('change', renderTimeline);
})();
