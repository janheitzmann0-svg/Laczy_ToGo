# Sicherheitskonzept — Laczy ToGo

**Stand:** Mai 2026 · **Version:** 1.0
**Anwendung:** Laczy ToGo — Baustellenaufnahme für die Gebäudeenergieberatung
**Einsatz:** Betrieblicher Einsatz mit personenbezogenen Kundendaten

---

## 1. Zweck dieses Dokuments

Dieses Konzept beschreibt, wie Laczy ToGo mit Daten umgeht, welche Schutzmaßnahmen umgesetzt sind und welche organisatorischen Regeln im Betrieb einzuhalten sind. Es dient als Grundlage für den datenschutzkonformen Einsatz (DSGVO) und als Nachweis der technischen und organisatorischen Maßnahmen (TOM).

---

## 2. Welche Daten verarbeitet die App?

Laczy ToGo erfasst im Rahmen der Energieberatung:

- **Personenbezogene Daten** des Eigentümers: Name, Adresse, Telefon, E-Mail, Angaben zu Bewohnern (Anzahl, Kinder).
- **Objektdaten:** Gebäudeadresse, Baujahr, Flächen, technische Ausstattung.
- **Fotos und Skizzen** der Baustelle, die mittelbar personenbezogen sein können (z. B. erkennbares Wohnumfeld).

Diese Daten sind nach DSGVO schützenswert. Fotos von Innenräumen und Adressdaten gelten als besonders sensibel.

---

## 3. Architektur-Grundsatz: Lokal statt Cloud

Der zentrale Sicherheitsvorteil von Laczy ToGo ist die **rein lokale Datenhaltung**:

- Alle Eingaben, Fotos und Skizzen werden **ausschließlich auf dem Gerät** gespeichert (Browser-Speicher / IndexedDB).
- Es findet **kein automatischer Upload** in eine Cloud statt.
- Es gibt **keinen Server**, der Kundendaten empfängt oder speichert.
- Die Daten verlassen das Gerät nur dann, wenn der Nutzer **aktiv ein PDF erstellt und dieses selbst weitergibt**.

Damit ist die Angriffsfläche minimal: Es gibt keine zentrale Datenbank, die kompromittiert werden könnte, und keine Datenübertragung, die abgefangen werden könnte.

---

## 4. Technische Schutzmaßnahmen (im Code umgesetzt)

| Maßnahme | Schutz vor | Status |
|---|---|---|
| **Content-Security-Policy (CSP)** | Einschleusen & Ausführen von Fremdcode (XSS) | ✅ aktiv |
| **Eingabe-Maskierung (HTML-Escaping)** | Schadcode über Eingabefelder (z. B. Bauteilnamen) | ✅ aktiv |
| **X-Content-Type-Options: nosniff** | Fehlinterpretation von Dateitypen | ✅ aktiv |
| **Referrer-Policy: no-referrer** | Weitergabe von Adressinformationen an Dritte | ✅ aktiv |
| **frame-ancestors 'none'** | Einbettung der App in fremde Seiten (Clickjacking) | ✅ aktiv |
| **Lokale Bibliotheken** (kein Fremd-CDN für Logik) | Manipulierte Skripte von Drittservern | ✅ aktiv |
| **Bildkomprimierung vor Speicherung** | Übermäßiger Speicherverbrauch | ✅ aktiv |
| **HTTPS-Auslieferung** (über GitHub Pages) | Manipulation auf dem Übertragungsweg | ✅ durch Hosting |

Die App lädt zur Laufzeit nur Schriftarten von Google Fonts nach (keine Nutzerdaten werden dabei übertragen). Optional kann dies durch lokales Einbetten der Schriften vollständig entkoppelt werden (siehe Abschnitt 8).

---

## 5. Verbleibende Risiken (ehrliche Einschätzung)

Kein System ist absolut sicher. Folgende Restrisiken bestehen und werden durch organisatorische Maßnahmen (Abschnitt 6) adressiert:

1. **Geräteverlust / Diebstahl:** Da die Daten lokal liegen, sind sie nur so sicher wie das Gerät. → Gerätesperre & Verschlüsselung zwingend.
2. **Kein Passwortschutz innerhalb der App:** Wer das entsperrte Gerät hat, kann die App öffnen. → Geräte-Zugriffsschutz ist die Schutzschicht.
3. **Browser-Speicher ist nicht verschlüsselt** auf Anwendungsebene. → Geräteverschlüsselung des Betriebssystems schließt diese Lücke.
4. **PDF-Weitergabe:** Sobald ein PDF erstellt und z. B. per E-Mail verschickt wird, gelten die üblichen Risiken der Übertragung. → Sichere Versandwege nutzen.
5. **Öffentliches GitHub-Repository:** Der Programmcode ist öffentlich — **nicht aber die Daten** (die liegen nie im Repo). Das ist unkritisch, sollte aber bewusst sein.

