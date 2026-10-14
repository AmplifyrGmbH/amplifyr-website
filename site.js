/* ============================================================
   site.js — Amplifyr (Relaunch 2026)
   Header-Zustand, Mobile-Menü, Scroll-Einblendungen, GTM-Klicks
   ============================================================ */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  // ---- Header: transparent über dem Hero, danach hell ----
  var header = document.getElementById('site-header');
  var hero = document.querySelector('.hero');
  function updateHeader() {
    if (!header) return;
    var threshold = hero ? hero.offsetHeight - header.offsetHeight - 8 : 8;
    header.classList.toggle('is-solid', window.scrollY > threshold);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader);

  // ---- Mobile-Menü ----
  var menu = document.getElementById('nav-mobile');
  var openBtn = document.getElementById('burger');
  var closeBtn = document.getElementById('nav-mobile-close');

  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open) menu.removeAttribute('inert'); else menu.setAttribute('inert', '');
    document.body.classList.toggle('menu-open', open);
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open && closeBtn) closeBtn.focus();
    else if (!open && openBtn) openBtn.focus();
  }
  if (openBtn) openBtn.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) setMenu(false);
  });

  // ---- Einblendungen beim Scrollen ----
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---- GTM-Klick-Tracking (Konvention aus main.js) ----
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-gtm-event]');
    if (!el) return;
    window.dataLayer.push({
      event: el.getAttribute('data-gtm-event'),
      cta_location: el.getAttribute('data-gtm-location') || ''
    });
  });
})();
