# Phase 9 — AI Assistant, AI & Models, Data & Integrations

**Screens** (`prototype/`): `30-assistant-answer`, `24-ai-models`, `25-ai-models-performance`, `23-integrations`. AI Models is the desktop version of `reference/05-mobile-ai-models.png`.
**Prototype:** `ROUTES.assistant`, `QS`, `answer`, `assetAnswer`, `askAI`, `chatMsg`, `ROUTES['ai-models']`, the `retrain` action, `ROUTES.integrations`, and the actions `integConnect`, `integMenu`, `integSync`, `integOff`.

## 9.1 AI Assistant (`/assistant`)

- **Header:** eyebrow "AI ASSISTANT", title "AI Assistant", subtitle "Ask about equipment health, failures, downtime and maintenance. Answers use the live plant data."
- **Layout:** 2fr / 1fr.
  - **Left: chat card.**
    - Empty state: bot icon, "Hello John, how can I help?", "Pick a suggested question or type your own."
    - User messages are blue right-aligned bubbles.
    - Assistant messages have a blue sparkle avatar and a light bubble.
    - The input bar has "Ask MaintaX AI…" and a Send button.
  - **Right column:**
    - **Suggested questions:** the 8 from `QS`, as buttons.
    - **Context:** plant, active anomalies, predicted failures, and "data as of" time.
- **`lib/assistant.ts`:** port `answer` and `assetAnswer` one to one, as pure functions of `db` (and currency) returning `{ text, table?, actions? }`. Render tables and action buttons as React, not HTML strings.
  - The answer reads live state. During or after a scenario, "What needs my attention today?" leads with the scenario asset.
  - "Why is Pump P-104 flagged?" answers "healthy" before the scenario, and gives the full diagnosis after it.
  - An asset ID in free text (for example "C-203") answers about that asset.
  - Anything else falls back to: "In this demo I can answer the suggested questions. Try one of them on the right, or ask about an asset by its ID, for example C-203."
- **Streaming:** reveal 2 words every 60 ms with a blinking caret. Show the table and actions only once the text has finished.
- **Entry points:** "Ask AI Assistant" on equipment and anomaly pages opens `/assistant` and asks "Why is {asset} flagged? ({id})". The chat history lives in ui-store; it is not persisted.
- Action buttons in answers (Create work order, View anomaly, Open …) work.

## 9.2 AI & Models and Data & Integrations

**AI & Models:**
- **Header:** eyebrow "AI & MODEL MANAGEMENT", title "AI Models", subtitle "Manage and monitor AI models that power predictive maintenance and operational intelligence."
- **CardTabs:** AI Models | Model Performance, with a "9 Models" chip.
- **AI Models tab:**
  - **Five family cards:** tile, name ("Remaining Useful Life Models" for RUL), description, Healthy or Training pill, "{n} models".
  - **Model Registry** table: model, family, version, last trained, accuracy bar, drift, status. "Retrain" animates the progress (+12% every 400 ms), then bumps the version, raises accuracy by 0.3, writes an audit entry and toasts.
  - RCA-Graph starts as "Training 68%".
- **Model Performance tab:**
  - **KPIs:** Prediction Accuracy 92.4%, False Positives 4.8%, False Negatives 2.1%, Model Drift 1.3% (decreases shown green), and a highlighted "Overall Model Performance — Excellent" card.
  - **Model Accuracy Trend:** 5 lines, y-axis 20–100%, with a legend.
  - **Feedback Log:** green check for confirmed, gray × for false positive, newest first. This includes the scenario confirmation.

**Data & Integrations:**
- **Header:** eyebrow "DATA & INTEGRATIONS". PlantSwitcher on the right.
- **KPIs:**
  - Connected Sources: on / total
  - Sensors Online: 118 / 118
  - Data Points / min: 24,600
  - Data Latency: 1.4 s
- **Data Sources** list: icon tile, name, kind, detail and sync time. Connected sources show a pill and a Manage menu (Sync now / Disconnect); others show Connect.
  - Connect spins for 1.5 s, then sets connected, writes an audit entry and toasts.
- **Sensor Inventory:** type select (pre-set when arriving from an Equipment sensor tile), a scrollable table (first 60), and a "{n} sensors" footer.

## Done when

- [ ] All 8 suggested questions give sensible answers. The P-104 answer changes before and after the scenario.
- [ ] Retrain, connect, disconnect and sync all work and persist.
- [ ] Build and lint pass.
