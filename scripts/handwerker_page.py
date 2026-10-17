#!/usr/bin/env python3
"""Handwerkerseite: kompakt, eigene Struktur (Kopf · Ausgangslage · Generalunternehmer · Auftrag A–Z · Zitat · So starten wir · FAQ)."""
import os, sys
S = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, S)
from bereiche import icon, ARROW, PLUS, PAGES, picture

c = PAGES['handwerker']

PAINS = [('Offerten am Abend', 'Materialpreise zusammensuchen und Offerten tippen, wenn eigentlich Feierabend wäre.'),
         ('Rapporte und Belege', 'Regierapporte abschreiben, Stundenzettel nachtragen, Belege für den Treuhänder suchen.'),
         ('Telefon auf der Baustelle', 'Anrufe kommen, wenn die Hände voll sind. Zurückgerufen wird am Abend.'),
         ('Programme, die nicht reden', 'Offerte, Planung und Rechnung liegen in verschiedenen Programmen und werden doppelt erfasst.')]

BAUSTEINE = [
    ('software', 'Ihre Handwerkersoftware', 'Aufträge, Termine und Material an einem Ort. Ihr System bleibt, wie es ist.'),
    ('buero', 'Offerten in Minuten', 'Aus Ihren eigenen Vorlagen vorbereitet, vom Kunden digital angenommen.'),
    ('auto', 'KI, die mitarbeitet', 'Bereitet vor, Sie entscheiden. In jedem Baustein mit dabei.'),
    ('it', 'IT wie ein Grossbetrieb', 'Büro, Baustelle und Handy in einem System, Daten gesichert.'),
    ('buero', 'Weniger für den Treuhänder', 'Belege fliessen automatisch ein, MWST und Lohn sind vorbereitet.'),
    ('tel', 'Keine Anfrage geht verloren', 'Ihre Website nimmt Anfragen auf und antwortet auch am Abend.'),
]

FLOW = [('Gefunden werden', 'Ihre Website beantwortet häufige Fragen selbst, echte Bewertungen sprechen für Sie.'),
        ('Die Anfrage', 'Ob Anruf, WhatsApp oder E-Mail: Jede Anfrage landet mit Adresse, Bildern und Beschreibung am richtigen Ort.'),
        ('Termin &amp; Offerte', 'Der Kunde bucht selbst. Die Offerte ist vorbereitet, Sie prüfen und versenden.'),
        ('Einsatzplanung', 'Sie sehen, wer wo im Einsatz ist. Änderungen gehen direkt aufs Handy.'),
        ('Beim Kunden', 'Rapport und Fotos sind erfasst, bevor der Mitarbeiter beim Lieferwagen ist.'),
        ('Die Rechnung', 'Der Rapport fliesst in die Rechnung, Zahlungen werden automatisch zugeordnet.')]

PHASES = [('1 Std.', 'Der dringendste Hebel', 'Wir starten dort, wo es am meisten brennt, etwa bei der Erreichbarkeit am Abend oder den Offerten.'),
          ('2 Std.', 'Der nächste Baustein', 'Schritt für Schritt kommt weiteres dazu, in der Reihenfolge, die für Sie Sinn ergibt.'),
          ('3 Std.', 'Der Betrieb als Ganzes', 'Von der Anfrage bis zur Schlussrechnung durchgängig digital. Das Büro ist eine kurze Runde am Nachmittag.')]

PROMISES = ['Sie richten nichts selbst ein, wir setzen um.', 'Direkter Kontakt, wenn es hakt, keine Hotline.', 'Sie bestimmen das Tempo und können jederzeit stoppen.']


