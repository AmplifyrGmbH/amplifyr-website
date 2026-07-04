/* ============================================================
   AMPLIFYR — page-index.js
   Homepage-spezifisches JS
============================================================ */

/* Hash-Scroll nach vollständigem Laden (überschreibt Browser-Default) */
if (window.location.hash === '#ki-check') {
  window.addEventListener('load', function () {
    var target = document.getElementById('ki-check');
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
}

(function () {
  'use strict';

  var EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
  var AI_CHECK_URL = 'ai-check.php';

  /* ============================================================
     HERO ANIMATION
  ============================================================ */
  function initHero() {
    var hero      = document.getElementById('hero');
    var video     = hero && hero.querySelector('.hero-video');
    var slogan    = document.getElementById('hero-slogan');
    var phase1    = document.getElementById('hero-phase-1');
    var divider   = document.getElementById('hero-divider');
    var phase2    = document.getElementById('hero-phase-2');
    var heroPhil   = document.getElementById('hero-phil');
    var pbsL1      = document.getElementById('pbs-l1');
    var pbsL2      = document.getElementById('pbs-l2');
    var pbsL3      = document.getElementById('pbs-l3');
    var pbsL4      = document.getElementById('pbs-l4');
    var pbsSubWrap = document.getElementById('pbs-sub-wrap');
    var fadeout    = document.getElementById('hero-fadeout');
    var scrollCue  = document.getElementById('hero-scroll-cue');

    if (!hero || !video) return;

    var reduced      = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var heroScrolled = false;
    var sloganDone   = false;
    var philStarted  = false;

    /* ── Slogan-Sequenz (absolute Timing ab Seitenstart) ── */
    function showSlogan() {
      var DUR = 700;

      // t=1000ms: "Build the base." von links
      setTimeout(function () {
        phase1.style.transition = 'opacity ' + DUR + 'ms ' + EASE + ', transform ' + DUR + 'ms ' + EASE;
        phase1.style.opacity    = '1';
        phase1.style.transform  = 'translateX(0)';
      }, 1000);

      // t=2500ms: "Lead the race." von rechts (1.5s nach "Build the base.")
      setTimeout(function () {
        phase2.style.transition = 'opacity ' + DUR + 'ms ' + EASE + ', transform ' + DUR + 'ms ' + EASE;
        phase2.style.opacity    = '1';
        phase2.style.transform  = 'translateX(0)';
      }, 2500);

      // Slogan-Ausblenden wird via video.ended gesteuert
    }

    /* ── Hilfsfunktion: Element einblenden ── */
    function fadeIn(el, dur, delay) {
      if (!el) return;
      setTimeout(function () {
        el.style.transition = 'opacity ' + dur + 'ms ' + EASE + ', transform ' + dur + 'ms ' + EASE;
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
      }, delay || 0);
    }

    function fadeOut(el, dur, delay) {
      if (!el) return;
      setTimeout(function () {
        el.style.transition = 'opacity ' + dur + 'ms ' + EASE + ', transform ' + dur + 'ms ' + EASE;
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(-12px)';
      }, delay || 0);
    }

    /* ── Typewriter-Funktion ── */
    function typeWriter(el, text, charDelay, cb) {
      if (!el) { cb && cb(); return; }
      var i = 0;
      el.textContent = '';
      el.style.transition = 'opacity 80ms ease';
      el.style.opacity = '1';
      function next() {
        if (i <= text.length) {
          el.textContent = text.slice(0, i);
          i++;
          setTimeout(next, charDelay);
        } else {
          cb && cb();
        }
      }
      next();
    }

    /* ── Sofort einblenden ── */
    function show(el) {
      if (!el) return;
      el.style.transition = 'opacity 80ms ease';
      el.style.opacity = '1';
    }

    /* ── video.ended → PBS-Sequenz ── */
    function onVideoEnd() {
      if (philStarted) return;
      philStarted = true;
      var OUT = 300;

      // Slogan ausfaden + Overlay
      [phase1, divider, phase2].forEach(function (el) {
        if (!el) return;
        el.style.transition = 'opacity ' + OUT + 'ms ' + EASE;
        el.style.opacity    = '0';
      });
      if (fadeout) {
        fadeout.style.transition = 'opacity 300ms ' + EASE;
        fadeout.style.opacity    = '1';
      }

      setTimeout(function () {
        if (heroPhil) heroPhil.classList.add('is-revealed');
        function pbsShow(el) { if (el) el.classList.add('pbs-show'); }
        function pbsHide(el) { if (el) el.classList.remove('pbs-show'); }
        pbsShow(pbsL1);
        setTimeout(function () { pbsShow(pbsL2); }, 500);
        setTimeout(function () { pbsShow(pbsL3); }, 1100);
        setTimeout(function () {
          pbsHide(pbsL2);
          pbsHide(pbsL3);
          if (pbsSubWrap) {
            pbsSubWrap.style.transition = 'min-height 0.4s ease, height 0.4s ease';
            pbsSubWrap.style.minHeight  = '0';
            pbsSubWrap.style.height     = '0';
            pbsSubWrap.style.overflow   = 'hidden';
          }
        }, 2600);
        setTimeout(function () {
          pbsShow(pbsL4);
          if (scrollCue) scrollCue.classList.add('is-visible');
          sloganDone = true;
        }, 3200);
      }, OUT);
    }

    /* ── Sofort-Endstate (reduced-motion, sessionStorage, Skip) ── */
    function showEndState() {
      if (philStarted) return;
      philStarted = true;
      sloganDone  = true;
      if (video) { video.pause(); video.currentTime = video.duration || 0; }
      if (fadeout)   { fadeout.style.transition = 'none'; fadeout.style.opacity = '1'; }
      if (phase1)    { phase1.style.transition  = 'none'; phase1.style.opacity  = '0'; }
      if (divider)   { divider.style.transition = 'none'; divider.style.opacity = '0'; }
      if (phase2)    { phase2.style.transition  = 'none'; phase2.style.opacity  = '0'; }
      if (heroPhil)  heroPhil.classList.add('is-revealed');
      if (pbsL1)     pbsL1.classList.add('pbs-show');
      if (pbsSubWrap) {
        pbsSubWrap.style.minHeight = '0';
        pbsSubWrap.style.height    = '0';
        pbsSubWrap.style.overflow  = 'hidden';
      }
      if (pbsL4)     pbsL4.classList.add('pbs-show');
      if (scrollCue) scrollCue.classList.add('is-visible');
      sessionStorage.setItem('heroSeen', '1');
    }

    if (reduced || sessionStorage.getItem('heroSeen')) {
      showEndState();
    } else {
      showSlogan();
      video.addEventListener('ended', function () {
        onVideoEnd();
        sessionStorage.setItem('heroSeen', '1');
      });
      // Fallback: falls Video nicht endet (kein File, etc.)
      setTimeout(function () {
        if (!sloganDone) onVideoEnd();
      }, 9000);
    }

    // Hero fade on first scroll — Skip wenn Animation noch läuft
    function onHeroScroll() {
      if (heroScrolled) return;
      heroScrolled = true;
      window.removeEventListener('scroll', onHeroScroll);
      window.removeEventListener('wheel',  onHeroScroll);
      if (!sloganDone) {
        // Animation noch nicht fertig → direkt zum Endstate springen
        showEndState();
      } else {
        if (fadeout) {
          fadeout.style.transition = 'opacity 500ms ' + EASE;
          fadeout.style.opacity    = '1';
        }
      }
    }

    window.addEventListener('scroll', onHeroScroll, { passive: true });
    window.addEventListener('wheel',  onHeroScroll, { passive: true });
  }

  /* ============================================================
     ANSATZ ANIMATION
  ============================================================ */
  function initAnsatz() {
    var section = document.getElementById('ansatz');
    if (!section) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    window.animateOnScroll('#ansatz .ansatz-header', { threshold: 0.2, duration: 600 });

    window.animateOnScroll('#ansatz .ansatz-visual', {
      threshold: 0.15,
      stagger: 120,
      delay: 200,
      duration: 600
    });

    window.animateOnScroll('#ansatz .ansatz-closing', { threshold: 0.2, delay: 100, duration: 600 });
  }

  /* ============================================================
     LEISTUNGEN ANIMATION
  ============================================================ */
  function initLeistungen() {
    var section = document.getElementById('leistungen');
    if (!section) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      section.querySelectorAll('.leis-step').forEach(function (el) {
        el.classList.add('hover-ready');
      });
      return;
    }

    window.animateOnScroll('#leistungen .leis-header', { threshold: 0.15, duration: 500 });
    window.animateOnScroll('#leistungen .leis-intro',  { threshold: 0.15, delay: 150, duration: 500 });

    var steps = Array.prototype.slice.call(section.querySelectorAll('.leis-step'));
    steps.forEach(function (el) {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(24px) scale(0.94)';
      el.style.willChange = 'opacity, transform';
    });

    var triggered = false;
    var obs = new IntersectionObserver(function (entries) {
      if (triggered || !entries[0].isIntersecting) return;
      triggered = true;
      obs.disconnect();
      steps.forEach(function (el, i) {
        setTimeout(function () {
          el.style.transition = 'opacity 600ms ' + EASE + ', transform 600ms ' + EASE;
          el.style.opacity    = '1';
          el.style.transform  = 'translateY(0) scale(1)';
          setTimeout(function () {
            el.style.willChange = '';
            el.style.transition = '';
            el.style.transform  = '';
            el.classList.add('hover-ready');
          }, 650);
        }, 450 + i * 180);
      });
    }, { threshold: 0.1 });

    obs.observe(section);
  }

  /* ============================================================
     TEAM ANIMATION
  ============================================================ */
  function initTeam() {
    var section = document.getElementById('team');
    if (!section) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      section.querySelectorAll('.team-col').forEach(function (el) {
        el.classList.add('hover-ready');
      });
      return;
    }

    window.animateOnScroll('#team .team-header', { threshold: 0.2, duration: 500 });
    window.animateOnScroll('#team .team-visual',  { threshold: 0.15, delay: 150, duration: 600 });

    var cols = Array.prototype.slice.call(section.querySelectorAll('.team-col'));
    cols.forEach(function (el) {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(20px)';
      el.style.willChange = 'opacity, transform';
    });

    var triggered = false;
    var obs = new IntersectionObserver(function (entries) {
      if (triggered || !entries[0].isIntersecting) return;
      triggered = true;
      obs.disconnect();
      cols.forEach(function (el, i) {
        setTimeout(function () {
          el.style.transition = 'opacity 500ms ' + EASE + ', transform 500ms ' + EASE;
          el.style.opacity    = '1';
          el.style.transform  = 'translateY(0)';
          setTimeout(function () {
            el.style.willChange = '';
            el.classList.add('hover-ready');
          }, 550);
        }, i * 150);
      });
    }, { threshold: 0.1 });

    obs.observe(section);
  }

  /* (KI-Check logic moved to standalone scripts below) */

  /* ============================================================
     INIT
  ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initAnsatz();
    initLeistungen();
    initTeam();
  });

}());

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
      { sel: '.fc-benefits .fc-benefit-chip:nth-child(1)',   delay: 1020 },
      { sel: '.fc-benefits .fc-benefit-chip:nth-child(2)',   delay: 1120 },
      { sel: '.fc-benefits .fc-benefit-chip:nth-child(3)',   delay: 1220 },
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

  /* Expose on window so Script 3 (Autoplay-Demo) can call them */
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

  /* Potenzial-Score anzeigen + animieren */
  function fcShowScore(val, claudeScore) {
    if (!scoreEl) return;
    var score = (typeof claudeScore === 'number') ? claudeScore : 68;

    var verdict = score >= 80
      ? 'Gezielt angehbar.'
      : score >= 65
        ? 'Lösbar mit dem richtigen Ansatz.'
        : 'Organisatorisch anzugehen.';

    var verdictEl = document.getElementById('fc-score-verdict');
    if (verdictEl) verdictEl.textContent = verdict;

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

  /* Lead-Capture einblenden */
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

  /* Lead-Button */
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
      var schrittEl  = document.getElementById('fc-res-steps');
      var schritt    = schrittEl ? Array.from(schrittEl.querySelectorAll('li')).map(function(li){ return li.textContent; }).join(' ') : '';

      var msg = 'Eingabe: ' + eingabe
        + '\n\nErste Einschätzung:\n' + einschaetz
        + '\n\nWo es stockt:\n' + stockt
        + '\n\nWas das wirklich kostet:\n' + kosten
        + '\n\nNächster Schritt:\n' + schritt
        + '\n\nE-Mail: ' + email;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '1f1c6035-3bd1-4011-89ec-68c781a2ac8a',
          email:       email,
          from_name:   'Amplifyr KI-Check',
          subject:     'Neue KI-Check Anfrage — ' + eingabe,
          message:     msg
        })
      }).catch(function () {});
    });
    if (leadEmail) {
      leadEmail.addEventListener('input', function () {
        leadEmail.style.borderColor = '';
      });
    }
  }

  /* Kontextdaten für Tier 2 (Mini-Analyse) */
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
        var fc_timer = fc_controller
          ? setTimeout(function () { fc_controller.abort(); }, 25000)
          : null;

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

          var assessEl = document.getElementById('fc-res-assessment');
          var btEl     = document.getElementById('fc-res-bottlenecks');
          var uebEl    = document.getElementById('fc-res-potential-desc');
          var stepsEl  = document.getElementById('fc-res-steps');
          assessEl.textContent = '';
          btEl.innerHTML = '';
          uebEl.innerHTML = '';
          stepsEl.innerHTML = '';

          var queue        = [];
          var targetEl     = null;
          var doneReceived = false;
          var drainTimer   = setInterval(function () {
            if (queue.length === 0) return;
            var item = queue.shift();
            if (typeof item === 'string') { if (targetEl) targetEl.textContent += item; }
            else item();
          }, 4);

          var twState     = 'pre_beob';
          var escaped     = false;
          var mkIdx       = 0;
          var curMk       = '"beobachtung":"';
          var resultShown = false;
          var uebUl       = null;

          function showResult() {
            if (resultShown) return;
            resultShown = true;
            if (fc_timer) clearTimeout(fc_timer);
            queue.push(function () {
              if (thinkEl) thinkEl.classList.remove('fc-active');
              minEl.style.display = 'none'; shortEl.style.display = 'none';
              fullEl.style.display = 'block'; fcReveal();
            });
          }

          function scanMarker(c, nextState, onMatch) {
            if (c === curMk[mkIdx]) {
              mkIdx++;
              if (mkIdx === curMk.length) { mkIdx = 0; twState = nextState; onMatch(); }
            } else { mkIdx = (c === curMk[0]) ? 1 : 0; }
          }

          function onDelta(text) {
            for (var i = 0; i < text.length; i++) {
              var c = text[i];

              if (twState === 'pre_beob') {
                scanMarker(c, 'beob', function () {
                  targetEl = assessEl; showResult();
                });
              }

              else if (twState === 'beob') {
                if (escaped) { escaped = false; queue.push(c === 'n' ? '\n' : c); }
                else if (c === '\\') { escaped = true; }
                else if (c === '"') { twState = 'pre_urs'; curMk = '["'; mkIdx = 0; }
                else { queue.push(c); }
              }

              else if (twState === 'pre_urs') {
                scanMarker(c, 'urs', function () {
                  escaped = false;
                  queue.push(function () { var li = document.createElement('li'); btEl.appendChild(li); targetEl = li; });
                });
              }

              else if (twState === 'urs') {
                if (escaped) { escaped = false; queue.push(c === 'n' ? '\n' : c); }
                else if (c === '\\') { escaped = true; }
                else if (c === '"') { twState = 'post_urs'; }
                else { queue.push(c); }
              }

              else if (twState === 'post_urs') {
                if (c === ',') { twState = 'next_urs'; }
                else if (c === ']') { twState = 'pre_ueb'; curMk = '"uebersehen":"'; mkIdx = 0; }
              }

              else if (twState === 'next_urs') {
                if (c === '"') {
                  twState = 'urs'; escaped = false;
                  queue.push(function () { var li = document.createElement('li'); btEl.appendChild(li); targetEl = li; });
                }
              }

              else if (twState === 'pre_ueb') {
                scanMarker(c, 'ueb', function () {
                  escaped = false;
                  queue.push(function () {
                    uebUl = document.createElement('ul'); uebUl.className = 'fc-result-checks';
                    var li = document.createElement('li'); uebUl.appendChild(li);
                    uebEl.appendChild(uebUl); targetEl = li;
                  });
                });
              }

              else if (twState === 'ueb') {
                if (escaped) {
                  escaped = false;
                  if (c === 'n') {
                    queue.push(function () { var li = document.createElement('li'); uebUl.appendChild(li); targetEl = li; });
                  } else { queue.push(c); }
                }
                else if (c === '\\') { escaped = true; }
                else if (c === '"') { twState = 'pre_rueck'; curMk = '"rueckfrage":"'; mkIdx = 0; }
                else { queue.push(c); }
              }

              else if (twState === 'pre_rueck') {
                scanMarker(c, 'rueck', function () {
                  escaped = false;
                  queue.push(function () { var li = document.createElement('li'); stepsEl.appendChild(li); targetEl = li; });
                });
              }

              else if (twState === 'rueck') {
                if (escaped) { escaped = false; queue.push(c === 'n' ? '\n' : c); }
                else if (c === '\\') { escaped = true; }
                else if (c === '"') { twState = 'typed_done'; }
                else { queue.push(c); }
              }
            }
          }

          function onEvent(ev) {
            if (ev.t) { onDelta(ev.t); return; }
            if (fc_timer) clearTimeout(fc_timer);
            if (ev.error) { clearInterval(drainTimer); if (!resultShown) fcShowFallback(val); return; }
            if (ev.done) {
              doneReceived = true;
              if (ev.valid === false) {
                clearInterval(drainTimer);
                if (thinkEl) thinkEl.classList.remove('fc-active');
                fcShowInvalid(ev.message || ''); return;
              }
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
              lines.forEach(function (line) {
                line = line.trim();
                if (line.indexOf('data: ') !== 0) return;
                try { onEvent(JSON.parse(line.slice(6))); } catch (e) {}
              });
              pump();
            }).catch(function () {
              if (fc_timer) clearTimeout(fc_timer);
              if (!doneReceived) fcShowFallback(val);
            });
          }
          pump();
        })
        .catch(function () {
          if (fc_timer) clearTimeout(fc_timer);
          if (!doneReceived) fcShowFallback(val);
        });
      }
    }
    btn1.addEventListener('click', fcSubmit);
    input1.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); fcSubmit(); }
    });

    document.querySelectorAll('.fc-example-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var text = chip.textContent.replace(' …', '').trim();
        input1.value = text;
        if (phEl) phEl.classList.add('ph-hidden');
        input1.focus();
      });
    });

    function syncBtnPulse() {
      if (!input1.value.trim()) {
        btn1.classList.add('fc-btn-pulse');
      } else {
        btn1.classList.remove('fc-btn-pulse');
      }
    }
    input1.addEventListener('input', syncBtnPulse);
    syncBtnPulse();

    input1.addEventListener('focus', function () {
      if (phEl) phEl.classList.add('ph-hidden');
    });
    input1.addEventListener('blur', function () {
      if (phEl && !input1.value.trim()) phEl.classList.remove('ph-hidden');
    });
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
      label.textContent = pct >= 80
        ? 'Genug für eine Analyse …'
        : 'Analyse wird vorbereitet …';
    }
  });

  var lastVal = '';
  setInterval(function () {
    var cur = input.value;
    if (cur === lastVal) return;
    lastVal = cur;
    var ev = new Event('input', { bubbles: true });
    input.dispatchEvent(ev);
  }, 60);

})();

