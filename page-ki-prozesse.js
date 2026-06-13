/* ============================================================
   AMPLIFYR — page-ki-prozesse.js
   Seitenspezifisches JS für ki-prozesse.html
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
