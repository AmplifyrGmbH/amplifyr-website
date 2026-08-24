/* ============================================================
   KI-BERATER — geteilte Chat-Komponente (Chatbot vor FAQ/CTA)
   Genutzt von: index.html, it-solutions.html, webdesign.html.
   Parametrisiert ueber data-* Attribute am #ki-berater-Element:
   data-endpoint, data-firmenname, data-firmenprofil, data-branche
============================================================ */
(function () {
  var root = document.getElementById('ki-berater');
  if (!root) return;

  var CHECK_URL = root.dataset.endpoint;
  var SESSION_ID = (function () {
    var k = 'amp_sid', v = sessionStorage.getItem(k);
    if (!v) { v = 's-' + Math.random().toString(36).slice(2, 11); sessionStorage.setItem(k, v); }
    return v;
  })();
  var ctx = {
    firmenname: root.dataset.firmenname || '',
    firmenprofil: root.dataset.firmenprofil || '',
    branche: root.dataset.branche || undefined,
    inhaber_name: '',
    inhaber_namen: []
  };

  var thread = document.getElementById('kb-thread');
  var inp = document.getElementById('kb-inp');
  var send = document.getElementById('kb-send');
  var shell = document.getElementById('kb-shell');
  var chips = document.getElementById('kb-chips');
  var progress = document.getElementById('kb-progress');
  var progressFill = document.getElementById('kb-progress-fill');
  var progressLabel = document.getElementById('kb-progress-label');
  if (!thread || !inp || !send) return;

  var history = [];
  var busy = false;
  var MAX_CHARS = 80, PASSIVE = 8;

  /* Neugier-Balken: per IntersectionObserver einblenden */
  if ('IntersectionObserver' in window) {
    var ioP = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      ioP.disconnect();
      progress.style.opacity = '1';
      setTimeout(function () { progressFill.style.width = PASSIVE + '%'; }, 200);
    }, { threshold: .3 });
    ioP.observe(root);
  } else {
    progress.style.opacity = '1';
    progressFill.style.width = PASSIVE + '%';
  }

  function updateProgressBar(len) {
    if (len === 0) {
      progressFill.style.width = PASSIVE + '%';
      progressLabel.textContent = 'System bereit für Input …';
      progressLabel.style.color = 'var(--kb-muted)';
    } else {
      var pct = PASSIVE + Math.min(len / MAX_CHARS, 1) * (92 - PASSIVE);
      progressFill.style.width = pct.toFixed(1) + '%';
      progressLabel.textContent = pct >= 80 ? 'Genug für eine Analyse …' : 'Analyse wird vorbereitet …';
      progressLabel.style.color = 'var(--kb-brand)';
    }
  }

  function loadingProgress(on) {
    if (on) { progressFill.style.width = '92%'; progressLabel.textContent = 'Analysiere …'; progressLabel.style.color = 'var(--kb-brand)'; }
    else { progressFill.style.width = PASSIVE + '%'; progressLabel.textContent = 'System bereit für Input …'; progressLabel.style.color = 'var(--kb-muted)'; }
  }

  function showThread() {
    if (thread.style.display === 'flex') return;
    thread.style.display = 'flex';
  }

  function addUserMsg(text) {
    showThread();
    var d = document.createElement('div');
    d.style.cssText = 'display:flex;justify-content:flex-end';
    var b = document.createElement('div');
    b.className = 'kb-umsg';
    b.style.cssText = 'background:var(--kb-brand-dark);color:#fff;border-radius:14px 14px 4px 14px;padding:10px 16px;font-size:.9375rem;line-height:1.55;max-width:82%';
    b.textContent = text;
    d.appendChild(b); thread.appendChild(d);
  }

  function addTyping() {
    showThread();
    var d = document.createElement('div');
    d.className = 'kb-typing';
    d.innerHTML = '<span></span><span></span><span></span>';
    thread.appendChild(d);
    thread.scrollTop = thread.scrollHeight;
    return d;
  }

  function addAiMsg(data) {
    showThread();
    var d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:8px';
    var card = document.createElement('div');
    card.style.cssText = 'background:#fff;border:1px solid var(--kb-line);border-radius:14px 14px 14px 4px;padding:16px 18px;font-size:.9375rem;line-height:1.65;color:var(--kb-ink)';
    card.textContent = data.antwort || '';
    d.appendChild(card);
    thread.appendChild(d);
    thread.scrollTop = thread.scrollHeight;
  }

  function submit(text) {
    if (busy) return;
    text = (text || '').trim();
    if (!text) return;
    busy = true; send.disabled = true;
    inp.dataset.sent = '1';
    if (chips) chips.style.display = 'none';
    addUserMsg(text);
    inp.value = ''; inp.placeholder = ''; inp.style.height = 'auto';
    history.push({ role: 'user', content: text });
    loadingProgress(true);
    var typing = addTyping();
    fetch(CHECK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, messages: history, context: ctx, session_id: SESSION_ID }) })
      .then(function (r) {
        if (!r.ok || !r.body) throw new Error('network');
        var reader = r.body.getReader();
        var decoder = new TextDecoder();
        var buf = '';
        var card = null;
        var fullText = '';
        function read() {
          reader.read().then(function (chunk) {
            if (chunk.done) return;
            buf += decoder.decode(chunk.value, { stream: true });
            var parts = buf.split('\n\n');
            buf = parts.pop();
            parts.forEach(function (part) {
              if (!part.startsWith('data:')) return;
              try {
                var ev = JSON.parse(part.slice(5).trim());
                if (ev.t !== undefined) {
                  if (!card) {
                    typing.remove();
                    var wrap = document.createElement('div');
                    wrap.style.cssText = 'display:flex;flex-direction:column;gap:8px';
                    card = document.createElement('div');
                    card.style.cssText = 'background:#fff;border:1px solid var(--kb-line);border-radius:14px 14px 14px 4px;padding:16px 18px;font-size:.9375rem;line-height:1.65;color:var(--kb-ink)';
                    wrap.appendChild(card);
                    thread.appendChild(wrap);
                  }
                  fullText += ev.t;
                  card.textContent = fullText;
                  thread.scrollTop = thread.scrollHeight;
                } else if (ev.done) {
                  loadingProgress(false);
                  history.push({ role: 'assistant', content: ev.antwort || fullText });
                  busy = false; send.disabled = false;
                }
              } catch (e) {}
            });
            read();
          }).catch(function () {
            typing.remove();
            loadingProgress(false);
            addAiMsg({ antwort: 'Momentan nicht erreichbar — bitte gleich nochmal versuchen.' });
            busy = false; send.disabled = false;
          });
        }
        read();
      })
      .catch(function () {
        typing.remove();
        loadingProgress(false);
        addAiMsg({ antwort: 'Momentan nicht erreichbar — bitte gleich nochmal versuchen.' });
        busy = false; send.disabled = false;
      });
  }

  document.querySelectorAll('#ki-berater .kb-chip').forEach(function (c) {
    c.addEventListener('click', function () { submit(this.textContent); });
  });

  inp.addEventListener('input', function () {
    this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 140) + 'px';
    if (!busy) updateProgressBar(this.value.trim().length);
  });
  inp.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(inp.value); } });
  inp.addEventListener('focus', function () { shell.style.borderColor = 'var(--kb-brand)'; shell.style.boxShadow = '0 0 0 3px rgba(21,30,50,.08)'; });
  inp.addEventListener('blur', function () { shell.style.borderColor = 'var(--kb-line)'; shell.style.boxShadow = '0 4px 24px -8px rgba(21,30,50,.1)'; });
  send.addEventListener('click', function () { submit(inp.value); });

  /* Autoplay-Demo: tippt Beispiele solange kein Fokus — aus den Chips abgeleitet */
  (function () {
    var DEMOS = Array.prototype.map.call(root.querySelectorAll('.kb-chip'), function (b) { return b.textContent; });
    if (!DEMOS.length) return;
    var stopped = false, timers = [], demoIdx = 0;

    function later(fn, ms) {
      if (stopped) return;
      var t = setTimeout(function () { if (!stopped) fn(); }, ms);
      timers.push(t);
    }

    function stopDemo(clearFld) {
      if (stopped) return;
      stopped = true;
      timers.forEach(clearTimeout); timers = [];
      if (clearFld) { inp.value = ''; updateProgressBar(0); }
    }

    ['focus', 'click', 'keydown'].forEach(function (ev) {
      inp.addEventListener(ev, function () { stopDemo(true); }, { passive: true, once: false });
    });
    send.addEventListener('click', function () { stopDemo(false); }, { once: false });

    function typeText(text, done) {
      inp.value = '';
      var i = 0;
      function next() {
        if (stopped) return;
        if (i < text.length) {
          inp.value = text.slice(0, ++i);
          updateProgressBar(inp.value.trim().length);
          later(next, 20 + Math.random() * 18);
        } else { done(); }
      }
      later(next, 0);
    }

    function runDemo() {
      if (stopped) return;
      var text = DEMOS[demoIdx % DEMOS.length]; demoIdx++;
      typeText(text, function () {
        later(function () {
          if (stopped) return;
          inp.value = ''; updateProgressBar(0);
          later(runDemo, 600);
        }, 2200);
      });
    }

    if ('IntersectionObserver' in window && window.innerWidth > 640) {
      var ioAuto = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting || stopped) return;
        ioAuto.disconnect();
        later(runDemo, 800);
      }, { threshold: .25 });
      ioAuto.observe(root);
    }
  })();

  /* Typewriter placeholder — aus den mobilen Chips abgeleitet */
  (function () {
    var hints = Array.prototype.map.call(root.querySelectorAll('.kb-chip-mobile'), function (b) { return b.textContent; });
    if (!hints.length) hints = Array.prototype.map.call(root.querySelectorAll('.kb-chip'), function (b) { return b.textContent; });
    var el = inp;
    if (!el || !hints.length) return;
    var idx = 0, pos = 0, del = false, t;
    function tick() {
      if (el.dataset.sent || el.dataset.typed) { el.placeholder = ''; return; }
      var s = hints[idx];
      if (!del) { pos++; el.placeholder = s.slice(0, pos); if (pos >= s.length) { del = true; t = setTimeout(tick, 1800); return; } }
      else { pos--; el.placeholder = s.slice(0, pos); if (pos <= 0) { del = false; idx = (idx + 1) % hints.length; t = setTimeout(tick, 400); return; } }
      t = setTimeout(tick, del ? 28 : 58);
    }
    if (window.innerWidth <= 640) t = setTimeout(tick, 1000);
    el.addEventListener('focus', function () { clearTimeout(t); el.placeholder = ''; });
    el.addEventListener('input', function () { if (el.value) el.dataset.typed = '1'; });
    el.addEventListener('blur', function () { if (!el.value && !el.dataset.sent && !el.dataset.typed) { pos = 0; del = false; t = setTimeout(tick, 800); } });
  })();
})();