def body():
    pains = ''.join(f'            <li class="pain reveal"{" data-delay=\"1\"" if i % 2 else ""}><b>{t}</b><span>{d}</span></li>\n' for i, (t, d) in enumerate(PAINS))
    bst = ''.join(f'''            <li class="hw-tile reveal"{f' data-delay="{i % 3}"' if i % 3 else ''}><span class="hub__icon">{icon(ic)}</span><b>{t}</b><span>{d}</span></li>
''' for i, (ic, t, d) in enumerate(BAUSTEINE))
    flow = ''.join(f'''            <li class="reveal"{f' data-delay="{i % 3}"' if i % 3 else ''}><span class="flow__n" aria-hidden="true">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
''' for i, (t, d) in enumerate(FLOW))
    ph = ''.join(f'''            <li class="hw-phase reveal"{f' data-delay="{i}"' if i else ''}><span class="hw-phase__gain"><b>+{g}</b> pro Tag</span><h3>{t}</h3><p>{d}</p></li>
''' for i, (g, t, d) in enumerate(PHASES))
    prom = ''.join(f'<li>{p}</li>' for p in PROMISES)
    det = ''.join(f'''              <details>
                <summary>{q}{PLUS}</summary>
                <p>{a}</p>
              </details>
''' for q, a in c['faq'])
    return f'''    <!-- ===================== Kopf ===================== -->
    <section class="page-hero" data-area="handwerk" aria-labelledby="page-title">
{picture(c)}
      <div class="page-hero__content">
        <div class="container cols">
          <div>
            <p class="eyebrow reveal">Handwerk</p>
            <h1 id="page-title" class="reveal" data-delay="1">Ihr Handwerk, <em>digital organisiert.</em></h1>
            <p class="lead reveal" data-delay="2">Wir sind Ihr <strong>digitaler Generalunternehmer</strong>: Offerten, Rapporte, Software, IT und Website aus einer Hand. Damit das Büro wieder eine kurze Runde am Nachmittag ist.</p>
            <p class="reveal" data-delay="3" style="margin-top:28px"><a class="btn btn--light" href="/kontakt" data-gtm-event="cta_kontakt_klick" data-gtm-location="hero_handwerk">Kostenloses Erstgespräch {ARROW}</a></p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== Sprungnavigation ===================== -->
    <nav class="subnav" aria-label="Abschnitte dieser Seite">
      <div class="container">
        <ul>
          <li><a href="#ausgangslage">Ausgangslage</a></li>
          <li><a href="#generalunternehmer">Generalunternehmer</a></li>
          <li><a href="#alltag">Im Alltag</a></li>
          <li><a href="#start">So starten wir</a></li>
        </ul>
      </div>
    </nav>

    <!-- ===================== Ausgangslage ===================== -->
    <section id="ausgangslage" class="chapter" data-area="handwerk" aria-labelledby="aus-title">
      <div class="container cols">
        <div class="c-label reveal"><p class="eyebrow">Ausgangslage</p></div>
        <div class="c-body">
          <h2 id="aus-title" class="h-section reveal">Sitzt bei Ihnen abends noch jemand über Offerten?</h2>
          <p class="lead reveal" data-delay="1">Ob Elektroinstallateur, Sanitär oder Schreiner: Die Arbeit auf der Baustelle läuft. Was liegen bleibt, ist das Büro.</p>
        </div>
        <div class="c-wide">
          <ul class="pains">
{pains}          </ul>
          <div class="hw-calc reveal">
            <p class="hw-calc__label">Beispielrechnung</p>
            <p class="hw-calc__math"><span>9 Std. Büro pro Woche</span><span>×</span><span>CHF 100</span><span>×</span><span>52 Wochen</span><span>=</span><b>CHF 46'800 pro Jahr</b></p>
            <p class="hw-calc__note">Rund 64 % der Admin-Aufgaben im Handwerk gelten als automatisierbar. <small>Quelle: IfM Bonn, IW Köln 2025</small></p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== Generalunternehmer ===================== -->
    <section id="generalunternehmer" class="chapter chapter--dark" data-area="handwerk" aria-labelledby="gu-title">
      <div class="container cols">
        <div class="c-label reveal"><p class="eyebrow">Ihr digitaler Generalunternehmer</p></div>
        <div class="c-body">
          <h2 id="gu-title" class="h-section reveal">Sechs Teile, ein Ansprechpartner.</h2>
          <p class="lead muted reveal" data-delay="1">Auf der Baustelle koordiniert der Generalunternehmer alle Gewerke und steht fürs Ganze gerade. Fürs Digitale übernehmen wir genau diese Rolle. Jeder Baustein funktioniert für sich, zusammen greifen sie ineinander.</p>
        </div>
        <div class="c-wide">
          <ul class="hw-tiles">
{bst}          </ul>
        </div>
      </div>
    </section>

    <!-- ===================== Im Alltag ===================== -->
    <section id="alltag" class="chapter chapter--white" data-area="handwerk" aria-labelledby="alltag-title">
      <div class="container cols">
        <div class="c-label reveal"><p class="eyebrow">Im Alltag</p></div>
        <div class="c-body">
          <h2 id="alltag-title" class="h-section reveal">Ein Auftrag, von der Anfrage bis zur Rechnung.</h2>
        </div>
        <div class="c-wide">
          <ol class="flow">
{flow}          </ol>
        </div>
      </div>
    </section>

    <!-- ===================== Zitat ===================== -->
    <section class="quote-band" aria-label="Kernaussage">
      <div class="container">
        <p class="quote-band__text reveal">«Der Rapport ist fertig, bevor der Lieferwagen losfährt.»</p>
      </div>
    </section>

    <!-- ===================== So starten wir ===================== -->
    <section id="start" class="chapter" data-area="handwerk" aria-labelledby="start-title">
      <div class="container cols">
        <div class="c-label reveal"><p class="eyebrow">So starten wir</p></div>
        <div class="c-body">
          <h2 id="start-title" class="h-section reveal">Jede Phase gibt Ihnen einen Abend zurück.</h2>
          <p class="lead reveal" data-delay="1">Wir beginnen mit einem kostenlosen Erstgespräch und arbeiten neben Ihrem Tagesgeschäft. Nach jeder Phase entscheiden Sie neu.</p>
        </div>
        <div class="c-wide">
          <ol class="hw-phases">
{ph}          </ol>
          <div class="hw-trust reveal">
            <ul class="checklist">{prom}</ul>
            <p class="hw-trust__who">Einer von uns ist <strong>gelernter Elektroinstallateur</strong>. Wir kennen den Alltag auf der Baustelle von innen. <a class="link-arrow" href="/vorgehen">So gehen wir vor {ARROW}</a></p>
          </div>
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
    print('handwerker body ok')
