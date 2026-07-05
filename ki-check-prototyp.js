/* ============================================================
   KI-CHECK — Script 1: CTA Entrance + Haupt-Logik
============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── CTA Entrance Animation ── */
  var ctaSection = document.getElementById('ki-check');
  if (ctaSection && window.IntersectionObserver) {
    if (!reduced) {
      ctaSection.classList.add('cta-init');
    }

    var SEQ = [
      { sel: '.final-check-h2',                              delay: 100  },
      { sel: '#fc-shell',                                    delay: 350  },
      { sel: '.fc-input-spark',                              delay: 650  },
      { sel: '.fc-example-chips .fc-example-chip:nth-child(1)', delay: 700  },
      { sel: '.fc-example-chips .fc-example-chip:nth-child(2)', delay: 790  },
      { sel: '.fc-example-chips .fc-example-chip:nth-child(3)', delay: 880  },
      { sel: '#fc-btn-1',                                    delay: 970  },
      { sel: '.final-check-slogan',                          delay: 1350 }
    ];

    var ioEntry = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      ioEntry.disconnect();
      if (reduced) return;
      SEQ.forEach(function (item) {
        var el = ctaSection.querySelector(item.sel);
        if (!el) return;
        setTimeout(function () {
          requestAnimationFrame(function () { el.classList.add('cta-in'); });
        }, item.delay);
      });
    }, { threshold: 0.15 });
    ioEntry.observe(ctaSection);
  }

  /* ── Scroll-Snap ── */
  var fcSnapBlocked = false;
  if (ctaSection && window.IntersectionObserver) {
    var snapObserver = new IntersectionObserver(function (entries) {
      var entry = entries[0];
      if (!entry.isIntersecting) return;
      if (fcSnapBlocked) return;
      if (ctaSection.classList.contains('fc-submitted')) return;
      if (entry.boundingClientRect.top < 0) return;
      fcSnapBlocked = true;
      var hdr  = document.getElementById('site-header');
      var hdrH = hdr ? hdr.getBoundingClientRect().height : 60;
      var top  = window.scrollY + ctaSection.getBoundingClientRect().top - hdrH;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      setTimeout(function () { fcSnapBlocked = false; }, 1400);
    }, { threshold: 0.18 });
    snapObserver.observe(ctaSection);
  }

  /* ── Thinking-Text Rotation ── */
  var THINKING_MSGS = [
    'Analysiere Engpässe …',
    'Vergleiche mit Best Practices …',
    'Erkenne Muster …',
    'Bereite Einschätzung vor …'
  ];
  var thinkingMsgIdx   = 0;
  var thinkingMsgTimer = null;

  function startThinkingText() {
    var textEl = document.querySelector('#fc-thinking .fc-thinking-text');
    if (!textEl) return;
    thinkingMsgIdx = 0;
    textEl.textContent = THINKING_MSGS[0];
    clearInterval(thinkingMsgTimer);
    thinkingMsgTimer = setInterval(function () {
      thinkingMsgIdx = (thinkingMsgIdx + 1) % THINKING_MSGS.length;
      textEl.style.opacity = '0';
      setTimeout(function () {
        textEl.textContent = THINKING_MSGS[thinkingMsgIdx];
        textEl.style.opacity = '1';
      }, 300);
    }, 1400);
  }

  function stopThinkingText() {
    clearInterval(thinkingMsgTimer);
    var textEl = document.querySelector('#fc-thinking .fc-thinking-text');
    if (textEl) textEl.style.opacity = '1';
  }

  window.startThinkingText = startThinkingText;
  window.stopThinkingText  = stopThinkingText;

  /* ── Submit: Dreigestufte Analyse ── */
  var input1    = document.getElementById('fc-input-1');
  var btn1      = document.getElementById('fc-btn-1');
  var phEl      = document.getElementById('fc-ph');
  var resultEl  = document.getElementById('fc-result');
  var thinkEl   = document.getElementById('fc-thinking');
  var minEl     = document.getElementById('fc-minimal');
  var shortEl   = document.getElementById('fc-short');
  var fullEl    = document.getElementById('fc-full');
  var scoreEl   = document.getElementById('fc-score');
  var leadEl    = document.getElementById('fc-lead');
  var leadBtn   = document.getElementById('fc-lead-btn');
  var leadEmail = document.getElementById('fc-lead-email');
  var leadSucc  = document.getElementById('fc-lead-success');

  function fcShowScore(val, claudeScore) {
    if (!scoreEl) return;
    var score = (typeof claudeScore === 'number') ? claudeScore : 68;
    scoreEl.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var inner = scoreEl.querySelector('.fc-score-inner');
        if (inner) inner.classList.add('fc-in');
      });
    });
    var valEl  = document.getElementById('fc-score-value');
    var ringEl = document.getElementById('fc-score-ring-fill');
    var current = 0;
    var step = score / 60;
    var circumference = 201;
    var timer = setInterval(function () {
      current = Math.min(current + step, score);
      if (valEl) valEl.textContent = Math.round(current);
      if (ringEl) {
        var offset = circumference - (current / 100) * circumference;
        ringEl.style.strokeDashoffset = offset.toFixed(1);
      }
      if (current >= score) clearInterval(timer);
    }, 20);
  }

  function fcShowLead() {
    if (!leadEl) return;
    leadEl.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var inner = leadEl.querySelector('.fc-lead-inner');
        if (inner) inner.classList.add('fc-in');
      });
    });
  }

  if (leadBtn) {
    leadBtn.addEventListener('click', function () {
      var email = leadEmail ? leadEmail.value.trim() : '';
      if (!email || !email.includes('@')) {
        if (leadEmail) { leadEmail.focus(); leadEmail.style.borderColor = 'rgba(255,100,100,0.6)'; }
        return;
      }
      leadBtn.disabled = true;
      var leadInnerEl = leadEl.querySelector('.fc-lead-inner');
      if (leadInnerEl) leadInnerEl.style.display = 'none';
      if (leadSucc) leadSucc.setAttribute('aria-hidden', 'false');

      var eingabe    = (document.getElementById('fc-res-input')       || {}).textContent || '';
      var einschaetz = (document.getElementById('fc-res-assessment')  || {}).textContent || '';
      var stocktEl   = document.getElementById('fc-res-bottlenecks');
      var stockt     = stocktEl ? Array.from(stocktEl.querySelectorAll('li')).map(function(li){ return '- ' + li.textContent; }).join('\n') : '';
      var kostenEl   = document.getElementById('fc-res-potential-desc');
      var kosten     = kostenEl ? kostenEl.textContent : '';

      var msg = 'Eingabe: ' + eingabe
        + '\n\nErste Einschätzung:\n' + einschaetz
        + '\n\nWo es stockt:\n' + stockt
        + '\n\nWas das wirklich kostet:\n' + kosten
        + '\n\nE-Mail: ' + email;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '1f1c6035-3bd1-4011-89ec-68c781a2ac8a',
          email:       email,
          from_name:   'Amplifyr KI-Check (Prototyp)',
          subject:     'Neue KI-Check Anfrage — ' + eingabe,
          message:     msg
        })
      }).catch(function () {});
    });
    if (leadEmail) {
      leadEmail.addEventListener('input', function () { leadEmail.style.borderColor = ''; });
    }
  }

  var FC_MINI = {
    offert:   { text: 'Langsame Offerten entstehen häufig nicht durch eine einzelne Person, sondern durch fehlende Vorlagen, manuelle Datenerfassung oder Freigaben.', causes: ['Keine einheitlichen Vorlagen', 'Manuelle Datenerfassung', 'Lange Freigabewege'], question: 'Was bremst bei Ihnen am meisten?', choices: ['Datenerfassung', 'Freigaben', 'Vorlagen', 'Anderes'] },
    email:    { text: 'Zu viele E-Mails sind meist ein Symptom fehlender Prozessstruktur — Informationen landen im Postfach, weil kein System sie weiterleitet.', causes: ['Fehlende automatische Weiterleitung', 'Unklare Zuständigkeiten', 'Keine zentrale Wissensbasis'], question: 'Worum geht es hauptsächlich?', choices: ['Interne Kommunikation', 'Kundenanfragen', 'Aufgabenverteilung', 'Anderes'] },
    manuell:  { text: 'Manuelle Prozesse verursachen nicht nur Zeitverlust, sondern auch Fehler — besonders wenn Daten mehrfach erfasst werden.', causes: ['Mehrfache Dateneingabe', 'Fehlende Automatisierung', 'Papierbasierte Abläufe'], question: 'Welcher Bereich kostet am meisten?', choices: ['Dateneingabe', 'Berichterstattung', 'Kundenanfragen', 'Anderes'] },
    freigabe: { text: 'Lange Freigabewege entstehen meist durch fehlende digitale Prozesse oder unklare Zuständigkeiten.', causes: ['Zu viele Hierarchieebenen', 'Keine digitale Freigabestrecke', 'Unklare Zuständigkeiten'], question: 'Was verursacht die Verzögerung?', choices: ['Hierarchie', 'Fehlende Digitalisierung', 'Zuständigkeiten', 'Anderes'] },
    daten:    { text: 'Mehrfache Datenerfassung ist einer der häufigsten Zeitfresser — oft durch fehlende Systemintegration verursacht.', causes: ['Systeme kommunizieren nicht', 'Doppelte manuelle Eingabe', 'Fehlende zentrale Datenquelle'], question: 'Wo entsteht die Mehrfacherfassung?', choices: ['Zwischen Abteilungen', 'Verschiedene Software', 'Papier zu Digital', 'Anderes'] },
    system:   { text: 'Nicht verbundene Systeme erzeugen doppelte Arbeit — Daten werden manuell übertragen, Fehler entstehen.', causes: ['Keine Systemintegration', 'Manuelle Datenübertragung', 'Zu viele Insellösungen'], question: 'Was ist das Hauptproblem?', choices: ['Systeme verbinden', 'Daten aktuell halten', 'Weniger Tools', 'Anderes'] },
    generic:  { text: 'Zeitverluste entstehen oft dort, wo Prozesse manuell ablaufen oder Systeme nicht miteinander verbunden sind.', causes: ['Manuelle, wiederholbare Abläufe', 'Fehlende Systemverbindungen', 'Unklare Prozessverantwortung'], question: 'In welchem Bereich liegt die grösste Belastung?', choices: ['Administration', 'Kundenkommunikation', 'Interne Abläufe', 'Anderes'] }
  };

  function fcGetContext(val) {
    var l = val.toLowerCase();
    if (/offert|angebot/.test(l))              return 'offert';
    if (/e.?mail|postfach|inbox/.test(l))      return 'email';
    if (/manuell|von hand/.test(l))            return 'manuell';
    if (/freigabe|genehmig/.test(l))           return 'freigabe';
    if (/daten|erfassung/.test(l))             return 'daten';
    if (/system|software|tool|plattform/.test(l)) return 'system';
    return 'generic';
  }

  function fcTier(val) {
    var len = val.length;
    if (len < 3)   return 1;
    if (len < 120) return 2;
    return 3;
  }

  function fcScrollToSection() {
    var section = document.getElementById('ki-check');
    var hdr     = document.getElementById('site-header');
    if (!section) return;
    setTimeout(function () {
      var hdrH = hdr ? hdr.getBoundingClientRect().height : 60;
      var top  = window.scrollY + section.getBoundingClientRect().top - hdrH;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }, 60);
  }

  function fcReveal() {
    stopThinkingText();
    if (thinkEl) thinkEl.classList.remove('fc-active');
    if (btn1) btn1.disabled = false;
    resultEl.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var inner = resultEl.querySelector('.fc-result-inner');
        if (inner) inner.classList.add('fc-in');
      });
    });
  }

  function fcRenderChoices(containerId, labels, onClickFn) {
    var el = document.getElementById(containerId);
    el.innerHTML = '';
    labels.forEach(function (label) {
      var b = document.createElement('button');
      b.className = 'fc-choice-btn';
      b.textContent = label;
      b.addEventListener('click', function () {
        el.querySelectorAll('.fc-choice-btn').forEach(function (x) { x.disabled = true; });
        onClickFn(label);
      });
      el.appendChild(b);
    });
  }

  function fcShowMinimal() {
    fcRenderChoices('fc-min-choices', ['Prozess', 'Tool', 'Wiederkehrende Aufgabe'], function (choice) {
      if (thinkEl) thinkEl.classList.add('fc-active');
      minEl.style.display = 'none';
      setTimeout(function () { fcShowMini(choice); }, 750);
    });
    minEl.style.display   = 'block';
    shortEl.style.display = 'none';
    fullEl.style.display  = 'none';
    fcReveal();
  }

  function fcShowMini(val) {
    var ctx  = fcGetContext(val);
    var data = FC_MINI[ctx] || FC_MINI.generic;
    document.getElementById('fc-short-text').textContent = data.text;
    document.getElementById('fc-short-question').textContent = data.question;
    var causesEl = document.getElementById('fc-short-causes');
    causesEl.innerHTML = '';
    data.causes.forEach(function (t) {
      var li = document.createElement('li'); li.textContent = t; causesEl.appendChild(li);
    });
    fcRenderChoices('fc-choices', data.choices, function () {
      if (thinkEl) thinkEl.classList.add('fc-active');
      shortEl.style.display = 'none';
      setTimeout(function () { fcShowFull(val); }, 900);
    });
    minEl.style.display   = 'none';
    shortEl.style.display = 'block';
    fullEl.style.display  = 'none';
    fcReveal();
  }

  function fcShowFull(val) {
    document.getElementById('fc-res-input').textContent = val;
    document.getElementById('fc-res-assessment').textContent =
      'Auf Basis Ihrer Beschreibung zeigt sich ein typisches Muster: Zeitverluste entstehen häufig durch nicht verknüpfte Systeme und manuelle Übergaben zwischen Teams. Gezielte KI-Unterstützung kann hier spürbar entlasten.';

    [
      ['fc-res-bottlenecks', ['Fehlende Automatisierung bei wiederkehrenden Abläufen', 'Manuelle Dateneingabe und mehrfache Erfassung', 'Lange Freigabe- und Abstimmungswege', 'Informationssilos zwischen Abteilungen']],
      ['fc-res-steps',       ['Prozessaufnahme: Welche Abläufe kosten täglich am meisten Zeit?', 'Quick Wins identifizieren: Wo lässt sich sofort automatisieren?', 'Pilot starten: Einen Kernprozess als Proof of Concept umsetzen']]
    ].forEach(function (pair) {
      var el = document.getElementById(pair[0]);
      el.innerHTML = '';
      pair[1].forEach(function (t) { var li = document.createElement('li'); li.textContent = t; el.appendChild(li); });
    });

    document.getElementById('fc-res-potential').textContent = 'Signifikantes Automatisierungspotenzial';
    document.getElementById('fc-res-potential-desc').textContent =
      'Betriebe in vergleichbaren Situationen konnten durch gezielte KI-Integration erhebliche Kapazitäten freisetzen.';

    minEl.style.display   = 'none';
    shortEl.style.display = 'none';
    fullEl.style.display  = 'block';
    fcReveal();
    setTimeout(function () { fcShowScore(val); }, 700);
    setTimeout(fcShowLead, 1800);
  }

  if (btn1 && input1 && resultEl) {
    function fcShowInvalid(msg) {
      document.getElementById('fc-min-text').textContent = msg;
      document.getElementById('fc-min-choices').innerHTML = '';
      minEl.style.display   = 'block';
      shortEl.style.display = 'none';
      fullEl.style.display  = 'none';
      fcReveal();
      btn1.disabled = false;
    }

    function fcShowFallback(val) {
      document.getElementById('fc-res-input').textContent = val;
      document.getElementById('fc-res-assessment').textContent =
        'Zeitverluste entstehen oft dort, wo Prozesse manuell ablaufen oder Systeme nicht miteinander verbunden sind.';
      var bottlenecksEl = document.getElementById('fc-res-bottlenecks');
      bottlenecksEl.innerHTML = '';
      ['Manuelle, wiederholbare Abläufe', 'Fehlende Systemverbindungen', 'Unklare Prozessverantwortung'].forEach(function (t) {
        var li = document.createElement('li'); li.textContent = t; bottlenecksEl.appendChild(li);
      });
      document.getElementById('fc-res-potential').textContent = '';
      document.getElementById('fc-res-potential-desc').textContent =
        'Die grössten Effizienzgewinne entstehen meist nicht durch neue Technologie, sondern durch klärende Fragen zu bestehenden Abläufen.';
      var stepsEl = document.getElementById('fc-res-steps');
      stepsEl.innerHTML = '';
      var li = document.createElement('li');
      li.textContent = 'Wo genau entsteht der Zeitverlust — im Prozess selbst oder an der Übergabe?';
      stepsEl.appendChild(li);
      minEl.style.display   = 'none';
      shortEl.style.display = 'none';
      fullEl.style.display  = 'block';
      fcReveal();
      setTimeout(function () { fcShowScore(val); }, 700);
      setTimeout(fcShowLead, 1800);
    }

    function fcSubmit() {
      var val = input1.value.trim();
      if (!val || btn1.disabled) return;
      btn1.disabled = true;
      if (ctaSection) ctaSection.classList.add('fc-submitted');
      if (phEl) phEl.classList.add('ph-hidden');
      resultEl.setAttribute('aria-hidden', 'true');
      var resultInner = resultEl.querySelector('.fc-result-inner');
      if (resultInner) resultInner.classList.remove('fc-in');
      if (leadEl) {
        leadEl.setAttribute('aria-hidden', 'true');
        var leadInner = leadEl.querySelector('.fc-lead-inner');
        if (leadInner) leadInner.classList.remove('fc-in');
      }
      if (thinkEl) thinkEl.classList.add('fc-active');
      startThinkingText();
      fcScrollToSection();

      var tier = fcTier(val);
      if (tier === 1) {
        setTimeout(function () { fcShowMinimal(); }, 2000);
      } else {
        var fc_controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var fc_timer = fc_controller ? setTimeout(function () { fc_controller.abort(); }, 25000) : null;

        fetch('ai-check.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: val }),
          signal: fc_controller ? fc_controller.signal : undefined
        })
        .then(function (res) {
          if (!res.ok || !res.body) throw new Error('error');
          var reader    = res.body.getReader();
          var decoder   = new TextDecoder();
          var sseBuffer = '';
          var assessEl  = document.getElementById('fc-res-assessment');
          var btEl      = document.getElementById('fc-res-bottlenecks');
          var uebEl     = document.getElementById('fc-res-potential-desc');
          var stepsEl   = document.getElementById('fc-res-steps');
          assessEl.textContent = ''; btEl.innerHTML = ''; uebEl.innerHTML = ''; stepsEl.innerHTML = '';

          var queue = [], targetEl = null, doneReceived = false;
          var drainTimer = setInterval(function () {
            if (queue.length === 0) return;
            var item = queue.shift();
            if (typeof item === 'string') { if (targetEl) targetEl.textContent += item; } else item();
          }, 4);

          var twState = 'pre_beob', escaped = false, mkIdx = 0, curMk = '"beobachtung":"', resultShown = false, uebUl = null;

          function showResult() {
            if (resultShown) return; resultShown = true;
            if (fc_timer) clearTimeout(fc_timer);
            queue.push(function () {
              if (thinkEl) thinkEl.classList.remove('fc-active');
              minEl.style.display = 'none'; shortEl.style.display = 'none';
              fullEl.style.display = 'block'; fcReveal();
            });
          }

          function scanMarker(c, nextState, onMatch) {
            if (c === curMk[mkIdx]) { mkIdx++; if (mkIdx === curMk.length) { mkIdx = 0; twState = nextState; onMatch(); } }
            else { mkIdx = (c === curMk[0]) ? 1 : 0; }
          }

          function onDelta(text) {
            for (var i = 0; i < text.length; i++) {
              var c = text[i];
              if (twState === 'pre_beob') { scanMarker(c, 'beob', function () { targetEl = assessEl; showResult(); }); }
              else if (twState === 'beob') { if (escaped) { escaped = false; queue.push(c === 'n' ? '\n' : c); } else if (c === '\\') { escaped = true; } else if (c === '"') { twState = 'pre_urs'; curMk = '["'; mkIdx = 0; } else { queue.push(c); } }
              else if (twState === 'pre_urs') { scanMarker(c, 'urs', function () { escaped = false; queue.push(function () { var li = document.createElement('li'); btEl.appendChild(li); targetEl = li; }); }); }
              else if (twState === 'urs') { if (escaped) { escaped = false; queue.push(c === 'n' ? '\n' : c); } else if (c === '\\') { escaped = true; } else if (c === '"') { twState = 'post_urs'; } else { queue.push(c); } }
              else if (twState === 'post_urs') { if (c === ',') { twState = 'next_urs'; } else if (c === ']') { twState = 'pre_ueb'; curMk = '"uebersehen":"'; mkIdx = 0; } }
              else if (twState === 'next_urs') { if (c === '"') { twState = 'urs'; escaped = false; queue.push(function () { var li = document.createElement('li'); btEl.appendChild(li); targetEl = li; }); } }
              else if (twState === 'pre_ueb') { scanMarker(c, 'ueb', function () { escaped = false; queue.push(function () { uebUl = document.createElement('ul'); uebUl.className = 'fc-result-checks'; var li = document.createElement('li'); uebUl.appendChild(li); uebEl.appendChild(uebUl); targetEl = li; }); }); }
              else if (twState === 'ueb') { if (escaped) { escaped = false; if (c === 'n') { queue.push(function () { var li = document.createElement('li'); uebUl.appendChild(li); targetEl = li; }); } else { queue.push(c); } } else if (c === '\\') { escaped = true; } else if (c === '"') { twState = 'pre_rueck'; curMk = '"rueckfrage":"'; mkIdx = 0; } else { queue.push(c); } }
              else if (twState === 'pre_rueck') { scanMarker(c, 'rueck', function () { escaped = false; queue.push(function () { var li = document.createElement('li'); stepsEl.appendChild(li); targetEl = li; }); }); }
              else if (twState === 'rueck') { if (escaped) { escaped = false; queue.push(c === 'n' ? '\n' : c); } else if (c === '\\') { escaped = true; } else if (c === '"') { twState = 'typed_done'; } else { queue.push(c); } }
            }
          }

          function onEvent(ev) {
            if (ev.t) { onDelta(ev.t); return; }
            if (fc_timer) clearTimeout(fc_timer);
            if (ev.error) { clearInterval(drainTimer); if (!resultShown) fcShowFallback(val); return; }
            if (ev.done) {
              doneReceived = true;
              if (ev.valid === false) { clearInterval(drainTimer); if (thinkEl) thinkEl.classList.remove('fc-active'); fcShowInvalid(ev.message || ''); return; }
              document.getElementById('fc-res-input').textContent = val;
              var leadQ = document.getElementById('fc-lead-question-text');
              if (leadQ) leadQ.textContent = (ev.rueckfrage || '') + ' Wir zeigen Ihnen den nächsten Schritt — kostenlos, in 30 Minuten.';
              var waitDrain = setInterval(function () {
                if (queue.length > 0) return;
                clearInterval(waitDrain); clearInterval(drainTimer);
                setTimeout(function () { fcShowScore(val, ev.score); }, 200);
                setTimeout(fcShowLead, 900);
              }, 20);
            }
          }

          function pump() {
            reader.read().then(function (r) {
              if (r.done) return;
              sseBuffer += decoder.decode(r.value, { stream: true });
              var lines = sseBuffer.split('\n'); sseBuffer = lines.pop();
              lines.forEach(function (line) { line = line.trim(); if (line.indexOf('data: ') !== 0) return; try { onEvent(JSON.parse(line.slice(6))); } catch (e) {} });
              pump();
            }).catch(function () { if (fc_timer) clearTimeout(fc_timer); if (!doneReceived) fcShowFallback(val); });
          }
          pump();
        })
        .catch(function () { if (fc_timer) clearTimeout(fc_timer); if (!doneReceived) fcShowFallback(val); });
      }
    }

    btn1.addEventListener('click', fcSubmit);
    input1.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); fcSubmit(); } });

    document.querySelectorAll('.fc-example-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var text = chip.textContent.replace(' …', '').trim();
        input1.value = text;
        if (phEl) phEl.classList.add('ph-hidden');
        input1.focus();
      });
    });

    function syncBtnPulse() {
      if (!input1.value.trim()) { btn1.classList.add('fc-btn-pulse'); } else { btn1.classList.remove('fc-btn-pulse'); }
    }
    input1.addEventListener('input', syncBtnPulse);
    syncBtnPulse();
    input1.addEventListener('focus', function () { if (phEl) phEl.classList.add('ph-hidden'); });
    input1.addEventListener('blur',  function () { if (phEl && !input1.value.trim()) phEl.classList.remove('ph-hidden'); });
  }

})();

