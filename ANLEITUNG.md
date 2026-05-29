# Laczy ToGo — Installation & Launch

Eine offline-fähige Web-App (PWA) zur Baustellenaufnahme für die Gebäudeenergieberatung.

## Was ist im Paket?

| Datei | Zweck |
|---|---|
| `index.html` | Die App selbst (alles in einer Datei) |
| `html2pdf.bundle.min.js` | PDF-Bibliothek (für den direkten PDF-Download, offline) |
| `manifest.json` | Macht die App installierbar (Name, Icon, Farben) |
| `sw.js` | Service-Worker — sorgt für Offline-Betrieb |
| `icon-192.png`, `icon-512.png` | App-Icons für den Startbildschirm |
| `icon-maskable-512.png` | Android-Icon (passt sich der Icon-Form an) |
| `apple-touch-icon.png` | App-Icon für iPhone/iPad |
| `favicon-32.png` | Browser-Tab-Symbol |
| `SICHERHEITSKONZEPT.md` | Sicherheits- & Datenschutzkonzept für den Betrieb |

**Wichtig:** Alle Dateien müssen zusammen im selben Ordner liegen.

---

## Schnellstart: Online stellen mit GitHub Pages (empfohlen)

Die volle Offline-Funktion (Installieren, Service-Worker) braucht einen echten Webserver mit https.
GitHub Pages ist dafür kostenlos und in wenigen Minuten eingerichtet.

### 1. GitHub-Konto & Repository
1. Falls noch nicht vorhanden: kostenloses Konto auf https://github.com anlegen.
2. Oben rechts auf **„+" → „New repository"**.
3. Namen vergeben, z. B. `laczy-togo`.
4. Auf **„Public"** lassen (Pages ist für private Repos nur in kostenpflichtigen Plänen verfügbar).
5. **„Create repository"** klicken.

### 2. Dateien hochladen
1. Im neuen Repository auf **„uploading an existing file"** klicken
   (oder **„Add file" → „Upload files"**).
2. **Alle Dateien** aus diesem Paket per Drag & Drop in das Fenster ziehen
   (index.html, manifest.json, sw.js und alle PNG-Dateien).
3. Unten **„Commit changes"** klicken.

### 3. GitHub Pages aktivieren
1. Im Repository oben auf **„Settings"**.
2. Links auf **„Pages"**.
3. Unter **„Branch"** `main` auswählen, Ordner `/ (root)`, dann **„Save"**.
4. Nach ein bis zwei Minuten erscheint oben die Adresse, z. B.:
   `https://DEINNAME.github.io/laczy-togo/`

Diese Adresse ist deine App. Auf jedem Handy im Browser öffnen.

### 4. Auf dem Handy installieren

**Android (Chrome):**
- Adresse öffnen → es erscheint unten der Hinweis **„Laczy ToGo installieren"** → tippen.
- Alternativ: Chrome-Menü (drei Punkte) → **„App installieren"** / **„Zum Startbildschirm hinzufügen"**.

**iPhone/iPad (Safari):**
- Adresse in **Safari** öffnen (wichtig: nur Safari kann installieren).
- Auf das **Teilen-Symbol** (Quadrat mit Pfeil) tippen.
- **„Zum Home-Bildschirm"** wählen → **„Hinzufügen"**.

Danach liegt Laczy ToGo als App-Icon (rotes Blatt) auf dem Startbildschirm und startet im Vollbild — wie eine native App.

---

## Offline-Nutzung

- Beim ersten Öffnen (online) lädt die App alle nötigen Dateien in den Gerätespeicher.
- Danach funktioniert sie **vollständig offline** — ideal für die Baustelle ohne Empfang.
- Aufgenommene Daten, Fotos und Skizzen werden **automatisch auf dem Gerät gespeichert**
  und bleiben auch nach dem Schließen erhalten.
- Die Daten verlassen das Gerät nicht (kein Cloud-Upload, datenschutzfreundlich).

## PDF-Bericht

- Über den Tab **„Bericht"** unten → **„Als PDF speichern"**.
- Es öffnet sich der Druckdialog des Geräts → dort **„Als PDF speichern"** wählen.

---

## App aktualisieren (für später)

Wenn du eine neue Version von `index.html` hochlädst:
1. Neue Dateien ins Repository hochladen (überschreiben).
2. In `sw.js` die Zeile `const CACHE_VERSION = 'laczy-togo-v1';` erhöhen (z. B. `-v2`).
   Das sorgt dafür, dass alle Geräte die neue Version laden statt der alten aus dem Cache.

---

## Lokal testen (ohne GitHub)

Die App lässt sich auch lokal ansehen, dann aber **ohne** Installier-/Offline-Funktion
(Service-Worker brauchen einen Server). Am einfachsten:

```
# im Paket-Ordner ein Terminal öffnen und:
python3 -m http.server 8000
# dann im Browser öffnen:  http://localhost:8000
```

Über `localhost` funktioniert dann auch der Service-Worker zum Ausprobieren.

---

*Laczy ToGo · Teil der Laczy-Werkzeuglinie · Datenaufnahme nach Dena-Checkliste*
