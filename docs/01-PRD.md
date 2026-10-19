# MaintaX Live Demo — Product Requirements Document (PRD)

| | |
|---|---|
| Product | MaintaX — Predictive Maintenance System (Hansa Technologies) |
| Deliverable | A clickable, live-feeling web demo hosted on Vercel |
| Source page | https://hansatechnologies.org/predictive-maintenance-system |
| Owner | Ketan Parmar |
| Version | 1.0 (draft for review) |
| Sister project | AI Clinical Scribe demo (`ai-clinical-scribe-demo`), same build method |

## 1. Background

Hansa Technologies markets MaintaX on its website with seven product screenshots and a "Request a Demo" button, but no working product exists. When a prospect asks for a demo, there is nothing to show.

We already solved the same problem for the AI Clinical Scribe: a scripted, clickable web app that looks and behaves like the real product, built from the website screenshots. This project repeats that for MaintaX.

## 2. Goal

Give Hansa a demo it can open in any browser and present to a prospect in five minutes. The demo should make one thing obvious: **MaintaX spots a failing machine days before it breaks, explains why, and turns that warning into a maintenance job that avoids unplanned downtime.**

### Success criteria

1. A presenter can run the full story (healthy plant → anomaly → prediction → root cause → work order → repair → downtime avoided) in under 5 minutes without help.
2. Every screen on the website screenshots exists, matches them in layout and feel, and every menu item opens a working page.
3. A prospect can click around freely without hitting a dead end, an error or an empty page.
4. Numbers agree across screens. For example, the anomaly count on the dashboard matches the Anomalies page and the sidebar badge.
5. It loads on Vercel with no backend, no keys and no setup.

## 3. Audience

| Who | What they need from the demo |
|---|---|
| **Presenter** (Hansa sales or management) | A reliable script, a way to trigger the failure on cue, a reset before each session |
| **Prospect: plant or operations manager** | Plant-wide health at a glance, downtime and cost impact in their currency |
| **Prospect: maintenance lead** | Which asset is failing, when, why, and what to do about it |
| **Prospect: engineering or IT** | Proof of integrations (OPC UA, historian, CMMS), AI model quality, roles and audit |

**Target market:** chemical, petrochemical and pharmaceutical plants in the Gulf, starting with Qatar.

## 4. The demo story

The sample company is **Gulf Crest Chemicals**, which is fictional. It runs three plants in Qatar:

- **Mesaieed Chemical Plant:** the main plant, 142 assets
- **Ras Laffan Polymer Plant:** 64 assets
- **Doha Pharmaceutical Facility:** 42 assets

The story runs in seven steps:

1. **Healthy plant.** The Plant Overview shows 92% equipment health. A few known issues are already being handled.
2. **Live sensor feed.** The presenter starts a scenario. MaintaX switches to a **time-lapse** (1 second = 2 hours of plant time), and charts for Pump P-104 start ticking.
3. **Early warning.** Vibration creeps up. The AI posts an early-warning insight, while the readings are still inside normal limits.
4. **Anomaly confirmed.** Vibration reaches 8.4 mm/s, which is +145% over baseline. A critical anomaly appears on every relevant screen at once: a toast, the bell, the sidebar badge, the anomaly table and AI Insights.
5. **Prediction and root cause.** MaintaX predicts a 68% chance of failure within 5 days, drops the remaining useful life from 2.4 years to 6 days, and names the cause: outer-race bearing wear at 87%.
6. **Action.** The presenter clicks **Create Work Order**. It comes prefilled with the task, parts, technician and the next planned maintenance window.
7. **Outcome.** The presenter fast-forwards through the repair. Health recovers, and MaintaX shows the result: unplanned downtime avoided, cost avoided in USD, QAR or AED, and the prediction confirmed back to the AI model.

The other two scenarios follow the same arc: **agitator motor overheating** (temperature) and **compressor seal leak** (pressure).

After a scenario completes, the app's state matches the website screenshots, for example "12 active anomalies, 3 critical, Pump P-104 vibration anomaly at 96% confidence".

## 5. Scope

### In scope (version 1)

- **Desktop web app, responsive** down to tablet and phone width as a regular web page.
- **Branding:** "MaintaX" wordmark with the Hansa "H" mark, and the tagline "Predict. Prevent. Perform."
- **All 16 sidebar destinations:**
  - Dashboard (Plant Overview), Equipment, Anomalies, Predictions, Maintenance, Work Orders
  - Reliability, Downtime, Production, AI Assistant, Alerts, Reports
  - Data & Integrations, AI & Models, Administration, Security
