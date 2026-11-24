/* NeuroSyn website concept: behaviour for every page.
   Plain JavaScript, no libraries and no build step. Each part below looks for
   its own markup and does nothing when that markup is not on the page. */
(function () {
  'use strict';

  var doc = document, root = doc.documentElement, body = doc.body, NS = window.NS || {};
  var ROOT = root.getAttribute('data-root') || '';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.28,.11,.32,1)';

  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function store(k, v) {
    try {
      if (v === undefined) { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null; }
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) { return null; }
  }
  function onView(el, cb, margin) {
    if (!('IntersectionObserver' in window)) { cb(); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); cb(e.target); } });
    }, { rootMargin: margin || '0px 0px -12% 0px' });
    io.observe(el);
  }
  var toastEl = $('[data-toast]'), toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2600);
  }
  function fadeIn(els) {
    if (reduce || !els[0] || !els[0].animate) return;
    els.forEach(function (el, i) { if (el) el.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 650, delay: i * 60, easing: EASE, fill: 'backwards' }); });
  }

  /* ==========================================================================
     Layers: phone menu, search and video. Focus stays inside, Esc closes.
     ========================================================================== */
  var openEl = null, lastFocus = null;
  function focusables(el) { return $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea, iframe, [tabindex]:not([tabindex="-1"])', el).filter(function (n) { return n.offsetParent !== null || n === doc.activeElement; }); }
  function openLayer(el, opener) {
    if (!el) return;
    if (openEl) closeLayer(true);
    openEl = el; lastFocus = opener || doc.activeElement;
    el.hidden = false; root.style.overflow = 'hidden';
    var first = $('[data-autofocus]', el) || focusables(el)[0];
    if (first) setTimeout(function () { first.focus(); }, 30);
    $$('[aria-controls="' + el.id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
  }
  function closeLayer(quiet) {
    if (!openEl) return;
    var el = openEl; openEl = null;
    el.hidden = true; root.style.overflow = '';
    $$('[aria-controls="' + el.id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    var frame = $('[data-film-frame]', el); if (frame) frame.innerHTML = '';
    if (!quiet && lastFocus && lastFocus.focus) lastFocus.focus();
  }
  doc.addEventListener('keydown', function (e) {
    if (!openEl) return;
    if (e.key === 'Escape') { e.preventDefault(); closeLayer(); return; }
    if (e.key === 'Tab') {
      var f = focusables(openEl); if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && doc.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });
  $$('.layer-ov').forEach(function (el) {
    el.addEventListener('click', function (e) { if (e.target === el || e.target.closest('[data-close]')) closeLayer(); });
  });
  $$('[data-open-drawer]').forEach(function (b) { b.addEventListener('click', function () { openLayer($('#drawer'), b); }); });
  $$('#drawer a').forEach(function (a) { a.addEventListener('click', function () { if (a.getAttribute('href').charAt(0) === '#') closeLayer(true); }); });

  /* video pop-up: the documentary and the product demos */
  doc.addEventListener('click', function (e) {
    var b = e.target.closest('[data-film]'); if (!b) return;
    e.preventDefault();
    var film = $('#film'); if (!film) return;
    $('[data-film-title]', film).textContent = b.getAttribute('data-film-title') || 'Video';
    $('[data-film-frame]', film).innerHTML = '<iframe src="' + esc(b.getAttribute('data-film')) + '" title="' + esc(b.getAttribute('data-film-title') || 'Video') + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    openLayer(film, b);
  });

  /* ==========================================================================
     Global nav: flyouts open on hover or keyboard focus and close on Esc
     ========================================================================== */
  var flyItems = $$('.gn__item[data-fly]'), flyTimer;
  function setFly(li, on) {
    if (on) flyItems.forEach(function (o) { if (o !== li) setFly(o, false); });
    li.classList.toggle('is-open', on);
    var a = $('.gn__link', li); if (a) a.setAttribute('aria-expanded', String(on));
    body.classList.toggle('has-flyout', flyItems.some(function (o) { return o.classList.contains('is-open'); }));
  }
  var flyMode = '';
  flyItems.forEach(function (li) {
    li.addEventListener('mouseenter', function () { clearTimeout(flyTimer); flyTimer = setTimeout(function () { flyMode = 'pointer'; setFly(li, true); }, 90); });
    li.addEventListener('mouseleave', function () {
      if (flyMode === 'key' && li.contains(doc.activeElement)) return;
      clearTimeout(flyTimer); flyTimer = setTimeout(function () { setFly(li, false); }, 160);
    });
    li.addEventListener('focusin', function () { clearTimeout(flyTimer); flyMode = 'key'; setFly(li, true); });
    li.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) setFly(li, false); });
    li.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && li.classList.contains('is-open')) { e.stopPropagation(); setFly(li, false); var a = $('.gn__link', li); if (a) a.focus(); }
    });
  });
  var scrim = $('.gn-scrim');
  function closeFlys() { flyItems.forEach(function (li) { setFly(li, false); }); }
  if (scrim) {
    scrim.addEventListener('mouseenter', function () { if (flyMode !== 'key') closeFlys(); });
    scrim.addEventListener('click', closeFlys);
  }

  /* ==========================================================================
     Search: every page, product, paper and research system on the site.
     Copes with typos, offers "Did you mean", remembers recent searches.
     ========================================================================== */
  var searchEl = $('#search');
  if (searchEl) (function () {
    var q = $('#q'), results = $('[data-results]'), dym = $('[data-dym]'), start = $('[data-search-start]'), active = -1, hits = [];
    var INDEX = (NS.INDEX || []).map(function (d) { return { d: d, title: d.title.toLowerCase(), text: (d.title + ' ' + d.text + ' ' + d.type).toLowerCase() }; });
    var VOCAB = {};
    INDEX.forEach(function (x) { x.text.split(/[^a-z0-9-]+/).forEach(function (w) { if (w.length > 2) VOCAB[w] = 1; }); });
    Object.keys(NS.SYN || {}).forEach(function (w) { VOCAB[w] = 1; });
    VOCAB = Object.keys(VOCAB);
    function lev(a, b) {
      if (Math.abs(a.length - b.length) > 2) return 9;
      var m = [], i, j;
      for (i = 0; i <= b.length; i++) m[i] = [i];
      for (j = 0; j <= a.length; j++) m[0][j] = j;
      for (i = 1; i <= b.length; i++) for (j = 1; j <= a.length; j++) m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (b[i - 1] === a[j - 1] ? 0 : 1));
      return m[b.length][a.length];
    }
    function words(v) { return v.toLowerCase().split(/[^a-z0-9-]+/).filter(function (w) { return w.length > 1; }); }
    function expand(w) { var s = (NS.SYN || {})[w]; return s ? [w].concat(s.split(' ')) : [w]; }
    function score(x, ws) {
      var total = 0;
      for (var i = 0; i < ws.length; i++) {
        var best = 0, alts = expand(ws[i]);
        for (var k = 0; k < alts.length; k++) {
          var w = alts[k];
          if (x.title.indexOf(w) > -1) best = Math.max(best, 5);
          else if (x.text.indexOf(w) > -1) best = Math.max(best, 3);
          else if (w.length > 3) {
            var toks = x.text.split(/[^a-z0-9-]+/);
            for (var t = 0; t < toks.length; t++) { if (toks[t].length > 3 && lev(w, toks[t].slice(0, w.length + 1)) <= 1) { best = Math.max(best, 2); break; } }
          }
        }
        if (!best) return 0;
        total += best;
      }
      return total;
    }
    function didYouMean(v) {
      var changed = false, out = words(v).map(function (w) {
        if (VOCAB.indexOf(w) > -1) return w;
        var best = '', bd = w.length > 6 ? 3 : 2;
        VOCAB.forEach(function (c) { var d = lev(w, c); if (d < bd) { bd = d; best = c; } });
        if (best) { changed = true; return best; }
        return '';
      }).filter(Boolean).join(' ');
      return changed && out ? out : '';
    }
    function mark(t, ws) {
      var s = esc(t);
      ws.forEach(function (w) { w = w.replace(/[^a-z0-9]/g, ''); if (w.length > 2) s = s.replace(new RegExp('(' + w + ')', 'ig'), '<mark>$1</mark>'); });
      return s;
    }
    var ORDER = ['Page', 'Service', 'Solution', 'Work', 'Industry', 'Research', 'Paper'];
    var PLURAL = { Page: 'Pages', Service: 'Services', Solution: 'Solutions', Work: 'Work', Industry: 'Industries', Research: 'Research', Paper: 'Papers' };
    function render() {
      var v = q.value.trim(); active = -1; q.removeAttribute('aria-activedescendant');
      start.hidden = !!v; dym.hidden = true; dym.innerHTML = ''; results.innerHTML = '';
      if (!v) { renderStart(); return; }
      var ws = words(v);
      var found = INDEX.map(function (x) { return { x: x, s: score(x, ws) }; }).filter(function (h) { return h.s > 0; })
        .sort(function (a, b) { return b.s - a.s; }).slice(0, 10);
      var best = {};
      found.forEach(function (h) { var t = h.x.d.type; if (!(t in best) || h.s > best[t]) best[t] = h.s; });
      found.sort(function (a, b) { var ta = a.x.d.type, tb = b.x.d.type; return (best[tb] - best[ta]) || (ORDER.indexOf(ta) - ORDER.indexOf(tb)) || (b.s - a.s); });
      if (!found.length) {
        var s = didYouMean(v);
        results.innerHTML = '<li class="search__empty">Nothing matches "' + esc(v) + '" yet. Try a service, a product name or a topic like "SAP".</li>';
        if (s) { dym.hidden = false; dym.innerHTML = 'Did you mean <button type="button" data-dym-go>' + esc(s) + '</button>?'; }
        hits = []; return;
      }
      var html = '', last = '';
      found.forEach(function (h, i) {
        var d = h.x.d;
        if (d.type !== last) { html += '<li class="search__group" role="presentation">' + esc(PLURAL[d.type] || d.type) + '</li>'; last = d.type; }
        html += '<li role="presentation"><a class="hit" role="option" aria-selected="false" id="hit-' + i + '" href="' + esc(ROOT + d.url) + '" data-hit><span><span class="hit__title">' + mark(d.title, ws) + '</span><span class="hit__text">' + esc(d.text) + '</span></span><svg aria-hidden="true"><use href="#i-chevr"/></svg></a></li>';
      });
      results.innerHTML = html;
      hits = $$('.hit', results);
    }
    function renderStart() {
      var rec = store('ns_recent') || [];
      $('[data-recent-wrap]').hidden = !rec.length;
      $('[data-recent]').innerHTML = rec.map(function (r) { return '<button type="button" data-q="' + esc(r) + '">' + esc(r) + '</button>'; }).join('');
      $('[data-popular]').innerHTML = (NS.POPULAR || []).map(function (r) { return '<button type="button" data-q="' + esc(r) + '">' + esc(r) + '</button>'; }).join('');
    }
    function remember(v) {
      v = v.trim(); if (!v) return;
      var rec = (store('ns_recent') || []).filter(function (r) { return r.toLowerCase() !== v.toLowerCase(); });
      rec.unshift(v); store('ns_recent', rec.slice(0, 5));
    }
    function go(a) { remember(q.value); var href = a.getAttribute('href'); closeLayer(true); location.href = href; }
    function setActive(i) {
      if (!hits.length) return;
      active = (i + hits.length) % hits.length;
      hits.forEach(function (h, k) { h.classList.toggle('is-active', k === active); h.setAttribute('aria-selected', String(k === active)); });
      q.setAttribute('aria-activedescendant', hits[active].id);
      hits[active].scrollIntoView({ block: 'nearest' });
    }
    function openSearch(v, opener) { q.value = v || ''; openLayer(searchEl, opener); render(); }
    q.addEventListener('input', render);
    q.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Enter') { e.preventDefault(); if (hits.length) go(hits[Math.max(active, 0)]); }
    });
    searchEl.addEventListener('click', function (e) {
      var c = e.target.closest('[data-q]'); if (c) { q.value = c.getAttribute('data-q'); render(); q.focus(); return; }
      if (e.target.closest('[data-dym-go]')) { q.value = e.target.textContent; render(); q.focus(); return; }
      var a = e.target.closest('[data-hit]'); if (a) { e.preventDefault(); go(a); }
    });
    $$('[data-open-search]').forEach(function (b) { b.addEventListener('click', function () { openSearch('', b); }); });
    $$('[data-pick]').forEach(function (b) { b.addEventListener('click', function () { openSearch(b.getAttribute('data-pick'), b); }); });
    doc.addEventListener('keydown', function (e) {
      var t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
      if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        if (openEl === searchEl) return;
        e.preventDefault(); openSearch('', $('[data-open-search]'));
      }
    });
  })();

  /* ==========================================================================
     Cookie choices: a compact card bottom left
     ========================================================================== */
  var cookie = $('#cookie');
  if (cookie) {
    var prefs = $('#cookiePrefs'), prefBtn = $('[data-ck-prefs]');
    var saved = store('ns_cookies');
    if (saved && saved.analytics) { var opt = $('[data-ck-opt]', cookie); if (opt) opt.checked = true; }
    function closeCookie(msg) {
      cookie.classList.add('is-gone');
      setTimeout(function () { root.classList.add('ck-set'); cookie.classList.remove('is-gone'); }, 360);
      toast(msg);
    }
    $$('[data-ck]', cookie).forEach(function (b) {
      b.addEventListener('click', function () {
        var all = b.getAttribute('data-ck') === 'all', opt = $('[data-ck-opt]', cookie);
        var analytics = all || (b.getAttribute('data-ck') === 'save' && opt && opt.checked);
        store('ns_cookies', { essential: true, analytics: !!analytics, at: Date.now() });
        closeCookie(analytics ? 'Cookie choices saved. Thanks.' : 'Only essential cookies are on.');
      });
    });
    if (prefBtn) prefBtn.addEventListener('click', function () {
      var open = prefs.hidden; prefs.hidden = !open; prefBtn.setAttribute('aria-expanded', String(open));
      $('[data-ck="save"]', cookie).hidden = !open;
    });
    $$('[data-ck-settings]').forEach(function (b) { b.addEventListener('click', function () { root.classList.remove('ck-set'); var f = $('button', cookie); if (f) f.focus(); }); });
  }

  /* ==========================================================================
     Reveals, counters and words that light up as you read
     ========================================================================== */
  $$('[data-fade]').forEach(function (el) { onView(el, function () { el.classList.add('is-in'); }); });

  function countUp(el) {
    var raw = el.getAttribute('data-count') || el.textContent, m = raw.match(/-?[\d,]*\.?\d+/);
    if (!m || reduce) return;
    var numStr = m[0], target = parseFloat(numStr.replace(/,/g, '')), dec = (numStr.split('.')[1] || '').length, commas = numStr.indexOf(',') > -1;
    var pre = raw.slice(0, m.index), post = raw.slice(m.index + numStr.length), t0 = null, dur = 1500;
    function fmt(v) { var s = v.toFixed(dec); if (commas) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ','); return pre + s + post; }
    el.textContent = fmt(0);
    function step(now) {
      if (!t0) t0 = now;
      var k = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - k, 4);
      el.textContent = fmt(target * e);
      if (k < 1) requestAnimationFrame(step); else el.textContent = raw;
    }
    requestAnimationFrame(step);
  }
  $$('[data-count]').forEach(function (el) { if (!el.getAttribute('data-count')) el.setAttribute('data-count', el.textContent); onView(el, function () { countUp(el); }, '0px 0px -8% 0px'); });

  function splitWords(el) {
    var out = [];
    function walk(node, c) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = doc.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(doc.createTextNode(part)); return; }
            var s = doc.createElement('span'); s.className = 'w' + (c ? ' w--c' : ''); s.textContent = part; frag.appendChild(s); out.push(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n, c || n.classList.contains('c'));
      });
    }
    walk(el, false);
    return out;
  }
  var wordBlocks = $$('[data-words]').map(function (el) { return { el: el, w: splitWords(el), lit: -1 }; });

  /* ==========================================================================
     One scroll loop for everything that follows the scroll.
     Reads happen first, then writes, so the page never measures twice.
     ========================================================================== */
  var tasks = [], ticking = false, vh = window.innerHeight;
  function tick() {
    ticking = false;
    var reads = tasks.map(function (t) { return t.read(); });
    tasks.forEach(function (t, i) { t.write(reads[i]); });
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', function () { vh = window.innerHeight; request(); });

  if (!reduce) wordBlocks.forEach(function (b) {
    tasks.push({
      read: function () { var r = b.el.getBoundingClientRect(); return clamp((vh * .86 - r.top) / (r.height + vh * .38), 0, 1); },
      write: function (p) {
        var n = Math.round(p * b.w.length * 1.08); if (n === b.lit) return; b.lit = n;
        b.w.forEach(function (s, i) { s.classList.toggle('is-lit', i < n); });
      }
    });
  });

  $$('[data-zoom]').forEach(function (el) {
    if (reduce) return;
    tasks.push({
      read: function () { var r = el.getBoundingClientRect(); return clamp((vh - r.top) / (vh * .85), 0, 1); },
      write: function (z) { el.style.setProperty('--z', z.toFixed(3)); }
    });
  });

  var progress = $('[data-progress]'), totop = $('[data-totop]');
  if (progress || totop) tasks.push({
    read: function () { var h = doc.documentElement.scrollHeight - vh; return { y: window.scrollY, p: h > 0 ? clamp(window.scrollY / h, 0, 1) : 0 }; },
    write: function (s) {
      if (progress) progress.style.setProperty('--rp', s.p.toFixed(4));
      if (totop) { totop.classList.toggle('is-on', s.y > vh * 1.4); totop.style.setProperty('--sp', s.p.toFixed(4)); }
    }
  });
  if (totop) totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); var f = $('.skip'); if (f) f.focus({ preventScroll: true }); });

  /* pause the glass and light animations in sections that are off screen */
  if ('IntersectionObserver' in window) {
    var offIO = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) e.target.removeAttribute('data-off'); else e.target.setAttribute('data-off', ''); });
    }, { rootMargin: '120px 0px' });
    $$('main > section, .ft').forEach(function (s) { offIO.observe(s); });
  }

  /* local nav: highlight the section you are reading */
  var lnLinks = $$('.ln__links a[href^="#"]');
  if (lnLinks.length && 'IntersectionObserver' in window) {
    var lnIO = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        lnLinks.forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    lnLinks.forEach(function (a) { var t = doc.getElementById(a.getAttribute('href').slice(1)); if (t) lnIO.observe(t); });
  }

  /* ==========================================================================
     Home hero: the crystal core with six glass bubbles on a calm orbit.
     While you scroll through the scene, the copy lifts away, the crystal
     grows and the bubbles drift outward and fade. Tap a bubble to open
     that service.
     ========================================================================== */
  var scene = $('[data-scene]');
  if (scene) (function () {
    var pin = $('.scene__pin', scene), copy = $('.hero__copy', scene), inner = $('.stage__inner', scene), mark = $('.core__mark', scene), coreEl = $('.core', scene);
    var bubbles = $$('.bubble', scene), svg = $('.synapses', scene), canvas = $('[data-fizz]', scene);
    var POS = [[-.98, -.3], [-.66, .55], [-.3, 1], [.32, 1], [.68, .52], [.98, -.28]];
    var W = 0, H = 0, RX = 0, RY = 0, coreR = 100, bs = 118, p = 0, visible = true, raf = 0, lines = [], fizz = [], ctx = null, sprite = null, last = 0, sizes = [1.1, 1, .94, 1.04, .92, 1];
    var mouseRelX = 0, mouseRelY = 0, rotX = 0, rotY = 0;
    if (pin) {
      pin.addEventListener('pointermove', function (e) {
        var rect = pin.getBoundingClientRect();
        mouseRelX = (e.clientX - rect.left) / rect.width - 0.5;
        mouseRelY = (e.clientY - rect.top) / rect.height - 0.5;
      }, { passive: true });
      pin.addEventListener('pointerleave', function () {
        mouseRelX = 0; mouseRelY = 0;
      });
    }
    bubbles.forEach(function (b, i) {
      b.style.setProperty('--k', sizes[i % 6]); b.style.setProperty('--fd', (-i * 1.7) + 's');
      var base = doc.createElementNS('http://www.w3.org/2000/svg', 'line'), pulse = doc.createElementNS('http://www.w3.org/2000/svg', 'line');
      pulse.setAttribute('class', 'pulse'); pulse.style.animationDelay = (-i * .43) + 's';
      svg.appendChild(base); svg.appendChild(pulse); lines.push([base, pulse]);
    });
    function measure() {
      W = pin.clientWidth; H = pin.clientHeight;
      var narrow = W < 640, copyBottom = copy.offsetTop + copy.offsetHeight, avail = Math.max(H - copyBottom, 220);
      bs = narrow ? 76 : clamp(avail * .3, 84, W < 1024 ? 100 : 118);
      var core = clamp(avail * .46, narrow ? 120 : 150, narrow ? 172 : 260);
      coreR = core / 2;
      RX = narrow ? Math.min(W / 2 - bs * .55 - 10, 160) : Math.min(W * .32, 470);
      RY = clamp(avail * .36, coreR + 14, 190);
      var cy = copyBottom + avail * .5 + (narrow ? 6 : 0);
      if (cy + RY * 1.04 + bs * .58 > H - 14) cy = H - 14 - RY * 1.04 - bs * .58;
      scene.style.setProperty('--cy', cy.toFixed(1) + 'px');
      scene.style.setProperty('--core', core.toFixed(1) + 'px');
      scene.style.setProperty('--glow-y', ((cy / H) * 100).toFixed(1) + '%');
      bubbles.forEach(function (b) { b.style.setProperty('--s', bs.toFixed(1) + 'px'); });
      if (canvas) sizeCanvas();
      place(performance.now());
    }
    function place(t) {
      var spread = 1 + p * .8;
      bubbles.forEach(function (b, i) {
        var u = POS[i % 6], sx = reduce ? 0 : Math.sin(t * .00035 + i * 1.9) * .025, sy = reduce ? 0 : Math.sin(t * .0009 + i * 1.3) * .05;
        var x = (u[0] + sx) * RX * spread, y = (u[1] + sy) * RY * spread;
        b.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
        var d = Math.sqrt(x * x + y * y) || 1, ux = x / d, uy = y / d, br = bs * sizes[i % 6] / 2;
        var x1 = (ux * coreR).toFixed(1), y1 = (uy * coreR).toFixed(1), x2 = (x - ux * br).toFixed(1), y2 = (y - uy * br).toFixed(1);
        lines[i].forEach(function (l) { l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2); });
      });
      if (!reduce) {
        rotX += (-mouseRelY * 24 - rotX) * 0.1;
        rotY += (mouseRelX * 24 - rotY) * 0.1;
      }
      if (coreEl) {
        coreEl.style.transform = 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg)';
      }
      if (mark) {
        mark.style.transform = 'translate(-50%,-50%) translateZ(32px) rotate(' + (p * 70 + (reduce ? 0 : Math.sin(t * .0004) * 4)).toFixed(2) + 'deg)';
      }
    }

    /* the sea of tiny rising bubbles, drawn from one cached sprite */
    function makeSprite() {
      var c = doc.createElement('canvas'); c.width = c.height = 64; var g = c.getContext('2d');
      var rg = g.createRadialGradient(32, 32, 18, 32, 32, 31);
      rg.addColorStop(0, 'rgba(120,200,255,0)'); rg.addColorStop(.8, 'rgba(150,215,255,.16)'); rg.addColorStop(1, 'rgba(210,240,255,.55)');
      g.fillStyle = rg; g.beginPath(); g.arc(32, 32, 31, 0, Math.PI * 2); g.fill();
      g.fillStyle = 'rgba(255,255,255,.85)'; g.beginPath(); g.arc(22, 21, 4.5, 0, Math.PI * 2); g.fill();
      return c;
    }
    function seed(top) { return { x: Math.random() * W, y: top ? Math.random() * H : H + 20, r: 1.5 + Math.pow(Math.random(), 2.2) * 7, v: 14 + Math.random() * 30, ph: Math.random() * 6.28, a: .35 + Math.random() * .5 }; }
    function sizeCanvas() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!sprite) sprite = makeSprite();
      var n = W < 640 ? 16 : 34;
      fizz = []; for (var i = 0; i < n; i++) fizz.push(seed(true));
      if (reduce) drawFizz(0, 0);
    }
    function drawFizz(t, dt) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < fizz.length; i++) {
        var f = fizz[i];
        f.y -= f.v * dt; if (f.y < -20) fizz[i] = f = seed(false);
        var x = f.x + Math.sin(t * .001 + f.ph) * 6, d = f.r * 2;
        ctx.globalAlpha = f.a * clamp((H - f.y) / 120, 0, 1); ctx.drawImage(sprite, x - f.r, f.y - f.r, d, d);
      }
      ctx.globalAlpha = 1;
    }
    function frame(t) {
      raf = 0;
      var dt = last ? Math.min((t - last) / 1000, .05) : 0; last = t;
      place(t); drawFizz(t, dt);
      if (visible && !doc.hidden) raf = requestAnimationFrame(frame);
    }
    function run() { if (!raf && !reduce && visible && !doc.hidden) { last = 0; raf = requestAnimationFrame(frame); } }

    if ('ResizeObserver' in window) new ResizeObserver(function () { measure(); }).observe(pin);
    else { window.addEventListener('resize', measure); measure(); }
    tasks.push({
      read: function () { var r = scene.getBoundingClientRect(); return clamp(-r.top / Math.max(r.height - H, 1), 0, 1); },
      write: function (v) { if (Math.abs(v - p) < .0005) return; p = v; scene.style.setProperty('--p', p.toFixed(4)); if (reduce || !raf) place(performance.now()); }
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) run(); }, { rootMargin: '80px' }).observe(pin);
    doc.addEventListener('visibilitychange', run);
    requestAnimationFrame(function () { scene.classList.add('is-in'); run(); });
  })();

  /* ==========================================================================
     Galleries: sideways cards with round paddles
     ========================================================================== */
  $$('[data-gal]').forEach(function (gal) {
    var track = $('.gal__track', gal), prev = $('[data-prev]', gal), next = $('[data-next]', gal), pend = false;
    function stepSize() { var c = track.children[0]; return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 300; }
    function update() {
      pend = false;
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    }
    track.addEventListener('scroll', function () { if (!pend) { pend = true; requestAnimationFrame(update); } }, { passive: true });
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -stepSize(), behavior: reduce ? 'auto' : 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: stepSize(), behavior: reduce ? 'auto' : 'smooth' }); });
    if ('ResizeObserver' in window) new ResizeObserver(function () { requestAnimationFrame(update); }).observe(track); else update();
  });

  /* ==========================================================================
     Sticky story: the panel on the right follows the step you are reading
     ========================================================================== */
  $$('[data-story]').forEach(function (story) {
    var steps = $$('.story__step', story), panel = $('.story__panel', story); if (!panel) return;
    var ring = $('.story__ring', panel), num = $('.story__ring b', panel), list = $('.story__list', panel), check = $('[data-check]', panel), cur = -1;
    function show(i) {
      if (i === cur || i < 0 || i >= steps.length) return; cur = i;
      var s = steps[i];
      steps.forEach(function (o, k) {
        o.classList.toggle('is-on', k === i);
        o.style.opacity = k === i ? '1' : '0.4';
        o.style.transform = k === i ? 'translateX(8px)' : 'translateX(0)';
        o.style.transition = 'opacity .4s ease, transform .4s ease';
      });
      if (ring) ring.style.setProperty('--sp', ((i + 1) / steps.length).toFixed(3));
      if (num) num.textContent = (i + 1) + '/' + steps.length;
      if (list) {
        list.innerHTML = $$('.story__mini li', s).map(function (li, idx) {
          return '<li style="animation: swapin .4s ease both; animation-delay: ' + (idx * 0.06) + 's">' + esc(li.textContent) + '</li>';
        }).join('');
      }
      if (check) check.textContent = s.getAttribute('data-check') || '';
      panel.classList.remove('is-swap');
      void panel.offsetWidth;
      panel.classList.add('is-swap');
    }
    show(0);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (e.isIntersecting) {
            var idx = steps.indexOf(e.target);
            if (idx !== -1) show(idx);
          }
        });
      }, { rootMargin: '-30% 0px -30% 0px' });
      steps.forEach(function (s) { io.observe(s); });
    }
  });

  /* ==========================================================================
     Product readouts type themselves out once
     ========================================================================== */
  $$('[data-term]').forEach(function (term) {
    var linesEls = $$('[data-type]', term);
    onView(term, function () {
      if (reduce) { linesEls.forEach(function (l) { l.classList.add('is-typed'); }); return; }
      var i = 0;
      (function nextLine() {
        var l = linesEls[i++]; if (!l) return;
        var full = l.textContent, k = 0; l.textContent = ''; l.classList.add('is-typed');
        (function type() { l.textContent = full.slice(0, ++k); if (k < full.length) setTimeout(type, 16); else setTimeout(nextLine, 220); })();
      })();
    });
  });

  /* ==========================================================================
     Scope estimator: same options and team logic as the live estimator
     ========================================================================== */
  var est = $('[data-estimator]');
  if (est) (function () {
    var brief = $('[data-brief]'), S = NS.SYSTEMS || {}, E = NS.ENVS || {}, C = NS.CADENCE || {};
    function val(n) { var c = $('input[name="' + n + '"]:checked', est); return c ? c.value : ''; }
    function update(animate) {
      var s = S[val('sys')], e = E[val('env')], c = C[val('pace')]; if (!s || !e || !c) return;
      var team = s.team.slice(); if (val('sys') === 'ai' && val('env') === 'airgap') team[2] = '1 Air-Gap Security Specialist';
      $('[data-brief-title]', brief).textContent = s.title + ', ' + e.title.toLowerCase() + ', ' + c.title;
      $('[data-brief-team]', brief).innerHTML = team.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
      $('[data-brief-stack]', brief).innerHTML = s.stack.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
      $('[data-brief-pace]', brief).textContent = c.tier + ': ' + c.note.charAt(0).toLowerCase() + c.note.slice(1);
      var cta = $('[data-brief-cta]', brief); cta.href = ROOT + 'contact.html?focus=' + encodeURIComponent(s.focus);
      if (animate) fadeIn([$('[data-brief-title]', brief), $('[data-brief-team]', brief), $('[data-brief-stack]', brief), $('[data-brief-pace]', brief)]);
    }
    est.addEventListener('change', function () { update(true); });
    update(false);
  })();

  /* ==========================================================================
     Questions: one at a time, with a smooth open
     ========================================================================== */
  $$('.qa__q').forEach(function (b) {
    b.addEventListener('click', function () {
      var qa = b.closest('.qa'), open = !qa.classList.contains('is-open');
      qa.classList.toggle('is-open', open); b.setAttribute('aria-expanded', String(open));
    });
  });

  /* ==========================================================================
     Forms: friendly checks, then a small burst of bubbles on send.
     Front end only for the concept: nothing is sent anywhere yet.
     ========================================================================== */
  function burst(x, y) {
    if (reduce) return;
    for (var i = 0; i < 12; i++) {
      var b = doc.createElement('i'), s = 8 + Math.random() * 22, a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 110;
      b.className = 'burst'; b.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (x - s / 2) + 'px;top:' + (y - s / 2) + 'px';
      body.appendChild(b);
      var anim = b.animate([{ transform: 'translate(0,0) scale(.3)', opacity: 1 }, { transform: 'translate(' + Math.cos(a) * d + 'px,' + (Math.sin(a) * d - 60) + 'px) scale(1)', opacity: 0 }], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.8,.2,1)' });
      anim.onfinish = (function (el) { return function () { el.remove(); }; })(b);
    }
  }
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  $$('[data-form]').forEach(function (form) {
    var msg = $('.form__msg', form), done = form.parentNode.querySelector('[data-done]');
    var params = new URLSearchParams(location.search), focus = params.get('focus'), sel = $('select[name="focus"]', form);
    if (focus && sel) $$('option', sel).forEach(function (o) { if (o.value === focus || o.textContent === focus) sel.value = o.value; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = [];
      $$('[required]', form).forEach(function (f) {
        var v = (f.value || '').trim(), ok = f.type === 'email' ? EMAIL.test(v) : !!v;
        if (f.type === 'hidden') ok = +v > 0;
        var wrap = f.closest('.field'); if (wrap) wrap.classList.toggle('is-bad', !ok);
        f.setAttribute('aria-invalid', String(!ok));
        if (!ok) bad.push(f);
      });
      if (bad.length) {
        msg.className = 'form__msg is-bad';
        msg.textContent = bad.length === 1 ? 'One thing is missing: ' + (bad[0].getAttribute('data-name') || 'a field') + '.' : 'A few fields need a look: ' + bad.map(function (f) { return f.getAttribute('data-name'); }).join(', ') + '.';
        var first = bad[0].type === 'hidden' ? $('.stars button', form) : bad[0]; if (first) first.focus();
        return;
      }
      var btn = $('[type="submit"]', form), r = btn.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2);
      setTimeout(function () {
        form.hidden = true; if (done) { done.hidden = false; done.setAttribute('tabindex', '-1'); done.focus(); }
      }, reduce ? 0 : 380);
    });
    form.addEventListener('input', function (e) { var w = e.target.closest('.field'); if (w && w.classList.contains('is-bad')) { w.classList.remove('is-bad'); e.target.removeAttribute('aria-invalid'); } });
    if (done) $$('[data-again]', done).forEach(function (b) { b.addEventListener('click', function () { form.reset(); $$('.stars button', form).forEach(function (s) { s.classList.remove('is-on'); s.setAttribute('aria-pressed', 'false'); }); msg.textContent = ''; done.hidden = true; form.hidden = false; var f = $('input, select, textarea', form); if (f) f.focus(); }); });
  });
  $$('[data-stars]').forEach(function (wrap) {
    var input = $('input[type="hidden"]', wrap.closest('.field')), btns = $$('button', wrap);
    function set(n) { input.value = n; btns.forEach(function (b, i) { b.classList.toggle('is-on', i < n); b.setAttribute('aria-pressed', String(i < n)); }); var f = wrap.closest('.field'); if (f) f.classList.remove('is-bad'); }
    btns.forEach(function (b, i) { b.addEventListener('click', function () { set(i + 1); }); });
  });

  /* ==========================================================================
     Founder booking: duration, then date and time, then details
     ========================================================================== */
  var book = $('[data-booking]');
  if (book) (function () {
    var steps = $$('[data-bstep]', book), marks = $$('.booking__steps li', book), state = { dur: '', day: '', time: '' }, at = 0;
    var days = $('[data-days]', book), DN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], MN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date(), html = '', n = 0;
    while (n < 10) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0 || d.getDay() === 6) continue;
      var long = DN[d.getDay()] + ' ' + d.getDate() + ' ' + MN[d.getMonth()];
      html += '<button type="button" aria-pressed="false" data-day="' + long + '"><b>' + DN[d.getDay()].slice(0, 3) + '</b><small>' + d.getDate() + ' ' + MN[d.getMonth()].slice(0, 3) + '</small></button>';
      n++;
    }
    days.innerHTML = html;
    function go(i) {
      at = i;
      steps.forEach(function (s, k) { s.hidden = k !== i; });
      marks.forEach(function (m, k) { m.classList.toggle('is-on', k <= i); });
      if (i === 2) $('[data-bsum]', book).innerHTML = '<b>' + esc(state.dur) + '</b> on <b>' + esc(state.day) + '</b> at <b>' + esc(state.time) + '</b>';
      var f = $('button, input', steps[i]); if (f) f.focus();
      fadeIn([steps[i]]);
    }
    function sync() {
      $('[data-bnext="0"]', book).disabled = !state.dur;
      $('[data-bnext="1"]', book).disabled = !(state.day && state.time);
    }
    book.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || !book.contains(b)) return;
      var group = b.parentNode;
      if (b.hasAttribute('data-dur') || b.hasAttribute('data-day') || b.hasAttribute('data-time')) {
        $$('button', group).forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        if (b.hasAttribute('data-dur')) state.dur = b.getAttribute('data-dur');
        if (b.hasAttribute('data-day')) state.day = b.getAttribute('data-day');
        if (b.hasAttribute('data-time')) state.time = b.getAttribute('data-time');
        sync();
      }
      if (b.hasAttribute('data-bnext')) go(at + 1);
      if (b.hasAttribute('data-bback')) go(at - 1);
    });
    sync();
  })();

  /* ==========================================================================
     Filters: technology layers, research systems and papers
     ========================================================================== */
  $$('[data-filter]').forEach(function (wrap) {
    var chips = $$('[data-val]', wrap), items = $$(wrap.getAttribute('data-filter')), qIn = $('[data-filter-q]', wrap), empty = $(wrap.getAttribute('data-empty') || '[data-empty]'), cur = 'all';
    function apply() {
      var t = qIn ? qIn.value.trim().toLowerCase() : '', shown = 0;
      items.forEach(function (it) {
        var ok = (cur === 'all' || it.getAttribute('data-cat') === cur) && (!t || it.textContent.toLowerCase().indexOf(t) > -1);
        it.classList.toggle('is-filtered', !ok); if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
      fadeIn(items.filter(function (i) { return !i.classList.contains('is-filtered'); }).slice(0, 6));
    }
    chips.forEach(function (c) {
      c.addEventListener('click', function () { cur = c.getAttribute('data-val'); chips.forEach(function (o) { o.setAttribute('aria-pressed', String(o === c)); }); apply(); });
    });
    if (qIn) qIn.addEventListener('input', apply);
    if (empty) $$('[data-reset]', empty).forEach(function (b) { b.addEventListener('click', function () { cur = 'all'; if (qIn) qIn.value = ''; chips.forEach(function (o) { o.setAttribute('aria-pressed', String(o.getAttribute('data-val') === 'all')); }); apply(); }); });
  });

  /* ==========================================================================
     Papers: the contents list follows the heading you are reading
     ========================================================================== */
  var toc = $$('[data-toc] a');
  if (toc.length && 'IntersectionObserver' in window) {
    var heads = toc.map(function (a) { return doc.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
    var tocIO = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        toc.forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-10% 0px -75% 0px' });
    heads.forEach(function (h) { tocIO.observe(h); });
  }

  /* ==========================================================================
     Palette preview switcher: Ion Cyan (Signature) vs Glacial Light
     ========================================================================== */
  function initTheme() {
    var saved = localStorage.getItem('ns_palette');
    if (!saved || saved === 'cobalt') saved = 'ion-cyan';
    function applyTheme(name) {
      root.setAttribute('data-theme', name);
      try { localStorage.setItem('ns_palette', name); } catch (e) {}
      var btns = $$('.palette-btn');
      btns.forEach(function (b) {
        b.classList.toggle('is-active', b.getAttribute('data-set-theme') === name);
      });
    }
    applyTheme(saved);

    // Theme switcher UI removed per request - apply signature theme directly
    applyTheme(saved);
  }

  /* ==========================================================================
     Precision Cursor Animation (Ion Cyan fluid trailing reticle)
     ========================================================================== */
  function initCursor() { return; // custom cursor disabled
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
    var dot = doc.createElement('div');
    dot.className = 'cur-dot';
    var ring = doc.createElement('div');
    ring.className = 'cur-ring';
    doc.body.appendChild(dot);
    doc.body.appendChild(ring);

    var mouseX = -100, mouseY = -100;
    var ringX = -100, ringY = -100;

    window.addEventListener('pointermove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      doc.body.classList.remove('cur-hidden');
      dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';
    }, { passive: true });

    window.addEventListener('mouseout', function (e) {
      if (!e.relatedTarget && !e.toElement) {
        doc.body.classList.add('cur-hidden');
      }
    });

    window.addEventListener('mousedown', function () {
      doc.body.classList.add('cur-down');
    });
    window.addEventListener('mouseup', function () {
      doc.body.classList.remove('cur-down');
    });

    var interactSelector = 'a, button, input, select, textarea, label, [role="button"], .bubble, .dcard, .paper, .choice, .paddle';
    doc.addEventListener('mouseover', function (e) {
      if (e.target && e.target.closest && e.target.closest(interactSelector)) {
        doc.body.classList.add('cur-hover');
      }
    });
    doc.addEventListener('mouseout', function (e) {
      if (e.target && e.target.closest && e.target.closest(interactSelector)) {
        doc.body.classList.remove('cur-hover');
      }
    });

    function render() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = 'translate(' + ringX + 'px, ' + ringY + 'px) translate(-50%, -50%)';
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', function () {
      initTheme();
      initCursor();
    });
  } else {
    initTheme();
    initCursor();
  }

  request();
})();

/* ==========================================================================
/* ==========================================================================
   UNIVERSAL BACK NAVIGATION HANDLER
   ========================================================================== */
(function() {
  var isNavigating = false;
  window.goBack = function(fallback) {
    if (isNavigating) return;
    isNavigating = true;
    var root = document.documentElement.getAttribute('data-root') || '';
    var defaultHome = root ? root + 'index.html' : 'index.html';
    var target = fallback || defaultHome;

    if (window.history.length > 1) {
      window.history.back();
      // Fallback if history.back() does not navigate within 350ms (e.g. single entry in tab)
      setTimeout(function() {
        if (window.location.href.indexOf(target) === -1) {
          window.location.href = target;
        }
        isNavigating = false;
      }, 400);
    } else {
      window.location.href = target;
      setTimeout(function() { isNavigating = false; }, 500);
    }
  };
})();
