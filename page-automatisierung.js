/* ============================================================
   AMPLIFYR — page-automatisierung.js
   Seitenspezifisches JS für automatisierung.html
============================================================ */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* prefers-reduced-motion: Chat sofort sichtbar */
  if (reduced) {
    ['cmsg1', 'cmsg2', 'cmsg3', 'cmsg4'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.hidden = false;
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (reduced) return;

    /* Scroll-Animationen */
    window.animateOnScroll('#sec-chatbot .its-section-header > *',  { stagger: 100 });
    window.animateOnScroll('#sec-telefonie .its-section-header > *', { stagger: 100 });
    window.animateOnScroll('#sec-automation .its-section-header > *',{ stagger: 100 });

    window.animateOnScroll('.bs-checklist-item',                     { stagger: 80 });
    window.animateOnScroll('#sec-telefonie .ki-feature-card',        { stagger: 120 });
    window.animateOnScroll('#sec-automation .ki-feature-card',       { stagger: 150 });
    window.animateOnScroll('.ki-cta-content > *',                    { stagger: 120 });

    /* Chat-Demo: scroll-triggered */
    var chatWrap = document.getElementById('chatMockupWrap');
    if (chatWrap && window.IntersectionObserver) {
      var chatTriggered = false;
      var chatObserver = new IntersectionObserver(function (entries) {
        if (chatTriggered || !entries[0].isIntersecting) return;
        chatTriggered = true;
        chatObserver.disconnect();
        startChatDemo();
      }, { threshold: 0.4 });
      chatObserver.observe(chatWrap);
    }
  });

  function startChatDemo() {
    var sequence = [
      { el: 'cmsg1',    delay: 0 },
      { el: 'ctyping1', delay: 800,  hideAfter: 1400 },
      { el: 'cmsg2',    delay: 2200 },
      { el: 'cmsg3',    delay: 3400 },
      { el: 'ctyping2', delay: 4200, hideAfter: 1400 },
      { el: 'cmsg4',    delay: 5600 }
    ];

    sequence.forEach(function (step) {
      setTimeout(function () {
        var el = document.getElementById(step.el);
        if (!el) return;
        el.hidden = false;
        el.classList.add('chat-visible');
        if (step.hideAfter) {
          setTimeout(function () {
            el.style.display = 'none';
          }, step.hideAfter);
        }
      }, step.delay);
    });
  }

}());

/* ============================================================
   PROZESSGRAFIK — Iframe-Höhe an tatsächlichen Inhalt anpassen
   Das Artifact ist ein normal fliessender Inhaltsblock (keine feste
   Aspect-Ratio wie das Eisberg-Diagramm) und reflowt bei schmalen
   Breakpoints komplett anders (vertikal statt horizontal) — ein Iframe
   hat von sich aus keine intrinsische Höhe, darum wird sie hier live per
   JS aus dem tatsächlichen Inhalt (gleiche Origin, daher zugänglich)
   ausgelesen und übernommen. ResizeObserver auf den Iframe-Body selbst
   deckt sowohl Breakpoint-Wechsel als auch spätes Nachladen (Fonts,
   Bilder) automatisch ab. */
(function () {
  'use strict';

  var iframe = document.getElementById('prozgraf-frame');
  if (!iframe) return;

  function resize() {
    try {
      var doc = iframe.contentDocument;
      if (doc && doc.body) {
        iframe.style.height = doc.body.scrollHeight + 'px';
      }
    } catch (e) {}
  }

  iframe.addEventListener('load', function () {
    resize();
    setTimeout(resize, 300);
    setTimeout(resize, 1200);
    try {
      var doc = iframe.contentDocument;
      if (doc && doc.body && window.ResizeObserver) {
        new ResizeObserver(resize).observe(doc.body);
      }
    } catch (e) {}
  });

  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', resize);
}());
