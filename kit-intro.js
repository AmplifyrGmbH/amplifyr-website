/* ============================================================
   AMPLIFYR — kit-intro.js
   Einzige Aufgabe: die Auftragsfluss-Timeline ist auf Desktop
   offen und auf Mobile zugeklappt. Alles andere ist statisches
   CSS — ohne dieses Skript bleibt der Abschnitt bedienbar,
   die Timeline muss dann nur einmal aufgeklappt werden.
============================================================ */
(function () {
  var el = document.querySelector('[data-kit-collapse]');
  if (!el) return;

  var mq = window.matchMedia('(min-width: 1024px)');

  function sync() {
    el.open = mq.matches;
  }

  sync();

  if (mq.addEventListener) {
    mq.addEventListener('change', sync);
  } else if (mq.addListener) {
    mq.addListener(sync);
  }
})();
