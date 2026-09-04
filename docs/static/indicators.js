/* Indicators dashboard: renders data/indicators.json as prediction + indicator cards
   with per-browser "I checked this" ticks (localStorage). No live data is fetched. */
(function () {
  'use strict';
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const KEY = 'cg-indicators-checked';
  const STATUS_LABEL = { holding: 'Holding', watch: 'Watch', failing: 'Failing', pending: 'Pending' };

  function getChecks() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function setChecks(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }

  function links(where) {
    return (where || []).filter(w => w.url).map(w => `<a href="${esc(w.url)}" target="_blank" rel="noopener">${esc(w.label)}</a>`).join(' · ');
  }
  function checkbox(id, checks) {
    const c = checks[id];
    const when = c ? new Date(c).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : '';
    return `<label class="ind-check"><input type="checkbox" data-id="${esc(id)}" ${c ? 'checked' : ''}> I checked this${c ? ` <span class="muted small">(${esc(when)})</span>` : ''}</label>`;
  }

  function predCard(p, checks) {
    const hist = (p.history || []).map(h => `<tr><td class="muted">${esc(h.date)}</td><td>${esc(h.value)}</td></tr>`).join('');
    return `<article class="ind-card status-${esc(p.status)}" id="${esc(p.id)}">
      <header class="ind-head">
        <span class="ind-id">${esc(p.id)}</span>
        <span class="badge ind-status">${esc(STATUS_LABEL[p.status] || p.status)}</span>
        <a class="small" href="${esc(p.guide_ref.href)}">${esc(p.guide_ref.label)}</a>
      </header>
      <h3>${esc(p.title)}</h3>
      <dl class="ind-dl">
        <dt>Number to check</dt><dd>${esc(p.metric)}</dd>
        <dt>Threshold</dt><dd><strong>${esc(p.threshold)}</strong></dd>
        <dt>Last known</dt><dd><strong>${esc(p.baseline.value)}</strong> <span class="muted">(${esc(p.baseline.date)})</span>${p.baseline.note ? `<br><span class="small muted">${esc(p.baseline.note)}</span>` : ''}</dd>
        <dt>Reading</dt><dd>${esc(p.status_note)}</dd>
        <dt>Where</dt><dd>${links(p.where)} <span class="small muted">· ${esc(p.cadence)}</span></dd>
        <dt>If it fails</dt><dd>${esc(p.if_fails)}</dd>
      </dl>
      <details class="small"><summary>History</summary><table class="ind-hist">${hist}</table></details>
      ${checkbox(p.id, checks)}
    </article>`;
  }

  function indCard(i, checks) {
    return `<article class="ind-card" id="${esc(i.id)}">
      <header class="ind-head">
        <span class="ind-id">#${esc(i.rank)}</span>
        <a class="small" href="${esc(i.guide_ref.href)}">${esc(i.guide_ref.label)}</a>
      </header>
      <h3>${esc(i.title)}</h3>
      <dl class="ind-dl">
        <dt>Why</dt><dd>${esc(i.why)}</dd>
        <dt>Last known</dt><dd>${esc(i.last.value)} <span class="muted">(${esc(i.last.date)})</span></dd>
        <dt>Healthy looks like</dt><dd>${esc(i.healthy)}</dd>
        <dt>Where</dt><dd>${links(i.where)} <span class="small muted">· ${esc(i.cadence)}</span></dd>
      </dl>
      ${checkbox(i.id, checks)}
    </article>`;
  }

  function summary(d, checks) {
    const counts = { holding: 0, watch: 0, failing: 0, pending: 0 };
    d.predictions.forEach(p => { counts[p.status] = (counts[p.status] || 0) + 1; });
    const total = d.predictions.length + d.indicators.length;
    const done = Object.keys(checks).length;
    return `<div><strong>Predictions as of ${esc(d._meta.as_of)}:</strong>
      <span class="badge ind-status status-holding">${counts.holding} holding</span>
      <span class="badge ind-status status-watch">${counts.watch} watch</span>
      <span class="badge ind-status status-failing">${counts.failing} failing</span></div>
      <div class="muted small">You have ticked ${done} of ${total} cards this cycle.</div>`;
  }

  function render(d) {
    const checks = getChecks();
    document.getElementById('asOf').textContent = d._meta.as_of;
    document.getElementById('indSummary').innerHTML = summary(d, checks);
    document.getElementById('predCards').innerHTML = d.predictions.map(p => predCard(p, checks)).join('');
    document.getElementById('indCards').innerHTML = d.indicators.slice().sort((a, b) => a.rank - b.rank).map(i => indCard(i, checks)).join('');
    document.getElementById('decisionRule').textContent = d.decision_rule;
    document.querySelectorAll('.ind-check input').forEach(cb => {
      cb.addEventListener('change', () => {
        const c = getChecks();
        if (cb.checked) c[cb.dataset.id] = Date.now(); else delete c[cb.dataset.id];
        setChecks(c); render(d);
      });
    });
  }

  fetch('data/indicators.json').then(r => r.json()).then(d => {
    render(d);
    document.getElementById('resetChecks').addEventListener('click', () => { setChecks({}); render(d); });
    document.getElementById('printInd').addEventListener('click', () => window.print());
  }).catch(e => {
    document.getElementById('predCards').innerHTML = '<p class="callout warn">Could not load data/indicators.json.</p>';
    console.error(e);
  });
})();
