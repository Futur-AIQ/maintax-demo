# Phase 5 — Anomalies and Alerts

**Targets:** `reference/01-anomaly-dashboard.png`. Also, in `prototype/`: `09-anomalies-seed`, `10-anomaly-panel-ai-analysis`, `11-anomaly-detail`, `19-alerts`, `41-anomalies-after-detection` (the screenshot state after the P-104 scenario).
**Prototype:** `ROUTES.anomalies`, `anPanel`, `anDetail`, `anTitle`, `anChange`, `ROUTES.alerts`, and the actions `anRow`, `anCheck`, `anBulk`, `anMenu`, `anStatus`, `anComment`, `alAck`, `alRes`, `ruleSw`.

## 5.1 Anomaly Dashboard (`/anomalies`)

- **Header:** eyebrow "AI ANOMALY DETECTION", title "Anomaly Dashboard", subtitle "Detect and analyze anomalies in real-time using AI. Stay ahead of issues and prevent costly downtime." On the right: DatePill and PlantSwitcher.
- **KPI row** (4 equal columns plus 1.75):
  - Active (`anActive`, seed **11**)
  - New (solid blue plus icon tile; active and `isNew`, seed **7**)
  - Resolved (resolved within 7 days, seed **24**)
  - Critical (seed **2**)
  - Each has a delta and "vs. last 7 days". Active and Critical deltas are red when up.
  - **Anomaly Trends** mini card: a purple area line of `ANOM_TOTAL`, with the last point +1 for each active anomaly above 11. It has a "Last 7 days" pill.
- **Main grid** (2.2fr / 1fr):
  - **Left column**
    - **Detected Anomalies** (`an24`, last 24 hours, newest first), with the suffix "last 24 hours".
      - Use compact padding so all columns fit: checkbox, Time ("Oct 19, 04:16"), Equipment cell, "{type} Anomaly", Severity pill, Confidence bar, Status pill, menu.
      - 5 per page. Footer "Showing 5 of 11 anomalies".
      - Clicking a row selects it, loads it into the panel and highlights the row. Double-click opens the detail page.
      - Checking rows shows "{n} selected" with Acknowledge and Mark resolved buttons.
      - Rows under 5s old get the `nw` highlight.
    - Two cards side by side:
      - **Detection Types:** donut of `db.detTypes`, center = total, sub "Total Anomalies". The legend labels read "Sensor Anomalies" and so on.
      - **Anomaly Trends:** multi-line `ANOM_TRENDS` with `TYPEC` colors and a legend.
    - **Detection Summary:** 6 tiles with a type icon, the count and `db.detD` deltas. Performance going down is shown green.
  - **Right column**
    - **Anomaly Details panel** for the selected anomaly. The default is the most severe active anomaly in the last 24 hours (seed: HX-2; after the scenario: P-104).
      - Gradient header (pink for critical, blue otherwise), "Anomaly Details" and a severity tag.
      - Title "{asset} – {type} Anomaly", "Detected {date} · {time} | Confidence: {n}%", and the asset illustration.
      - Tabs:
        - **Overview:** facts (equipment, type, severity, status), and a reading box (current reading with ↑ %, normal range, detection time, location).
        - **Sensor Data:** a LiveChart around the detection time.
        - **AI Analysis:** root cause bars, evidence, recommendation, model.
        - **Investigation:** the latest 5 log or comment entries, plus "Open investigation".
      - Buttons: **View Details**, **Create Work Order** (or "Open Work Order" when linked), and a menu.
    - **AI Insights:** `db.insAn` top 5.
    - **Recent AI Analysis:** `db.analysis` top 4.

## 5.2 Anomaly detail (`/anomalies/[id]`) and Alerts (`/alerts`)

**Anomaly detail** (2 columns, 1.8 / 1):
- **Header:** "← Anomalies", the title with a severity pill, and "{id} · detected … · {conf}% confidence · {plant} · {line}". Actions: Ask AI Assistant, Open equipment.
- **Left:**
  - **Reading** strip: current reading, change vs baseline, normal range, signal.
  - **Sensor Data** chart.
  - **AI Analysis:** two columns. Root cause bars and evidence on one side; recommended action, similar past events and model on the other.
- **Right:**
  - **Status** card: the workflow Active → Investigating → Resolved (or False positive), with the current step highlighted.
    - Buttons: Start investigating / Mark resolved / False positive / Reopen.
    - Each change is logged with a toast. False positive also adds a feedback entry ("False positive — {asset} {type} anomaly").
  - **Work Order** card: the linked WO, or a Create Work Order button.
  - **Investigation:** an "Add a comment…" input with Add, then the timeline of log entries and comments.

**Alerts:**
- **Header:** eyebrow "ALERTS", title "Alerts", subtitle "Alarms raised by rules and by the AI. Acknowledge what you are handling and resolve what is fixed." PlantSwitcher on the right.
- **CardTabs** with counts: All, Unacknowledged, Acknowledged, Resolved. On the right, a severity Segmented control: All / Critical / High / Medium / Low.
- **Table:** severity, alert title (600), equipment cell with "{id} · {plant short} · {line}", trigger pill (purple "AI" or gray "Rule"), relative time, state pill (New / Acknowledged / Resolved), and actions (Acknowledge, Resolve, Open).
  - Acknowledging lowers the Alerts badge (seed **4**) and the bell dot.
- **Notification Rules** card: 4 rows with switches and the note "In this demo, rules change here only; no messages are sent."

## Done when

- [ ] Seed state: 11 / 7 / 24 / 2, "Showing 5 of 11", panel showing HX-2. Compare with `prototype/09-anomalies-seed.png`.
- [ ] Bulk acknowledge and resolve, status changes, comments and false positive all update the KPIs, badges and timeline, and persist after a reload.
- [ ] Alerts acknowledge and resolve work, and the counts update.
- [ ] Build and lint pass.
