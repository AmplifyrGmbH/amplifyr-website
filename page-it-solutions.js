/* ============================================================
   AMPLIFYR — page-it-solutions.js
   Seitenspezifisches JS für it-solutions.html
============================================================ */

(function () {
  'use strict';

  var EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

  document.addEventListener('DOMContentLoaded', function () {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      /* Hover-Klassen sofort setzen, keine Animation */
      document.querySelectorAll('.ito-card, .cloud-card').forEach(function (el) {
        el.classList.add('hover-ready');
      });
      return;
    }

    /* Section Headers — gestaffelt */
    window.animateOnScroll('#sec-outsourcing .its-section-header > *', { stagger: 80, duration: 500 });
    window.animateOnScroll('#sec-managed .its-section-header > *',    { stagger: 80, duration: 500 });
    window.animateOnScroll('#sec-cloud .its-section-header > *',      { stagger: 80, duration: 500 });

    /* IT-Outsourcing Cards */
    initCardGrid('.ito-card', 120);

    /* Managed Services Tiles */
    initCardGrid('.ms-tile', 100);


    /* M365 Showcase Tabs */
    initM365Tabs();

    /* CTA Content */
    window.animateOnScroll('.its-cta-content > *', { stagger: 100, duration: 500 });

    /* Partner Ticker */
    initTicker();

    /* Support-Cards — Click-to-flip & einmalige Tease-Animation */
    var supCards = document.querySelectorAll('.sup-card');

    supCards.forEach(function (card) {
      card.addEventListener('click', function () {
        card.classList.toggle('is-flipped');
      });
    });

    if (supCards.length) {
      var teaseFired = false;
      var teaseObserver = new IntersectionObserver(function (entries) {
        if (teaseFired) return;
        if (!entries.some(function (e) { return e.isIntersecting; })) return;
        teaseFired = true;
        teaseObserver.disconnect();
        supCards.forEach(function (card, i) {
          setTimeout(function () {
            card.classList.add('is-teasing');
            setTimeout(function () { card.classList.remove('is-teasing'); }, 800);
          }, i * 110);
        });
      }, { threshold: 0.4 });
      supCards.forEach(function (card) { teaseObserver.observe(card); });
    }
  });

  /* Karten mit Entrance-Animation + Hover nach Abschluss */
  function initCardGrid(selector, stagger) {
    var els = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!els.length) return;

    var isMobile = window.matchMedia('(max-width: 767px)').matches;
    var delay    = isMobile ? 0 : stagger;

    els.forEach(function (el) {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(24px) scale(0.97)';
      el.style.willChange = 'opacity, transform';
    });

    var triggered = false;
    var anchor    = els[0].closest('section') || els[0].parentElement;
    var obs = new IntersectionObserver(function (entries) {
      if (triggered || !entries[0].isIntersecting) return;
      triggered = true;
      obs.disconnect();
      els.forEach(function (el, i) {
        var totalDelay = isMobile ? 0 : i * delay;
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
        }, totalDelay);
      });
    }, { threshold: 0.1 });

    obs.observe(anchor);
  }

  function initM365Tabs() {
    var tabs  = document.querySelectorAll('.m365-nav-btn');
    var panes = document.querySelectorAll('.m365-pane');
    if (!tabs.length) return;

    function activate(idx) {
      tabs.forEach(function (t, i) {
        t.classList.toggle('is-active', i === idx);
        t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
      panes.forEach(function (p, i) {
        p.classList.toggle('is-active', i === idx);
      });
    }

    tabs.forEach(function (btn, idx) {
      btn.addEventListener('click', function () { activate(idx); });
    });
  }

  function initTicker() {
    var track = document.querySelector('.partner-ticker-track');
    if (!track) return;

    var pos      = 0;
    var speed    = 1.0;
    var origW    = 0; /* Breite eines Sets (= Reset-Distanz) */

    function cloneUntilFull() {
      /* Originale Items merken (vor dem Klonen) */
      var origItems = Array.prototype.slice.call(track.querySelectorAll('.partner-item'));
      if (!origItems.length) return;

      /* Breite eines Sets messen */
      var trackRect  = track.getBoundingClientRect();
      var firstRect  = origItems[0].getBoundingClientRect();
      /* origW = Abstand vom Track-Start bis zum Start des ersten Items
                 + Gesamtbreite aller Orig-Items */
      /* Einfacher: scrollWidth der originalen Items */
      origW = track.scrollWidth;

      /* Klonen bis Track mindestens 3× Viewport breit */
      var minW = window.innerWidth * 3;
      while (track.scrollWidth < minW) {
        origItems.forEach(function (item) {
          track.appendChild(item.cloneNode(true));
        });
      }

      /* origW nach erstem Klon-Durchlauf neu messen:
         = offsetLeft des ersten geklonten Items relativ zum Track */
      var allItems  = track.querySelectorAll('.partner-item');
      var firstClone = allItems[origItems.length];
      if (firstClone) {
        var tr = track.getBoundingClientRect();
        var cr = firstClone.getBoundingClientRect();
        origW  = cr.left - tr.left;
      }
    }

    function step() {
      pos -= speed;
      if (origW > 0 && pos <= -origW) pos += origW;
      track.style.transform = 'translateX(' + pos + 'px)';
      requestAnimationFrame(step);
    }

    function start() {
      cloneUntilFull();
      requestAnimationFrame(step);
    }

    if (document.readyState === 'complete') {
      start();
    } else {
      window.addEventListener('load', start);
    }
  }

}());
