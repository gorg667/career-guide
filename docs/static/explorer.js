/* Career explorer: weighted, sortable, filterable scorecard + card view. */
(function () {
  'use strict';
  const { DIMS, DIM_SHORT, load, esc, weightedTotal, bar, tierBadge, getSel, setSel } = window.CG;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));

  const PRESETS = {
    equal:     { D1: 1, D2: 1, D3: 1, D4: 1, D5: 1, D6: 1 },
    safe:      { D1: 1.5, D2: 1.5, D3: 1.5, D4: 0.5, D5: 0.5, D6: 1 },
    money:     { D1: 1, D2: 1, D3: 0.5, D4: 2, D5: 0.5, D6: 0.5 },
    undecided: { D1: 1, D2: 1, D3: 0.5, D4: 0.5, D5: 2, D6: 1 },
    bsonly:    { D1: 1, D2: 1, D3: 0.5, D4: 1, D5: 0.5, D6: 2 },
  };
  let weights = Object.assign({}, PRESETS.equal);
  try { const w = JSON.parse(localStorage.getItem('cg-weights')); if (w && DIMS.every(d => typeof w[d] === 'number')) weights = w; } catch (e) {}
  let sortKey = 'total', sortDir = -1, data = null;

  function renderWeights() {
    $('#weights').innerHTML = DIMS.map(d => `
      <label class="wrow"><span class="wlabel"><strong>${d}</strong> ${DIM_SHORT[d]}<div class="muted small wdesc">${esc(data._meta.dimensions[d].desc)}</div></span>
      <input type="range" min="0" max="2" step="0.25" value="${weights[d]}" data-d="${d}"><output>${weights[d].toFixed(2)}×</output></label>`).join('');
    $$('#weights input').forEach(inp => inp.addEventListener('input', () => {
      weights[inp.dataset.d] = parseFloat(inp.value); inp.nextElementSibling.value = parseFloat(inp.value).toFixed(2) + '×';
      try { localStorage.setItem('cg-weights', JSON.stringify(weights)); } catch (e) {}
      render();
    }));
  }

  function filtered() {
    const tiers = new Set($$('.tierf:checked').map(c => +c.value));
    const deg = $('#degreeF').value, intl = $('#intlF').checked, bs = $('#bsF').checked;
    return data.careers.filter(c => tiers.has(c.tier)
      && (!deg || (c.degree || '').toUpperCase().includes(deg) || /either|or/i.test(c.degree || ''))
      && (!intl || !c.citizen_only)
      && (!bs || (c.scores.D6 != null && c.scores.D6 >= 4)));
  }

  function render() {
    const rows = filtered().map(c => ({ c, total: weightedTotal(c, weights) }));
    const val = (r, k) => {
      if (k === 'name') return r.c.short; if (k === 'tier') return r.c.tier; if (k === 'total') return r.total == null ? -1 : r.total;
      if (k === 'degree') return r.c.degree; if (k === 'newgrad') { const m = (r.c.comp.new_grad || '').match(/\d+/); return m ? +m[0] : -1; }
      if (k === 'robust') return r.c.robustness; if (DIMS.includes(k)) return r.c.scores[k] == null ? -1 : r.c.scores[k]; return 0;
    };
    rows.sort((a, b) => { const va = val(a, sortKey), vb = val(b, sortKey); const r = typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb)); return r * sortDir || (b.total || 0) - (a.total || 0); });
    const sel = getSel();
    $('#explorerBody').innerHTML = rows.map((r, i) => `
      <tr class="tier-${r.c.tier}${sel.includes(r.c.id) ? ' selected' : ''}">
        <td class="muted">${i + 1}</td>
        <td><a href="${r.c.page}"><strong>${esc(r.c.short)}</strong></a><div class="muted small">${esc(r.c.name)} · §${r.c.ref}</div></td>
        <td>${tierBadge(r.c.tier)}</td>
        ${DIMS.map(d => `<td class="num">${bar(r.c.scores[d])}</td>`).join('')}
        <td class="num"><strong>${r.total == null ? '—' : r.total}</strong></td>
        <td>${esc(r.c.degree)}</td>
        <td>${esc(r.c.comp.new_grad)}</td>
        <td>${esc(r.c.robustness)}</td>
        <td><input type="checkbox" class="cmp" data-id="${r.c.id}" ${sel.includes(r.c.id) ? 'checked' : ''} aria-label="Compare ${esc(r.c.short)}"></td>
      </tr>`).join('');
    $('#countLine').textContent = rows.length + ' of ' + data.careers.length + ' careers shown';
    $$('th', $('#explorerTable')).forEach(th => { th.classList.toggle('sorted-asc', th.dataset.k === sortKey && sortDir === 1); th.classList.toggle('sorted-desc', th.dataset.k === sortKey && sortDir === -1); });
    $$('.cmp').forEach(cb => cb.addEventListener('change', () => {
      let s = getSel().filter(id => id !== cb.dataset.id); if (cb.checked) s.push(cb.dataset.id);
      if (s.length > 3) { s = s.slice(-3); } setSel(s); render();
    }));
    const n = getSel().length;
    $('#compareLink').href = 'compare.html?ids=' + getSel().join(',');
    $('#compareHint').textContent = n ? n + ' selected (max 3).' : 'Tick up to 3 careers in the last column.';
    $('#cardGrid').innerHTML = rows.map((r, i) => `
      <a class="card career-card tier-${r.c.tier}" href="${r.c.page}">
        <div class="row" style="justify-content:space-between"><h3 style="margin:0">${i + 1}. ${esc(r.c.short)}</h3>${tierBadge(r.c.tier)}</div>
        <p class="small" style="margin:.4em 0 .5em;color:var(--fg)">${esc(r.c.summary)}</p>
        <p class="muted small" style="margin:0">Total <strong>${r.total == null ? '—' : r.total}</strong> · ${esc(r.c.degree)} · new-grad ${esc(r.c.comp.new_grad)}</p>
      </a>`).join('');
  }

  load().then(d => {
    data = d;
    renderWeights();
    $$('#weightsPanel [data-preset]').forEach(b => b.addEventListener('click', () => { weights = Object.assign({}, PRESETS[b.dataset.preset]); try { localStorage.setItem('cg-weights', JSON.stringify(weights)); } catch (e) {} renderWeights(); render(); }));
    $$('.tierf, #degreeF, #intlF, #bsF').forEach(el => el.addEventListener('change', render));
    $$('th', $('#explorerTable')).forEach(th => th.addEventListener('click', () => {
      const k = th.dataset.k; if (!k || k === 'cmp' || k === 'rank') return;
      if (sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = (k === 'name' || k === 'degree' || k === 'robust') ? 1 : -1; }
      render();
    }));
    render();
  });
})();
