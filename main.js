/* ============================================================
   AMPLIFYR — main.js
   Gemeinsames JS für alle Seiten
============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. AKTIVEN NAV-LINK SETZEN
  ============================================================ */
  function setActiveNavLinks() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var links = document.querySelectorAll('.nav-link, .mobile-nav-link, .mobile-nav-group__main-link');
    links.forEach(function (link) {
      var href = (link.getAttribute('href') || '').replace(/\/$/, '');
      if (href && href !== '#' && path === href) {
        link.classList.add('active');
      }
    });
  }

  /* ============================================================
     2. HEADER SCROLL-VERHALTEN
  ============================================================ */
  function initHeaderScroll() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var isLegal    = header.classList.contains('legal-mode');
    var hasHero    = header.classList.contains('hero-mode');
    var lastScroll = 0;
    var ticking    = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function () {
          var current = window.scrollY || window.pageYOffset;
          var goingUp = current < lastScroll;

          if (isLegal) {
            // Auf Legal-Seiten: immer legal-mode, kein hero-mode, kein hidden
            lastScroll = current;
            ticking = false;
            return;
          }

          if (current > 80) {
            header.classList.remove('hero-mode');
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
            if (hasHero) header.classList.add('hero-mode');
          }

          lastScroll = current <= 0 ? 0 : current;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initialzustand setzen
  }

  /* ============================================================
     3. HAMBURGER / MOBILE MENU
  ============================================================ */
  function initMobileMenu() {
    var burger     = document.getElementById('burger-btn');
    var menu       = document.getElementById('mobile-menu');
    var closeBtn   = document.getElementById('mobile-menu-close');

    if (!burger || !menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ============================================================
     4. MOBILE SUB-MENÜS
  ============================================================ */
  function initMobileSubMenus() {
    var triggers = document.querySelectorAll('.mobile-nav-group__chevron-btn');
    triggers.forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        var group = btn.closest('.mobile-nav-group');
        if (!group) return;
        var isOpen = group.classList.contains('is-open');
        group.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    });
  }

  /* ============================================================
     5. animateOnScroll() — HILFSFUNKTION FÜR ALLE SEITEN
  ============================================================ */
  function animateOnScroll(selector, options) {
    options      = options || {};
    var threshold = options.threshold || 0.15;
    var stagger   = options.stagger   || 0;
    var delay     = options.delay     || 0;
    var duration  = options.duration  || 500;
    var EASE      = 'cubic-bezier(0.22, 1, 0.36, 1)';

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!els.length) return;
    if (reduced) return;

    els.forEach(function (el) {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(20px)';
      el.style.willChange = 'opacity, transform';
    });

    var triggered = false;
    var obs = new IntersectionObserver(function (entries) {
      if (triggered || !entries[0].isIntersecting) return;
      triggered = true;
      obs.disconnect();
      els.forEach(function (el, i) {
        var totalDelay = delay + i * stagger;
        setTimeout(function () {
          el.style.transition = 'opacity ' + duration + 'ms ' + EASE + ', transform ' + duration + 'ms ' + EASE;
          el.style.opacity    = '1';
          el.style.transform  = 'translateY(0)';
          setTimeout(function () { el.style.willChange = ''; }, duration + 50);
        }, totalDelay);
      });
    }, { threshold: threshold });

    var anchor = els[0].closest('section') || els[0].parentElement || document.body;
    obs.observe(anchor);
  }

  // Global verfügbar machen für page-*.js
  window.animateOnScroll = animateOnScroll;

  /* ============================================================
     INIT
  ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    setActiveNavLinks();
    initHeaderScroll();
    initMobileMenu();
    initMobileSubMenus();
  });

}());


// ── Floating CTA: Raketen-Teaser ─────────────────────────────
(function initBaTeaser() {
  var teaser = document.getElementById('ba-chat-teaser');
  var btn    = document.getElementById('ba-teaser-btn');
  if (!teaser || !btn) return;

  // Auf der Homepage nicht initialisieren (KI-Check dort bereits sichtbar)
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') return;

  var wiggleTimer;

  // Nach 10 Sekunden einblenden (Bounce-In via CSS)
  setTimeout(function () {
    teaser.classList.add('ba-teaser-visible');

    // Wiggle alle 8 Sekunden starten (1.8s nach Erscheinen)
    function startWiggle() {
      teaser.classList.add('ba-teaser-wiggle');
      setTimeout(function () {
        teaser.classList.remove('ba-teaser-wiggle');
      }, 600);
      wiggleTimer = setTimeout(startWiggle, 8000);
    }
    setTimeout(startWiggle, 1800);
  }, 10000);

  // Beim Scrollen: kurz ausblenden, nach 600ms wieder einblenden
  var scrollTimer = null;
  window.addEventListener('scroll', function () {
    teaser.classList.add('ba-scroll-hidden');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      teaser.classList.remove('ba-scroll-hidden');
    }, 600);
  }, { passive: true });

  // Klick: zur KI-Check Sektion navigieren, Teaser ausblenden
  btn.addEventListener('click', function () {
    teaser.classList.remove('ba-teaser-visible');
    teaser.style.pointerEvents = 'none';
    clearTimeout(wiggleTimer);
    window.location.href = '/#ki-check';
  });
}());
