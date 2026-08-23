# Amplifyr Website — Kontext-Dossier für die Chatbots

Dieses Dokument fasst zusammen, was auf jeder der fünf Seiten mit eingebautem KI-Berater-Chatbot (`#ki-berater`) steht — damit der jeweilige Bot weiss, auf welcher Seite er sitzt, welche Zielgruppe dort landet, was inhaltlich bereits gesagt wurde und mit welchen typischen Fragen/Einwänden zu rechnen ist.

Jede Seite hat einen eigenen Chat-Endpoint (Slug unter `https://chat-api.amplifyr-digital.ch/api/v1/chat/<slug>`):

| Seite | URL | Slug |
|---|---|---|
| Landingpage | `/` | `amplifyr-index` |
| Handwerker | `/handwerker` | `amplifyr-handwerker` |
| Bewirtschaftung | `/bewirtschaftung` | `digitale-bewirtschaftung` |
| IT-Lösungen | `/it-solutions` | `amplifyr-it-solutions` |
| Digitaler Auftritt (Webdesign) | `/webdesign` | `amplifyr-webdesign` |

---

## Firma & Kontakt (gilt seitenübergreifend)

- **Amplifyr GmbH**, Mettlenstrasse 11, 8142 Uitikon Waldegg, Schweiz (Raum Zürich)
- Telefon: **044 244 59 95** (+41 44 244 59 95) — auch als WhatsApp-Nummer
- E-Mail: **info@amplifyr.ch**
- Termin-Buchung: 30-Minuten-Erstgespräch direkt im Kalender buchbar (Outlook-Booking-Link)
- Kontakt-Hub: **/formular** — dort kann man eine Website-Demo anfordern, einen Termin buchen, eine Nachricht schreiben oder per WhatsApp schreiben
- Gegründet und geführt von drei Fachleuten, die die Kette komplett abdecken:
  - **David Staub** — gelernter Elektroinstallateur EFZ, später Data Science studiert. Kennt den Handwerker-Alltag von innen.
  - **Timo Steinfort** — zehn Jahre Erfahrung in Immobilien-Bewirtschaftung, Finanzen und Versicherung. Kennt die Entscheider und Abläufe in der Immobilienbranche.
  - **Sinan Sen** — über zehn Jahre System Engineering / IT-Betreuung für Schweizer Betriebe.
- Positionierung: **"Digitalisierungspartner"** nach dem Prinzip eines Generalunternehmers am Bau — Amplifyr übernimmt Website, Software, IT und KI aus einer Hand, mit einem Ansprechpartner statt vielen, statt dass der Kunde für jedes Thema einen anderen Anbieter sucht.
- Zielbranchen insgesamt: Bau- und Handwerksbetriebe sowie Immobilienverwaltungen (Bewirtschaftung) — plus allgemein Schweizer KMU für IT-Outsourcing und Webdesign.
- Der Chatbot selbst (egal auf welcher Seite) beantwortet Fragen zu Recht/Systemen/Aufwand/Kosten in Echtzeit, ersetzt aber keine verbindliche Offerte — er bereitet vor, ein Mensch gibt frei. Er erfindet keine Auskünfte und sagt, wenn er etwas nicht weiss.

---

## 1. Landingpage (`/`, Slug: `amplifyr-index`)

**Zielgruppe:** Alle Besucher, die noch nicht wissen, ob sie eher zum Handwerk oder zur Bewirtschaftung gehören — die allgemeine Einstiegsseite, die auf die beiden Vertikalen weiterleitet.

**Hero:** *"Der Digitalisierungspartner für die Bau- und Immobilienbranche."* — Subline: "IT, Software, KI und ihr digitaler Auftritt aus einer Hand." Zwei Buttons führen direkt zu den beiden Zielgruppen-Seiten: "Handwerk" (→ `/handwerker`) und "Bewirtschaftung" (→ `/bewirtschaftung`).

**Chatbot-Kontext (hinterlegt):**
- Firmenprofil: "Amplifyr ist der Digitalisierungspartner für die Bau- und Immobilienbranche in der Schweiz. Wir übernehmen IT, Software, KI und den digitalen Auftritt aus einer Hand — für Handwerksbetriebe und Immobilienverwaltungen gleichermassen."

