# MaintaX — Claude Code prompts, phase by phase

**How to use**
- Open this folder in VS Code, open the terminal, run `claude`, and paste **one step at a time**.
- After each step:
  1. Read Claude's summary.
  2. Run `npm run dev` and compare the page with the screenshots named in the step.
  3. Ask for fixes in the same session if needed.
  4. Commit.
- Type `/clear` at the end of each **phase**, not each step. `CLAUDE.md` loads automatically, so a fresh session still knows the project.
- To ask for a fix, reply with the screenshot name and what differs. For example: "The KPI tiles are taller than in docs/screens/reference/02-plant-overview.png. Tighten them."
- On the Pro plan, if you hit the usage limit mid-step, wait for the reset, then send: "Continue the current step from where you stopped."
- **Git:** run `git init` once before Step 0.1, and commit after each step with the suggested message. Claude Code does not run git.

**21 steps · 12 phases · ≈ 26 hours.** After Phase 7 (step 7.2) the full demo story works and you can deploy early.

---

## Phase 0 — Setup

### Step 0.1 — Scaffold and check

```
Phase 0. Read CLAUDE.md, then docs/specs/00-setup.md, and do sections 0.1 and 0.2 exactly.
Scaffold Next.js in a temporary _tmp folder and move it into this project root without overwriting CLAUDE.md, README.md, docs/, seed/ or public/logo-*.png.
Install zustand, lucide-react, clsx and (dev) tsx, and add the "verify:seed" script.
Run npm run build, npm run lint and npm run verify:seed, and report the results, the installed versions and the scribe-reuse findings.
```

Commit: `chore: scaffold Next.js with MaintaX starter kit`

`/clear`

---

## Phase 1 — Design system and shell

### Step 1.1 — Tokens, icons, UI primitives

```
Phase 1, step 1. Read docs/specs/01-shell.md section 1.1.
Visual references: docs/screens/reference/02-plant-overview.png and docs/screens/prototype/01-dashboard.png.
For exact CSS values, read the <style> block at the top of docs/prototype.html in chunks (it is about 300 lines). Do not read the rest of the file.
If the scribe project's UI primitives were found in Phase 0, adapt them to the MaintaX tokens instead of starting from zero.
Build globals.css tokens, the root layout (Inter, metadata with robots noindex, icon), src/lib/icons.ts and every component in src/components/ui. Add a temporary /ui-preview page.
Finish with build and lint results and a summary.
```

Commit: `feat: design tokens, icons and UI primitives`

### Step 1.2 — Sidebar, top bar, header, routes

```
Phase 1, step 2. Read docs/specs/01-shell.md section 1.2 and its "Done when" list.
Match docs/screens/reference/02-plant-overview.png and docs/screens/reference/01-anomaly-dashboard.png for the shell, plus docs/screens/prototype/31-search-results.png, 32-notifications-menu.png, 33-user-menu.png and 53-phone-drawer.png.
Prototype references (grep, then read only those functions): renderSide, renderTop, ph, searchResults.
Build the (app) route group with AppShell, Sidebar (with the context card per route), Topbar, PageHeader, DatePill, PlantSwitcher, GlobalSearch shell, the presenter badge, all placeholder routes and not-found. Static data is fine for now.
Check every "Done when" item and report.
```

Commit: `feat: app shell, navigation and routes`

`/clear`

---

## Phase 2 — Data and stores

### Step 2.1 — Seed data and stores

```
Phase 2, step 1. Read docs/specs/02-data.md section 2.1 and the "State architecture" section of CLAUDE.md.
Prototype references: load, save, shiftDates, resetDemo.
Copy seed/ to src/data/, build store/demo-store.ts (persist with savedAt and date shifting, a canSave hook, update helper, resetDemo) and store/ui-store.ts, and wire init() plus the loading skeleton into AppShell.
Run npm run verify:seed. Confirm there are no hydration warnings.
```

Commit: `feat: demo data store with persistence`

### Step 2.2 — Selectors and wiring