/* ============================================================
   KI-CHECK — Script 2: Neugier-Balken
============================================================ */
(function () {
  'use strict';
  var wrap  = document.getElementById('fc-progress-wrap');
  var fill  = document.getElementById('fc-progress-fill');
  var label = document.getElementById('fc-progress-label');
  var input = document.getElementById('fc-input-1');
  if (!wrap || !fill || !input) return;

  var MAX_CHARS = 80;
  var PASSIVE   = 8;

  var section = document.getElementById('ki-check');
  if (section && window.IntersectionObserver) {
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      wrap.classList.add('fc-progress-visible');
      setTimeout(function () { fill.style.width = PASSIVE + '%'; }, 300);
    }, { threshold: 0.4 });
    io.observe(section);
  }

  input.addEventListener('input', function () {
    var len = input.value.trim().length;
    if (len === 0) {
      fill.style.width = PASSIVE + '%';
      label.textContent = 'System bereit für Input …';
      wrap.classList.remove('fc-progress-active');
    } else {
      var pct = PASSIVE + Math.min(len / MAX_CHARS, 1) * (92 - PASSIVE);
      fill.style.width = pct.toFixed(1) + '%';
      wrap.classList.add('fc-progress-active');
      label.textContent = pct >= 80 ? 'Genug für eine Analyse …' : 'Analyse wird vorbereitet …';
    }
  });

  var lastVal = '';
  setInterval(function () {
    var cur = input.value;
    if (cur === lastVal) return;
    lastVal = cur;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }, 60);

})();