---

## 6. Organisatorische Maßnahmen (im Betrieb einzuhalten)

Diese Regeln sind verbindlich für alle Mitarbeitenden, die Laczy ToGo nutzen:

### Geräteschutz
- **Gerätesperre aktivieren:** PIN, Passwort oder biometrische Sperre auf jedem genutzten Gerät.
- **Geräteverschlüsselung aktivieren:** Bei modernen iPhones/Android-Geräten standardmäßig aktiv, bitte prüfen.
- **Automatische Sperre** nach kurzer Inaktivität (max. 2 Minuten) einstellen.
- Keine Nutzung auf privaten, ungesicherten Geräten.

### Datensparsamkeit
- Nur die für die Beratung **notwendigen** Daten erfassen.
- Fotos zurückhaltend einsetzen — keine Aufnahmen von Personen, persönlichen Dokumenten oder Wertgegenständen.

### Datenlöschung
- Nach Abschluss eines Auftrags und Erstellung des PDF: Aufnahme im Betrieb sichern (PDF im geschützten Ablagesystem) und **das Projekt in der App löschen** (Projektliste → Papierkorb-Symbol → Bestätigung).
- Jedes Projekt wird getrennt gespeichert und kann einzeln und vollständig (inkl. aller Fotos und Skizzen) gelöscht werden.
- Bei Gerätewechsel oder Ausscheiden eines Mitarbeiters: Gerät vollständig zurücksetzen.

### PDF-Weitergabe
- PDFs nur über gesicherte Kanäle versenden (verschlüsselte E-Mail oder geschütztes Kundenportal).
- PDFs nicht in unsicheren Cloud-Diensten ablegen.

### Einwilligung
- Vor Fotoaufnahmen die **Einwilligung des Eigentümers** einholen (mündlich dokumentieren oder schriftlich).
- Kunden über die lokale Speicherung und den Zweck der Datenerhebung informieren.

---

## 7. DSGVO-Einordnung

- **Rechtsgrundlage:** Vertragserfüllung (Energieberatung) gem. Art. 6 Abs. 1 lit. b DSGVO; Fotos ggf. auf Basis einer Einwilligung (lit. a).
- **Datenminimierung (Art. 5):** Durch lokale Haltung und gezielte Erfassung erfüllt.
- **Speicherbegrenzung:** Lokale Daten nach Auftragsabschluss löschen (siehe Abschnitt 6).
- **Auftragsverarbeitung:** Da keine externen Dienstleister Daten verarbeiten (kein Cloud-Backend), ist **kein AV-Vertrag** für die App selbst nötig. Hinweis: GitHub Pages liefert nur den Programmcode aus, **keine Kundendaten**.
- **Betroffenenrechte:** Auskunft und Löschung können erfüllt werden, da alle Daten lokal und übersichtlich vorliegen.

> **Hinweis:** Dieses Dokument ersetzt keine Rechtsberatung. Für die verbindliche datenschutzrechtliche Bewertung im Betrieb sollte der/die Datenschutzbeauftragte oder ein Fachanwalt hinzugezogen werden.

---

## 8. Empfehlungen für höhere Sicherheit (optional, ausbaubar)

Diese Maßnahmen sind derzeit **nicht** umgesetzt, können aber bei erhöhtem Schutzbedarf ergänzt werden:

1. **App-PIN / Code-Sperre** beim Öffnen der App (zusätzliche Schicht neben der Gerätesperre).
2. **Verschlüsselung der gespeicherten Daten** im Browser-Speicher (z. B. via Web Crypto API mit einem nutzerdefinierten Schlüssel).
3. **Lokales Einbetten der Schriftarten**, um auch die Verbindung zu Google Fonts zu vermeiden (vollständige Offline-Autarkie).
4. **Automatisches Löschen** alter Aufnahmen nach einstellbarer Frist.
5. **Export/Backup verschlüsselt** als passwortgeschützte Datei.

Jede dieser Maßnahmen kann gezielt nachgerüstet werden — sag Bescheid, welche Priorität hat.

---

## 9. Verantwortlichkeiten

| Rolle | Verantwortung |
|---|---|
| Betriebsinhaber / Geschäftsführung | Festlegung & Durchsetzung dieses Konzepts |
| Mitarbeitende (Energieberater) | Einhaltung der organisatorischen Maßnahmen (Abschnitt 6) |
| Datenschutzbeauftragte/r (falls vorhanden) | Prüfung & Freigabe der DSGVO-Konformität |

---

*Laczy ToGo · Sicherheitskonzept v1.0 · Bei Änderungen an der App ist dieses Dokument zu aktualisieren.*
