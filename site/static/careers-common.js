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

  window.CG = { DIMS, DIM_SHORT, load, esc, weightedTotal, plainTotal, bar, tierBadge, grade, getSel, setSel };
})();
