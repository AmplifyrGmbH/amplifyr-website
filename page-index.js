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
  var WF3_KEY = '[KEY]'; // web3forms.com Access Key

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
    var heroPhil     = document.getElementById('hero-phil');
    var philL1       = heroPhil && heroPhil.querySelector('.hero-phil-l1');
    var philSub      = heroPhil && heroPhil.querySelector('.hero-phil-sub');
    var philEyebrow  = document.getElementById('phil-eyebrow');
    var philHeadline = document.getElementById('phil-headline');
    var philBlocksEl = document.getElementById('phil-blocks');
    var philBody     = document.getElementById('phil-body');
    var philBtb      = document.getElementById('phil-btb');
    var philLtr      = document.getElementById('phil-ltr');
    var fadeout    = document.getElementById('hero-fadeout');
    var scrollCue  = document.getElementById('hero-scroll-cue');

    var HEADLINE_TEXT = 'Digitalisierung als Selbstzweck ist Zeitverschwendung.';

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

    /* ── video.ended → neue Sequenz ── */
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

      // Phil-Container sichtbar machen
      setTimeout(function () {
        if (philL1)  { philL1.style.transition  = 'none'; philL1.style.opacity  = '1'; philL1.style.transform  = 'none'; }
        if (philSub) { philSub.style.transition = 'none'; philSub.style.opacity = '1'; philSub.style.transform = 'none'; }
      }, OUT);

      // Headline-Text vorab setzen (kein Typewriter)
      if (philHeadline) philHeadline.textContent = HEADLINE_TEXT;

      var t = OUT + 20;

      // Delays basierend auf Wortanzahl (×220ms) des vorherigen Elements
      // (1) Eyebrow — 5 Wörter → 800ms Pause
      setTimeout(function () { show(philEyebrow); }, t);
      // (2) Headline — 6 Wörter → 1100ms Pause
      setTimeout(function () { show(philHeadline); }, t + 800);
      // (3) Absatz 1 — 20 Wörter → 1600ms Pause
      setTimeout(function () {
        if (philBlocksEl) { philBlocksEl.style.transition = 'opacity 300ms ease'; philBlocksEl.style.opacity = '1'; }
      }, t + 1900);
      // (4) Absatz 2 — 14 Wörter → 1200ms Pause
      setTimeout(function () { show(philBody); }, t + 3500);
      // (5) BUILD THE BASE. — 3 Wörter → 500ms Pause
      setTimeout(function () { show(philBtb); }, t + 4700);
      // (6) LEAD THE RACE.
      setTimeout(function () {
        show(philLtr);
        if (scrollCue) scrollCue.classList.add('is-visible');
        sloganDone = true;
      }, t + 5200);
    }

    if (reduced) {
      if (phase1)  { phase1.style.opacity = '1'; phase1.style.transform = 'none'; }
      if (divider) { divider.style.opacity = '1'; divider.style.transform = 'none'; }
      if (phase2)  { phase2.style.opacity = '1'; phase2.style.transform = 'none'; }
      if (philL1)  { philL1.style.opacity = '1'; philL1.style.transform = 'none'; }
      if (philSub) { philSub.style.opacity = '1'; philSub.style.transform = 'none'; }
      if (philEyebrow)  philEyebrow.style.opacity  = '1';
      if (philHeadline) { philHeadline.textContent = HEADLINE_TEXT; philHeadline.style.opacity = '1'; }
      if (philBlocksEl) philBlocksEl.style.opacity = '1';
      if (philBody)     philBody.style.opacity      = '1';
      if (philBtb)      philBtb.style.opacity       = '1';
      if (philLtr)      philLtr.style.opacity       = '1';
      if (scrollCue) scrollCue.classList.add('is-visible');
    } else {
      showSlogan();
      video.addEventListener('ended', onVideoEnd);
      // Fallback: falls Video nicht endet (kein File, etc.)
      setTimeout(function () {
        if (!sloganDone) onVideoEnd();
      }, 9000);
    }

    // Hero fade on first scroll (nur wenn Phil-Text schon sichtbar)
    function onHeroScroll() {
      if (heroScrolled) return;
      heroScrolled = true;
      window.removeEventListener('scroll', onHeroScroll);
      window.removeEventListener('wheel',  onHeroScroll);
      if (fadeout) {
        fadeout.style.transition = 'opacity 500ms ' + EASE;
        fadeout.style.opacity    = '1';
      }
    }

    window.addEventListener('scroll', onHeroScroll, { passive: true });
    window.addEventListener('wheel',  onHeroScroll, { passive: true });
  }

  /* ============================================================
     PHILOSOPHIE ANIMATION
  ============================================================ */
  function initPhilosophie() {
    var section = document.getElementById('philosophie');
    if (!section) return;

    var l1   = section.querySelector('.phil-l1');
    var sub  = section.querySelector('.phil-sub');
    var l4   = section.querySelector('.phil-l4');
    var hint = document.getElementById('phil-scroll-hint');

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      if (l1)  { l1.style.opacity  = '1'; l1.style.transform  = 'none'; }
      if (sub) { sub.style.opacity = '1'; sub.style.transform = 'none'; }
      if (l4)  { l4.style.opacity  = '1'; l4.style.transform  = 'none'; }
      if (hint) hint.classList.add('is-visible');
      return;
    }

    var triggered = false;
    var obs = new IntersectionObserver(function (entries) {
      if (triggered || !entries[0].isIntersecting) return;
      triggered = true;
      obs.disconnect();

      if (l1) l1.classList.add('is-visible');

      setTimeout(function () {
        if (sub) sub.classList.add('is-visible');
      }, 700);

      setTimeout(function () {
        if (l4) l4.classList.add('is-visible');
      }, 1400);

      setTimeout(function () {
        if (hint) hint.classList.add('is-visible');
      }, 1900);

    }, { threshold: 0.3 });

    obs.observe(section);
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

  /* ============================================================
     KI-POTENZIAL-CHECK
  ============================================================ */
  function initKiCheck() {
    var input     = document.getElementById('kic-input');
    var submitBtn = document.getElementById('kic-submit');
    var chips     = document.querySelectorAll('.kic-chip');
    var field     = document.getElementById('kic-field');
    var heading   = document.getElementById('kic-heading');
    var sub       = document.getElementById('kic-sub');
    var statusEl  = document.getElementById('kic-status');
    var statusTxt = document.getElementById('kic-status-text');
    var thinking  = document.getElementById('kic-thinking');
    var result    = document.getElementById('kic-result');
    var tier1     = document.getElementById('kic-tier-1');
    var tier2     = document.getElementById('kic-tier-2');
    var tier3     = document.getElementById('kic-tier-3');
    var resetBtn  = document.getElementById('kic-reset');
    var leadBtn   = document.getElementById('kic-lead-btn');
    var emailIn   = document.getElementById('kic-email');
    var leadSucc  = document.getElementById('kic-lead-success');
    var leadForm  = document.getElementById('kic-lead');

    var placeholderEl = document.getElementById('kic-placeholder');

    if (!input || !submitBtn) return;

    // ── Rotating placeholder (typewriter) ───────────────────
    var PLACEHOLDERS = [
      'Meetings fressen unseren Arbeitstag …',
      'Offerten erstellen dauert viel zu lange …',
      'Rechnungsprüfung ist ein Chaos …',
      'Zu viele manuelle Aufgaben …',
      'Angebote dauern zu lange …',
      'Monatsabschluss kostet uns Tage …'
    ];
    var phIdx = 0;
    var phPaused = false;

    function typePlaceholder(text, charIdx, cb) {
      if (phPaused) return;
      if (!placeholderEl || placeholderEl.classList.contains('is-hidden')) return;
      placeholderEl.textContent = text.slice(0, charIdx);
      if (charIdx <= text.length) {
        setTimeout(function () { typePlaceholder(text, charIdx + 1, cb); }, 45);
      } else {
        setTimeout(cb, 2800);
      }
    }

    function nextPhrase() {
      if (phPaused) return;
      phIdx = (phIdx + 1) % PLACEHOLDERS.length;
      typePlaceholder(PLACEHOLDERS[phIdx], 0, nextPhrase);
    }

    if (placeholderEl) {
      typePlaceholder(PLACEHOLDERS[0], 0, nextPhrase);
    }

    // Pulse-Animation: läuft wenn Feld leer
    submitBtn.classList.add('kic-btn-pulse');

    // Hide overlay when user types, resume when empty
    input.addEventListener('input', function () {
      if (!placeholderEl) return;
      if (input.value.trim()) {
        phPaused = true;
        placeholderEl.classList.add('is-hidden');
        submitBtn.classList.remove('kic-btn-pulse');
      } else {
        phPaused = false;
        placeholderEl.classList.remove('is-hidden');
        placeholderEl.textContent = '';
        nextPhrase();
        submitBtn.classList.add('kic-btn-pulse');
      }
    });

    var TIER1_CHOICES = [
      'Rechnungen & Buchhaltung',
      'Offerten & Aufträge',
      'Kommunikation & E-Mail',
      'Planung & Termine',
      'Personalverwaltung'
    ];

    // Chip → Textarea
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        input.value = chip.textContent.trim();
        input.focus();
      });
    });

    // Submit on Enter (without Shift)
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        doSubmit();
      }
    });

    submitBtn.addEventListener('click', function () {
      submitBtn.classList.remove('kic-btn-pulse');
      submitBtn.classList.add('kic-btn-send');
      setTimeout(function () { submitBtn.classList.remove('kic-btn-send'); }, 560);
      doSubmit();
    });

    function setStatus(msg) {
      statusTxt.textContent = msg;
      statusEl.hidden = false;
      thinking.hidden = true;
    }

    function setThinking() {
      statusEl.hidden = true;
      thinking.hidden = false;
    }

    function clearFeedback() {
      statusEl.hidden  = true;
      thinking.hidden  = true;
    }

    function hideInput() {
      field.hidden   = true;
      heading.hidden = true;
      sub.hidden     = true;
    }

    function showResult() {
      result.hidden = false;
      resetBtn.hidden = false;
    }

    function showTier(n) {
      tier1.hidden = (n !== 1);
      tier2.hidden = (n !== 2);
      tier3.hidden = (n !== 3);
      showResult();
    }

    function doSubmit() {
      var val = (input.value || '').trim();
      if (!val) {
        input.focus();
        return;
      }

      var len = val.length;

      if (len < 15) {
        hideInput();
        clearFeedback();
        renderTier1();
        return;
      }

      hideInput();
      setStatus('Analyse läuft …');
      setThinking();

      callApi(val, len >= 120 ? 3 : 2);
    }

    function renderTier1() {
      // Choices
      var container = document.getElementById('kic-tier1-choices');
      container.innerHTML = '';
      TIER1_CHOICES.forEach(function (label) {
        var btn = document.createElement('button');
        btn.className   = 'kic-tier1-chip';
        btn.type        = 'button';
        btn.textContent = label;
        btn.addEventListener('click', function () {
          input.value = label + ' …';
          field.hidden   = false;
          heading.hidden = false;
          sub.hidden     = false;
          result.hidden  = true;
          resetBtn.hidden = true;
          tier1.hidden   = true;
          input.focus();
        });
        container.appendChild(btn);
      });
      showTier(1);
    }

    function callApi(message, targetTier) {
      var buffer = '';

      fetch(AI_CHECK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        var reader = res.body.getReader();
        var decoder = new TextDecoder();
        var sseBuffer = '';

        function readChunk() {
          return reader.read().then(function (result) {
            if (result.done) {
              // Stream ended — parse final SSE event
              parseSseBuffer(sseBuffer, targetTier);
              return;
            }
            sseBuffer += decoder.decode(result.value, { stream: true });
            return readChunk();
          });
        }
        return readChunk();
      }).catch(function () {
        clearFeedback();
        setStatus('Etwas hat nicht geklappt. Bitte versuchen Sie es nochmals.');
        resetBtn.hidden = false;
      });
    }

    function parseSseBuffer(raw, targetTier) {
      var lines = raw.split('\n');
      var doneEvent = null;
      lines.forEach(function (line) {
        line = line.trim();
        if (line.indexOf('data: ') !== 0) return;
        var json = line.slice(6);
        try {
          var obj = JSON.parse(json);
          if (obj.done) doneEvent = obj;
        } catch (e) {}
      });

      clearFeedback();

      if (!doneEvent) {
        setStatus('Etwas hat nicht geklappt. Bitte versuchen Sie es nochmals.');
        resetBtn.hidden = false;
        return;
      }

      if (doneEvent.error) {
        setStatus('Etwas hat nicht geklappt. Bitte versuchen Sie es nochmals.');
        resetBtn.hidden = false;
        return;
      }

      if (!doneEvent.valid) {
        document.getElementById('kic-tier1-text').textContent = doneEvent.message || 'Bitte beschreiben Sie eine betriebliche Herausforderung.';
        document.getElementById('kic-tier1-choices').innerHTML = '';
        showTier(1);
        return;
      }

      if (targetTier === 2) {
        renderTier2(doneEvent);
      } else {
        renderTier3(doneEvent);
      }
    }

    function renderTier2(data) {
      document.getElementById('kic-tier2-text').textContent = data.beobachtung || '';

      var ul = document.getElementById('kic-tier2-causes');
      ul.innerHTML = '';
      (data.ursachen || []).forEach(function (u) {
        var li = document.createElement('li');
        li.textContent = u;
        ul.appendChild(li);
      });

      // CTA
      var choices = document.getElementById('kic-tier2-choices');
      choices.innerHTML = '';
      var a = document.createElement('a');
      a.href      = '/formular';
      a.className = 'btn btn--white btn--sm';
      a.textContent = 'Kostenlose Einschätzung anfragen →';
      choices.appendChild(a);

      showTier(2);
    }

    function renderTier3(data) {
      // Score ring
      var score = parseInt(data.score, 10) || 72;
      renderScoreRing(score);

      // Bottlenecks (ursachen)
      var ul = document.getElementById('kic-bottlenecks');
      ul.innerHTML = '';
      (data.ursachen || []).forEach(function (u) {
        var li = document.createElement('li');
        li.textContent = u;
        ul.appendChild(li);
      });

      // Potential (uebersehen) — split by \n
      var potEl = document.getElementById('kic-potential');
      var sentences = (data.uebersehen || '').split('\n').filter(function (s) { return s.trim(); });
      potEl.innerHTML = sentences.map(function (s) {
        return '<span>' + escapeHtml(s.trim()) + '</span>';
      }).join('<br><br>');

      // Rueckfrage
      document.getElementById('kic-steps').textContent = data.rueckfrage || '';

      showTier(3);

      // Lead form — bind once, store data reference
      if (leadBtn && emailIn && !leadBtn._bound) {
        leadBtn._bound = true;
        leadBtn._data = data;
        leadBtn.addEventListener('click', function () {
          var email = (emailIn.value || '').trim();
          if (!email || !email.includes('@')) {
            emailIn.focus();
            return;
          }
          submitLead(email, leadBtn._data);
        });
      } else if (leadBtn) {
        leadBtn._data = data;
      }
    }

    function renderScoreRing(score) {
      var r   = 44;
      var cx  = 56;
      var cy  = 56;
      var c   = 2 * Math.PI * r;
      var off = c * (1 - score / 100);

      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class',   'kic-ring-svg');
      svg.setAttribute('width',   '112');
      svg.setAttribute('height',  '112');
      svg.setAttribute('viewBox', '0 0 112 112');
      svg.setAttribute('aria-hidden', 'true');

      var track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      track.setAttribute('class', 'kic-ring-track');
      track.setAttribute('cx', cx);
      track.setAttribute('cy', cy);
      track.setAttribute('r',  r);

      var fill = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      fill.setAttribute('class',            'kic-ring-fill');
      fill.setAttribute('cx',               cx);
      fill.setAttribute('cy',               cy);
      fill.setAttribute('r',                r);
      fill.setAttribute('stroke-dasharray', c);
      fill.setAttribute('stroke-dashoffset', c); // Start at 0, animate to off
      fill.id = 'kic-ring-fill-el';

      var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('class', 'kic-ring-percent');
      text.setAttribute('x', cx);
      text.setAttribute('y', cy);
      text.textContent = score + '%';

      svg.appendChild(track);
      svg.appendChild(fill);
      svg.appendChild(text);

      var container = document.getElementById('kic-score-ring');
      container.innerHTML = '';
      container.appendChild(svg);

      var labelEl = document.createElement('p');
      labelEl.className   = 'kic-ring-label';
      labelEl.textContent = 'Automatisierbar';
      container.appendChild(labelEl);

      var tipEl = document.createElement('p');
      tipEl.className   = 'kic-ring-tooltip';
      tipEl.textContent = 'Studienbasierter Orientierungswert';
      container.appendChild(tipEl);

      // Animate fill after short delay
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          fill.style.strokeDashoffset = off;
        });
      });
    }

    function submitLead(email, data) {
      if (leadBtn) {
        leadBtn.disabled     = true;
        leadBtn.textContent  = '…';
      }

      var payload = {
        access_key:   WF3_KEY,
        email:        email,
        subject:      'KI-Potenzial-Check — Vollanalyse anfragen',
        beobachtung:  data.beobachtung || '',
        score:        String(data.score || ''),
        rueckfrage:   data.rueckfrage || ''
      };

      fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify(payload)
      }).then(function (res) {
        if (leadForm)  leadForm.hidden  = true;
        if (leadSucc)  leadSucc.hidden  = false;
      }).catch(function () {
        if (leadForm)  leadForm.hidden  = true;
        if (leadSucc)  leadSucc.hidden  = false;
      });
    }

    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    // Reset
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        input.value     = '';
        field.hidden    = false;
        heading.hidden  = false;
        sub.hidden      = false;
        result.hidden   = true;
        resetBtn.hidden = true;
        tier1.hidden    = true;
        tier2.hidden    = true;
        tier3.hidden    = true;
        clearFeedback();
        input.focus();
      });
    }
  }

  /* ============================================================
     INIT
  ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initAnsatz();
    initLeistungen();
    initTeam();
    initKiCheck();
  });

}());
