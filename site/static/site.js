/* Site-wide behaviour: nav toggle, theme toggle, TOC scroll-spy, heading anchors,
   sortable tables, client-side search. No dependencies. */
(function () {
  'use strict';
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));

  /* ---- Sidebar (mobile) ---- */
  const navToggle = $('#navToggle'), sidebar = $('#sidebar');
  if (navToggle && sidebar) {
    navToggle.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== navToggle) {
        sidebar.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // keep the active nav item visible
    const act = $('.sidebar a.active');
    if (act) act.scrollIntoView({ block: 'center' });
  }

  /* ---- Theme ---- */
  const themeToggle = $('#themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const root = document.documentElement;
      const cur = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---- Heading anchor links ---- */
  $$('.prose h2[id], .prose h3[id]').forEach(h => {
    const a = document.createElement('a');
    a.className = 'hl'; a.href = '#' + h.id; a.textContent = '#'; a.setAttribute('aria-label', 'Link to this section');
    h.appendChild(a);
  });

  /* ---- TOC scroll-spy ---- */
  const tocLinks = $$('.toc a');
  if (tocLinks.length) {
    const map = new Map();
    tocLinks.forEach(a => { const id = decodeURIComponent(a.hash.slice(1)); const el = document.getElementById(id); if (el) map.set(el, a); });
    let current = null;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { const a = map.get(en.target); if (a && a !== current) { if (current) current.classList.remove('current'); current = a; a.classList.add('current'); } } });
    }, { rootMargin: '-60px 0px -70% 0px', threshold: 0 });
    map.forEach((a, el) => obs.observe(el));
  }

  /* ---- Sortable tables: click a header to sort (numeric-aware) ---- */
  $$('table.sortable').forEach(table => {
    const ths = $$('thead th', table);
    const tbody = $('tbody', table);
    if (!tbody || ths.length < 2 || $$('tr', tbody).length < 3) return;
    ths.forEach((th, idx) => {
      th.classList.add('sortable-th');
      th.addEventListener('click', () => {
        const rows = $$('tr', tbody);
        const dir = th.classList.contains('sorted-asc') ? -1 : 1;
        const val = (tr) => { const td = tr.children[idx]; return td ? td.textContent.trim() : ''; };
        const num = (s) => { const m = s.replace(/,/g, '').match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : NaN; };
        const allNum = rows.every(r => !isNaN(num(val(r))) || val(r) === '' || val(r) === '—');
        rows.sort((a, b) => {
          const va = val(a), vb = val(b);
          if (allNum) { const na = num(va), nb = num(vb); if (isNaN(na)) return 1; if (isNaN(nb)) return -1; return (na - nb) * dir; }
          return va.localeCompare(vb, undefined, { numeric: true }) * dir;
        });
        ths.forEach(t => t.classList.remove('sorted-asc', 'sorted-desc'));
        th.classList.add(dir === 1 ? 'sorted-asc' : 'sorted-desc');
        rows.forEach(r => tbody.appendChild(r));
      });
    });
  });

  /* ---- Search ---- */
  const modal = $('#searchModal'), input = $('#searchInput'), results = $('#searchResults'), openBtn = $('#searchOpen');
  let index = null, sel = -1;
  function openSearch() {
    if (!modal) return;
    modal.hidden = false; input.value = ''; results.innerHTML = ''; sel = -1; input.focus();
    if (!index) fetch('search-index.json').then(r => r.json()).then(d => { index = d; }).catch(() => { results.innerHTML = '<div class="search-hint">Search index unavailable (open the site over http, not file://).</div>'; });
  }
  function closeSearch() { if (modal) modal.hidden = true; }
  if (openBtn) openBtn.addEventListener('click', openSearch);
  document.addEventListener('keydown', (e) => {
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) { e.preventDefault(); openSearch(); }
    else if (e.key === 'Escape' && modal && !modal.hidden) closeSearch();
    else if (modal && !modal.hidden && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      const items = $$('.sr', results); if (!items.length) return;
      sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((it, i) => it.classList.toggle('sel', i === sel));
      items[sel].scrollIntoView({ block: 'nearest' });
    } else if (modal && !modal.hidden && e.key === 'Enter') {
      const items = $$('.sr', results); if (items[sel >= 0 ? sel : 0]) items[sel >= 0 ? sel : 0].click();
    }
  });
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeSearch(); });

  const esc = (s) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function highlight(text, terms) {
    let out = esc(text);
    terms.forEach(t => { if (t.length >= 2) out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
    return out;
  }
  function snippet(text, terms) {
    const low = text.toLowerCase(); let pos = -1;
    for (const t of terms) { const p = low.indexOf(t); if (p >= 0 && (pos < 0 || p < pos)) pos = p; }
    const start = Math.max(0, pos - 90), end = Math.min(text.length, start + 260);
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  }
  function runSearch(q) {
    if (!index) return;
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length || q.length < 2) { results.innerHTML = ''; return; }
    const scored = [];
    for (const r of index) {
      const t = r.t.toLowerCase(), x = r.x.toLowerCase();
      let score = 0, all = true;
      for (const term of terms) {
        const inT = t.includes(term), inX = x.includes(term);
        if (!inT && !inX) { all = false; break; }
        score += inT ? 12 : 0;
        if (inX) { score += Math.min(6, (x.split(term).length - 1)); }
      }
      if (all) scored.push([score + (r.p === 'index.html' ? 1 : 0), r]);
    }
    scored.sort((a, b) => b[0] - a[0]);
    const top = scored.slice(0, 40);
    if (!top.length) { results.innerHTML = '<div class="search-hint">No matches.</div>'; return; }
    results.innerHTML = top.map(([, r]) =>
      `<a class="sr" href="${r.p}#${r.a}"><div><span class="sr-t">${highlight(r.t, terms)}</span><span class="sr-p">${esc(r.pt)}</span></div><div class="sr-x">${highlight(snippet(r.x, terms), terms)}</div></a>`
    ).join('');
    sel = -1;
  }
  if (input) { let timer; input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => runSearch(input.value.trim()), 80); }); }
})();
