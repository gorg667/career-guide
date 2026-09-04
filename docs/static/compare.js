/* Compare 2–3 careers side by side. State lives in the URL (?ids=a,b,c) and localStorage. */
(function () {
  'use strict';
  const { DIMS, load, esc, plainTotal, bar, tierBadge, grade, getSel, setSel } = window.CG;
  const $ = (s) => document.querySelector(s);
  let data, byId;

  function currentIds() {
    return ['#selA', '#selB', '#selC'].map(s => $(s).value).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);
  }
  function setIds(ids) {
    ['#selA', '#selB', '#selC'].forEach((s, i) => { $(s).value = ids[i] || ''; });
    if (!$('#selA').value) $('#selA').value = data.careers[0].id;
    if (!$('#selB').value) $('#selB').value = data.careers[1].id;
    render();
  }
  function row(label, fn, cls) {
    return `<tr><th>${label}</th>${cs.map(c => `<td class="${cls || ''}">${fn(c)}</td>`).join('')}</tr>`;
  }
  let cs = [];
  function render() {
    const ids = currentIds(); cs = ids.map(id => byId[id]).filter(Boolean);
    setSel(ids);
    const url = new URL(location.href); url.searchParams.set('ids', ids.join(',')); history.replaceState(null, '', url);
    if (cs.length < 2) { $('#cmpOut').innerHTML = '<p class="muted">Pick at least two careers.</p>'; return; }
    const best = (k) => Math.max(...cs.map(c => c.scores[k] == null ? -1 : c.scores[k]));
    const list = (arr) => arr && arr.length ? '<ul style="margin:0;padding-left:1.1em">' + arr.map(x => `<li>${esc(x)}</li>`).join('') + '</ul>' : '—';
    $('#cmpOut').innerHTML = `
      <div class="table-wrap" style="max-width:none"><table class="cmp-table">
        <thead><tr><th></th>${cs.map(c => `<th><a href="${c.page}">${esc(c.short)}</a><div class="muted small" style="font-weight:400">${esc(c.name)}</div></th>`).join('')}</tr></thead>
        <tbody>
          ${row('Tier', c => tierBadge(c.tier) + ` <span class="muted small">§${c.ref}</span>`)}
          ${row('Verdict', c => `<span class="small">${esc(c.summary)}</span>`)}
          ${DIMS.map(d => row(`${d} ${esc(data._meta.dimensions[d].name)}`, c => (c.scores[d] === best(d) && cs.length > 1 ? '<strong>' : '') + bar(c.scores[d]) + (c.scores[d] === best(d) && cs.length > 1 ? '</strong>' : ''))).join('')}
          ${row('Total (§10.1)', c => `<strong>${plainTotal(c) == null ? '—' : plainTotal(c)}</strong> / 30`)}
          ${row('Best degree', c => esc(c.degree) + `<div class="muted small">${esc(c.degree_note)}</div>`)}
          ${row('Grad school?', c => esc(c.grad_school))}
          ${row('US citizenship required?', c => c.citizen_only ? '<span class="grade gm1">Yes (clearance)</span>' : 'No')}
          ${row('New-grad TC', c => esc(c.comp.new_grad))}
          ${row('Mid-career TC (4–6 yrs)', c => esc(c.comp.mid))}
          ${row('Senior TC (8–12 yrs)', c => esc(c.comp.senior))}
          ${row('Comp trend 2026→31', c => esc(c.comp.trend))}
          ${row('A: Steady Complement (55%)', c => grade(c.scenario.A))}
          ${row('B: Agentic Leap (30%)', c => grade(c.scenario.B))}
          ${row('C: AI Winter Lite (15%)', c => grade(c.scenario.C))}
          ${row('Robustness', c => esc(c.robustness) + `<div class="muted small">${esc(c.sensitivity)}</div>`)}
          ${row('Avoid if…', c => list(c.avoid_if))}
          ${row('Full profile', c => `<a class="btn sm" href="${c.page}">Read §${c.ref} →</a>`)}
        </tbody></table></div>`;
  }

  load().then(d => {
    data = d; byId = Object.fromEntries(d.careers.map(c => [c.id, c]));
    const opts = d.careers.map(c => `<option value="${c.id}">T${c.tier} · ${esc(c.short)}</option>`).join('');
    $('#selA').innerHTML = opts; $('#selB').innerHTML = opts; $('#selC').innerHTML = '<option value="">—</option>' + opts;
    const q = new URLSearchParams(location.search).get('ids');
    let ids = q ? q.split(',').filter(id => byId[id]) : getSel().filter(id => byId[id]);
    if (ids.length < 2) ids = ['security', 'infra', ...ids].filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
    ['#selA', '#selB', '#selC'].forEach(s => $(s).addEventListener('change', render));
    const pc = $('#printCmp'); if (pc) pc.addEventListener('click', () => CG.printCards(cs, data._meta));
    document.querySelectorAll('[data-pair]').forEach(b => b.addEventListener('click', () => setIds(b.dataset.pair.split(','))));
    setIds(ids);
  });
})();
