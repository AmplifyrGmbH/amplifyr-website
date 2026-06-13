/* ============================================================
   AMPLIFYR — page-webdesign.js
   Seitenspezifisches JS für webdesign.html
============================================================ */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {

    /* Scroll-Animationen */
    if (!reduced) {
      window.animateOnScroll('#sec-website .wd-split-text > *',   { stagger: 100 });
      window.animateOnScroll('#sec-seo .wd-split-text > *',       { stagger: 100 });
      window.animateOnScroll('#sec-rebranding .wd-split-text > *', { stagger: 100 });

      window.animateOnScroll('#sec-website .wd-split-visual',    { delay: 200 });
      window.animateOnScroll('#sec-seo .wd-split-visual',        { delay: 200 });
      window.animateOnScroll('#sec-rebranding .wd-split-visual', { delay: 200 });

      window.animateOnScroll('.wd-cta-content > *', { stagger: 120 });
    }

    /* Counter-Animation (scroll-triggered) */
    var metricsWrap = document.querySelector('.wdf-metrics');
    if (!metricsWrap) return;

    if (reduced) return; /* Werte bleiben wie im HTML gesetzt */

    var metTriggered = false;
    var metObserver = new IntersectionObserver(function (entries) {
      if (metTriggered || !entries[0].isIntersecting) return;
      metTriggered = true;
      metObserver.disconnect();
      document.querySelectorAll('.wdf-metric-val[data-target]').forEach(function (el) {
        animateCounter(el);
      });
    }, { threshold: 0.5 });
    metObserver.observe(metricsWrap);
  });

  function animateCounter(el) {
    var target   = parseFloat(el.dataset.target);
    var prefix   = el.dataset.prefix  || '';
    var suffix   = el.dataset.suffix  || '';
    var isFloat  = target % 1 !== 0;
    var duration = 1200;
    var start    = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var ease     = 1 - Math.pow(1 - progress, 3);
      var value    = isFloat
        ? (target * ease).toFixed(1)
        : Math.round(target * ease);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

}());