/* ============================================================
   KI-CHECK — Script 3: Autoplay-Demo
============================================================ */
(function () {
  'use strict';

  var DEMOS = [
    { text: 'Unsere Angebote dauern zu lange …',      status: 'Muster wird erkannt …',        insights: ['Nicht das Schreiben kostet Zeit — das Zusammensuchen davor', 'Jede Offerte wird neu aufgebaut statt aus einer Vorlage gezogen', 'Wer zuerst liefert, gewinnt oft schon vor dem Preisvergleich'] },
    { text: 'Die Rechnungsprüfung ist ein Chaos …',   status: 'Engpass wird lokalisiert …',    insights: ['Belege kommen per Mail, Papier und WhatsApp — kein zentraler Eingang', 'Jede Rechnung wird manuell erfasst statt automatisch erkannt', 'Verzögerter Versand ist der häufigste selbstverschuldete Cashflow-Engpass'] },
    { text: 'Meetings fressen unseren Arbeitstag …',  status: 'Zeitverlust wird berechnet …',  insights: ['Beschlüsse versanden, weil kein System sie nach dem Meeting weiterführt', 'Die eigentlichen Kosten entstehen nicht im Meeting — sondern danach', 'Was fehlt, ist nicht weniger Meetings — sondern ein Aufgabensystem'] }
  ];

  var input         = document.getElementById('fc-input-1');
  var phEl          = document.getElementById('fc-ph');
  var insightEl     = document.getElementById('fc-insight');
  var insightStatus = document.getElementById('fc-insight-status');
  var insightStatusText = document.getElementById('fc-insight-status-text');
  var btn1    = document.getElementById('fc-btn-1');
  var section = document.getElementById('ki-check');

  if (!input || !section) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var stopped = false, timers = [], demoIdx = 0;

  function later(fn, ms) {
    if (stopped) return;
    var t = setTimeout(function () { if (!stopped) fn(); }, ms);
    timers.push(t);
  }

  var iLines = [document.getElementById('fc-iline-0'), document.getElementById('fc-iline-1'), document.getElementById('fc-iline-2')];
  var iTexts = [document.getElementById('fc-itext-0'), document.getElementById('fc-itext-1'), document.getElementById('fc-itext-2')];
  var insightShownOnce = false;

  function setLineVis(visible) {
    iLines.forEach(function (el) { if (el) { if (visible) el.classList.add('fc-vis'); else el.classList.remove('fc-vis'); } });
  }

  function resetInsight() {
    if (!insightEl) return;
    insightShownOnce = false;
    insightEl.classList.remove('fc-insight-visible');
    if (insightStatus) insightStatus.classList.remove('fc-vis');
    setLineVis(false);
    iTexts.forEach(function (el) { if (el) el.textContent = ''; });
    insightEl.style.display = 'none';
  }

  function stop(clearField) {
    if (stopped) return;
    stopped = true;
    timers.forEach(clearTimeout);
    timers = [];
    if (btn1) btn1.classList.remove('fc-btn-send');
    if (clearField) { input.value = ''; if (phEl) phEl.classList.remove('ph-hidden'); }
    resetInsight();
  }

  input.addEventListener('focus',      function () { stop(true); }, { passive: true });
  input.addEventListener('click',      function () { stop(true); }, { passive: true });
  input.addEventListener('keydown',    function () { stop(true); }, { passive: true });
  input.addEventListener('touchstart', function () { stop(true); }, { passive: true });
  if (btn1) btn1.addEventListener('click', function () { stop(false); });

  function typeText(text, done) {
    input.value = '';
    if (btn1) btn1.classList.remove('fc-btn-send');
    if (phEl) phEl.classList.add('ph-hidden');
    var i = 0;
    function next() { if (stopped) return; if (i < text.length) { input.value = text.slice(0, ++i); later(next, 22 + Math.random() * 18); } else { done(); } }
    later(next, 0);
  }

  function flashButton(done) {
    if (!btn1 || stopped) { done(); return; }
    btn1.classList.add('fc-btn-send');
    later(function () { btn1.classList.remove('fc-btn-send'); done(); }, 600);
  }

  var thinkEl = document.getElementById('fc-thinking');

  function demoThink(done) {
    if (!thinkEl || stopped) { done(); return; }
    thinkEl.classList.add('fc-active');
    if (typeof startThinkingText === 'function') startThinkingText();
    later(function () { if (typeof stopThinkingText === 'function') stopThinkingText(); thinkEl.classList.remove('fc-active'); done(); }, 1800);
  }

  function showInsight(demo, done) {
    if (!insightEl || !demo.insights) { done(); return; }
    if (insightStatusText) insightStatusText.textContent = demo.status || '';
    demo.insights.forEach(function (text, i) { if (iTexts[i]) iTexts[i].textContent = text; });
    if (!insightShownOnce) {
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        insightEl.classList.add('fc-insight-visible');
        if (insightStatus) insightStatus.classList.add('fc-vis');
      }); });
    } else {
      if (insightStatus) insightStatus.classList.add('fc-vis');
    }
    var delay0 = insightShownOnce ? 200 : 500;
    iLines.forEach(function (el, i) { if (el) later(function () { el.classList.add('fc-vis'); }, delay0 + i * 520); });
    var totalWait = delay0 + (demo.insights.length - 1) * 520 + 1800;
    later(function () {
      insightShownOnce = true;
      if (insightStatus) insightStatus.classList.remove('fc-vis');
      setLineVis(false);
      later(done, 350);
    }, totalWait);
  }

  function runDemo() {
    if (stopped) return;
    var demo = DEMOS[demoIdx % DEMOS.length]; demoIdx++;
    typeText(demo.text, function () {
      later(function () {
        flashButton(function () {
          later(function () { showInsight(demo, function () { later(runDemo, 700); }); }, 250);
        });
      }, 500);
    });
  }

  if (!window.IntersectionObserver) return;
  var started = false;
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !started && !stopped && btn1 && !btn1.disabled) {
      started = true; io.disconnect(); later(runDemo, 500);
    }
  }, { threshold: 0.1 });
  io.observe(section);

})();

