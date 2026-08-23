/* ============================================================
   AMPLIFYR — main.js
   Gemeinsames JS für alle Seiten
============================================================ */

(function () {
  'use strict';

  /* ============================================================
     0. MOBILE VIEWPORT HEIGHT FIX
     Verhindert den Zoom-Effekt wenn die Browser-Adressleiste
     beim Scrollen auftaucht/verschwindet (iOS Safari, Brave, Chrome).
  ============================================================ */
  function setVH() {
    document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
  }
  setVH();
  window.addEventListener('resize', setVH, { passive: true });

  /* ============================================================
     1. AKTIVEN NAV-LINK SETZEN
  ============================================================ */
  function setActiveNavLinks() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var links = document.querySelectorAll('.nav-link, .mobile-nav-link');
    links.forEach(function (link) {
      var href = (link.getAttribute('href') || '').replace(/\/$/, '');
      if (href && href !== '#' && path === href) {
        link.classList.add('is-active');
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

    // Sub-Links: Menü schliessen bei Klick
    var subLinks = menu.querySelectorAll('.mobile-nav-group__sub a');
    subLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

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
     SHARED: FAQ ACCORDION
     Aktiviert automatisch auf jeder Seite mit .kit-faq-btn
  ============================================================ */
  function initKitFaq() {
    var btns = document.querySelectorAll('.kit-faq-btn');
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var answerId = btn.getAttribute('aria-controls');
        var answer   = document.getElementById(answerId);
        if (!answer) return;
        btns.forEach(function (b) {
          b.setAttribute('aria-expanded', 'false');
          var a = document.getElementById(b.getAttribute('aria-controls'));
          if (a) a.hidden = true;
        });
        if (!expanded) {
          btn.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
        }
      });
    });
  }

  /* ============================================================
     SHARED: FAQ-BLOCK ZUKLAPPBAR (.faq-toggle)
     Aktiviert automatisch auf jeder Seite mit .faq-toggle. Ohne JS
     bleibt der Button versteckt (hidden-Attribut im HTML) und der
     Fragenblock offen — nie unbenutzbar, nur länger.
  ============================================================ */
  function initFaqToggle() {
    var toggles = document.querySelectorAll('.faq-toggle');
    toggles.forEach(function (btn) {
      var list = document.getElementById(btn.getAttribute('aria-controls'));
      var lbl  = btn.querySelector('.faq-toggle-label');
      if (!list || !lbl) return;

      btn.removeAttribute('hidden');

      function set(open) {
        list.classList.toggle('is-collapsed', !open);
        list.style.display = open ? '' : 'none'; // unabhaengig von der CSS-Datei
        list.hidden = !open;
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.classList.toggle('is-open', open);
        lbl.textContent = open ? 'Antworten ausblenden' : 'Antworten anzeigen';
      }
      set(false); // zugeklappt starten
      btn.addEventListener('click', function () {
        set(btn.getAttribute('aria-expanded') !== 'true');
      });
    });
  }

  /* ============================================================
     SHARED: SCROLL-LEGENDE (.jrail)
     Aktiviert automatisch auf jeder Seite mit <nav class="jrail">.
     data-dark am <nav> (CSS-Selektor) listet die dunklen Sections
     der Seite auf — Default ".site-cta". Da die Legende fixiert
     ist, wird JEDER Listenpunkt einzeln geprüft, über welchem
     Abschnitt er gerade steht (mix-blend-mode ist auf fixierten
     Elementen browserübergreifend nicht zuverlässig).
  ============================================================ */
  function initJrail() {
    var rail = document.querySelector('.jrail');
    if (!rail) return;
    var links = [].slice.call(rail.querySelectorAll('a'));
    var lis   = [].slice.call(rail.querySelectorAll('li'));
    var ziele = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    var hero  = document.querySelector('.fsh') || document.querySelector('main section');
    var footer = document.querySelector('footer');
    var dunkelEls = [].slice.call(document.querySelectorAll(rail.getAttribute('data-dark') || '.site-cta'));
    var wartet = false, aktiv = -1;

    function oben(el) { return el.getBoundingClientRect().top + window.pageYOffset; }

    function istDunkel(y) {
      return dunkelEls.some(function (el) {
        var r = el.getBoundingClientRect();
        return y >= r.top && y <= r.bottom;
      });
    }

    function mal() {
      wartet = false;
      var y = window.pageYOffset, h = window.innerHeight, n = ziele.length;
      rail.classList.toggle('on', y > (hero ? oben(hero) + hero.offsetHeight - 140 : 200));

      var railH = rail.offsetHeight;
      var mitte = h / 2;
      if (footer) mitte = Math.min(mitte, footer.getBoundingClientRect().top - 20 - railH / 2);
      mitte = Math.min(mitte, h - 100 - railH / 2); // Platz für fixierten Chat-Button (.fchat) unten rechts freihalten
      rail.style.top = mitte + 'px';

      var thresh = y + 80;
      var i = 0;
      for (var k = n - 1; k >= 0; k--) { if (ziele[k] && oben(ziele[k]) <= thresh) { i = k; break; } }
      if ((y + h) >= document.documentElement.scrollHeight - 10) { i = n - 1; }

      var activeLi = lis[i];
      var fillPx = activeLi ? activeLi.offsetTop : 0;
      rail.style.setProperty('--p', fillPx + 'px');
      rail.classList.toggle('dunkel-active', activeLi ? istDunkel(activeLi.getBoundingClientRect().top + activeLi.offsetHeight / 2) : false);

      lis.forEach(function (li) {
        var r = li.getBoundingClientRect();
        li.classList.toggle('dunkel', istDunkel(r.top + r.height / 2));
      });

      if (i === aktiv) return;
      aktiv = i;
      links.forEach(function (a, k) {
        if (k === i) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }

    function tick() { if (!wartet) { wartet = true; requestAnimationFrame(mal); } }
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    if ('ResizeObserver' in window) new ResizeObserver(tick).observe(document.body);
    mal();
  }

  /* ============================================================
     SHARED: MOBILE-FORTSCHRITTSLEISTE (.mobile-progress)
     Ersatz fuer .jrail auf schmalen Screens (dort ab 900px per CSS
     ausgeblendet, siehe style.css) — zeigt als duenner Balken ganz
     oben, wie weit man auf der Seite gescrollt hat.
  ============================================================ */
  function initMobileProgress() {
    var fill = document.querySelector('.mobile-progress-fill');
    if (!fill) return;
    var wartet = false;

    function mal() {
      wartet = false;
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var pct = scrollable > 0 ? (window.pageYOffset / scrollable) * 100 : 0;
      fill.style.width = Math.min(100, Math.max(0, pct)) + '%';
    }

    function tick() { if (!wartet) { wartet = true; requestAnimationFrame(mal); } }
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    if ('ResizeObserver' in window) new ResizeObserver(tick).observe(document.body);
    mal();
  }

  /* ============================================================
     GTM CTA TRACKING
     Generischer Click-Delegator: jedes Element mit data-gtm-event
     pusht sein Event (+ optionalen data-gtm-location-Parameter)
     in den GTM dataLayer. Neue CTAs brauchen nur die Attribute,
     keinen weiteren JS-Edit.
  ============================================================ */
  function initGtmCtaTracking() {
    document.querySelectorAll('[data-gtm-event]').forEach(function (el) {
      el.addEventListener('click', function () {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: el.dataset.gtmEvent,
          cta_location: el.dataset.gtmLocation || ''
        });
      });
    });
  }

  /* ============================================================
     INIT
  ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    setActiveNavLinks();
    initHeaderScroll();
    initMobileMenu();
    initMobileSubMenus();
    initKitFaq();
    initFaqToggle();
    initJrail();
    initMobileProgress();
    initGtmCtaTracking();
  });

}());
