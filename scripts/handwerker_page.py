#!/usr/bin/env python3
"""Handwerkerseite: kompakt, spricht kleine und grössere Betriebe an.
Kopf · Was uns unterscheidet · Ob 3 oder 80 Mitarbeitende · So arbeiten wir · (FAQ im Kontaktblock)"""
import os, sys, json, html
S = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, S)
from bereiche import icon, ARROW, PLUS, PAGES, picture
from photoquote import photo_quote

c = PAGES['handwerker']

FAQ = [
    ('Für welche Betriebsgrösse eignet sich das?', 'Für Einzelunternehmen genauso wie für Betriebe mit mehreren Teams. Wir passen Umfang und Tempo an Ihre Grösse und Ihre Abläufe an.'),
    ('Muss ich meine bestehende Software wechseln?', 'Nein. Ihre bestehende Software bleibt in der Regel. Wir verbinden sie mit dem Rest und ergänzen nur dort, wo es sich lohnt.'),
    ('Was kostet das?', 'Das hängt davon ab, was Ihr Betrieb braucht. Das Erstgespräch ist kostenlos und zeigt, was sich lohnt. Danach erhalten Sie eine Offerte, bevor Sie etwas entscheiden.'),
    ('Stört die Umstellung den laufenden Betrieb?', 'Nein. Wir arbeiten Schritt für Schritt neben dem Tagesgeschäft, setzen selbst um und schulen Ihr Team. Nach jeder Phase entscheiden Sie, wie es weitergeht.'),
]

SIZES = [
    ('Kleiner Betrieb', 'Sie sind Chef, Büro und Disposition in einer Person.',
     ['Offerten und Rechnungen schreiben Sie abends oder am Wochenende', 'Auf der Baustelle verpassen Sie Anrufe und Anfragen', 'Bei IT-Problemen sind Sie auf sich allein gestellt']),
    ('Grösserer Betrieb', 'Ihr Team arbeitet in mehreren Programmen nebeneinander.',
     ['Daten werden doppelt erfasst, Fehler schleichen sich ein', 'Wer wann wo im Einsatz ist, weiss nur die Disposition', 'Mit jedem Auftrag wächst auch die Arbeit im Büro']),
]

FLOW = ['Anfrage', 'Termin', 'Offerte', 'Einsatzplanung', 'Rapport', 'Rechnung']

PHASES = [('Erstgespräch', 'Kostenlos. Wir schauen, wo Zeit verloren geht.'),
          ('Erster Hebel', 'Wir starten dort, wo es am meisten bringt.'),
          ('Ausbau', 'Schritt für Schritt, in Ihrem Tempo.'),
          ('Betreuung', 'Wir bleiben Ihr Ansprechpartner.')]