/* ============================================================
   KI-CHECK — Script 3: Autoplay-Demo
============================================================ */
(function () {
  'use strict';

  var DEMOS = [
    {
      text:     'Unsere Angebote dauern zu lange …',
      status:   'Muster wird erkannt …',
      insights: [
        'Nicht das Schreiben kostet Zeit — das Zusammensuchen davor',
        'Jede Offerte wird neu aufgebaut statt aus einer Vorlage gezogen',
        'Wer zuerst liefert, gewinnt oft schon vor dem Preisvergleich'
      ]
    },
    {
      text:     'Die Rechnungsprüfung ist ein Chaos …',
      status:   'Engpass wird lokalisiert …',
      insights: [
        'Belege kommen per Mail, Papier und WhatsApp — kein zentraler Eingang',
        'Jede Rechnung wird manuell erfasst statt automatisch erkannt',
        'Verzögerter Versand ist der häufigste selbstverschuldete Cashflow-Engpass'
      ]
    },
    {
      text:     'Meetings fressen unseren Arbeitstag …',
      status:   'Zeitverlust wird berechnet …',
      insights: [
        'Beschlüsse versanden, weil kein System sie nach dem Meeting weiterführt',
        'Die eigentlichen Kosten entstehen nicht im Meeting — sondern danach',
        'Was fehlt, ist nicht weniger Meetings — sondern ein Aufgabensystem'
      ]
    }
  ];

  var input     = document.getElementById('fc-input-1');
  var phEl      = document.getElementById('fc-ph');
  var insightEl = document.getElementById('fc-insight');
  var insightStatus = document.getElementById('fc-insight-status');
  var insightStatusText = document.getElementById('fc-insight-status-text');
  var btn1    = document.getElementById('fc-btn-1');
  var section = document.getElementById('ki-check');

  if (!input || !section) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var stopped = false;
  var timers  = [];
  var demoIdx = 0;

  function later(fn, ms) {
    if (stopped) return;
    var t = setTimeout(function () { if (!stopped) fn(); }, ms);
    timers.push(t);
  }

  function resetInsight() {
    if (!insightEl) return;
    insightShownOnce = false;
    insightEl.classList.remove('fc-insight-visible');
    if (insightStatus) insightStatus.classList.remove('fc-vis');
    setLineVis(false);
    iTexts.forEach(function (el) { if (el) el.textContent = ''; });
    insightEl.style.display = 'none';
    var benefitsEl = document.getElementById('fc-benefits');
    if (benefitsEl) { benefitsEl.style.opacity = '1'; }
  }

  function stop(clearField) {
    if (stopped) return;
    stopped = true;
    timers.forEach(clearTimeout);
    timers = [];
    if (btn1) { btn1.classList.remove('fc-btn-send'); }
    if (clearField) {
      input.value = '';
      if (phEl) phEl.classList.remove('ph-hidden');
    }
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
    function next() {
      if (stopped) return;
      if (i < text.length) {
        input.value = text.slice(0, ++i);
        later(next, 22 + Math.random() * 18);
      } else {
        done();
      }
    }
    later(next, 0);
  }

  function flashButton(done) {
    if (!btn1 || stopped) { done(); return; }
    btn1.classList.add('fc-btn-send');
    later(function () {
      btn1.classList.remove('fc-btn-send');
      done();
    }, 600);
  }

  var thinkEl = document.getElementById('fc-thinking');

  function demoThink(done) {
    if (!thinkEl || stopped) { done(); return; }
    thinkEl.classList.add('fc-active');
    if (typeof startThinkingText === 'function') startThinkingText();
    later(function () {
      if (typeof stopThinkingText === 'function') stopThinkingText();
      thinkEl.classList.remove('fc-active');
      done();
    }, 1800);
  }

  var iLines = [
    document.getElementById('fc-iline-0'),
    document.getElementById('fc-iline-1'),
    document.getElementById('fc-iline-2')
  ];
  var iTexts = [
    document.getElementById('fc-itext-0'),
    document.getElementById('fc-itext-1'),
    document.getElementById('fc-itext-2')
  ];
  var insightShownOnce = false;

  function setLineVis(visible) {
    iLines.forEach(function (el) {
      if (el) { if (visible) el.classList.add('fc-vis'); else el.classList.remove('fc-vis'); }
    });
  }

  function showInsight(demo, done) {
    if (!insightEl || !demo.insights) { done(); return; }

    var benefitsEl = document.getElementById('fc-benefits');

    if (insightStatusText) insightStatusText.textContent = demo.status || '';
    demo.insights.forEach(function (text, i) {
      if (iTexts[i]) iTexts[i].textContent = text;
    });

    if (!insightShownOnce) {
      if (benefitsEl) { benefitsEl.style.transition = 'opacity 300ms ease'; benefitsEl.style.opacity = '0'; }
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          insightEl.classList.add('fc-insight-visible');
          if (insightStatus) insightStatus.classList.add('fc-vis');
        });
      });
    } else {
      if (insightStatus) insightStatus.classList.add('fc-vis');
    }

    var delay0 = insightShownOnce ? 200 : 500;
    iLines.forEach(function (el, i) {
      if (el) later(function () { el.classList.add('fc-vis'); }, delay0 + i * 520);
    });

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
    var demo = DEMOS[demoIdx % DEMOS.length];
    demoIdx++;
    typeText(demo.text, function () {
      later(function () {
        flashButton(function () {
          later(function () {
            showInsight(demo, function () {
              later(runDemo, 700);
            });
          }, 250);
        });
      }, 500);
    });
  }

  if (!window.IntersectionObserver) return;
  var started = false;
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !started && !stopped && btn1 && !btn1.disabled) {
      started = true;
      io.disconnect();
      later(runDemo, 500);
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

  var LEFT_ITEMS = [
    'Offerten dauern zu lange.',
    'Zu viele interne Rückfragen.',
    'Informationen müssen gesucht werden.',
    'Wir erfassen Daten mehrfach.',
    'Excel verbindet unsere Prozesse.',
    'Kundenanfragen landen an mehreren Orten.',
    'Freigaben dauern zu lange.',
    'Manuelle Rapporte kosten Zeit.'
  ];
  var RIGHT_ITEMS = [
    'Mehr Zeit fürs Kerngeschäft.',
    'Weniger manuelle Arbeit.',
    'Klare Verantwortlichkeiten.',
    'Automatisierte Abläufe.',
    'Schnellere Reaktionszeiten.',
    'Weniger Fehler.',
    'Mehr Transparenz.',
    'Höhere Produktivität.'
  ];

  var leftEl     = document.getElementById('fc-side-left');
  var rightEl    = document.getElementById('fc-side-right');
  var leftSlots  = document.getElementById('fc-side-left-slots');
  var rightSlots = document.getElementById('fc-side-right-slots');
  var input      = document.getElementById('fc-input-1');
  var btn1       = document.getElementById('fc-btn-1');
  var section    = document.getElementById('ki-check');

  if (!leftEl || !rightEl || !leftSlots || !rightSlots) return;

  var stopped = false;
  var timers  = [];

  function later(fn, ms) {
    if (stopped) return;
    var t = setTimeout(function () { if (!stopped) fn(); }, ms);
    timers.push(t);
  }

  function stopSide() {
    if (stopped) return;
    stopped = true;
    timers.forEach(clearTimeout);
    [leftEl, rightEl].forEach(function (el) {
      el.classList.remove('fc-side-visible');
      setTimeout(function () { el.style.display = 'none'; }, 800);
    });
  }

  if (input) {
    ['focus', 'click', 'keydown', 'input', 'touchstart'].forEach(function (evt) {
      input.addEventListener(evt, stopSide, { passive: true });
    });
  }
  if (btn1) btn1.addEventListener('click', stopSide);
  if (section) section.addEventListener('mousemove', stopSide, { passive: true, once: true });

  function pickRandom(items, excludeSet) {
    var pool = items.filter(function (x) { return excludeSet.indexOf(x) === -1; });
    if (!pool.length) pool = items.slice();
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function runSlot(slotEl, items, allSlotEls, displayMs, pauseMs) {
    if (stopped) return;

    var visible = [];
    allSlotEls.forEach(function (s) {
      if (s !== slotEl && s.dataset.current) visible.push(s.dataset.current);
    });

    var item = pickRandom(items, visible);
    slotEl.dataset.current = item;
    slotEl.textContent = item;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (!stopped) slotEl.classList.add('fc-side-in');
      });
    });

    later(function () {
      slotEl.classList.remove('fc-side-in');
      delete slotEl.dataset.current;
      later(function () {
        runSlot(slotEl, items, allSlotEls,
          displayMs + (Math.random() - 0.5) * 1200,
          pauseMs   + (Math.random() - 0.5) * 600);
      }, pauseMs);
    }, displayMs);
  }

  function initSide(containerEl, slotsEl, items, sideStartDelay, numSlots) {
    var slotEls = [];
    for (var i = 0; i < numSlots; i++) {
      var s = document.createElement('span');
      s.className = 'fc-side-slot';
      slotsEl.appendChild(s);
      slotEls.push(s);
    }

    containerEl.classList.add('fc-side-visible');

    slotEls.forEach(function (slotEl, idx) {
      var delay = sideStartDelay + idx * 700 + Math.random() * 400;
      var displayMs = 4200 + Math.random() * 1800;
      var pauseMs   = 600  + Math.random() * 800;
      later(function () {
        runSlot(slotEl, items, slotEls, displayMs, pauseMs);
      }, delay);
    });
  }

  if (!section || !window.IntersectionObserver) return;
  var started = false;
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !started && !stopped) {
      started = true;
      io.disconnect();
      initSide(leftEl,  leftSlots,  LEFT_ITEMS,  600,  3);
      initSide(rightEl, rightSlots, RIGHT_ITEMS, 1400, 3);
    }
  }, { threshold: 0.35 });
  io.observe(section);

})();