/* ============================================================
   KI-CHECK — Script 4: Side-Kontext
============================================================ */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var LEFT_ITEMS  = ['Offerten dauern zu lange.', 'Zu viele interne Rückfragen.', 'Informationen müssen gesucht werden.', 'Wir erfassen Daten mehrfach.', 'Excel verbindet unsere Prozesse.', 'Kundenanfragen landen an mehreren Orten.', 'Freigaben dauern zu lange.', 'Manuelle Rapporte kosten Zeit.'];
  var RIGHT_ITEMS = ['Mehr Zeit fürs Kerngeschäft.', 'Weniger manuelle Arbeit.', 'Klare Verantwortlichkeiten.', 'Automatisierte Abläufe.', 'Schnellere Reaktionszeiten.', 'Weniger Fehler.', 'Mehr Transparenz.', 'Höhere Produktivität.'];

  var leftEl     = document.getElementById('fc-side-left');
  var rightEl    = document.getElementById('fc-side-right');
  var leftSlots  = document.getElementById('fc-side-left-slots');
  var rightSlots = document.getElementById('fc-side-right-slots');
  var input      = document.getElementById('fc-input-1');
  var btn1       = document.getElementById('fc-btn-1');
  var section    = document.getElementById('ki-check');
  if (!leftEl || !rightEl || !leftSlots || !rightSlots) return;

  var stopped = false, timers = [];
  function later(fn, ms) { if (stopped) return; var t = setTimeout(function () { if (!stopped) fn(); }, ms); timers.push(t); }

  function stopSide() {
    if (stopped) return; stopped = true; timers.forEach(clearTimeout);
    [leftEl, rightEl].forEach(function (el) { el.classList.remove('fc-side-visible'); setTimeout(function () { el.style.display = 'none'; }, 800); });
  }

  if (input) { ['focus','click','keydown','input','touchstart'].forEach(function (evt) { input.addEventListener(evt, stopSide, { passive: true }); }); }
  if (btn1) btn1.addEventListener('click', stopSide);
  if (section) section.addEventListener('mousemove', stopSide, { passive: true, once: true });

  function pickRandom(items, excludeSet) { var pool = items.filter(function (x) { return excludeSet.indexOf(x) === -1; }); if (!pool.length) pool = items.slice(); return pool[Math.floor(Math.random() * pool.length)]; }

  function runSlot(slotEl, items, allSlotEls, displayMs, pauseMs) {
    if (stopped) return;
    var visible = []; allSlotEls.forEach(function (s) { if (s !== slotEl && s.dataset.current) visible.push(s.dataset.current); });
    var item = pickRandom(items, visible); slotEl.dataset.current = item; slotEl.textContent = item;
    requestAnimationFrame(function () { requestAnimationFrame(function () { if (!stopped) slotEl.classList.add('fc-side-in'); }); });
    later(function () {
      slotEl.classList.remove('fc-side-in'); delete slotEl.dataset.current;
      later(function () { runSlot(slotEl, items, allSlotEls, displayMs + (Math.random() - 0.5) * 1200, pauseMs + (Math.random() - 0.5) * 600); }, pauseMs);
    }, displayMs);
  }

  function initSide(containerEl, slotsEl, items, sideStartDelay, numSlots) {
    var slotEls = [];
    for (var i = 0; i < numSlots; i++) { var s = document.createElement('span'); s.className = 'fc-side-slot'; slotsEl.appendChild(s); slotEls.push(s); }
    containerEl.classList.add('fc-side-visible');
    slotEls.forEach(function (slotEl, idx) {
      var delay = sideStartDelay + idx * 700 + Math.random() * 400;
      var displayMs = 4200 + Math.random() * 1800, pauseMs = 600 + Math.random() * 800;
      later(function () { runSlot(slotEl, items, slotEls, displayMs, pauseMs); }, delay);
    });
  }

  if (!section || !window.IntersectionObserver) return;
  var started = false;
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !started && !stopped) {
      started = true; io.disconnect();
      initSide(leftEl,  leftSlots,  LEFT_ITEMS,  600,  3);
      initSide(rightEl, rightSlots, RIGHT_ITEMS, 1400, 3);
    }
  }, { threshold: 0.35 });
  io.observe(section);

})();