**Seitenaufbau:**
1. **Hero** — Positionierung + Weiterleitung Handwerk/Bewirtschaftung.
2. **"Eine Branche im Rückstand."** — zeigt anhand eines Digitalisierungsgrad-Meters (4.3/10, Quelle: Digital Real Estate & Construction Studie 2026, pom+), dass die Bau-/Immobilienbranche die am wenigsten digitalisierte Branche der Schweiz ist. Drei Karten: Das Problem (zu klein für eigene IT-Abteilung, zu beschäftigt für Digitalisierung nebenbei), Unser Prinzip (Verantwortung fürs Ganze wie ein Generalunternehmer — kein Berater, kein Softwarehaus, ein Partner), Unser Ziel (IT, Software, KI, Auftritt eingerichtet und laufend betreut, ein Ansprechpartner statt vielen).
3. **"Wie das konkret aussieht."** (Vier Bereiche, 2×2-Karten) — Handwerk ("Ihr Handwerk, digital organisiert" → Anfragen/Offerten/Rapporte laufen digital vom ersten Anruf bis zur bezahlten Rechnung), Bewirtschaftung ("Ihre Bewirtschaftung, automatisiert betrieben" → Versammlungen/Schadensmeldungen/Abrechnung, Kernsystem bleibt), IT-Fundament ("IT, die einfach läuft" → ein Ansprechpartner, klare Spielregeln, planbare Kosten), Webauftritt ("Eine Website, die arbeitet" → nimmt Anfragen auf, bucht Termine, gibt Preise aus, auch ausserhalb der Bürozeiten).
4. **KI-Berater-Chat** ("Was hält Sie noch zurück?").
5. **FAQ** (eingeklappt, 4 Fragen — siehe unten).
6. **Kontakt-CTA** ("Bereit für den ersten Schritt? Wir sind erreichbar.") — ein Button "Kontakt aufnehmen" → `/formular`.

**Vorgeschlagene Chat-Chips (typische Fragen):**
«Passt das auch für meine Branche?», «Was kostet das ungefähr?», «Muss ich mein System wechseln?», «Wie lange dauert die Umstellung?», «Zu teuer für meinen Betrieb», «Muss ich alles wechseln?»

**FAQ (vollständig):**
1. **Was heisst 'Digitalisierungspartner'?** — Amplifyr übernimmt für Ihren Betrieb, was sonst eine eigene Digital-Abteilung tun würde: Website, Software und IT aufbauen, verbinden und laufend betreiben — mit einem Ansprechpartner. Vergleichbar mit dem Prinzip eines Generalunternehmers am Bau, aber für alles Digitale.
2. **Für welche Unternehmen ist Amplifyr geeignet?** — Amplifyr ist auf die Bau- und Immobilienbranche spezialisiert — Firmen, die zu klein für eine eigene IT-Abteilung und zu beschäftigt für Digitalisierung nebenbei sind. Vorkenntnisse braucht es keine, nur den Willen zur Veränderung.
3. **Wie startet die Zusammenarbeit mit Amplifyr?** — Mit einem kostenlosen Erstgespräch — statt einer Offerte ins Blaue. Danach folgt ein Digitalisierungs-Fahrplan mit priorisiertem Umsetzungsplan, und erst dann entscheiden Sie über den laufenden Betrieb.
4. **Muss unser bestehendes System gewechselt werden?** — Nein. Ihr Kernsystem — ob Handwerkersoftware oder Immobilienverwaltungslösung wie ImmoTop2 — bleibt bestehen. Amplifyr dockt IT, KI und digitalen Auftritt daran an, statt es zu ersetzen.

---

## 2. Handwerker (`/handwerker`, Slug: `amplifyr-handwerker`)

**Zielgruppe:** Handwerks- und Baubetriebe (z. B. Elektriker, Sanitär, Bau) — Betriebsinhaber, die im Tagesgeschäft stecken und wenig Zeit/Know-how für Digitalisierung haben.

**Hero:** *"Ihr Handwerk, digital organisiert."* — Subline: "Von der Website bis zur Handwerkersoftware — wir digitalisieren Ihren Betrieb aus einer Hand. Sie konzentrieren sich aufs Handwerk, wir sorgen dafür, dass Aufträge kommen und der Büroaufwand sinkt."

**Chatbot-Kontext (hinterlegt):**
- Firmenname (Platzhalter im Chat): "Ihr Handwerksbetrieb"
- Firmenprofil: "Amplifyr ist der Digitalisierungspartner für Schweizer Handwerksbetriebe. Wir übernehmen alles: Software, IT, Website und KI — aus einer Hand, laufend betrieben. So können Handwerker sich auf ihr Kerngeschäft konzentrieren."