/* ============================================================
   KI GEAR ANIMATION v3 — Ansatz Section (KIZahnrad)
============================================================ */
(function () {
  'use strict';

  var wrap = document.getElementById('ki-gear-anim');
  if (!wrap) return;

  var NS  = 'http://www.w3.org/2000/svg';
  var DEG = Math.PI / 180;
  var F   = 'Helvetica Neue, Helvetica, Arial, sans-serif';
  var EASE = 'cubic-bezier(.2,.62,.25,1)';

  // ── Geometry ─────────────────────────────────────────────
  var cx0 = 1300, cy0 = 640;
  var orbit = 378, satRO = 172;
  var Nc = 15, Ns = 11;
  var th0 = -90 * DEG;
  var OUT = 215;
  var OMEGA = 360 / 40;   // deg/s for center gear
  var RATIO = 15 / 11;    // tooth mesh ratio

  // ── Timing (speed = 1.6×) ────────────────────────────────
  var SPD      = 1.6;
  var travelMs = Math.round(800  / SPD);  // ~500ms
  var bStepMs  = Math.round(320  / SPD);  // ~200ms
  var pauseMs  = Math.round(350  / SPD);  // ~219ms
  var startMs  = Math.round(400  / SPD);  // ~250ms
  var stageDur = travelMs + bStepMs + pauseMs;
  function areaStart(i) { return startMs + i * stageDur; }

  // Pre-computed dock times (seconds from clock0) for satellite RAf sync
  var tDocks = [0, 1, 2, 3, 4].map(function(i) {
    return (areaStart(i) + travelMs) / 1000;
  });

  // ── Area data ────────────────────────────────────────────
  var AREAS = [
    { name: 'Vertrieb',    b: ['Lead-Generierung vollautomatisiert.'] },
    { name: 'Marketing',   b: ['Sichtbar im Web – und dort, wo KI antwortet.'] },
    { name: 'Buchhaltung', b: ['Schluss mit manueller Rechnungserfassung.'] },
    { name: 'HR',          b: ['Wir automatisieren HR-Prozesse vollumfänglich.'] },
    { name: 'IT',          b: ['IT-Prozesse, die mitdenken – optimiert & effizient.'] }
  ];

  // ── SVG helper ───────────────────────────────────────────
  function el(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    if (attrs) { for (var k in attrs) e.setAttribute(k, attrs[k]); }
    return e;
  }

  // ── Gear path (flat-trapezoid teeth, from KIZahnrad) ─────
  function gearPath(cx, cy, rO, rR, N, phase) {
    var step = 2 * Math.PI / N;
    var tw = step * 0.155, rw = step * 0.300;
    function P(r, a) { return (cx + r * Math.cos(a)).toFixed(2) + ' ' + (cy + r * Math.sin(a)).toFixed(2); }
    var d = '';
    for (var i = 0; i < N; i++) {
      var c = i * step + phase;
      if (i === 0) d += 'M' + P(rR, c - rw) + ' ';
      d += 'L' + P(rO, c - tw) + ' ';
      d += 'Q' + P(rO * 1.004, c) + ' ' + P(rO, c + tw) + ' ';
      d += 'L' + P(rR, c + rw) + ' ';
      d += 'L' + P(rR, c + step - rw) + ' ';
    }
    return d + 'Z';
  }

  // ── Tagline (HTML, above the diagram) ─────────────────────
  var tagEl = document.createElement('div');
  tagEl.className = 'ki-gear-tagline';
  tagEl.innerHTML = 'Ein System. Alle Bereiche. <em>KI im Zentrum.</em>';
  wrap.appendChild(tagEl);

  // ── Build SVG ────────────────────────────────────────────
  var svg = el('svg', {
    viewBox: '-230 -120 2990 1510', xmlns: NS, role: 'img',
    'aria-label': 'KI verbindet alle Geschäftsbereiche zu einem System'
  });
  svg.style.cssText = 'width:100%;height:auto;display:block;';

  var styleEl = el('style');
  styleEl.textContent =
    '@keyframes kg2-orbit  { to { transform: rotate(360deg); } }' +
    '@keyframes kg2-accent { 0%,100%{opacity:.8} 50%{opacity:.3} }' +
    '@keyframes kg2-sys    { from { transform: scale(1); opacity: .5; } to { transform: scale(2.6); opacity: 0; } }' +
    '.kg2-orbitA { transform-box: fill-box; transform-origin: center; animation: kg2-orbit 150s linear infinite; }' +
    '.kg2-orbitB { transform-box: fill-box; transform-origin: center; animation: kg2-orbit 185s linear infinite reverse; }';
  svg.appendChild(styleEl);

  // ── Defs ─────────────────────────────────────────────────
  var defs = el('defs');

  function linGrad(id, stops) {
    var g = el('linearGradient', { id: id, x1: '0', y1: '0', x2: '0', y2: '1' });
    stops.forEach(function(s) { g.appendChild(el('stop', { offset: s[0], 'stop-color': s[1] })); });
    return g;
  }
  function radGrad(id, gcx, gcy, gr, stops) {
    var g = el('radialGradient', { id: id, cx: gcx, cy: gcy, r: gr });
    stops.forEach(function(s) { g.appendChild(el('stop', { offset: s[0], 'stop-color': s[1] })); });
    return g;
  }
  function mkFlt(id, sd, x, y, w, h) {
    var f = el('filter', { id: id, x: x, y: y, width: w, height: h });
    f.appendChild(el('feGaussianBlur', { stdDeviation: sd })); return f;
  }

  defs.appendChild(linGrad('kg2-gN',  [['0%','#d3e0f0'],['52%','#b7cae2'],['100%','#9db6d6']]));
  defs.appendChild(linGrad('kg2-gKI', [['0%','#7d96bf'],['50%','#41598c'],['100%','#1d2e54']]));
  defs.appendChild(radGrad('kg2-fN',  '50%','34%','78%', [['0%','#d8e3f2'],['100%','#aec3de']]));
  defs.appendChild(radGrad('kg2-fKI', '50%','32%','80%', [['0%','#5e7aae'],['100%','#243a6a']]));

  var mkr = el('marker', { id:'kg2-arw', markerWidth:'9', markerHeight:'9', refX:'6.5', refY:'4.5', orient:'auto' });
  mkr.appendChild(el('path', { d:'M1,1 L7,4.5 L1,8', fill:'none', stroke:'#42598c', 'stroke-width':'1.5', 'stroke-linecap':'round', 'stroke-linejoin':'round' }));
  defs.appendChild(mkr);
  defs.appendChild(mkFlt('kg2-bs', '7', '-45%','-45%','190%','190%'));
  defs.appendChild(mkFlt('kg2-bh', '9', '-60%','-60%','220%','220%'));
  svg.appendChild(defs);

  // ── Orbit circles (slow decorative rotation) ──────────────
  var orbitA = el('circle', { cx:cx0, cy:cy0, r:'576', fill:'none', stroke:'#7f97c2', 'stroke-width':'1', 'stroke-dasharray':'2 15', opacity:'0.6' });
  orbitA.setAttribute('class', 'kg2-orbitA');
  var orbitB = el('circle', { cx:cx0, cy:cy0, r:'620', fill:'none', stroke:'#8ba2ca', 'stroke-width':'1', 'stroke-dasharray':'2 19', opacity:'0.55' });
  orbitB.setAttribute('class', 'kg2-orbitB');
  svg.appendChild(orbitA);
  svg.appendChild(orbitB);

  // ── Satellite definitions ────────────────────────────────
  var stepC = 2 * Math.PI / Nc;
  var satDefs = AREAS.map(function(a, i) {
    var th = th0 + i * 72 * DEG;
    var cos = Math.cos(th), sin = Math.sin(th);
    return {
      cx: +(cx0 + orbit * cos).toFixed(2),
      cy: +(cy0 + orbit * sin).toFixed(2),
      rO: satRO, rR: 144, rFace: 123, teeth: Ns, isCenter: false,
      phase: th + Math.PI,
      dx: +(cos * OUT).toFixed(2), dy: +(sin * OUT).toFixed(2),
      name: a.name, idx: i, cos: cos, sin: sin
    };
  });
  var centerDef = {
    cx: cx0, cy: cy0, rO: 230, rR: 200, rFace: 182, teeth: Nc, isCenter: true,
    phase: th0 - stepC / 2, dx: 0, dy: 0
  };

  // ── Pentagon connection lines ─────────────────────────────
  var connLines = satDefs.map(function(s, i) {
    var n = satDefs[(i + 1) % satDefs.length];
    var len = Math.hypot(+n.cx - +s.cx, +n.cy - +s.cy).toFixed(1);
    var line = el('line', { x1:s.cx, y1:s.cy, x2:n.cx, y2:n.cy, stroke:'#4a6396', 'stroke-width':'1.4' });
    line.style.opacity = '0';
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = len;
    line.style.transition = 'stroke-dashoffset 700ms ease ' + (i * 120) + 'ms, opacity 500ms ease ' + (i * 120) + 'ms';
    return line;
  });
  connLines.forEach(function(l) { svg.appendChild(l); });

  // One-shot "system complete" pulse — plays once when the last gear docks.
  var syspulse = el('circle', { cx:cx0, cy:cy0, r:'230', fill:'none', stroke:'#4a6396', 'stroke-width':'2.4' });
  syspulse.style.cssText = 'transform-box:fill-box;transform-origin:center;opacity:0;';
  svg.appendChild(syspulse);

  // ── Callout groups ────────────────────────────────────────
  var rEdge = orbit + satRO + 8;
  var rAx = 760, rAy = 570;
  var nudge = [{dx:0,dy:0},{dx:0,dy:-6},{dx:24,dy:14},{dx:-24,dy:14},{dx:0,dy:-6}];

  var callouts = satDefs.map(function(s, i) {
    var cos = s.cos, sin = s.sin;
    var ex = +(cx0 + rEdge * cos).toFixed(2);
    var ey = +(cy0 + rEdge * sin).toFixed(2);
    var side = cos > 0.25 ? 'right' : (cos < -0.25 ? 'left' : 'top');
    var ax, ay, tx, anchor, ty;
    if (side === 'top') {
      ax = cx0;
      ay = +(cy0 + (orbit + satRO + 90) * sin).toFixed(2);
      tx = cx0; anchor = 'middle';
      ty = ay - 44;
    } else {
      ax = +(cx0 + rAx * cos + nudge[i].dx).toFixed(2);
      ay = +(cy0 + rAy * sin + nudge[i].dy).toFixed(2);
      anchor = side === 'right' ? 'start' : 'end';
      tx = +(ax + (side === 'right' ? 18 : -18)).toFixed(2);
      ty = ay;
    }
    var len = Math.hypot(ax - ex, ay - ey).toFixed(1);

    var g = el('g');
    g.style.opacity = '0';
    g.style.transition = 'opacity 450ms ease';

    var leader = el('line', { x1:ex, y1:ey, x2:ax, y2:ay, stroke:'#42598c', 'stroke-width':'1.3', opacity:'0.8', 'marker-end':'url(#kg2-arw)' });
    leader.style.strokeDasharray = len;
    leader.style.strokeDashoffset = len;
    leader.style.transition = 'stroke-dashoffset 650ms ease 80ms';
    g.appendChild(leader);

    var bulletEl = el('text', { x:tx, y:+ty.toFixed(2), 'text-anchor':anchor, 'font-family':F, 'font-size':'32', 'font-weight':'700', fill:'#0f1f45' });
    bulletEl.textContent = AREAS[i].b[0];
    bulletEl.style.opacity = '0';
    bulletEl.style.transition = 'opacity 380ms ease';
    g.appendChild(bulletEl);

    svg.appendChild(g);
    return { g: g, leader: leader, bulletEls: [bulletEl] };
  });

  // ── Build one gear ────────────────────────────────────────
  function buildGear(gd, gi) {
    var rFace = gd.rFace;
    var rRing   = +(rFace - (gd.isCenter ? 9 : 6)).toFixed(2);
    var rGroove = +(rRing - 7).toFixed(2);
    var rHub    = +(rFace * (gd.isCenter ? 0.52 : 0.56)).toFixed(2);
    var glY     = +(gd.cy - rFace * 0.40).toFixed(2);
    var glRx    = +(rFace * 0.74).toFixed(2);
    var glRy    = +(rFace * 0.48).toFixed(2);

    var posG = el('g');  // position / fly-in group

    posG.appendChild(el('circle', {  // shadow
      cx: (gd.cx + 4).toFixed(2), cy: (gd.cy + 18).toFixed(2), r: gd.rO,
      fill: '#2a3c66', opacity: '0.28', filter: 'url(#kg2-bs)'
    }));

    var spinG = el('g');
    spinG.setAttribute('class', 'spin');
    spinG.setAttribute('data-gi', gi);
    spinG.style.cssText = 'transform-box:fill-box;transform-origin:center;';

    spinG.appendChild(el('path', {
      d: gearPath(gd.cx, gd.cy, gd.rO, gd.rR, gd.teeth, gd.phase),
      fill: gd.isCenter ? 'url(#kg2-gKI)' : 'url(#kg2-gN)',
      stroke: gd.isCenter ? '#101d38' : '#5c79a8', 'stroke-width': '1.1'
    }));
    spinG.appendChild(el('circle', { cx:gd.cx, cy:gd.cy, r:rFace, fill: gd.isCenter ? 'url(#kg2-fKI)' : 'url(#kg2-fN)' }));
    spinG.appendChild(el('circle', { cx:gd.cx, cy:gd.cy, r:rGroove, fill:'none', stroke:'#7d93bd', 'stroke-width':'1', opacity:'0.28' }));
    spinG.appendChild(el('circle', { cx:gd.cx, cy:gd.cy, r:rHub,   fill: gd.isCenter ? '#16264a' : '#c2d4ea', opacity: gd.isCenter ? '0.55' : '0.75' }));
    posG.appendChild(spinG);

    var ringEl = el('circle', { cx:gd.cx, cy:gd.cy, r:rRing, fill:'none', stroke: gd.isCenter ? '#b1c4dc' : '#5f7cb2', 'stroke-width': gd.isCenter ? '2.2' : '1.8' });
    ringEl.style.opacity = gd.isCenter ? '0.55' : '0';
    ringEl.style.transition = 'opacity 700ms ease';
    if (gd.isCenter) ringEl.style.animation = 'kg2-accent 3.6s ease-in-out infinite';
    posG.appendChild(ringEl);

    posG.appendChild(el('ellipse', { cx:gd.cx, cy:glY, rx:glRx, ry:glRy, fill:'#ffffff', opacity:'0.08', filter:'url(#kg2-bh)' }));

    var lbl = el('text', {
      x: gd.cx, y: gd.cy, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
      'font-family': F, 'font-size': gd.isCenter ? '92' : '31',
      'font-weight': '700', fill: gd.isCenter ? '#ffffff' : '#1b2c52',
      'letter-spacing': gd.isCenter ? '3' : '0', 'pointer-events': 'none'
    });
    lbl.textContent = gd.isCenter ? 'KI' : gd.name;
    posG.appendChild(lbl);

    return { posG: posG, spinG: spinG, ringEl: ringEl };
  }

  // Build satellites (rendered below center in Z-order)
  var satBuilts = satDefs.map(function(gd, i) {
    var built = buildGear(gd, i);
    built.posG.style.cssText = 'transform-box:fill-box;transform-origin:center;' +
      'transform:translate(' + gd.dx + 'px,' + gd.dy + 'px) scale(0.6);opacity:0;transition:none;';
    svg.appendChild(built.posG);
    return built;
  });

  // Build center gear (rendered on top)
  var centerBuilt = buildGear(centerDef, 5);
  svg.appendChild(centerBuilt.posG);

  wrap.appendChild(svg);

  // ── Reduced-motion: show everything instantly ─────────────
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    satBuilts.forEach(function(b, i) {
      b.posG.style.cssText = 'transform-box:fill-box;transform-origin:center;transform:translate(0,0) scale(1);opacity:1;';
      b.ringEl.style.opacity = '0.8';
    });
    callouts.forEach(function(c) {
      c.g.style.opacity = '1';
      c.leader.style.strokeDashoffset = '0';
      c.bulletEls.forEach(function(b) { b.style.opacity = '1'; });
    });
    connLines.forEach(function(l) { l.style.opacity = '0.6'; l.style.strokeDashoffset = '0'; });
    tagEl.style.opacity   = '1';
    tagEl.style.transform = 'translateY(0)';
    return;
  }

  // ── Animation runtime ────────────────────────────────────
  var timers = [];
  var clock0 = 0;
  var raf    = null;

  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function tick(now) {
    var t = (now - clock0) / 1000;
    var kiAng = OMEGA * t;
    svg.querySelectorAll('g.spin').forEach(function(node) {
      var gi  = +node.getAttribute('data-gi');
      var ang = (gi === 5) ? kiAng : -OMEGA * RATIO * Math.max(t, tDocks[gi]);
      node.style.transform = 'rotate(' + ang.toFixed(3) + 'deg)';
    });
    raf = requestAnimationFrame(tick);
  }

  function onAllDone() {
    connLines.forEach(function(l) { l.style.opacity = '0.6'; l.style.strokeDashoffset = '0'; });
    syspulse.style.animation = 'kg2-sys 1.4s cubic-bezier(.2,.6,.3,1) forwards';
    centerBuilt.ringEl.style.animation = 'kg2-accent 2.4s ease-in-out infinite';
    centerBuilt.ringEl.style.opacity   = '1';
    tagEl.style.opacity   = '1';
    tagEl.style.transform = 'translateY(0)';
  }

  function runSequence() {
    clearTimers();
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    clock0 = performance.now();
    raf = requestAnimationFrame(tick);

    // Reset satellites
    satBuilts.forEach(function(b, i) {
      b.posG.style.transition = 'none';
      b.posG.style.transform  = 'translate(' + satDefs[i].dx + 'px,' + satDefs[i].dy + 'px) scale(0.6)';
      b.posG.style.opacity    = '0';
      b.ringEl.style.opacity  = '0';
    });
    // Reset callouts
    callouts.forEach(function(c) {
      c.g.style.opacity = '0';
      c.leader.style.transition = 'none';
      c.leader.style.strokeDashoffset = c.leader.getAttribute('data-len') || c.leader.style.strokeDasharray;
      c.bulletEls.forEach(function(b) { b.style.opacity = '0'; });
    });
    connLines.forEach(function(l) { l.style.opacity = '0'; l.style.strokeDashoffset = l.style.strokeDasharray; });
    syspulse.style.animation = 'none';
    syspulse.style.opacity   = '0';
    tagEl.style.opacity   = '0';
    tagEl.style.transform = 'translateY(-10px)';
    centerBuilt.ringEl.style.animation = 'kg2-accent 3.6s ease-in-out infinite';
    centerBuilt.ringEl.style.opacity   = '0.55';
    void wrap.offsetWidth;

    var dockedCount = 0;
    satDefs.forEach(function(gd, i) {
      var a0 = areaStart(i);
      var b  = satBuilts[i];
      var c  = callouts[i];

      // Fly in
      timers.push(setTimeout(function() {
        b.posG.style.transition = 'transform ' + travelMs + 'ms ' + EASE + ', opacity ' + travelMs + 'ms ease';
        b.posG.style.transform  = 'translate(0px,0px) scale(1)';
        b.posG.style.opacity    = '1';
      }, a0));

      // Dock
      timers.push(setTimeout(function() {
        b.ringEl.style.opacity            = '0.8';
        c.leader.style.transition         = 'stroke-dashoffset 650ms ease 80ms';
        c.leader.style.strokeDashoffset   = '0';
        c.g.style.opacity                 = '1';
        dockedCount++;
        if (dockedCount === satDefs.length) onAllDone();
      }, a0 + travelMs));

      // Single bullet
      timers.push(setTimeout(function() {
        if (c.bulletEls[0]) c.bulletEls[0].style.opacity = '1';
      }, a0 + travelMs + 200));
    });
  }

  // Trigger once on scroll into view
  var triggered = false;
  var io = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      io.disconnect();
      runSequence();
    }
  }, { threshold: 0.2 });
  io.observe(wrap);

  // Replay on click
  wrap.addEventListener('click', function() { runSequence(); });

}());
