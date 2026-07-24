/* ============================================================
   AMPLIFYR — page-index-prototyp.js
   Prototype Landing Page — JS
   Enthalt: Hero-Animation, Ansatz, Team, neue Sektionen + Gear-Animation
============================================================ */

(function () {
  'use strict';

  var EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

  /* Markiert echte Touch-Nutzung auf <html>, damit CSS Hover-Effekte
     (Flip-Karten, Desktop-Breite) auf Touch-Geräten zuverlässig deaktivieren
     kann — robuster als eine reine hover/pointer-Media-Query. */
  document.addEventListener('touchstart', function onFirstTouch() {
    document.documentElement.classList.add('has-touch');
    document.removeEventListener('touchstart', onFirstTouch);
  }, { passive: true });

  /* ============================================================
     HERO ANIMATION (1:1 von page-index.js)
  ============================================================ */
  function initHero() {
    var hero      = document.getElementById('hero');
    var video     = hero && hero.querySelector('.hero-video');
    var phase1    = document.getElementById('hero-phase-1');
    var divider   = document.getElementById('hero-divider');
    var phase2    = document.getElementById('hero-phase-2');
    var heroPhil  = document.getElementById('hero-phil');
    var pbsL1          = document.getElementById('pbs-l1');
    var pbsL4          = document.getElementById('pbs-l4');
    var pbsKiQuoteWrap = document.getElementById('pbs-ki-quote-wrap');
    var pbsKiFomoWrap  = document.getElementById('pbs-ki-fomo-wrap');
    var fadeout        = document.getElementById('hero-fadeout');
    var ctaBanner      = document.getElementById('hero-cta-banner');

    if (!hero || !video) return;

    var reduced      = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var sloganDone   = false;
    var philStarted  = false;

    function showSlogan() {
      var DUR = 700;
      setTimeout(function () {
        phase1.style.transition = 'opacity ' + DUR + 'ms ' + EASE + ', transform ' + DUR + 'ms ' + EASE;
        phase1.style.opacity    = '1';
        phase1.style.transform  = 'translateX(0)';
      }, 1000);
      setTimeout(function () {
        phase2.style.transition = 'opacity ' + DUR + 'ms ' + EASE + ', transform ' + DUR + 'ms ' + EASE;
        phase2.style.opacity    = '1';
        phase2.style.transform  = 'translateX(0)';
      }, 2500);
    }

    function onVideoEnd() {
      if (philStarted) return;
      philStarted = true;
      var OUT = 300;
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
        pbsShow(pbsL1);
        pbsShow(pbsKiQuoteWrap);
        pbsShow(pbsKiFomoWrap);
        pbsShow(pbsL4);
        sloganDone = true;
        if (ctaBanner) ctaBanner.classList.add('is-visible');
      }, OUT);
    }

    function showEndState() {
      if (philStarted) return;
      philStarted = true;
      sloganDone  = true;
      if (video)     { video.pause(); video.currentTime = video.duration || 0; }
      if (fadeout)   { fadeout.style.transition  = 'none'; fadeout.style.opacity  = '1'; }
      if (phase1)    { phase1.style.transition   = 'none'; phase1.style.opacity   = '0'; }
      if (divider)   { divider.style.transition  = 'none'; divider.style.opacity  = '0'; }
      if (phase2)    { phase2.style.transition   = 'none'; phase2.style.opacity   = '0'; }
      if (heroPhil)  heroPhil.classList.add('is-revealed');
      if (pbsL1)          pbsL1.classList.add('pbs-show');
      if (pbsL4)          pbsL4.classList.add('pbs-show');
      if (pbsKiQuoteWrap) pbsKiQuoteWrap.classList.add('pbs-show');
      if (pbsKiFomoWrap)  pbsKiFomoWrap.classList.add('pbs-show');
      if (ctaBanner)      ctaBanner.classList.add('is-visible');
      setHeroSeen();
    }

    /* localStorage statt sessionStorage: die Animation soll wirklich nur
       einmalig abspielen (nicht pro Tab erneut) — persistiert daher über
       Tabs, Fenster und Neustarts des Browsers hinweg. Zugriff kann in
       restriktiven Browsing-Modi (z. B. manche Private-Browsing-Varianten)
       werfen — ungefangen würde das die gesamte initHero()-Funktion an
       dieser frühen Stelle abbrechen und Video, Slogan-Animation UND die
       statische Ansicht würden NIE erscheinen (nicht nur das Video).
       Defensiv behandeln: im Fehlerfall einfach wie "noch nicht gesehen"
       verhalten. */
    function getHeroSeen() {
      try { return localStorage.getItem('heroSeen_v2'); } catch (e) { return null; }
    }
    function setHeroSeen() {
      try { localStorage.setItem('heroSeen_v2', '1'); } catch (e) {}
    }

    if (getHeroSeen()) {
      showEndState();
    } else {
      showSlogan();

      video.addEventListener('ended', function () {
        onVideoEnd();
        setHeroSeen();
      });
      setTimeout(function () {
        if (!sloganDone) onVideoEnd();
      }, 8000);

      video.muted = true;
      video.defaultMuted = true;
      function attemptPlay() {
        var p = video.play();
        if (p && typeof p.catch === 'function') p.catch(function () {});
      }
      attemptPlay();
      ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough'].forEach(function (ev) {
        video.addEventListener(ev, attemptPlay, { once: true });
      });
      [100, 300, 800, 1500, 2500, 4000, 6000].forEach(function (delay) {
        setTimeout(function () { if (video.paused && !video.ended) attemptPlay(); }, delay);
      });
    }
  }

  /* ============================================================
     ANSATZ ANIMATION
  ============================================================ */
  function initAnsatz() {
    var section = document.getElementById('ansatz');
    if (!section) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    window.animateOnScroll('#ansatz .ansatz-visual', {
      threshold: 0.15, stagger: 120, delay: 200, duration: 600
    });
    window.animateOnScroll('#ansatz .ansatz-closing', {
      threshold: 0.2, delay: 100, duration: 600
    });
  }

  /* ============================================================
     TEAM ANIMATION (1:1 von page-index.js)
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
     NEUE SEKTIONEN — Scroll-Animationen
  ============================================================ */
  function initProtoSections() {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Stat-Counter-Animation */
    function animateCounter(el, target, duration) {
      var start   = null;
      var display = el;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var ease     = 1 - Math.pow(1 - progress, 3);
        display.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    /* KI-Zeitalter ─────────────────────────────────────────── */
    var kiSection = document.getElementById('proto-ki-zeitalter');
    if (kiSection) {
      var stats        = Array.prototype.slice.call(kiSection.querySelectorAll('.pkz-stat'));
      var fomoBlock    = kiSection.querySelector('.pkz-fomo');

      if (reduced) {
        stats.forEach(function (el)  { el.classList.add('is-visible'); });
        if (fomoBlock) fomoBlock.classList.add('is-visible');
      } else {
        var statsTriggered = false;
        var statsIO = new IntersectionObserver(function (entries) {
          if (statsTriggered || !entries[0].isIntersecting) return;
          statsTriggered = true;
          statsIO.disconnect();
          stats.forEach(function (stat, i) {
            setTimeout(function () {
              stat.classList.add('is-visible');
              var countEl = stat.querySelector('[data-count]');
              if (countEl) {
                var target = parseInt(countEl.getAttribute('data-count'), 10);
                animateCounter(countEl, target, 1100);
              }
            }, i * 200);
          });
        }, { threshold: 0.2 });
        if (stats[0]) statsIO.observe(stats[0].parentElement || kiSection);

        if (fomoBlock) {
          var fomoIO = new IntersectionObserver(function (entries) {
            if (!entries[0].isIntersecting) return;
            fomoIO.disconnect();
            fomoBlock.classList.add('is-visible');
          }, { threshold: 0.2 });
          fomoIO.observe(fomoBlock);
        }
      }
    }

    /* Praxis KI-Detail — Master-Detail Interaktion ─────────────── */
    var pkidItems = Array.prototype.slice.call(document.querySelectorAll('.pkid-item'));
    var pkidEntries = Array.prototype.slice.call(document.querySelectorAll('.pkid-panel-entry'));
    if (pkidItems.length && pkidEntries.length) {
      pkidItems.forEach(function (item, i) {
        item.addEventListener('click', function () {
          pkidItems.forEach(function (it) { it.classList.remove('is-active'); });
          pkidEntries.forEach(function (en) { en.classList.remove('is-active'); });
          item.classList.add('is-active');
          if (pkidEntries[i]) pkidEntries[i].classList.add('is-active');
        });
      });
    }

    /* Zeitstrahl-Schritte ───────────────────────────────────── */
    var ptlSteps = Array.prototype.slice.call(document.querySelectorAll('.ptl-step'));
    var ptlTimelineEl = document.querySelector('.ptl-timeline');
    if (ptlSteps.length) {
      if (reduced) {
        ptlSteps.forEach(function (el) { el.classList.add('is-visible'); });
        if (ptlTimelineEl) ptlTimelineEl.classList.add('ptl-ready');
      } else {
        /* Jeder Schritt bekommt is-visible zeitversetzt (Scroll-Reveal).
           Die Kurve NICHT nach einer geschätzten Verzögerung neu berechnen
           (bei langsamem Scrollen können mehrere Schritte gleichzeitig
           mitten in ihrem eigenen Transform-Übergang stecken — eine Neu-
           berechnung mit gemischt fertigen/noch bewegten Punkten verzieht
           die Kurve sichtbar). Stattdessen exakt auf transitionend jedes
           einzelnen Schritts reagieren, dann steht die Position garantiert
           fest, egal wie die Reveals zeitlich verschachtelt sind.

           Die Rakete darf zudem erst fliegen, wenn ALLE Schritte sichtbar
           sind (.ptl-ready, siehe CSS) — sonst verband die Kurve teils
           noch nicht eingeblendete (verschobene) Punkte mit bereits
           fertigen und wirkte dadurch schräg, obwohl jeder einzelne Punkt
           für sich am Ende korrekt sitzt. */
        var revealedCount = 0;
        ptlSteps.forEach(function (el, i) {
          el.addEventListener('transitionend', function (e) {
            if (e.propertyName !== 'transform') return;
            layoutTimelineArrows();
            if (el.classList.contains('is-visible')) {
              revealedCount++;
              if (revealedCount === ptlSteps.length && ptlTimelineEl) {
                layoutTimelineArrows();
                ptlTimelineEl.classList.add('ptl-ready');
              }
            }
          });
          var io = new IntersectionObserver(function (entries) {
            if (!entries[0].isIntersecting) return;
            io.disconnect();
            setTimeout(function () {
              el.classList.add('is-visible');
            }, i * 120);
          }, { threshold: 0.3 });
          io.observe(el);
        });
      }
    }

    /* Erste Berechnung erst NACH Font-Ladung (sonst werden Absatz-Umbrüche
       noch mit der Fallback-Schrift gemessen → Punkte sitzen leicht anders
       als nach dem finalen Layout, macht die Kurve beim Laden krumm). */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(layoutTimelineArrows);
    } else {
      layoutTimelineArrows();
    }
    window.addEventListener('load', layoutTimelineArrows);
    window.addEventListener('resize', debounce(layoutTimelineArrows, 150));
  }

  /* Das Eisberg-Artifact skaliert sich seit der "Real"-Version (echtes
     Eisberg-Foto) intern selbst anhand der Fensterbreite (deskScale) —
     hier wird nur noch die Höhe des iframes an den tatsächlichen Inhalt
     angepasst und der graue Rahmen ums Bild entfernt (gleiche Origin,
     daher zugreifbar). */
  /* Zeichnet eine Wachstumskurve exakt durch die 5 Zeitstrahl-Punkte
     (Desktop: Treppenform, Mobile: senkrecht — dieselbe Geometrie-Berechnung,
     nur die Punkt-Anordnung unterscheidet sich) und lässt eine Rakete per
     CSS Motion-Path entlang dieser Kurve fliegen. */
  function layoutTimelineArrows() {
    var timeline = document.querySelector('.ptl-timeline');
    if (!timeline) return;
    var svg    = document.getElementById('ptl-growth-svg');
    var path   = document.getElementById('ptl-growth-path');
    var rocket = document.getElementById('ptl-growth-rocket');
    if (!svg || !path || !rocket) return;

    var dots = Array.prototype.slice.call(timeline.querySelectorAll('.ptl-step-dot'));
    if (dots.length < 2) return;

    var tRect = timeline.getBoundingClientRect();
    var centers = dots.map(function (d) {
      var r = d.getBoundingClientRect();
      return { x: r.left + r.width / 2 - tRect.left, y: r.top + r.height / 2 - tRect.top };
    });

    /* Mobile (<900px, senkrechte Punktanordnung): nur eine gerade Linie
       Punkt-zu-Punkt, keine Kurve — die Rakete soll hier schlicht senkrecht
       von oben nach unten fliegen, ohne jede seitliche Krümmung. */
    var isDesktopTimeline = window.innerWidth >= 900;
    var d;
    if (!isDesktopTimeline) {
      d = 'M ' + centers[0].x.toFixed(1) + ' ' + centers[0].y.toFixed(1);
      for (var j = 1; j < centers.length; j++) {
        d += ' L ' + centers[j].x.toFixed(1) + ' ' + centers[j].y.toFixed(1);
      }
    } else {
      /* Desktop (Treppenform): Die 5 Punkte sind bereits exponentiell
         gestaffelt (siehe CSS-Treppe). Eine glatte Catmull-Rom-Spline durch
         alle Punkte (in Bezier umgerechnet) verbindet sie organisch — jeder
         Punkt wird exakt getroffen, und weil die zugrunde liegende
         Staffelung schon exponentiell ist, wirkt auch die Kurve klar
         exponentiell statt wie künstlich gebogene Einzelsegmente.

         Zentripetale statt uniforme Parametrisierung (alpha=0.5, Tangenten
         nach Punktabstand statt pauschal /6 skaliert): bei stark ungleichen
         Abständen zwischen den Punkten (z. B. durch unterschiedlich lange
         Schritt-Texte) überschwingt eine uniforme Catmull-Rom-Kurve seitlich —
         die Rakete kippte dadurch (via offset-rotate: auto) sichtbar schräg.
         Zentripetal verhindert dieses Überschwingen, ohne dass die Rakete
         ihre Ausrichtung zur Flugrichtung verliert. */
      var ALPHA = 0.5;
      var EPS = 1e-3;
      var dist = function (a, b) { return Math.hypot(b.x - a.x, b.y - a.y); };

      d = 'M ' + centers[0].x.toFixed(1) + ' ' + centers[0].y.toFixed(1);
      for (var i = 0; i < centers.length - 1; i++) {
        var p0 = centers[i === 0 ? 0 : i - 1];
        var p1 = centers[i];
        var p2 = centers[i + 1];
        var p3 = centers[i + 2 < centers.length ? i + 2 : centers.length - 1];

        var t0 = 0;
        var t1 = t0 + Math.pow(dist(p0, p1), ALPHA) + EPS;
        var t2 = t1 + Math.pow(dist(p1, p2), ALPHA) + EPS;
        var t3 = t2 + Math.pow(dist(p2, p3), ALPHA) + EPS;

        var m1x = (t2 - t1) * ((p1.x - p0.x) / (t1 - t0) - (p2.x - p0.x) / (t2 - t0) + (p2.x - p1.x) / (t2 - t1));
        var m1y = (t2 - t1) * ((p1.y - p0.y) / (t1 - t0) - (p2.y - p0.y) / (t2 - t0) + (p2.y - p1.y) / (t2 - t1));
        var m2x = (t2 - t1) * ((p2.x - p1.x) / (t2 - t1) - (p3.x - p1.x) / (t3 - t1) + (p3.x - p2.x) / (t3 - t2));
        var m2y = (t2 - t1) * ((p2.y - p1.y) / (t2 - t1) - (p3.y - p1.y) / (t3 - t1) + (p3.y - p2.y) / (t3 - t2));

        var cp1x = p1.x + m1x / 3;
        var cp1y = p1.y + m1y / 3;
        var cp2x = p2.x - m2x / 3;
        var cp2y = p2.y - m2y / 3;
        d += ' C ' + cp1x.toFixed(1) + ' ' + cp1y.toFixed(1) + ', ' +
                     cp2x.toFixed(1) + ' ' + cp2y.toFixed(1) + ', ' +
                     p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
      }
    }

    svg.setAttribute('viewBox', '0 0 ' + tRect.width + ' ' + tRect.height);
    path.setAttribute('d', d);
    rocket.style.offsetPath = 'path("' + d + '")';
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      var args = arguments;
      t = setTimeout(function () { fn.apply(null, args); }, wait);
    };
  }

  /* ============================================================
     INIT
  ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initAnsatz();
    initTeam();
    initProtoSections();
  });

}());

/* ============================================================
   KI GEAR ANIMATION — identisch mit page-index.js
============================================================ */
(function () {
  'use strict';

  var wrap = document.getElementById('ki-gear-anim');
  if (!wrap) return;

  var NS   = 'http://www.w3.org/2000/svg';
  var DEG  = Math.PI / 180;
  var F    = 'Helvetica Neue, Helvetica, Arial, sans-serif';
  var EASE = 'cubic-bezier(.2,.62,.25,1)';

  var MOBILE_BP = 760;
  var isMobile  = window.innerWidth < MOBILE_BP;

  var cx0 = 1300, cy0 = 640;
  var orbit = 378, satRO = 172;
  var Nc = 15, Ns = 11;
  var th0  = -90 * DEG;
  var OUT  = 215;
  var OMEGA = 360 / 40;
  var RATIO = 15 / 11;

  var SPD      = 1.6;
  var travelMs = Math.round(800  / SPD);
  var bStepMs  = Math.round(320  / SPD);
  var pauseMs  = Math.round(350  / SPD);
  var startMs  = Math.round(400  / SPD);
  var stageDur = travelMs + bStepMs + pauseMs;
  function areaStart(i) { return startMs + i * stageDur; }

  var tDocks = [0, 1, 2, 3, 4].map(function (i) {
    return (areaStart(i) + travelMs) / 1000;
  });

  var AREAS = [
    { name: 'Vertrieb',    b: ['Lead-Generierung vollautomatisiert.'] },
    { name: 'Marketing',   b: ['Sichtbar im Web – und dort, wo KI antwortet.'] },
    { name: 'Buchhaltung', b: ['Schluss mit manueller Rechnungserfassung.'] },
    { name: 'HR',          b: ['Wir automatisieren HR-Prozesse vollumfänglich.'] },
    { name: 'Kundenservice', b: ['Kundenanfragen automatisch bearbeiten – rund um die Uhr.'] }
  ];

  function el(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    if (attrs) { for (var k in attrs) e.setAttribute(k, attrs[k]); }
    return e;
  }

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

  var tagEl = document.createElement('div');
  tagEl.className = 'ki-gear-tagline';
  tagEl.innerHTML = 'Business Amplification f&#252;r alle Bereiche.<br><em>KI im Zentrum.</em>';
  wrap.appendChild(tagEl);

  function viewBoxFor(mobile) { return mobile ? '700 40 1200 1200' : '-230 -120 2990 1510'; }
  var svg = el('svg', {
    viewBox: viewBoxFor(isMobile), xmlns: NS, role: 'img',
    'aria-label': 'KI verbindet alle Gesch&#228;ftsbereiche zu einem System'
  });
  svg.style.cssText = isMobile
    ? 'width:100%;max-width:460px;height:auto;display:block;'
    : 'width:100%;max-width:3000px;height:auto;display:block;';

  var styleEl = el('style');
  styleEl.textContent =
    '@keyframes kg2-orbit  { to { transform: rotate(360deg); } }' +
    '@keyframes kg2-accent { 0%,100%{opacity:.8} 50%{opacity:.3} }' +
    '@keyframes kg2-sys    { from { transform: scale(1); opacity: .5; } to { transform: scale(2.6); opacity: 0; } }' +
    '.kg2-orbitA { transform-box: fill-box; transform-origin: center; animation: kg2-orbit 150s linear infinite; }' +
    '.kg2-orbitB { transform-box: fill-box; transform-origin: center; animation: kg2-orbit 185s linear infinite reverse; }';
  svg.appendChild(styleEl);

  var defs = el('defs');

  function linGrad(id, stops) {
    var g = el('linearGradient', { id: id, x1: '0', y1: '0', x2: '0', y2: '1' });
    stops.forEach(function (s) { g.appendChild(el('stop', { offset: s[0], 'stop-color': s[1] })); });
    return g;
  }
  function radGrad(id, gcx, gcy, gr, stops) {
    var g = el('radialGradient', { id: id, cx: gcx, cy: gcy, r: gr });
    stops.forEach(function (s) { g.appendChild(el('stop', { offset: s[0], 'stop-color': s[1] })); });
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
  mkr.appendChild(el('path', { d:'M1,1 L7,4.5 L1,8', fill:'none', stroke:'#7d9bd1', 'stroke-width':'1.5', 'stroke-linecap':'round', 'stroke-linejoin':'round' }));
  defs.appendChild(mkr);
  defs.appendChild(mkFlt('kg2-bs', '7', '-45%','-45%','190%','190%'));
  defs.appendChild(mkFlt('kg2-bh', '9', '-60%','-60%','220%','220%'));
  svg.appendChild(defs);

  var orbitA = el('circle', { cx:cx0, cy:cy0, r:'576', fill:'none', stroke:'#7f97c2', 'stroke-width':'1', 'stroke-dasharray':'2 15', opacity:'0.6' });
  orbitA.setAttribute('class', 'kg2-orbitA');
  var orbitB = el('circle', { cx:cx0, cy:cy0, r:'620', fill:'none', stroke:'#8ba2ca', 'stroke-width':'1', 'stroke-dasharray':'2 19', opacity:'0.55' });
  orbitB.setAttribute('class', 'kg2-orbitB');
  svg.appendChild(orbitA);
  svg.appendChild(orbitB);

  var stepC = 2 * Math.PI / Nc;
  var satDefs = AREAS.map(function (a, i) {
    var th  = th0 + i * 72 * DEG;
    var cos = Math.cos(th), sin = Math.sin(th);
    return {
      cx: +(cx0 + orbit * cos).toFixed(2), cy: +(cy0 + orbit * sin).toFixed(2),
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

  var connLines = satDefs.map(function (s, i) {
    var n   = satDefs[(i + 1) % satDefs.length];
    var len = Math.hypot(+n.cx - +s.cx, +n.cy - +s.cy).toFixed(1);
    var line = el('line', { x1:s.cx, y1:s.cy, x2:n.cx, y2:n.cy, stroke:'#7d9bd1', 'stroke-width':'1.4' });
    line.style.opacity           = '0';
    line.style.strokeDasharray   = len;
    line.style.strokeDashoffset  = len;
    line.style.transition = 'stroke-dashoffset 700ms ease ' + (i * 120) + 'ms, opacity 500ms ease ' + (i * 120) + 'ms';
    return line;
  });
  connLines.forEach(function (l) { svg.appendChild(l); });

  var syspulse = el('circle', { cx:cx0, cy:cy0, r:'230', fill:'none', stroke:'#7d9bd1', 'stroke-width':'2.4' });
  syspulse.style.cssText = 'transform-box:fill-box;transform-origin:center;opacity:0;';
  svg.appendChild(syspulse);

  var rEdge = orbit + satRO + 8;
  var rAx = 760, rAy = 570;
  var nudge = [{dx:0,dy:0},{dx:0,dy:-6},{dx:24,dy:14},{dx:-24,dy:14},{dx:0,dy:-6}];

  var callouts = satDefs.map(function (s, i) {
    var cos = s.cos, sin = s.sin;
    var ex  = +(cx0 + rEdge * cos).toFixed(2);
    var ey  = +(cy0 + rEdge * sin).toFixed(2);
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
    g.setAttribute('class', 'kg2-callout');
    g.style.opacity    = '0';
    g.style.transition = 'opacity 450ms ease';
    var leader = el('line', { x1:ex, y1:ey, x2:ax, y2:ay, stroke:'#7d9bd1', 'stroke-width':'1.3', opacity:'0.8', 'marker-end':'url(#kg2-arw)' });
    leader.style.strokeDasharray  = len;
    leader.style.strokeDashoffset = len;
    leader.style.transition = 'stroke-dashoffset 650ms ease 80ms';
    g.appendChild(leader);
    var bulletEl = el('text', { x:tx, y:+ty.toFixed(2), 'text-anchor':anchor, 'font-family':F, 'font-size':'32', 'font-weight':'700', fill:'#dbe7f9' });
    bulletEl.textContent = AREAS[i].b[0];
    bulletEl.style.opacity    = '0';
    bulletEl.style.transition = 'opacity 380ms ease';
    g.appendChild(bulletEl);
    svg.appendChild(g);
    return { g: g, leader: leader, bulletEls: [bulletEl] };
  });

  function buildGear(gd, gi) {
    var rFace  = gd.rFace;
    var rRing  = +(rFace - (gd.isCenter ? 9 : 6)).toFixed(2);
    var rGroove = +(rRing - 7).toFixed(2);
    var rHub   = +(rFace * (gd.isCenter ? 0.52 : 0.56)).toFixed(2);
    var glY    = +(gd.cy - rFace * 0.40).toFixed(2);
    var glRx   = +(rFace * 0.74).toFixed(2);
    var glRy   = +(rFace * 0.48).toFixed(2);

    var posG = el('g');

    posG.appendChild(el('circle', {
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
    spinG.appendChild(el('circle', { cx:gd.cx, cy:gd.cy, r:rHub, fill: gd.isCenter ? '#16264a' : '#c2d4ea', opacity: gd.isCenter ? '0.55' : '0.75' }));
    posG.appendChild(spinG);

    var ringEl = el('circle', { cx:gd.cx, cy:gd.cy, r:rRing, fill:'none', stroke: gd.isCenter ? '#b1c4dc' : '#5f7cb2', 'stroke-width': gd.isCenter ? '2.2' : '1.8' });
    ringEl.style.opacity   = gd.isCenter ? '0.55' : '0';
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

  var satBuilts = satDefs.map(function (gd, i) {
    var built = buildGear(gd, i);
    built.posG.style.cssText = 'transform-box:fill-box;transform-origin:center;' +
      'transform:translate(' + gd.dx + 'px,' + gd.dy + 'px) scale(0.6);opacity:0;transition:none;';
    svg.appendChild(built.posG);
    return built;
  });

  var centerBuilt = buildGear(centerDef, 5);
  svg.appendChild(centerBuilt.posG);

  wrap.appendChild(svg);

  var legend = document.createElement('div');
  legend.className = 'ki-gear-legend';
  var legendItems = AREAS.map(function (a, i) {
    var item = document.createElement('div');
    item.className = 'ki-gear-legend-item';
    var num = document.createElement('span');
    num.className = 'ki-gear-legend-num';
    num.textContent = (i + 1 < 10 ? '0' : '') + (i + 1);
    var copy = document.createElement('div');
    copy.className = 'ki-gear-legend-copy';
    var name = document.createElement('div');
    name.className = 'ki-gear-legend-name';
    name.textContent = a.name;
    var text = document.createElement('div');
    text.className = 'ki-gear-legend-text';
    text.textContent = a.b[0];
    copy.appendChild(name);
    copy.appendChild(text);
    item.appendChild(num);
    item.appendChild(copy);
    legend.appendChild(item);
    return item;
  });
  wrap.appendChild(legend);

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    satBuilts.forEach(function (b) {
      b.posG.style.cssText = 'transform-box:fill-box;transform-origin:center;transform:translate(0,0) scale(1);opacity:1;';
      b.ringEl.style.opacity = '0.8';
    });
    callouts.forEach(function (c) {
      c.g.style.opacity = '1';
      c.leader.style.strokeDashoffset = '0';
      c.bulletEls.forEach(function (b) { b.style.opacity = '1'; });
    });
    connLines.forEach(function (l) { l.style.opacity = '0.6'; l.style.strokeDashoffset = '0'; });
    legendItems.forEach(function (item) { item.classList.add('is-on'); });
    tagEl.style.opacity   = '1';
    tagEl.style.transform = 'translateY(0)';
    return;
  }

  var timers = [];
  var clock0 = 0;
  var raf    = null;

  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function tick(now) {
    var t     = (now - clock0) / 1000;
    var kiAng = OMEGA * t;
    svg.querySelectorAll('g.spin').forEach(function (node) {
      var gi  = +node.getAttribute('data-gi');
      var ang = (gi === 5) ? kiAng : -OMEGA * RATIO * Math.max(t, tDocks[gi]);
      node.style.transform = 'rotate(' + ang.toFixed(3) + 'deg)';
    });
    raf = requestAnimationFrame(tick);
  }

  function onAllDone() {
    connLines.forEach(function (l) { l.style.opacity = '0.6'; l.style.strokeDashoffset = '0'; });
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
    raf    = requestAnimationFrame(tick);

    satBuilts.forEach(function (b, i) {
      b.posG.style.transition = 'none';
      b.posG.style.transform  = 'translate(' + satDefs[i].dx + 'px,' + satDefs[i].dy + 'px) scale(0.6)';
      b.posG.style.opacity    = '0';
      b.ringEl.style.opacity  = '0';
    });
    callouts.forEach(function (c) {
      c.g.style.opacity = '0';
      c.leader.style.transition = 'none';
      c.leader.style.strokeDashoffset = c.leader.style.strokeDasharray;
      c.bulletEls.forEach(function (b) { b.style.opacity = '0'; });
    });
    connLines.forEach(function (l) { l.style.opacity = '0'; l.style.strokeDashoffset = l.style.strokeDasharray; });
    legendItems.forEach(function (item) { item.classList.remove('is-on'); });
    syspulse.style.animation = 'none';
    syspulse.style.opacity   = '0';
    tagEl.style.opacity   = '0';
    tagEl.style.transform = 'translateY(-10px)';
    centerBuilt.ringEl.style.animation = 'kg2-accent 3.6s ease-in-out infinite';
    centerBuilt.ringEl.style.opacity   = '0.55';
    void wrap.offsetWidth;

    var dockedCount = 0;
    satDefs.forEach(function (gd, i) {
      var a0 = areaStart(i);
      var b  = satBuilts[i];
      var c  = callouts[i];

      timers.push(setTimeout(function () {
        b.posG.style.transition = 'transform ' + travelMs + 'ms ' + EASE + ', opacity ' + travelMs + 'ms ease';
        b.posG.style.transform  = 'translate(0px,0px) scale(1)';
        b.posG.style.opacity    = '1';
      }, a0));

      timers.push(setTimeout(function () {
        b.ringEl.style.opacity          = '0.8';
        c.leader.style.transition       = 'stroke-dashoffset 650ms ease 80ms';
        c.leader.style.strokeDashoffset = '0';
        c.g.style.opacity               = '1';
        legendItems[i].classList.add('is-on');
        dockedCount++;
        if (dockedCount === satDefs.length) onAllDone();
      }, a0 + travelMs));

      timers.push(setTimeout(function () {
        if (c.bulletEls[0]) c.bulletEls[0].style.opacity = '1';
      }, a0 + travelMs + 200));
    });
  }

  var triggered = false;
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      io.disconnect();
      runSequence();
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  io.observe(wrap);

  wrap.addEventListener('click', function () { runSequence(); });

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var mobile = window.innerWidth < MOBILE_BP;
      if (mobile === isMobile) return;
      isMobile = mobile;
      svg.setAttribute('viewBox', viewBoxFor(isMobile));
      svg.style.maxWidth = isMobile ? '460px' : '3000px';
    }, 150);
  });

}());


/* ============================================================
   ECHTE VIEWPORT-HÖHE ALS CSS-VARIABLE (--vh)
   Für die Eisberg-Grafik (100% Bildschirmhöhe auf Mobile). Selbst
   100dvh weicht auf manchen Mobile-Browsern noch von der wirklich
   sichtbaren Höhe ab (z. B. Zusammenspiel Adressleiste + Safe-Area) —
   window.visualViewport.height ist die verlässlichste verfügbare Quelle,
   da sie exakt den aktuell sichtbaren Bereich abbildet (nicht das
   Layout-Viewport). Läuft bei jeder Grössenänderung neu, damit Ein-/
   Ausklappen der Adressleiste sofort nachgezogen wird. */
(function () {
  'use strict';

  function setVh() {
    var h = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
    document.documentElement.style.setProperty('--vh', (h * 0.01) + 'px');
  }

  setVh();
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', setVh);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setVh);
  }
}());

/* ============================================================
   EISBERG — "~" vor den 10%/90%-Kennzahlen
   Die Grafik liegt im eingebetteten Artifact (eisberg-artifact-v2.html),
   das wir nicht direkt bearbeiten (stark komprimierter/generierter
   Export). Da das Iframe von derselben Origin ist, lässt sich der Text
   stattdessen sicher von aussen per JS ergänzen, ohne die Artifact-Datei
   selbst anzufassen. "~" statt "≈", da das Artifact an anderer Stelle
   (Chat-Vorschau "~10 % des Potenzials") bereits dieselbe Konvention
   verwendet. MutationObserver als Absicherung, falls das Artifact diese
   Zahlen zur Laufzeit neu rendert. */
(function () {
  'use strict';

  var TPL_IDS = ['32', '35', '128', '131'];

  function ensureApprox(el) {
    if (!el || el.dataset.approxAdded === '1') return;
    var text = el.textContent.trim();
    if (/^\d+\s*%$/.test(text)) {
      /* "~" wird absolut positioniert links neben die Zahl gesetzt statt
         einfach als Text davorzuschreiben — reiner Text hätte den Block
         breiter gemacht und auf schmalen Layouts (z. B. Mobile, wo diese
         Zahl direkt neben einer Karte steht) in die Nachbar-Karte hinein
         überlappt. So bleibt die Layoutbreite der Zahl unverändert. */
      if (getComputedStyle(el).position === 'static') {
        el.style.position = 'relative';
      }
      var tilde = document.createElement('span');
      tilde.textContent = '~';
      tilde.setAttribute('aria-hidden', 'true');
      tilde.style.position = 'absolute';
      tilde.style.right = '100%';
      tilde.style.top = '0.05em';
      tilde.style.paddingRight = '0.05em';
      tilde.style.fontSize = '0.6em';
      el.insertBefore(tilde, el.firstChild);
      el.dataset.approxAdded = '1';
    }
  }

  function scan(frameDoc) {
    TPL_IDS.forEach(function (tpl) {
      ensureApprox(frameDoc.querySelector('[data-dc-tpl="' + tpl + '"]'));
    });
  }

  var iframe = document.getElementById('icb-frame');
  if (!iframe) return;

  function init() {
    var frameDoc;
    try { frameDoc = iframe.contentDocument; } catch (e) { return; }
    if (!frameDoc || !frameDoc.body) return;

    scan(frameDoc);

    var debounceTimer = null;
    var observer = new MutationObserver(function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () { scan(frameDoc); }, 50);
    });
    observer.observe(frameDoc.body, { childList: true, characterData: true, subtree: true });
  }

  iframe.addEventListener('load', function () { setTimeout(init, 300); });
}());