**Seitenaufbau (jrail-Reihenfolge):**
1. **Video** (`#alltag`) — Erklärvideo/Alltagsdarstellung.
2. **Kostenrechner** (`#kostenrechner`) — *"Was kostet Sie der Papierkram wirklich?"* Interaktiver Rechner: Nutzer stellt Stundenansatz (Default 100 CHF/Std.) und Zeitaufwand pro Woche für repetitive Admin-Tätigkeiten ein (Offerten/Nachkalkulation, "arbeitende" Website-Aufgaben etc.), der Rechner zeigt live hochgerechnet, was das pro Jahr kostet (z. B. 23'400 CHF/Jahr bei 9 Std./Woche) sowie hochgerechnet auf 5/10 Jahre. Zweck: verdeutlicht den Umfang der "unsichtbaren" Bürokosten.
3. **Auftragsablauf** (`#ablauf`) — zeigt, wie ein Auftrag mit Amplifyr als Digitalisierungspartner konkret abläuft (Slogan: "2026 – Es ist noch nicht zu spät!" — Digitalisierung ist mit enger Begleitung neben dem Tagesgeschäft in wenigen Wochen umsetzbar).
4. **Unser Prinzip** (`#generalunternehmer`) — *"Sechs Teile, eine Fläche."* Honigwaben-Grafik mit sechs Bausteinen (Ihre Branchensoftware, Rapporte & Dokumentation, KI, Gesamte IT, Offerten & Nachkalkulation, "Arbeitende" Website) rund um "Ihr Betrieb" — Analogie zum Generalunternehmer am Bau: ein Ansprechpartner statt sechs Anbieter.
5. **Fahrplan** (`#fahrplan`) — *"Der Aufwand steckt vorne. Die Wirkung wächst — und bleibt."* Phasenweise Umsetzung, aber in der vom Kunden priorisierten Reihenfolge — Amplifyr koordiniert.
6. **Wer wir sind** (`#ueberuns`) — *"Drei Fachleute, die auch Ihr Handwerk verstehen."* Team-Vorstellung: David Staub (gelernter Elektroinstallateur EFZ + Data Science — kennt Arbeitsplanung im Handwerker-Alltag), Timo Steinfort (10 Jahre Immobilien-Bewirtschaftung/Finanzen/Versicherung — weiss, welche Handwerker Aufträge bekommen), Sinan Sen (10+ Jahre IT-Betreuung Schweizer Betriebe).
7. **KI-Berater-Chat** (`#ki-berater`).
8. **FAQ + Kontakt** (`#cta`, eingeklappte FAQ + ein Button "Kontakt aufnehmen" → `/formular`).

**Vorgeschlagene Chat-Chips (typische Einwände):**
«Hab schon Software und IT-ler», «Bin sowieso ausgebucht», «Was geht automatisch raus?», «Wie viel Arbeit für mich?», «Zu teuer für meinen kleinen Betrieb», «Zu kompliziert für mich und mein Team»

**FAQ (vollständig):**
1. **Muss ich meine bestehende Handwerkersoftware wechseln?** — Nein. Ihre bestehende Software bleibt bestehen — wir docken IT, KI und Website daran an, statt sie zu ersetzen.
2. **Was kostet die Digitalisierung für einen Handwerksbetrieb?** — Die Kosten hängen vom Umfang ab — von der Website über KI-Automatisierungen bis zu IT-Lösungen wird alles individuell kalkuliert. Ein kostenloses Erstgespräch zeigt, was für Ihren Betrieb sinnvoll ist und was es kostet. *(Hinweis: Auf der Seite steht bewusst kein fixer Preis mehr — nicht raten/erfinden.)*
3. **Wie lange dauert es, einen Handwerksbetrieb zu digitalisieren?** — Die Digitalisierung läuft neben dem Tagesgeschäft und ist mit enger Begleitung in wenigen Wochen umsetzbar. Eine einfache Website ist in wenigen Tagen startklar. Komplexere KI-Automatisierungen werden schrittweise in 4 bis 12 Wochen eingeführt.
4. **Ist die Digitalisierung auch für kleine Handwerksbetriebe geeignet?** — Ja. Amplifyr arbeitet mit Handwerksbetrieben jeder Grösse — von Einzelunternehmern bis zu Betrieben mit mehreren Mitarbeitern. Wir starten dort, wo der grösste Hebel liegt, und bauen die Lösung Schritt für Schritt aus.
5. **Was können Handwerksbetriebe mit KI automatisieren?** — Typische Automatisierungen sind: Offertenerstellung, Rechnungsversand, Terminbuchungen, Kundenanfragen per Chat, Einsatzplanung und Mitarbeiter-Kommunikation. Alles, was regelmässig Zeit kostet und nach einem festen Schema abläuft, lässt sich automatisieren.

---

## 3. Bewirtschaftung (`/bewirtschaftung`, Slug: `digitale-bewirtschaftung`)

**Zielgruppe:** Immobilienverwaltungen / Bewirtschaftungsfirmen — Verwalter, die zwischen Eigentümerversammlungen, Schadensmeldungen und Mieterkommunikation Kapazität verlieren.

**Hero:** *"Ihre Bewirtschaftung, automatisiert betrieben."* — Subline: "Die Kapazität steckt schon in Ihrem Betrieb: Ein grosser Teil der Woche Ihrer Bewirtschafter geht in Koordination — Rückrufe, Termine abstimmen, Unterlagen suchen. Wir holen diese Kapazität zurück, ohne jemanden einzustellen und ohne Ihr Kernsystem zu wechseln — als Ihr Digitalisierungspartner."

**Chatbot-Kontext (hinterlegt):**
- Firmenname (Platzhalter): "Ihre Immobilienverwaltung"
- Branche: "Immobilienbewirtschaftung"
- Firmenprofil: "Amplifyr ist der Digitalisierungspartner für Schweizer Immobilienverwaltungen. Wir übernehmen die digitale Kommunikation mit Eigentümern und Mietern, binden Ihr bestehendes Kernsystem ein und automatisieren repetitive Abläufe — aus einer Hand."

**Seitenaufbau (jrail-Reihenfolge):**
1. **Video** (`#alltag`) — *"So könnte es bei Ihnen laufen."* Zwei typische Situationen: der Versammlungsabend im März und der Wasserschaden am Sonntag — zeigt, wie beides aussieht, wenn die Systeme ineinandergreifen.
2. **Aufwandrechner** (`#kostenrechner`) — *"Wie viel Mandat läge noch drin?"* Interaktiver Rechner: Nutzer stellt Teamgrösse (Std./Bewirtschafter) und Stundenansatz ein, verteilt auf Kategorien wie "Stockwerkeigentum" (Versammlungen & Protokolle, Auskünfte & Dokumentensuche) und "Kommunikation & Bewirtschaftung" (Anliegen & Rückrufe, Handwerker-Koordination). Ergebnis-Karte zeigt: gebundene Kosten in Koordination (z. B. 117'000 CHF/Jahr bei 3 Bewirtschaftern), wiederkehrender/automatisierbarer Anteil (konservativ 40 %), und daraus resultierende freiwerdende Kapazität für neue Mandate (z. B. 46'800 CHF/Jahr).
3. **Zwei Fälle** (`#ablauf`) — zeigt konkret, wie Anliegen (Versammlung, Schadensmeldung) künftig durchgängig durch alle Systeme laufen, rund um die Uhr strukturiert über Website/App/Chat reinkommen.
4. **Unser Prinzip** (`#generalunternehmer`) — *"Sechs Teile, eine Fläche."* Gleiche Waben-Grafik wie bei Handwerker, aber mit bewirtschaftungsspezifischen Bausteinen (u. a. ImmoTop2 o. Ä., Woonig, Datenbasierte Bewirtschaftung — Preisspiegel nach Gewerk, Ergebnis in Franken messbar).
5. **Konstellation** (`#konstellation`) — *"Software kann jeder kaufen. Das Zusammenspiel nicht."* Drei eigenständige Firmen bringen ihre Kompetenz zusammen (Amplifyr für IT/KI/Bewi-Prozesse, ein Partner aus der Immobilienbranche für operative Bewirtschaftung, Woonig als Plattform) — nach aussen bleibt es ein Vertrag, ein Ansprechpartner (Amplifyr).
6. **Fahrplan** (`#fahrplan`) — *"Der Aufwand steckt vorne. Die Wirkung wächst — und bleibt."* Start beim dringendsten Hebel (z. B. nächste Versammlung oder Erreichbarkeit), dann phasenweiser Ausbau in der vom Kunden priorisierten Reihenfolge.
7. **Wer wir sind** (`#ueberuns`) — *"Einer von uns hat Ihren Job gemacht."* Team-Vorstellung (Timo Steinfort mit Immobilien-Bewirtschaftungs-Hintergrund als zentrale Figur, plus David Staub und Sinan Sen).
8. **KI-Berater-Chat** (`#ki-berater`, im jrail betitelt "Ihre Bedenken") — *"Sie haben bestimmt Fragen."* Stellen Sie sie hier — zu Recht, Systemen, Aufwand oder Kosten, Antwort in Sekunden.
9. **FAQ + Kontakt** (`#cta`, eingeklappte FAQ + Button "Kontakt aufnehmen" → `/formular`).

**Vorgeschlagene Chat-Chips (typische Einwände):**
«Wir haben ImmoTop2 und unseren IT-Support», «Unsere Eigentümer wollen Papier», «Bei uns ist jede Liegenschaft anders», «Keine Zeit neben den Mandaten», «Ist eVoting rechtlich zulässig?», «Wie viel Arbeit für uns?», «Was in der Abrechnungssaison?»

**FAQ (vollständig):**
1. **Müssen wir unser bestehendes Verwaltungssystem wechseln?** — Nein. Ihr Kernsystem, zum Beispiel ImmoTop2, bleibt bestehen. Amplifyr bindet Woonig, KI und Ihre übrige IT daran an, statt es zu ersetzen.
2. **Was kostet die digitale Bewirtschaftung?** — Die Kosten hängen vom Umfang ab. Wir beginnen mit einer kostenlosen Analyse, die zeigt, wo bei Ihnen am meisten Kapazität frei wird — bevor Sie investieren.
3. **Wie läuft eine Eigentümerversammlung digital ab?** — Einladungen, Vollmachten und eVoting laufen über Woonig, angebunden an Ihr Kernsystem; das KI-Protokoll entsteht direkt aus der Versammlung und bleibt versioniert auffindbar.
4. **Was passiert, wenn es operativ eng wird — etwa in der Abrechnungssaison?** — Über einen Partner aus der Immobilienbranche steht bei Bedarf eine Bewirtschafterin mit eidg. Fachausweis als operative Verstärkung zur Verfügung — als Entlastung, nicht als Konkurrenz um Ihre Mandate.
5. **Wie lange dauert die Umstellung?** — Wir starten mit dem dringendsten Hebel — etwa der nächsten Versammlung oder der Erreichbarkeit — und bauen von dort weiter aus, in Ihrer Reihenfolge statt nach starrem Schema.

---

## 4. IT-Lösungen (`/it-solutions`, Slug: `amplifyr-it-solutions`)

**Zielgruppe:** Schweizer KMU (branchenübergreifend), die IT-Support/Managed Services statt einer eigenen internen IT-Abteilung suchen. Etwas allgemeiner/breiter als die beiden anderen Vertikalen.

**Hero:** *"IT, die einfach läuft."* — Subline: "Wir schaffen die technologische Grundlage für stabile, sichere und skalierbare Unternehmenssysteme — eine rundum funktionierende und zukunftsgerichtete IT."

**Chatbot-Kontext (hinterlegt):**
- Firmenname (Platzhalter): "Ihr Unternehmen"
- Firmenprofil: "Amplifyr übernimmt IT-Outsourcing und Managed Services für Schweizer KMU — Support, Cloud, Microsoft 365 und Projekte, mit einem Ansprechpartner statt vielen."

**Seitenaufbau (jrail-Reihenfolge):**
1. **Support & Beratung** (`#sec-support`) — *"Ein Ansprechpartner. Für jedes IT-Thema."* Externe IT-Abteilung, persönlich betreut von einem Ansprechpartner, der auf das Fachwissen des ganzen Teams zurückgreift. Start immer mit kostenlosem, unverbindlichem Erstgespräch. Support-Versprechen: meist innert Minuten gelöst, bei Bedarf Vor-Ort-Einsatz in der Region Zürich, kein Weiterleiten/keine Wiederholung, Status jederzeit einsehbar. Zusatzthema: IT-Umzug & Verkabelung (reibungslose Infrastruktur bei Büroumzügen).
2. **Managed Services / MSP** (`#sec-managed`) — *"Sie entscheiden, welchen Teil Ihrer IT wir übernehmen."* Baukasten-Prinzip mit einzeln wählbaren Bausteinen zu fester Monatspauschale: Managed Security, Managed Backup, Managed Server, Managed Network & WLAN, Managed Workplace, Managed Cloud / Microsoft 365, Monitoring & Patching, Managed Helpdesk. Interaktiver Modul-Picker zeigt live, was damit abgedeckt wird.
3. **SLA** (`#sec-sla`) — *"Klare Spielregeln, planbare Kosten."* Ein SLA klärt gegenseitige Erwartungen und Machbarkeiten — keine bösen Überraschungen, keine versteckten Kosten.
4. **Projekte** (`#sec-projekte`) — *"Microsoft 365, Teams Telefonie & Cloud-Migration."* Themen: Zusammenarbeit & Teams-Telefonie, Sicherheit (Conditional Access, Zwei-Faktor, Phishing-Schutz, DSGVO-konform), Cloud-Migration (Analyse vorab, schrittweise Migration, keine Datenverluste, Einführung & Schulung).
5. **KI-Berater-Chat** (`#ki-berater`).
6. **FAQ + Kontakt** (`#sec-cta`, eingeklappte FAQ + Button "Kontakt aufnehmen" → `/formular`).

**Vorgeschlagene Chat-Chips (typische Einwände):**
«Haben schon eine IT-Abteilung», «Was, wenn's mal brennt?», «Wie schnell ist der Support?», «Was kostet das im Monat?», «Was kostet das?»

**FAQ (vollständig):**
1. **Wie schnell kann Amplifyr unsere IT übernehmen?** — In der Regel sind wir innerhalb von 2–4 Wochen vollständig operativ. Wir beginnen mit einer strukturierten Übergabe, damit kein Wissen verloren geht und Ihr Betrieb unterbrechungsfrei weiterläuft.
2. **Wie schnell reagiert Amplifyr bei einem IT-Ausfall?** — Wir vereinbaren im Rahmen Ihres SLA klare, zu Ihrem Betrieb passende Reaktionszeiten. Bei kritischen Ausfällen sind Sie über einen Ansprechpartner erreichbar, der Ihre Infrastruktur bereits kennt.
3. **Betreut Amplifyr auch bestehende Hardware und Software?** — Ja. Wir übernehmen Ihre bestehende Umgebung so wie sie ist, analysieren sie und optimieren schrittweise. Kein Riss-und-neu-Ansatz — es sei denn, es ist wirklich nötig.
4. **Können wir schrittweise in die Cloud migrieren?** — Ja, das empfehlen wir sogar. Wir planen die Migration zu Microsoft 365 in klaren Phasen — sicher, ohne Betriebsunterbrechung, mit messbaren Zwischenzielen.

---

## 5. Digitaler Auftritt / Webdesign (`/webdesign`, Slug: `amplifyr-webdesign`)

**Zielgruppe:** Schweizer KMU (branchenübergreifend, oft Handwerk/Gewerbe), die eine neue/bessere Website oder digitalen Auftritt brauchen — inkl. SEO und GEO (Sichtbarkeit bei KI-Suchsystemen).

**Hero:** *"Eine Website, die arbeitet."*

**Chatbot-Kontext (hinterlegt):**
- Firmenname (Platzhalter): "Ihr Unternehmen"
- Firmenprofil: "Amplifyr entwickelt individuelle Websites für Handwerksbetriebe und Immobilienverwaltungen — mit KI-Chat, Rechnern und Buchungstools, die echte Anfragen bringen statt nur schön auszusehen."

**Seitenaufbau (jrail-Reihenfolge):**
1. **Problem** (`#problem`) — *"Ist Ihre Website im KI-Zeitalter angekommen?"* Kernaussage: Eine Website ist längst keine Visitenkarte mehr, sondern ein Werkzeug — sie bucht Termine, rechnet Preise und beantwortet Fragen rund um die Uhr.
2. **Werkzeuge** (`#werkzeuge`) — *"Ihre Werkzeuge."* Fünf wählbare Werkzeug-Kategorien mit Beispielen:
   - **Rechner & Kalkulatoren** — Preiskalkulator, Konfigurationsassistent, Kostenrechner mit Sofort-Ergebnis (Bsp.: Umzugskostenrechner, Solaranlage-Kalkulator, Druckkosten-Konfigurator).
   - **Buchung & Termine** — Online-Terminbuchung direkt auf der Website, automatische Kalendereinträge, Erinnerungen, Stornoverwaltung (Bsp.: Coiffeur-Termin, Beratungsgespräch, Servicetermin Werkstatt).
   - **KI-Assistent auf der Website** — nimmt Anliegen auf, stellt Rückfragen, liest hochgeladene Fotos, leitet weiter, antwortet in jeder Sprache.
   - **Automatisierung & Support** — Auftragsbestätigungen, Erinnerungsmails, Rechnungsversand automatisch; Anbindung an bestehende Software wie **bexio** (Anfrage → Kontakt, Offerten-Entwurf) und **Outlook** (Termin → Kalendereintrag inkl. Kundeneinladung).
   - **Karriereseite & Bewerbungen** — strukturierte Bewerbungsaufnahme (Angaben/Lebenslauf/Zeugnisse in einem Schritt), offene Stellen separat für Google/KI-Assistenten auffindbar, Lehrstellen-Seite.
3. **Referenzen** (`#referenzen`) — *"Sehen Sie selbst, was wir bauen."* Zwei live besuchbare Referenzprojekte: **Ruay Thai Noodle** (Restaurant — Menü, Mittagsbuffet, Vorbestellung) und **Chalet Bambi** (Ferienvermietung Sörenberg — Verfügbarkeiten, Preise, Online-Buchung).
4. **Pakete** (`#betrieb`) — *"Das Sorglos-Paket."* Laufender Betrieb, monatlich kündbar. Enthaltene Leistungen: 24/7-Online-Überwachung mit Protokoll bei Auffälligkeiten, feste Ansprechperson (Antwort innert 24 Std.), monatlich kündbar ohne Bindung, Sichtbarkeit bei Google und KI-Antworten (SEO & GEO), monatlicher Rapport zu Besucherzahlen/Sichtbarkeit/Keyword-Rankings/technischem Zustand, 1 Änderung pro Monat inklusive (Texte/Bilder/Preise, grössere Anpassungen zu günstigen Tarifen), technisch stets aktuell gehalten, DSG/DSGVO-konforme Datenschutzerklärung wird aktuell gehalten. *(Kein fixer Website-Preis mehr auf der Seite genannt — bewusst so, nicht raten/erfinden.)*
5. **KI-Berater-Chat** (`#ki-berater`, im jrail betitelt "Chatbot").
6. **FAQ + Kontakt** (`#sec-cta`, eingeklappte FAQ + Button "Kontakt aufnehmen" → `/formular`).

**Vorgeschlagene Chat-Chips (typische Einwände):**
«Hab schon eine Website», «Was kostet das?», «Wie lange dauert der Aufbau?», «Bringt das wirklich Anfragen?», «Bringt das wirklich was?»

**FAQ (vollständig, 11 Fragen — die ausführlichste FAQ der Seite):**
1. **Warum keine Website mit WordPress oder einem Baukastensystem?** — Baukastensysteme sind oft langsam, schwer zu optimieren und generieren technische Schulden. Wir bauen schlanke, individuell entwickelte Websites — schneller, sicherer, besser im Ranking bei Google und KI-Suchsystemen.
2. **Was ist im Fixpreis enthalten?** — SEO-Basis, Mobile-Optimierung, SSL, alle sichtbaren Texte, Kontaktformular, strukturierte Daten (Schema.org) und Hosting-Einrichtung. Keine versteckten Kosten — was im Paket steht, ist enthalten.
3. **Wie lange dauert die Erstellung einer Website?** — Für einen einseitigen Auftritt rechnen wir mit 5–10 Werktagen. Komplexere Projekte mit mehreren Seiten dauern 3–6 Wochen. Regelmässige Updates, jederzeit Feedback möglich.
4. **Was bedeutet GEO — Generative Engine Optimization?** — GEO optimiert Inhalte so, dass KI-Suchsysteme wie ChatGPT, Perplexity und Google AI Overviews das Unternehmen direkt zitieren — nicht nur als Link, sondern als Antwort. Wird von Anfang an eingebaut.
5. **Wer pflegt die Website nach dem Launch?** — Anpassungen jederzeit beauftragbar. Auf Wunsch übernimmt Amplifyr die laufende Pflege als Retainer (siehe Sorglos-Paket).
6. **Was müssen wir dafür liefern — Texte, Bilder, Zeit?** — Weniger als gedacht. Amplifyr übernimmt die Inhalte der bestehenden Website als Grundlage (Leistungen, Referenzen, Team, Kontaktdaten) und arbeitet sie neu auf. Vom Kunden gebraucht: Erstgespräch, Feedback in festgelegten Runden, ggf. aktuelle Fotos/Logodateien. Realistisch wenige Stunden Aufwand übers ganze Projekt.
7. **Lässt sich die Website mit unserer bestehenden Software verbinden?** — In vielen Fällen ja. Beispiele **bexio** (Anfrage → automatisch Kontakt, optional Offerten-Entwurf) und **Outlook** (Termin → Kalendereintrag inkl. Kundeneinladung). Allgemein: Termine in bestehende Kalender, Anfragen an Branchensoftware übergeben, Rechnungs-/Kundendaten anbinden — sofern Schnittstelle vorhanden. Klärung im Erstgespräch vor Angebot. Keine zweite parallele Datenverwaltung als Ziel.
8. **Womit baut ihr die Websites technisch?** — Handgeschriebenes HTML, CSS und JavaScript — kein Framework, kein Build-Tool, keine Plugins, keine unnötige Datenbank. Daher Ladezeiten unter 2 Sekunden und minimale Angriffsfläche. Kompletter Quellcode gehört dem Kunden, keine technische Bindung an Amplifyr.
9. **Können wir die Website mehrsprachig aufbauen?** — Ja — Deutsch, Französisch, Italienisch, Englisch in jedem Paket möglich. Jede Sprachversion separat für Google/KI-Assistenten auffindbar. Aufwand hängt von der Übersetzungsquelle ab (Kunde liefert Texte = reiner Einbau; Übersetzungsbüro = zusätzliche transparent ausgewiesene Kosten; günstiger via Sprachmodell). Bewusst keine Live-Übersetzung beim Seitenaufruf (würde von Suchsystemen nicht gelesen). Ausnahme: der Chat antwortet in jeder Sprache, in der geschrieben wird.
10. **Hilft die Website auch bei der Personalsuche?** — Ja. Karriereseite zeigt Team/Arbeitsweise/Ausrüstung/Weiterbildung, Bewerbungen strukturiert (Angaben/Lebenslauf/Zeugnisse in einem Schritt). Offene Stellen bekommen eigene, separat auffindbare Unterseiten.
11. **Was macht die KI auf unserer Website konkret?** — Der Assistent nimmt Anliegen auf, stellt Rückfragen (was genau, wo, ab wann, wie dringend), liest hochgeladene Fotos und schätzt sie ein, bereitet auf Wunsch einen Offerten-Entwurf vor (Freigabe durch den Kunden), leitet an die richtige Person weiter, sortiert Bewerbungen nach festgelegten Kriterien. Grenzen: entscheidet nichts, was Geld kostet oder rechtlich bindet; erfindet keine Auskünfte; alles nachvollziehbar.

---

## Übergreifende Hinweise für die Bot-Konfiguration

- **Keine konkreten Preise nennen**, ausser explizit oben aufgeführt — die Website selbst nennt bewusst keine fixen Beträge mehr für Website/Digitalisierung (Ausnahme: der interaktive Aufwand-/Kostenrechner auf Handwerker/Bewirtschaftung/Webdesign berechnet die **eigenen** Opportunitätskosten des Kunden, das sind keine Amplifyr-Preise).
- **Kernsystem-Botschaft** zieht sich durch alle drei Vertikalen: Amplifyr ersetzt nie das bestehende Kernsystem (Handwerkersoftware, ImmoTop2 o. Ä.), sondern dockt IT/KI/Auftritt daran an.
- **Erstgespräch ist immer kostenlos und unverbindlich** — der durchgängige nächste Schritt auf allen Seiten, führt zu `/formular`.
- Jede Seite endet mit derselben Struktur: **KI-Berater-Chat → eingeklappte FAQ → Kontakt-CTA** (ein Button "Kontakt aufnehmen").
- Die Chat-Chips pro Seite geben die **erwarteten Top-Einwände** der jeweiligen Zielgruppe wieder (Kosten, Zeitaufwand, "bin schon versorgt/ausgebucht", Systemwechsel-Angst) — der Bot sollte auf genau diese Einwände vorbereitet sein.