- **Detail pages:** Equipment, Anomaly, Work Order.
- **The simulation:** three failure scenarios with a time-lapse sensor engine, live charts and presenter controls.
- **Scripted AI Assistant:** suggested questions with prepared answers that reflect the live state.
- **Plant switcher:** All Plants or one of the three plants.
- **Currency switcher:** USD, QAR or AED (both Gulf currencies are pegged to the US dollar).
- **Global search** across equipment, anomalies and work orders.
- **Saved state:** changes are saved in the browser, with a Reset in the presenter panel.
- **Report downloads** as CSV files generated in the browser.

### Out of scope (version 1)

- **The mobile app screens.** Two screenshots (Downtime and AI Models) are mobile; their content is rebuilt as desktop pages. A phone-app version is a later phase.
- Real sensors, a real AI model, real integrations, logins or a backend.
- Arabic language and right-to-left layout. Noted as a likely later request for Gulf clients.
- A shared code package across Hansa demos. Recommended later; see the Development Plan, section 6.

## 6. Requirements summary

The SRS has the full numbered list.

| Area | Requirement |
|---|---|
| Fidelity | Layout, colors, cards and density match the 7 screenshots |
| Live moment | Time-lapse sensor streams, an anomaly appearing everywhere at once, a prediction, a root cause, a work order and the outcome |
| Consistency | One data store drives every screen, with counts agreeing everywhere |
| Gulf context | Qatar plants, chemical and pharma assets, metric units, USD/QAR/AED |
| Presenter control | Scenario picker, speed (1×, 2×, 4×), pause, fast-forward, reset, keyboard shortcuts |
| Always current | Dates are computed from "now", so the demo never looks stale |
| Honest | A visible "Demo · Sample data" badge. The app never claims to have sent emails, connected to real systems or downloaded real data |
| Zero setup | Static Next.js app on Vercel, no environment variables |

## 7. Branding and naming decisions

| Item | Decision |
|---|---|
| Product name | **MaintaX**, as on the website |
| Logo | The Hansa "H" mark beside the "MaintaX" wordmark (the "X" in blue), with "Predict. Prevent. Perform." below |
| Browser title | "MaintaX · Hansa Technologies" |
| Company in the data | Gulf Crest Chemicals (fictional) |
| Signed-in user | John Doe, Operations Manager, as in the screenshots |
| People | The 10 names in the screenshots, plus 14 more, including Gulf and South Asian names to match the region |
| Email domain | `@gulfcrest.example`, a reserved domain that can never be real |
| Plant photo | The Plant Overview header photo is replaced by an illustrated plant skyline (no stock photos) |
| Equipment render | The 3D pump image is replaced by a simple illustration |

## 8. Risks and how we handle them

| Risk | Handling |
|---|---|
| The screenshots contradict each other (142 vs 248 assets; P-104 at 92% on one screen and 62% on another) | The data spec reconciles them. 142 is Mesaieed and 248 is All Plants. P-104 starts at 92% and drops to 62% during the scenario |
| A prospect mistakes it for live plant data | The demo badge, fictional company, `.example` emails and a footer note in the presenter panel |
| The scope is about 1.7 times the scribe | Port the scribe's shell and primitives. Phase plan with an early demo-ready milestone after the simulation phase |
| Pro plan usage limits | The same kit method: small specs, named screenshots, targeted prototype lookups, `/clear` after each phase |
| Commercial hosting terms | Deploy client demos from a paid Vercel account or Hansa's account, not the free Hobby plan |

## 9. Milestones

| # | Milestone | Output |
|---|---|---|
| M1 | Documents approved | This PRD, the SRS, the UI, data and simulation specs, the plan and the demo script |
| M2 | HTML prototype | One self-contained file with every screen and the full simulation, built by Claude here |
| M3 | Starter kit | `CLAUDE.md`, phase specs, prompts, screenshots and typed seed data |
| M4 | Demo-ready build | Through the simulation phase: Plant Overview, Equipment, Anomalies, live scenario and Work Orders |
| M5 | Complete build | All pages, polish, QA, README |
| M6 | Deployed | `maintax-demo.vercel.app` (or a Hansa domain) |
