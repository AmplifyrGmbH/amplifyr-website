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
    initTeam();
    initProtoSections();
  });

}());