```
Phase 2, step 2. Read docs/specs/02-data.md section 2.2 and the "Done when" list.
Prototype references: the DERIVED block (inPl … avoidedHrs), sensorsFor, sensorHist, curVal, histFor, money.
Build src/lib/selectors.ts, src/lib/sensors.ts and src/lib/format.ts, then connect the sidebar badges, bell, notifications menu, global search and both plant switchers to the store. Add the temporary proof line on the dashboard.
Report the badge values and the search results for "pump".
```

Commit: `feat: selectors and live shell data`

`/clear`

---

## Phase 3 — Dashboard

### Step 3.1 — Plant Overview

```
Phase 3. Read docs/specs/03-dashboard.md.
Target: docs/screens/reference/02-plant-overview.png. Also see docs/screens/prototype/01-dashboard.png and 03-dashboard-ras-laffan.png.
Prototype references: ROUTES.dashboard, skyline, ring, donut, legend, lineChart, legendRow.
Build the chart components (LineChart, Donut with Legend, Ring), the Skyline illustration and the full Plant Overview page. Remove the Phase 2 proof line.
Compare with the reference section by section and list any differences you could not fix.
```

Commit: `feat: plant overview dashboard`

`/clear`

---

## Phase 4 — Equipment

### Step 4.1 — Equipment Monitoring

```
Phase 4, step 1. Read docs/specs/04-equipment.md section 4.1.
Target: docs/screens/reference/03-equipment-monitoring.png. Also see docs/screens/prototype/04-equipment.png, 05-equipment-production-lines.png and 06-equipment-row-menu.png.
Prototype references: ROUTES.equipment, eqFiltered, rulTxt, arcGauge.
Build ArcGauge and the /equipment page with tabs, KPI row, the equipment table (search, filters, pagination, row menu), the health trend card, Sensor Monitoring and Real-Time Monitoring.
Confirm 248 assets and the 182/28/14/12/8/4 status split.
```

Commit: `feat: equipment monitoring`

### Step 4.2 — Equipment detail

```
Phase 4, step 2. Read docs/specs/04-equipment.md section 4.2 and the "Done when" list.
Match docs/screens/prototype/07-equipment-detail-hx2.png, 08-equipment-detail-sensors-tab.png and 48-equipment-detail-p104-after-repair.png.
Prototype references: eqDetail, sensorCard, trendChart, liveChart, aiPanel, histFor, illFor, illPump, illMotor, illComp, spark.
Build LiveChart (x-domain, normal band, markers), Sparkline, the asset illustrations and the /equipment/[id] page with all five tabs.
```

Commit: `feat: equipment detail`

`/clear`

---

## Phase 5 — Anomalies and Alerts

### Step 5.1 — Anomaly Dashboard

```
Phase 5, step 1. Read docs/specs/05-anomalies-alerts.md section 5.1.
Target: docs/screens/reference/01-anomaly-dashboard.png. Also see docs/screens/prototype/09-anomalies-seed.png and 10-anomaly-panel-ai-analysis.png.
Prototype references: ROUTES.anomalies, anPanel, anTitle, anChange, and the actions anRow, anCheck, anBulk, anMenu.
Build the /anomalies page with KPIs, the detected-anomalies table (compact columns, selection, bulk actions), the Anomaly Details panel with its four tabs, Detection Types, Anomaly Trends, Detection Summary, AI Insights and Recent AI Analysis.
Confirm the seed state reads 11 / 7 / 24 / 2 and "Showing 5 of 11".
```

Commit: `feat: anomaly dashboard`

### Step 5.2 — Anomaly detail and Alerts

```
Phase 5, step 2. Read docs/specs/05-anomalies-alerts.md section 5.2 and the "Done when" list.
Match docs/screens/prototype/11-anomaly-detail.png and 19-alerts.png.
Prototype references: anDetail, ROUTES.alerts, and the actions anStatus, anComment, alAck, alRes, ruleSw.
Build /anomalies/[id] with the status workflow, work-order card and investigation timeline, and the /alerts page with tabs, severity filter, actions and notification rules.
```

Commit: `feat: anomaly detail and alerts`

`/clear`

---

## Phase 6 — Simulation (the live moment)

