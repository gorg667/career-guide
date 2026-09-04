/* Glossary page: instant filter over definition list items. */
(function () {
  const art = document.querySelector('.prose'); if (!art) return;
  const items = Array.from(art.querySelectorAll('li')).filter(li => li.querySelector('strong'));
  const groups = Array.from(art.querySelectorAll('h3'));
  const box = document.createElement('div');
  box.className = 'panel';
  box.innerHTML = '<label class="inline" style="width:100%"><span class="muted">Filter terms</span><input type="search" class="plain" id="glossFilter" placeholder="e.g. clearance, RTL, OPT…" style="flex:1" autofocus></label><div class="small muted" id="glossCount"></div>';
  const h1 = art.querySelector('h1'); (h1 ? h1.nextElementSibling : art.firstChild).before(box);
  const input = box.querySelector('#glossFilter'), count = box.querySelector('#glossCount');
  const total = items.length; count.textContent = total + ' terms';
  const params = new URLSearchParams(location.search); if (params.get('q')) input.value = params.get('q');
  function apply() {
    const q = input.value.trim().toLowerCase(); let shown = 0;
    items.forEach(li => { const hit = !q || li.textContent.toLowerCase().includes(q); li.style.display = hit ? '' : 'none'; if (hit) shown++; });
    groups.forEach(h => { let el = h.nextElementSibling; let any = false; while (el && el.tagName !== 'H3' && el.tagName !== 'H2') { if (el.tagName === 'UL') { any = any || Array.from(el.children).some(li => li.style.display !== 'none'); } el = el.nextElementSibling; }
      h.style.display = any ? '' : 'none'; });
    count.textContent = q ? shown + ' of ' + total + ' terms match' : total + ' terms';
  }
  input.addEventListener('input', apply); apply();
})();
