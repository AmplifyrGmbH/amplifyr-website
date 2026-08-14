// ── Floating CTA: Raketen-Teaser ─────────────────────────────
(function initBaTeaser() {
  var teaser = document.getElementById('ba-chat-teaser');
  var btn    = document.getElementById('ba-teaser-btn');
  if (!teaser || !btn) return;

  // Auf der Homepage nicht initialisieren (KI-Check dort bereits sichtbar)
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') return;

  var wiggleTimer;

  function showTeaser() {
    if (teaser.classList.contains('ba-teaser-visible')) return;
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
  }

  // Seiten mit Hero (.fsh): IntersectionObserver + 3s-Fallback
  var heroEl = document.querySelector('.fsh');
  if (heroEl && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) {
        showTeaser();
        obs.disconnect();
      }
    }, { threshold: 0 });
    obs.observe(heroEl);
    setTimeout(function () { showTeaser(); obs.disconnect(); }, 3000);
  } else {
    // Seiten ohne Hero: 3 Sekunden
    setTimeout(showTeaser, 3000);
  }

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