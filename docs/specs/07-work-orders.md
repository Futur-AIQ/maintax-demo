# Phase 7 — Work orders, repair and outcome, Maintenance, Predictions

**Screens** (`prototype/`): `14-work-orders`, `15-work-order-detail`, `43-work-order-modal-ai`, `44-scenario-wo-scheduled`, `45-repair-in-progress`, `46-outcome-modal`, `47-dashboard-after-outcome`, `13-maintenance`, `12-predictions`.
**Prototype:** `ROUTES['work-orders']`, `woDetail`, `woModal`, `submitWO`, the actions `woTab`, `woNext`, `woChk`, `woComment`, and `onScenarioWO`, `ffRepair`, `repairStep`, `completeScenario`, `outcomeModal`, `ROUTES.maintenance`, `ROUTES.predictions`, `probBar`.

## 7.1 Work orders, the scenario action loop, the outcome

**Create Work Order** modal (wide). It opens from:
- the Work Orders page
- the equipment page and row menu
- the anomaly panel, detail page and menu
- the Predictions "Schedule" button and Maintenance plans
- the scenario bar, and **W**

Behaviour:
- When opened from the **scenario anomaly**, prefill from `SCEN.wo`: title, Predictive, High, assignee, next planned window (Line 1 Thursday 06:00 at least 2 days out; the hint reads "Next Line 1 planned stop" or "Next Polymer Line A changeover"), estimate, parts checked, checklist.
- From other anomalies or predictions, prefill from their recommendation.
- Show the purple pill "Suggested by MaintaX AI · {anomaly id}" when suggested.
- **Fields:**
  - Title
  - Equipment (select)
  - Type
  - Priority
  - Assignee (`TECHS`)
  - Planned window (datetime-local)
  - Estimated hours
  - Parts: checkbox chips showing stock, from `PARTS`
  - Checklist: a textarea, one step per line
- **On submit:**
  - Create `WO-2026-0{nextWo}` with status Scheduled, `source` AI or Manual, and `anomalyId`.
  - Link the anomaly (`woId`, and status Investigating when not the scenario anomaly). Set the prediction to Scheduled.
  - Call `onScenarioWO`, then save. Toast "{id} created · {assignee} · {date}" with an Open link.

**Work Orders list:**
- **Header:** eyebrow "MAINTENANCE EXECUTION", title "Work Orders", subtitle "Create, schedule and complete maintenance work. AI-suggested jobs are marked." Actions: PlantSwitcher and "+ New Work Order".
- **CardTabs** with counts: All, Open, Scheduled, In Progress, Completed. Search on the right.
- **Table:** title with the ID below, equipment, type, priority, assignee (avatar and name), due date, status, source (purple "✦ MaintaX AI" or gray "Manual"). Completed rows go last; otherwise sort by due date.

**Work Order detail:**
- **Header:** "← Work Orders", title with status, and "{id} · {type} · {asset} · {plant} · {line}".
  - Next-step button: Schedule, then Start work, then Complete. Completing marks every checklist item done, records the hours, raises asset health to at least 85, logs history, and resolves the linked anomaly.
  - For the scenario WO in phase 5, show the amber **"Fast-forward to repair"** button instead.
- **Left column:**
  - **Details** grid: priority, assignee, team, planned, estimated, labor recorded. An AI pill appears when suggested.
  - **Checklist:** tickable, "x of y done", disabled when completed or during repair.
  - **Parts** table with stock.
- **Right column:** Linked Anomaly, Equipment (illustration, health, status), Activity timeline with an "Add a comment…" box.

**Repair** (`ffRepair` / `repairStep`, about 10 s at any speed):
- The WO goes In Progress and the asset goes to Maintenance. Navigate to the WO detail page.
- Checklist items tick every 1.4 s. Sensor values drop to 0 for 2 s, then ease to their post values.

**`completeScenario`:**
- WO Completed, with hours and a log entry.
- Anomaly Resolved, alert resolved, prediction Mitigated.
- Asset: post health and RUL, Low risk, Running, Good, `post = true`.
- Feedback entry, `db.avoided[plant] += avoided`, add the scenario to `completed`, asset history entry, and a dashboard insight "Failure Avoided".
- Then: sim inactive, **save**, open the **Outcome modal**.

**Outcome modal:**
- Green shield, "Failure avoided — {asset}", "{scenario} · caught {lead.toFixed(1)} days before the predicted failure".
- Tiles:
  - a green full-width tile: Unplanned downtime avoided, "14.6 hrs"
  - Cost avoided (currency)
  - Warning lead time
  - Planned repair
  - Unplanned failure estimate
- An explanatory sentence (the "Without the warning: …" text and the model name).
- Footer: "Figures are sample data for this demo.", Close, **View on dashboard**.

## 7.2 Maintenance and Predictions

**Maintenance:**
- **Header:** eyebrow "MAINTENANCE PLANNING". PlantSwitcher on the right.
- **KPIs:**
  - Due This Week (`maintDue`)
  - Overdue
  - Planned Compliance 94%
  - Predictive Share (% of WOs from AI)
- **Week calendar** card: "Week of {Mon date}", a type legend, and prev / "This week" / next buttons.
  - 7 columns. Today is highlighted.
  - Thursday shows a hatched band "Line 1 planned stop · 06:00–12:00".
  - Job chips are colored by type (`j-Predictive` purple, Preventive blue, Corrective red, Inspection green), show the asset ID and kind, and open the WO.
- **Maintenance Plans** table: equipment, task, interval, last done, next due (red when overdue), and "Generate work order", which opens the modal prefilled.

**Predictions:**
- **Header:** eyebrow "PREDICTIVE MAINTENANCE".
- **KPIs:**
  - Predicted Failures: next 7 days
  - Avg. Lead Time: 5.8 days
  - Prediction Accuracy: 92.4%
  - Assets at Risk: probability ≥ 50%
- **Table** (2fr): equipment, failure mode, probability bar, window, RUL (red when ≤ 7), confidence, recommended action, status, and "Schedule" for Open predictions.
- **Risk Matrix** card (1fr): SVG, probability × impact, four tinted quadrants, dots with asset labels that open the asset.

## Done when

- [ ] The full story works with the keyboard: S → start (4×) → W → Create → F → outcome → View on dashboard. Downtime avoided at Mesaieed reads **32.8 hrs** (18.2 + 14.6). Compare with screenshots 43–47.
- [ ] A manual WO from the equipment page appears in the list, the calendar and Maintenance Due.
- [ ] Completing a WO by hand updates the asset and its linked anomaly.
- [ ] Build and lint pass.