### Step 6.1 — Engine, scenario bar, picker

```
Phase 6, step 1. Read docs/specs/06-simulation.md section 6.1, docs/05-SIMULATION-SPEC.md and seed/scenarios.ts.
Match docs/screens/prototype/36-scenario-picker.png, 38-live-early-warning.png, 40-live-awaiting-action.png and 50-stop-confirm-modal.png.
Prototype references: curve, simVals, scoreOf, startScenario, stopScenario, simTick, evEarly, evConfirm, evPred, evRca, clockLabel, progress, renderBar, pickerModal.
Build store/sim-store.ts (snapshot rollback, the 250 ms ticker, phase triggers and store events, saving disabled while active), the ScenarioBar, the scenario picker and the stop confirm modal.
For now, the live view can be the existing equipment detail page; step 6.2 wires the live values.
Report how you verified that detection happens at 84 plant hours and what the Anomalies page shows afterwards.
```

Commit: `feat: scenario engine and scenario bar`

### Step 6.2 — Live view, presenter panel, keyboard

```
Phase 6, step 2. Read docs/specs/06-simulation.md section 6.2 and the "Done when" list.
Match docs/screens/prototype/37-live-normal.png, 39-live-anomaly-detected.png, 41-anomalies-after-detection.png, 42-dashboard-after-detection.png, 49-motor-scenario-live.png, 51-compressor-scenario-live.png and 34-presenter-panel.png.
Prototype references: liveUpdate, presenterModal, and the keydown handler.
Wire the live values into the equipment detail page (sensor cards, sparklines, LiveChart with markers, anomaly score, RUL) without re-rendering the whole page every tick. Build the presenter panel and the S / Space keyboard shortcuts (W and F come in Phase 7). Run all three scenarios.
Confirm that after P-104 detection /anomalies shows 12 / 8 / 24 / 3 with badges 3 / 5, and that Stop rolls back to the seed values.
```

Commit: `feat: live view, presenter panel and keyboard`

`/clear`

---

## Phase 7 — Work orders and the action loop

### Step 7.1 — Work orders, repair, outcome

```
Phase 7, step 1. Read docs/specs/07-work-orders.md section 7.1.
Match docs/screens/prototype/14-work-orders.png, 15-work-order-detail.png, 43-work-order-modal-ai.png, 44-scenario-wo-scheduled.png, 45-repair-in-progress.png, 46-outcome-modal.png and 47-dashboard-after-outcome.png.
Prototype references: ROUTES['work-orders'], woDetail, woModal, submitWO, onScenarioWO, ffRepair, repairStep, completeScenario, outcomeModal, and the actions woTab, woNext, woChk, woComment.
Build the Create Work Order modal (AI prefill from the scenario, anomalies and predictions), the work-order list and detail pages, the repair animation, completeScenario and the Outcome modal. Wire every Create Work Order button in the app, plus the W and F keys.
Run the full pump story with the keyboard and confirm that downtime avoided reads 32.8 hrs on the dashboard.
```

Commit: `feat: work orders, repair and outcome`

### Step 7.2 — Maintenance and Predictions

```
Phase 7, step 2. Read docs/specs/07-work-orders.md section 7.2 and the "Done when" list.
Match docs/screens/prototype/13-maintenance.png and 12-predictions.png.
Prototype references: ROUTES.maintenance, ROUTES.predictions, probBar.
Build the Maintenance page (KPIs, the week calendar with the planned-stop band and job chips, maintenance plans) and the Predictions page (KPIs, the table with Schedule, the risk matrix).
```

Commit: `feat: maintenance schedule and predictions`

**Milestone: the demo story works end to end. You can deploy now if a meeting comes up.**

`/clear`

---

## Phase 8 — Analytics pages

### Step 8.1 — Downtime and Production

```
Phase 8, step 1. Read docs/specs/08-analytics.md section 8.1.
Match docs/screens/prototype/17-downtime.png and 18-production.png (Downtime is the desktop version of docs/screens/reference/04-mobile-downtime.png).
Prototype references: ROUTES.downtime, downtimeEvents, stackBars, ROUTES.production.
Build StackedBars and the two pages.
```

