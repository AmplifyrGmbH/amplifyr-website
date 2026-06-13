/* ============================================================
   AMPLIFYR — page-branchen-software.js
   Seitenspezifisches JS für branchen-software.html
============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      document.querySelectorAll('.bs-branch-card, .bs-step').forEach(function (el) {
        el.style.opacity = '1';
      });
      return;
    }

    /* Ansatz */
    window.animateOnScroll('#bs-ansatz .section-label', { delay: 0 });
    window.animateOnScroll('#bs-ansatz h2',             { delay: 120 });
    window.animateOnScroll('#bs-ansatz .bs-ansatz-text', { delay: 240 });
    window.animateOnScroll('.bs-checklist-item',        { stagger: 100, delay: 360 });

    /* Vorgehen */
    window.animateOnScroll('.bs-vorgehen-header > *', { stagger: 120 });
    window.animateOnScroll('.bs-step',                { stagger: 150 });

    /* Branchen */
    window.animateOnScroll('.bs-branchen-header > *', { stagger: 100 });
    window.animateOnScroll('.bs-branch-card',         { stagger: 120 });

    /* CTA */
    window.animateOnScroll('.bs-cta-content > *', { stagger: 120 });
  });

}());
