/* Checklists page: persist checkbox state to localStorage; progress bars; reset/print. */
(function () {
  const KEY = 'cs2027-checklists-v1';
  let state = {}; try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  const boxes = Array.from(document.querySelectorAll('.task-list-item input[type=checkbox]'));
  if (!boxes.length) return;
  boxes.forEach((cb, i) => {
    const li = cb.closest('li');
    const id = 'c' + i + '-' + li.textContent.trim().slice(0, 40).replace(/\W+/g, '_');
    cb.dataset.id = id; cb.disabled = false; cb.checked = !!state[id]; li.classList.toggle('done', cb.checked);
    cb.addEventListener('change', () => { state[id] = cb.checked; li.classList.toggle('done', cb.checked); save(); update(); });
  });
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  // Progress panel
  const art = document.querySelector('.prose');
  const panel = document.createElement('div'); panel.className = 'panel';
  panel.innerHTML = '<div class="row" style="justify-content:space-between"><div><strong id="clProg"></strong> <span class="muted small">— saved in this browser only</span></div><div class="row"><button class="btn sm" id="clPrint">Print / save PDF</button><button class="btn sm" id="clReset">Reset all</button></div></div><div class="score-track" style="width:100%;height:10px;margin-top:8px"><div class="score-bar" id="clBar" style="width:0"></div></div>';
  const h1 = art.querySelector('h1'); (h1 ? h1.nextElementSibling : art.firstChild).before(panel);
  // Per-section counters next to each h3/h4 group
  const heads = Array.from(art.querySelectorAll('h3, h4, p > strong'));
  function update() {
    const done = boxes.filter(b => b.checked).length;
    panel.querySelector('#clProg').textContent = done + ' / ' + boxes.length + ' items done';
    panel.querySelector('#clBar').style.width = Math.round(100 * done / boxes.length) + '%';
    Array.from(art.querySelectorAll('h3')).forEach(h => {
      let el = h.nextElementSibling, n = 0, d = 0;
      while (el && el.tagName !== 'H3' && el.tagName !== 'H2') { el.querySelectorAll && el.querySelectorAll('input[type=checkbox]').forEach(cb => { n++; if (cb.checked) d++; }); el = el.nextElementSibling; }
      let tag = h.querySelector('.cl-count'); if (!tag) { tag = document.createElement('span'); tag.className = 'badge cl-count'; tag.style.marginLeft = '8px'; h.appendChild(tag); }
      tag.textContent = d + '/' + n; tag.classList.toggle('t1', n > 0 && d === n);
    });
  }
  panel.querySelector('#clReset').addEventListener('click', () => { if (confirm('Clear all ticks?')) { state = {}; save(); boxes.forEach(b => { b.checked = false; b.closest('li').classList.remove('done'); }); update(); } });
  panel.querySelector('#clPrint').addEventListener('click', () => window.print());
  update();
})();
