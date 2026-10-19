/* ===== What's New feed ===== */
(function () {
  const SHEET_ID = '1UbY8uiJMRJDlj5rdjntngAH8e5jfGSDsqBwecUMQY74';
  const PUB = '2PACX-1vRSO4S3u_MsX04KJeCtQ_Zkrut1ZkWLzudSvOHBLv7K2qBXxZD7BHYNZoGKQnw-BVsz2L5iZm2RxRLA';
  const PUB_CSV = 'https://docs.google.com/spreadsheets/d/e/' + PUB + '/pub?gid=0&single=true&output=csv';
  const POLL = 10000, MAXPOLL = 60000, CACHE_KEY = 'zion-news-v2';
  const PAGE = 6, NEW_DAYS = 14;
  const root = document.getElementById('news-root'), bar = document.getElementById('news-filters');
  if (!root) return;
  const E = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const B = (en, am) => `<span class="en">${en}</span><span class="am">${am}</span>`;
  const ICON_CAL = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>';
  const ICON_DOWN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  let items = [], filter = 'all', shown = PAGE;
  const open = new Set(); const this_open = k => open.add(k), openDel = k => open.delete(k);
  const keyOf = n => (n.title + '|' + n.dateRaw + '|' + n.cat).slice(0, 200);
  const hash = s => { let x = 5381; for (let i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0; return x.toString(36); };

  // tolerant column lookup: "Image_URL", "image url", "IMAGE" all work
  const pickAny = (row, names) => { for (const n of names) { const k = Object.keys(row).find(k => k.toLowerCase().replace(/[^a-z]/g, '') === n); if (k && String(row[k] ?? '').trim()) return String(row[k]).trim(); } return ''; };


  // Small RFC-4180 CSV parser: quoted fields, commas/newlines inside quotes, "" escapes, BOM, CRLF
  function parseCSV(text) {
    text = text.replace(/^\uFEFF/, '');
    const rows = []; let row = [], f = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c;
      } else if (c === '"') q = true;
      else if (c === ',') { row.push(f); f = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(f); rows.push(row); row = []; f = ''; }
      else f += c;
    }
    if (f !== '' || row.length) { row.push(f); rows.push(row); }
    const head = (rows.shift() || []).map(h => h.trim());
    return rows.filter(r => r.some(v => v.trim() !== '')).map(r => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
  }

  function parseDate(v) {
    if (!v) return null;
    let m = v.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);
    if (m) { let a = +m[1], b = +m[2]; const d = a > 12 ? new Date(+m[3], b - 1, a) : new Date(+m[3], a - 1, b); return isNaN(d) ? null : d; }
    const d = new Date(v); return isNaN(d) ? null : d;
  }
  function safeImg(u) {
    if (!u) return '';
    const g = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
    if (g) return `https://drive.google.com/thumbnail?id=${g[1]}&sz=w1000`;
    return /^https?:\/\//i.test(u) ? u : '';
  }
  function linkify(t) {
    return E(t).replace(/(https?:\/\/[^\s<]+?)([.,;:!?)]*)(?=\s|$)/g, (_, u, p) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${u}</a>${p}`);
  }
  function fmt(d) { return d.toLocaleDateString(document.documentElement.lang === 'am' ? 'am-ET' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }

  function normalise(rows) {
    return rows.map((r, i) => {
      const title = pickAny(r, ['title', 'heading', 'headline']);
      const text = pickAny(r, ['announcement', 'whatsnew', 'news', 'text', 'message', 'description', 'details', 'content']);
      const dateRaw = pickAny(r, ['date', 'eventdate', 'when']);
      const raw = pickAny(r, ['imageurl', 'image', 'photo', 'picture', 'img']);
      return { i, title, text, cat: pickAny(r, ['category', 'type', 'tag']), dateRaw, date: parseDate(dateRaw), img: safeImg(raw), raw: /^https?:\/\//i.test(raw) ? raw : '' };
    }).filter(x => x.title || x.text)
      .sort((a, b) => (b.date ? b.date.getTime() : -Infinity) - (a.date ? a.date.getTime() : -Infinity) || b.i - a.i);
  }

  function card(n, idx) {
    const key = (n.cat || '').toLowerCase().replace(/\s+/g, '');
    const fresh = n.date && (Date.now() - n.date.getTime()) / 864e5 <= NEW_DAYS && n.date.getTime() <= Date.now() + 864e5;
    const meta = `<div class="nc-meta"><span class="badge">${n.cat ? E(n.cat) : B('Update', 'ዝማኔ')}</span>${n.date ? `<span class="nc-date">${ICON_CAL}<time datetime="${n.date.toISOString().slice(0, 10)}">${fmt(n.date)}</time></span>` : (n.dateRaw ? `<span class="nc-date">${ICON_CAL}${E(n.dateRaw)}</span>` : '')}${fresh ? `<span class="nc-new">${B('New', 'አዲስ')}</span>` : ''}</div>`;
    return `<article class="nc" data-cat="${E(key)}" data-k="${E(keyOf(n))}" style="--i:${idx % PAGE}">
      ${n.img ? `<div class="nc-img" data-href="${E(n.raw)}"><img src="${E(n.img)}" alt="${E(n.title || n.cat || 'Update')}" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div>` : ''}
      <div class="nc-body">${meta}${n.title ? `<h3>${E(n.title)}</h3>` : ''}${n.text ? `<div class="nc-text${open.has(keyOf(n)) ? '' : ' clamp'}${n.title ? '' : ' solo'}">${linkify(n.text)}</div><button type="button" class="nc-more${open.has(keyOf(n)) ? ' show' : ''}" aria-expanded="${open.has(keyOf(n))}"><span class="more">${B('See more', 'ተጨማሪ ይመልከቱ')}</span><span class="less">${B('See less', 'ያነሰ ይመልከቱ')}</span>${ICON_DOWN}</button>` : ''}</div>
    </article>`;
  }

  function fitClamps() {
    root.querySelectorAll('.nc-text.clamp').forEach(t => {
      const btn = t.nextElementSibling;
      if (btn && btn.getAttribute('aria-expanded') === 'false') btn.classList.toggle('show', t.scrollHeight > t.clientHeight + 1);
    });
  }

  function wire(node) {
    const im = node.querySelector('.nc-img img');
    if (im) im.addEventListener('error', () => {
      const box = im.parentNode, href = box.dataset.href, body = box.nextElementSibling;
      if (href && body) { const a = document.createElement('a'); a.className = 'nc-link'; a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.innerHTML = B('View attachment', 'አባሪውን ይመልከቱ') + ' ↗'; body.append(a); }
      box.remove();
    }, { once: true });
  }

  function render() {
    const list = items.filter(n => filter === 'all' || (n.cat || '').toLowerCase() === filter);
    root.setAttribute('aria-busy', 'false');
    if (!items.length) {
      root.innerHTML = `<div class="news-state"><div><strong>${B('No updates yet', 'እስካሁን ምንም ዝማኔ የለም')}</strong>${B('Check back soon for news and events.', 'ዜናና ዝግጅቶችን ለማየት በቅርቡ ይመለሱ።')}</div></div>`; return;
    }
    const part = list.slice(0, shown), rest = list.length - part.length;
    let grid = root.querySelector('.news-grid[data-live]');
    if (!grid) { root.innerHTML = '<div class="news-grid" data-live></div>'; grid = root.firstChild; }
    const have = new Map();
    [...grid.children].forEach(c => have.set(c.dataset.k + '|' + c.dataset.h, c));
    const want = [];
    part.forEach((n, idx) => {
      const html = card(n, 0), id = keyOf(n) + '|' + hash(html);
      let node = have.get(id);
      if (node) have.delete(id);
      else {
        const t = document.createElement('template'); t.innerHTML = html.trim();
        node = t.content.firstElementChild; node.dataset.h = hash(html); wire(node);
        node.style.setProperty('--i', idx % PAGE);
      }
      want.push(node);
    });
    have.forEach(n => n.remove());
    want.forEach((n, i) => { if (grid.children[i] !== n) grid.insertBefore(n, grid.children[i] || null); });
    let foot = root.querySelector('.news-foot');
    if (rest > 0) {
      const html = `<button type="button" class="btn ghost" id="news-more">${B('Show more updates', 'ተጨማሪ ዝማኔዎች')} (${rest})</button>`;
      if (!foot) { foot = document.createElement('div'); foot.className = 'news-foot'; root.append(foot); }
      foot.innerHTML = html;
    } else if (foot) foot.remove();
    fitClamps();
  }

  function buildFilters() {
    const cats = [...new Set(items.map(n => (n.cat || '').trim()).filter(Boolean).map(c => c.toLowerCase()))];
    if (cats.length < 2) { bar.hidden = true; filter = 'all'; return; }
    if (filter !== 'all' && !cats.includes(filter)) filter = 'all';
    const label = c => items.find(n => (n.cat || '').toLowerCase() === c).cat;
    bar.innerHTML = `<button type="button" data-f="all" aria-pressed="${filter === 'all'}">${B('All', 'ሁሉም')}</button>` + cats.map(c => `<button type="button" data-f="${E(c)}" aria-pressed="${filter === c}">${E(label(c))}</button>`).join('');
    bar.hidden = false;
  }

  function skeleton() {
    root.setAttribute('aria-busy', 'true');
    root.innerHTML = `<div class="news-grid" aria-label="Loading">${'<div class="nc-sk"></div>'.repeat(3)}</div>`;
  }
  function fail(why) {
    root.setAttribute('aria-busy', 'false'); bar.hidden = true;
    root.innerHTML = `<div class="news-state err" role="alert"><div><strong>${B("We couldn't load the latest updates", 'የቅርብ ጊዜ ዝማኔዎችን መጫን አልተቻለም')}</strong>${B('Please check your connection and try again.', 'እባክዎ ግንኙነትዎን ያረጋግጡና እንደገና ይሞክሩ።')}</div><small style="opacity:.7">${E(why || '')}</small><button type="button" class="btn sm" id="news-retry">${B('Try again', 'እንደገና ሞክር')}</button></div>`;
  }

  /* ---------- live data ---------- */
  const bust = u => u + (u.includes('?') ? '&' : '?') + '_=' + Date.now();
  function grab(src, signal) {
    return fetch(bust(src.u), { signal, cache: 'no-store' }).then(async res => {
      if (!res.ok) throw new Error(res.status + ' ' + new URL(src.u).hostname);
      const t = await res.text();
      if (/^\s*<(!doctype|html)/i.test(t)) throw new Error('not shared/published');
      const rows = src.json ? JSON.parse(t) : parseCSV(t);
      if (!Array.isArray(rows)) throw new Error('bad data');
      return rows;
    });
  }
  // Main method: load the sheet through a <script> tag (Google's JSON feed). No CORS problems on any phone or PC.
  let jid = 0;
  function jsonp() {
    return new Promise((res, rej) => {
      const cb = '__zn' + (++jid) + Date.now(), s = document.createElement('script');
      const end = () => { clearTimeout(t); delete window[cb]; s.remove(); };
      const t = setTimeout(() => { end(); rej(new Error('timeout')); }, 10000);
      window[cb] = d => {
        end();
        try {
          if (!d || d.status === 'error' || !d.table) throw new Error('sheet error');
          let labels = d.table.cols.map(c => (c.label || '').trim());
          let data = d.table.rows.map(r => (r.c || []).map(c => c ? String(c.f != null ? c.f : (c.v != null ? c.v : '')) : ''));
          if (!labels.some(Boolean) && data.length) labels = data.shift().map(x => x.trim());
          res(data.map(r => Object.fromEntries(labels.map((l, i) => [l, r[i] || '']))));
        } catch (e) { rej(e); }
      };
      s.onerror = () => { end(); rej(new Error('sheet is not shared')); };
      s.src = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?headers=1&tqx=out:json;responseHandler:' + cb + '&_=' + Date.now();
      document.head.append(s);
    });
  }
  async function getRows() {
    try { return await jsonp(); }
    catch (e1) {
      try { return await grab({ u: PUB_CSV }, undefined); }
      catch (e2) { throw new Error('Open the Google Sheet → Share → "Anyone with the link" → Viewer'); }
    }
  }

  const live = document.getElementById('news-live');
  function status(ok) {
    if (!live) return;
    live.dataset.s = ok ? 'on' : 'off';
    live.querySelector('.t').innerHTML = ok ? B('Live', 'ቀጥታ') : B('Reconnecting…', 'እንደገና በመገናኘት ላይ…');
    live.hidden = false;
  }

  let sig = '', busy = false, timer = 0, fails = 0;
  function apply(rows) { items = normalise(rows); buildFilters(); render(); }

  async function refresh() {
    if (busy) return; busy = true;
    try {
      const rows = await getRows();
      fails = 0; status(true);
      const s = JSON.stringify(rows);
      if (s !== sig) {
        sig = s; apply(rows);
        try { localStorage.setItem(CACHE_KEY, s); } catch (_) {}
      } else if (root.getAttribute('aria-busy') === 'true') render();
    } catch (e) {
      fails++; status(false);
      console.warn('[What\'s New] could not load:', e.message);
      if (!items.length) fail(e.message);
    } finally { busy = false; schedule(); }
  }
  function schedule() {
    clearTimeout(timer);
    if (document.hidden) return;
    timer = setTimeout(refresh, Math.min(POLL * Math.pow(2, Math.min(fails, 3)), MAXPOLL));
  }
  function load() {
    // show last known updates instantly, then refresh in the background
    let cached = null;
    try { cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (_) {}
    if (Array.isArray(cached) && cached.length && !items.length) { sig = JSON.stringify(cached); apply(cached); }
    else if (!items.length) skeleton();
    busy = false; refresh();
  }
  const wake = () => { if (!document.hidden) { clearTimeout(timer); refresh(); } };
  document.addEventListener('visibilitychange', wake);
  addEventListener('focus', wake);
  addEventListener('online', wake);
  addEventListener('pageshow', e => { if (e.persisted) wake(); });

  root.addEventListener('click', e => {
    const more = e.target.closest('.nc-more');
    if (more) {
      const t = more.previousElementSibling, open = more.getAttribute('aria-expanded') !== 'true';
      more.setAttribute('aria-expanded', open); t.classList.toggle('clamp', !open);
      const k = more.closest('.nc').dataset.k; open ? this_open(k) : openDel(k); return;
    }
    if (e.target.closest('#news-more')) { shown += PAGE; render(); }
    if (e.target.closest('#news-retry')) { items = []; load(); }
  });
  bar.addEventListener('click', e => {
    const b = e.target.closest('button[data-f]'); if (!b) return;
    filter = b.dataset.f; shown = PAGE;
    bar.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    render();
  });
  addEventListener('resize', fitClamps);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitClamps);
  new MutationObserver(() => { if (items.length) render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  load();
})();