Commit: `feat: downtime and production`

### Step 8.2 — Reliability and Reports

```
Phase 8, step 2. Read docs/specs/08-analytics.md section 8.2 and the "Done when" list.
Match docs/screens/prototype/16-reliability.png, 20-reports.png, 21-generate-report-modal.png and 22-report-csv-modal.png.
Prototype references: ROUTES.reliability, hbars, ROUTES.reports, REPCATS, reportModal, submitRep, reportCSV, viewReport.
Build HBars, the Reliability page and the Reports page with generation and real CSV download (src/lib/csv.ts).
```

Commit: `feat: reliability and reports`

`/clear`

---

## Phase 9 — AI Assistant, models, integrations

### Step 9.1 — AI Assistant

```
Phase 9, step 1. Read docs/specs/09-assistant-models-integrations.md section 9.1.
Match docs/screens/prototype/30-assistant-answer.png.
Prototype references: ROUTES.assistant, QS, answer, assetAnswer, askAI, chatMsg.
Build src/lib/assistant.ts (pure functions over db, returning text plus optional table and actions), the chat page with streaming, the suggested questions, the context card, and the "Ask AI Assistant" entry points.
Report the answers to "What needs my attention today?" and "Why is Pump P-104 flagged?" before and after a scenario.
```

Commit: `feat: AI assistant`

### Step 9.2 — AI & Models and Data & Integrations

```
Phase 9, step 2. Read docs/specs/09-assistant-models-integrations.md section 9.2 and the "Done when" list.
Match docs/screens/prototype/24-ai-models.png, 25-ai-models-performance.png and 23-integrations.png (AI Models is the desktop version of docs/screens/reference/05-mobile-ai-models.png).
Prototype references: ROUTES['ai-models'], ROUTES.integrations, and the actions retrain, integConnect, integMenu, integSync, integOff.
Build both pages with retrain, connect, disconnect, sync and the sensor inventory filter.
```

Commit: `feat: AI models and integrations`

`/clear`

---

## Phase 10 — Administration and Security

### Step 10.1 — Admin, Security, Preferences

```
Phase 10. Read docs/specs/10-admin-security.md.
Target: docs/screens/reference/06-users-administration.png. Also see docs/screens/prototype/26-admin-users.png, 27-admin-permissions.png, 28-add-user-modal.png, 29-security.png and 35-preferences-modal.png.
Prototype references: ROUTES.admin, ROLES, TEAMC, roleGroup, addUserModal, ROUTES.security, logAudit, prefsModal, and the actions submitUser, userMenu2, setRole, deact, resend, permSw, secSw, newKey.
Build the Administration page with all four tabs and the right column, the Security page with the audit log, and the Preferences modal. Every change writes an audit entry.
```

Commit: `feat: administration, security and preferences`

`/clear`

---

## Phase 11 — Polish, QA, deploy

### Step 11.1 — Polish

```
Phase 11, step 1. Read docs/specs/11-polish-qa-deploy.md section 11.1.
Match docs/screens/prototype/52-phone-dashboard.png, 53-phone-drawer.png and 54-phone-anomalies.png.
Go through every page at 1440px and 390px and fix overflow, wrapping, focus and labels. Check reduced motion and confirm with the React Profiler that the ticker doesn't re-render pages. Remove /ui-preview and any temporary code.
List what you changed.
```

Commit: `chore: polish and responsive pass`

### Step 11.2 — QA script and README

```
Phase 11, step 2. Read docs/specs/11-polish-qa-deploy.md section 11.2.
Run the 14-step QA script and report each step as pass or fail. Fix failures. Say which steps I must check by hand in a real browser.
Then replace README.md as described, and finish with clean npm run build, npm run lint and npm run verify:seed.
```

Commit: `docs: README and final QA`

### Deploy (you)

1. Create the private GitHub repo `maintax-demo` and push.
2. In Vercel: Add New → Project → import the repo. Next.js is detected automatically; no environment variables. Deploy.
3. Open `https://maintax-demo.vercel.app`. Before each client session, click **Demo · Sample data → Reset demo data**.