def body():
    sizes = ''
    for i, (lab, h, pts) in enumerate(SIZES):
        li = ''.join(f'<li>{p}</li>' for p in pts)
        sizes += f'''            <article class="hw-size reveal"{' data-delay="1"' if i else ''}>
              <p class="hw-size__label">{lab}</p>
              <h3>{h}</h3>
              <ul class="hw-pains">{li}</ul>
            </article>
'''
    flow = ''.join(f'<li>{s}</li>' for s in FLOW)
    ph = ''.join(f'''            <li class="reveal"{f' data-delay="{i}"' if i else ''}><b>{t}</b><span>{d}</span></li>
''' for i, (t, d) in enumerate(PHASES))
    det = ''.join(f'''              <details>
                <summary>{q}{PLUS}</summary>
                <p>{a}</p>
              </details>
''' for q, a in FAQ)
    return f'''    <!-- ===================== Kopf ===================== -->
    <section class="page-hero" data-area="handwerk" aria-labelledby="page-title">
{picture(c)}
      <div class="page-hero__content">
        <div class="container cols">
          <div>
            <p class="eyebrow reveal">Handwerk</p>
            <h1 id="page-title" class="page-statement reveal" data-delay="1">Ihr Handwerksbetrieb, <strong>durchgängig digital</strong>. Von der Akquise bis zur Rechnung, <strong>alles aus einer Hand</strong>.</h1>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== Sprungnavigation ===================== -->
    <nav class="subnav" aria-label="Abschnitte dieser Seite">
      <div class="container">
        <ul>
          <li><a href="#unterschied">Was uns unterscheidet</a></li>
          <li><a href="#betrieb">Ihr Betrieb</a></li>
          <li><a href="#zusammenarbeit">So arbeiten wir</a></li>
        </ul>
      </div>
    </nav>

    <!-- ===================== Was uns unterscheidet ===================== -->
    <section id="unterschied" class="chapter" data-area="handwerk" aria-labelledby="unterschied-title">
      <div class="container cols">
        <div class="c-label reveal"><p class="eyebrow">Was uns unterscheidet</p></div>
        <div class="c-body">
          <h2 id="unterschied-title" class="h-section reveal">Mehr als Software.<br>Mehr als IT.</h2>
          <p class="lead reveal" data-delay="1">Für jedes digitale Thema gibt es einen eigenen Anbieter. Jeder löst seinen Teil, und die Abstimmung dazwischen bleibt an Ihnen hängen.</p>
        </div>
        <div class="c-wide">
          <ul class="hw-not">
            <li class="reveal"><s>Softwareanbieter</s><span>liefert ein Programm</span></li>
            <li class="reveal" data-delay="1"><s>IT&#8209;Betrieb</s><span>betreut Geräte und Netzwerk</span></li>
            <li class="reveal" data-delay="2"><s>Webdesigner</s><span>baut eine Website</span></li>
            <li class="reveal" data-delay="3"><s>KI&#8209;Agentur</s><span>verkauft ein KI-Tool</span></li>
          </ul>
          <div class="hw-us reveal">
            <p class="hw-us__label">Alles in einem</p>
            <p class="hw-us__name"><img src="/Logos/amplifyr_logo/amplifyr-logo-weiss-hellblau.svg" alt="amplifyr" width="400" height="120" loading="lazy"></p>
            <p class="hw-us__text">Wir beginnen bei Ihren Abläufen, nicht bei einem Programm. Mit Ausbildung in Prozessoptimierung, Business-Verständnis und Erfahrung aus dem Handwerk übernehmen wir das Ganze: Software, IT, Website und KI, eingerichtet und weiter betreut. <strong>Ein Ansprechpartner, spezialisiert auf Handwerksbetriebe.</strong></p>
          </div>
        </div>
      </div>
    </section>

{photo_quote('zitat-handwerk','Luftaufnahme von Zürich mit Limmat, Grossmünster und Zürichsee','Alles Digitale für Handwerksbetriebe aus einer Hand? Gab es in der Schweiz bisher nicht.<br>Dann kam amplifyr.')}
    <!-- ===================== Ihr Betrieb ===================== -->
    <section id="betrieb" class="chapter chapter--white" data-area="handwerk" aria-labelledby="betrieb-title">
      <div class="container cols">
        <div class="c-label reveal"><p class="eyebrow">Ihr Betrieb</p></div>
        <div class="c-body">
          <h2 id="betrieb-title" class="h-section reveal">Ob 3 oder 80 Mitarbeitende.</h2>
          <p class="lead reveal" data-delay="1">Die Verwaltung frisst Zeit, die auf der Baustelle fehlt. Wo es klemmt, hängt von der Grösse ab.</p>
        </div>
        <div class="c-wide">
          <div class="hw-sizes">
{sizes}          </div>
          <p class="hw-stat reveal"><b>64 %</b> der Admin-Aufgaben im Handwerk gelten als automatisierbar. <small>Quelle: IfM Bonn, IW Köln 2025</small></p>
        </div>
      </div>
    </section>

    <!-- ===================== So arbeiten wir ===================== -->
    <section id="zusammenarbeit" class="chapter chapter--dark" data-area="handwerk" aria-labelledby="zus-title">
      <div class="container cols">
        <div class="c-label reveal"><p class="eyebrow">So arbeiten wir</p></div>
        <div class="c-body">
          <h2 id="zus-title" class="h-section reveal">Ein Auftrag, durchgängig digital.</h2>
        </div>
        <div class="c-wide">
          <div class="hw-flow hw-flow--lead reveal">
            <ol>{flow}</ol>
          </div>
          <p class="lead muted hw-zus-text reveal" data-delay="1">Sie richten nichts selbst ein und bestimmen das Tempo. Einer von uns ist <strong>gelernter Elektroinstallateur</strong> und kennt den Alltag auf der Baustelle von innen.</p>
          <ol class="steps4 steps4--dark">
{ph}          </ol>
          <p class="reveal" style="margin-top:28px;text-align:center"><a class="link-arrow" href="/vorgehen">Mehr zum Vorgehen {ARROW}</a></p>
        </div>
      </div>
    </section>

    <!-- ===================== FAQ ===================== -->
    <section id="faq" class="section faq" aria-labelledby="faq-title">
      <div class="container cols">
        <div class="c-label">
          <h2 id="faq-title" class="h-section">Häufige Fragen</h2>
        </div>
        <div class="c-body faq__wrap">
          <details class="faq__all">
            <summary class="faq__toggle">Fragen{PLUS}</summary>
            <div class="faq__list">
{det}            </div>
          </details>
        </div>
      </div>
    </section>

{{{{CONTACT}}}}
'''


if __name__ == '__main__':
    open(f'{S}/pages/body/handwerker.html', 'w', encoding='utf-8').write(body())
    j = f'{S}/pages/handwerker.json'
    d = json.load(open(j, encoding='utf-8'))
    d['og_title'] = 'Weniger Verwaltung, mehr Zeit für Aufträge | amplifyr'
    d['description'] = 'Mehr als Software: amplifyr analysiert die Abläufe von Handwerksbetrieben und macht sie durchgängig digital, mit Software, IT und Website aus einer Hand.'
    for s in d['schemas']:
        if s.get('@type') == 'FAQPage':
            s['mainEntity'] = [{'@type': 'Question', 'name': html.unescape(q), 'acceptedAnswer': {'@type': 'Answer', 'text': html.unescape(a)}} for q, a in FAQ]
    json.dump(d, open(j, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    print('handwerker ok', len(d['description']))
