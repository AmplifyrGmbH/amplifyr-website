/* ============================================================
   AMPLIFYR — page-ki-transformation.js
   Seitenspezifisches JS für ki-transformation.html
============================================================ */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ============================================================
     1. REIFEGRAD-CHECK
  ============================================================ */
  var questions = [
    {
      q: 'Wie ist Ihre IT-Infrastruktur aufgestellt?',
      opts: [
        { text: 'Lokale Server, veraltete Systeme — wir kämpfen täglich mit der Technik.', score: 1 },
        { text: 'Gemischt — einige Cloud-Dienste, aber kein einheitliches System.', score: 2 },
        { text: 'Modern und zentral — Cloud-basiert, zuverlässig, sicher.', score: 3 }
      ]
    },
    {
      q: 'Wie viele Ihrer Prozesse laufen noch manuell ab?',
      opts: [
        { text: 'Die meisten — wir tippen, kopieren und versenden viel per Hand.', score: 1 },
        { text: 'Einige — wir haben erste Tools, aber vieles läuft noch händisch.', score: 2 },
        { text: 'Wenige — unsere Kernprozesse sind weitgehend digitalisiert.', score: 3 }
      ]
    },
    {
      q: 'Nutzen Sie bereits KI in Ihrem Betrieb?',
      opts: [
        { text: 'Nein, noch gar nicht.', score: 1 },
        { text: 'Vereinzelt — z.B. ChatGPT — aber nicht in Prozesse integriert.', score: 2 },
        { text: 'Ja, KI ist bereits konkret in einzelne Abläufe eingebunden.', score: 3 }
      ]
    },
    {
      q: 'Wie viel Zeit verliert Ihr Team pro Woche an repetitive Aufgaben?',
      opts: [
        { text: 'Viel — gefühlt ein ganzer Arbeitstag pro Person.', score: 1 },
        { text: 'Einiges — mehrere Stunden pro Woche.', score: 2 },
        { text: 'Wenig — Routineaufgaben sind grösstenteils automatisiert.', score: 3 }
      ]
    }
  ];

  var results = [
    {
      stage: 1,
      stageLabel: 'Stufe 1 von 4',
      label: 'Einstieg',
      headline: 'Grosses ungenutztes Potenzial.',
      text: 'Sie stehen am Anfang — das ist eine Chance, keine Schwäche. Wir starten mit dem Fundament: stabiler IT, klaren Prozessen und den ersten KI-Hebeln, die sofort wirken.',
      cta: 'Potenzialanalyse für Stufe 1 anfragen'
    },
    {
      stage: 2,
      stageLabel: 'Stufe 2 von 4',
      label: 'Aufbau',
      headline: 'Erste Grundlagen vorhanden — jetzt strukturiert weiterbauen.',
      text: 'Sie haben erste Schritte gemacht. Jetzt ist der ideale Zeitpunkt, Prozesse zu automatisieren und KI gezielt zu integrieren — bevor die Konkurrenz den Vorsprung ausbaut.',
      cta: 'Potenzialanalyse für Stufe 2 anfragen'
    },
    {
      stage: 3,
      stageLabel: 'Stufe 3 von 4',
      label: 'Reife',
      headline: 'Sie sind weiter als die meisten.',
      text: 'Gut aufgestellt, aber noch nicht am Ziel. Mit dem richtigen Gesamtkonzept holen Sie jetzt die oft grössten Effizienzgewinne und festigen Ihre Führungsposition.',
      cta: 'Potenzialanalyse für Stufe 3 anfragen'
    },
    {
      stage: 4,
      stageLabel: 'Stufe 4 von 4',
      label: 'Vorreiter',
      headline: 'Beeindruckend — und trotzdem gibt es mehr.',
      text: 'Sie sind KI-reif. Wir zeigen Ihnen, wie Sie den Vorsprung weiter ausbauen und zur Benchmark in Ihrer Branche werden.',
      cta: 'Vorreiter-Strategie besprechen'
    }
  ];

  function getResult(score) {
    if (score <= 5)  return results[0];
    if (score <= 8)  return results[1];
    if (score <= 11) return results[2];
    return results[3];
  }

  var currentQ   = 0;
  var totalScore = 0;

  function updateProgress() {
    var fill  = document.getElementById('kit-prog-fill');
    var label = document.getElementById('kit-prog-label');
    if (!fill || !label) return;
    var pct = ((currentQ) / questions.length) * 100;
    fill.style.width = pct + '%';
    label.textContent = 'Frage ' + (currentQ + 1) + ' von ' + questions.length;
  }

  function showQuestion(index) {
    var wrap = document.getElementById('kit-questions-wrap');
    if (!wrap) return;

    var q = questions[index];
    wrap.innerHTML = '';

    var qEl = document.createElement('div');
    qEl.className = 'kit-question';
    qEl.setAttribute('role', 'group');
    qEl.setAttribute('aria-labelledby', 'kit-q-text-' + index);

    var qText = document.createElement('p');
    qText.className = 'kit-question-text';
    qText.id = 'kit-q-text-' + index;
    qText.textContent = q.q;
    qEl.appendChild(qText);

    var opts = document.createElement('div');
    opts.className = 'kit-question-options';

    q.opts.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'kit-option-btn';
      btn.type = 'button';
      btn.textContent = opt.text;
      btn.setAttribute('aria-label', opt.text);
      btn.addEventListener('click', function () {
        totalScore += opt.score;
        currentQ++;
        if (currentQ < questions.length) {
          updateProgress();
          showQuestion(currentQ);
        } else {
          showResult();
        }
      });
      opts.appendChild(btn);
    });

    qEl.appendChild(opts);
    wrap.appendChild(qEl);
    updateProgress();
  }

  function showResult() {
    var qWrap   = document.getElementById('kit-questions-wrap');
    var rWrap   = document.getElementById('kit-result-wrap');
    var progBar = document.querySelector('.kit-check-progress-bar');
    var progLbl = document.getElementById('kit-prog-label');
    var restart = document.getElementById('kit-restart-btn');
    if (!rWrap) return;

    var res = getResult(totalScore);

    // Fortschritt auf 100%
    var fill = document.getElementById('kit-prog-fill');
    if (fill) fill.style.width = '100%';
    if (progLbl) progLbl.textContent = 'Auswertung abgeschlossen';

    // Fragen ausblenden
    if (qWrap) qWrap.style.display = 'none';

    // Ergebniskarte aufbauen
    rWrap.innerHTML =
      '<div class="kit-result-card">' +
        '<span class="kit-result-stage">' + res.stageLabel + ' · ' + res.label + '</span>' +
        '<div class="kit-result-badge" aria-hidden="true">' + res.stage + '</div>' +
        '<h3 class="kit-result-headline">' + res.headline + '</h3>' +
        '<p class="kit-result-text">' + res.text + '</p>' +
        '<a href="/formular" class="kit-result-cta">' + res.cta + ' →</a>' +
      '</div>';

    rWrap.hidden = false;
    if (restart) restart.hidden = false;
  }

  function initCheck() {
    var wrap = document.getElementById('kit-check-wrap');
    if (!wrap) return;

    showQuestion(0);

    var restartBtn = document.getElementById('kit-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', function () {
        currentQ   = 0;
        totalScore = 0;

        var rWrap = document.getElementById('kit-result-wrap');
        if (rWrap) { rWrap.hidden = true; rWrap.innerHTML = ''; }

        var qWrap = document.getElementById('kit-questions-wrap');
        if (qWrap) qWrap.style.display = '';

        restartBtn.hidden = true;
        showQuestion(0);
      });
    }
  }


  /* ============================================================
     2. STATISTIK-COUNTER (IntersectionObserver)
  ============================================================ */
  function animateCounter(el, target, duration) {
    if (reduced) { el.textContent = target; return; }
    var start   = null;
    var startVal = 0;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(startVal + (target - startVal) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var stats = document.querySelectorAll('.kit-stat[data-target]');
    if (!stats.length) return;

    if (!window.IntersectionObserver) {
      stats.forEach(function (stat) {
        var el = stat.querySelector('.kit-stat-value');
        if (el) el.textContent = stat.getAttribute('data-target');
      });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        var el = entry.target.querySelector('.kit-stat-value');
        if (!el) return;
        var target = parseInt(entry.target.getAttribute('data-target'), 10);
        animateCounter(el, target, 1200);
      });
    }, { threshold: 0.4 });

    stats.forEach(function (stat) { obs.observe(stat); });
  }


  /* ============================================================
     3. SCROLL-ANIMATIONEN
  ============================================================ */
  function initScrollAnims() {
    if (reduced || !window.animateOnScroll) return;
    window.animateOnScroll('.kit-stufe-card', { stagger: 100 });
    window.animateOnScroll('.kit-stat',        { stagger: 120 });
    window.animateOnScroll('.kit-compare-row', { stagger: 80 });
  }


  /* ============================================================
     INIT
  ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initCheck();
    initCounters();
    initScrollAnims();
  });

  /* bfcache-Restore: Counter & Animationen neu starten */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      initCounters();
      initScrollAnims();
    }
  });

}());
