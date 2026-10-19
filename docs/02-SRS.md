# MaintaX Live Demo — Software Requirements Specification (SRS)

Version 1.0 (draft for review). It goes with `01-PRD.md`. Data values live in `04-DATA-SPEC.md`, scenario timing in `05-SIMULATION-SPEC.md`, and visuals in `03-UI-SPEC.md`.

**Priority:** **M** = must have for the demo, **S** = should have, **C** = could have if time allows.

---

## 1. System overview

A single-page web app with client-side state only. All data is generated in the browser at start-up from fixed seeds, with dates computed from the current time. A simulation engine changes that state while a scenario runs. Every screen reads from the same store, so a change shows up everywhere at once.

### 1.1 Constraints

| ID | Constraint |
|---|---|
| CON-1 | No backend, database, API keys or network calls at runtime |
| CON-2 | Next.js (App Router), TypeScript strict, Tailwind CSS v4, zustand, lucide-react; charts hand-written in SVG |
| CON-3 | Deployable to Vercel with no configuration |
| CON-4 | All demo data is fictional. Emails use `@gulfcrest.example` |
| CON-5 | Search engines must not index the demo (`robots: noindex, nofollow`) |
| CON-6 | Seed data and dates are built only in the browser after mount, to avoid hydration mismatches |

---

## 2. Global requirements

### 2.1 App shell

| ID | Requirement | P |
|---|---|---|
| GL-1 | A dark navy sidebar with the logo block (Hansa mark, "MaintaX" with a blue X, the tagline) and 16 items in two groups: 12 main items, a divider, then Data & Integrations, AI & Models, Administration and Security | M |
| GL-2 | The active item is shown with a solid blue rounded highlight. Detail pages highlight their parent (Equipment, Anomalies, Work Orders) | M |
| GL-3 | Sidebar badges: **Anomalies** = active critical anomalies (seed 2), **Alerts** = unacknowledged alerts (seed 4). They update live | M |
| GL-4 | A context card at the bottom of the sidebar whose text and button change by page (see UI spec §4.3) | S |
| GL-5 | The top bar has global search, the notification bell (red dot while unread), and the user block "JD · John Doe · Operations Manager" with a menu | M |
| GL-6 | Page header: an uppercase eyebrow, a title and a subtitle. On the right, a live date-and-time pill (updates every minute), a "Plant Online" status and the plant switcher where the page supports it | M |
| GL-7 | Below 1024px wide the sidebar becomes a slide-in drawer. Nothing scrolls sideways at 390px | M |
| GL-8 | A fixed "Demo · Sample data" badge at the bottom-left opens the presenter panel | M |
| GL-9 | Toast messages for confirmations (navy pill, bottom center, 3.4s) | M |
| GL-10 | A not-found page and an empty state for unknown IDs | M |

### 2.2 Plant switcher

| ID | Requirement | P |
|---|---|---|
| PL-1 | Options: All Plants, Mesaieed Chemical Plant, Ras Laffan Polymer Plant, Doha Pharmaceutical Facility. The choice persists | M |
| PL-2 | Equipment, anomalies, predictions, work orders, alerts and downtime lists filter by the chosen plant. Counts and KPIs are calculated from the filtered data or from the per-plant presets in the data spec | M |
| PL-3 | The Plant Overview shows one plant. It defaults to Mesaieed and changes to the chosen plant; "All Plants" shows combined figures | M |

### 2.3 Currency and units

| ID | Requirement | P |
|---|---|---|
| CU-1 | Currency preference USD (default), QAR or AED, under Preferences in the user menu and in the presenter panel | M |
| CU-2 | All money is stored in USD and converted for display at fixed rates: 1 USD = 3.64 QAR = 3.6725 AED. Formats: "$12,400", "QAR 45,136", "AED 45,539" | M |
| CU-3 | Metric units throughout: °C, bar, mm/s, m³/h, kW, A, V, RPM, dB, %RH | M |

### 2.4 Global search

| ID | Requirement | P |
|---|---|---|
| SE-1 | Typing 2 or more characters shows grouped results (Equipment, Anomalies, Work Orders), up to 5 per group, matching ID, name, type and line | M |
| SE-2 | Arrow keys and Enter open a result. Esc closes. Clicking a result opens its detail page | S |
| SE-3 | No results shows "No matches for “…”" | M |

### 2.5 Notifications and user menu

| ID | Requirement | P |
|---|---|---|
| NO-1 | The bell menu lists the 5 latest alerts (title, asset, time) and has "Mark all as read" and "View all alerts". New scenario alerts appear at the top | M |
| NO-2 | The user menu has My profile (opens Administration filtered to John Doe), Preferences (currency, temperature unit °C fixed, time-lapse speed), Presenter controls, Help, and Sign out (shows "Sign out is turned off in the demo.") | M |

### 2.6 Persistence and reset

| ID | Requirement | P |
|---|---|---|
| PE-1 | User changes persist in localStorage under `maintax-demo-v1`: work orders, anomaly status changes, alert acknowledgements, users, integrations, preferences, plant, completed scenarios | M |
| PE-2 | A running scenario does not need to survive a reload. On reload the scenario is cleared and its partial changes are rolled back | M |
| PE-3 | "Reset demo data" in the presenter panel clears storage and reloads | M |
| PE-4 | Blocked storage, such as in private mode, falls back to memory without errors | M |

---

## 3. Screen requirements

### 3.1 Dashboard — Plant Overview (`/dashboard`)

Reference: `02-plant-overview.png`

| ID | Requirement | P |
|---|---|---|
| DB-1 | Header with the eyebrow "OPERATIONS DASHBOARD", the title "Plant Overview", the subtitle, and an illustrated plant skyline at the right of the header band. The date pill and "Plant Online" sit over it | M |
| DB-2 | Seven KPI tiles: Overall Equipment Health (ring gauge), Production Status, Active Alerts, Critical Equipment, Maintenance Due, Predicted Failures, Downtime Overview. Each has a delta and a comparison label | M |
| DB-3 | **Equipment Health** donut: Healthy, At Risk, Degraded, Critical and Offline, with count and percentage, the total in the center, and "View All" linking to Equipment | M |
| DB-4 | **Production Status** area/line chart, actual vs target, over the last 7 days, with a callout of the current output and its delta | M |
| DB-5 | **AI Insights**: 5 items, each with an icon, title, one-line detail and relative time. Scenario insights are added at the top | M |
| DB-6 | **Critical Equipment** table (5 rows: equipment, health bar with %, risk pill, last alert). Rows open the equipment | M |
| DB-7 | **Maintenance Due** table (5 rows: equipment, type, due date, priority) from scheduled work orders and maintenance plans. Rows open the work order | M |
| DB-8 | **Production Impact**: four mini cards (Current Production Impact, Potential Downtime, Estimated Downtime Avoided, Maintenance Cost Impact). Money follows the chosen currency | M |
| DB-9 | Every "View All" goes to its page | M |

### 3.2 Equipment Monitoring (`/equipment`)

Reference: `03-equipment-monitoring.png`

| ID | Requirement | P |
|---|---|---|
| EQ-1 | Header with the eyebrow "EQUIPMENT MONITORING", the title, the subtitle, the date pill, "Plant Online" and the plant switcher | M |
| EQ-2 | Type tabs: All Equipment, Production Lines, Machines, Motors, Pumps, Compressors, Generators, HVAC, Industrial Assets. "Production Lines" groups the table by line | M |
| EQ-3 | KPI row: Total Equipment (+2% vs last 7 days), an Equipment Status donut (Running, Idle, Maintenance, Warning, Critical, Offline), an Equipment Health gauge (average score), and AI Insights (Predicted Failures, Anomalies Detected, Maintenance Recommendations, Operational Risks, each opening its page) | M |
| EQ-4 | **Equipment Overview** table: equipment (icon, name, ID), line, status pill, health score (bar + %), condition, reliability (bar + %), remaining life, current risk, actions menu. It has its own search plus Line and Status filters, 8 rows per page with pagination, and rows open the detail page | M |
| EQ-5 | **Sensor Monitoring**: 10 sensor-type tiles with online/total counts (Temperature 24/24 and so on). A tile opens Data & Integrations filtered to that type | S |
| EQ-6 | **Real-Time Monitoring** list: Live Sensor Data (Active), Sensor Status (Normal), Thresholds (Configured), Sensor Anomalies (count), Sensor History. Live Sensor Data opens the live view of the most critical asset | S |
| EQ-7 | **Equipment Health Trend** multi-line chart (Healthy, At Risk, Degraded, Critical, Offline) with 7D, 30D, 90D and 1Y toggles | M |
| EQ-8 | **Health Score Distribution** donut with the average in the center | M |
| EQ-9 | Row actions: View details, Create work order, Show anomalies | M |

### 3.3 Equipment detail (`/equipment/[id]`)

Not in the screenshots; designed in the same style.

| ID | Requirement | P |
|---|---|---|
| ED-1 | Header: a back link, the equipment name and ID, type, plant and line, status pill, and the actions Create Work Order and Ask AI Assistant | M |
| ED-2 | Summary strip: Health score gauge, Remaining Useful Life, Failure Probability (next 7 days), Reliability, Risk, Last maintenance | M |
| ED-3 | **Live Sensors** grid: one card per sensor with the current value and unit, the normal band, a status dot and a sparkline. During a scenario the values tick every time-lapse step and break the band visibly | M |
| ED-4 | A main **trend chart** for the selected sensor, showing the normal band as a shaded area, the anomaly point marked, and 24h, 7D and 30D toggles. During a scenario it shows the time-lapse window | M |
| ED-5 | **AI Analysis** panel: anomaly score, prediction, root cause with contributing factors as bars, and the recommended action | M |
| ED-6 | Tabs: Overview, Sensors, Maintenance History, Work Orders, Specifications | M |
| ED-7 | An illustration of the asset type (pump, motor, compressor and others) in the header card | S |

### 3.4 Anomalies — Anomaly Dashboard (`/anomalies`)

Reference: `01-anomaly-dashboard.png`

| ID | Requirement | P |
|---|---|---|
| AN-1 | Header with the eyebrow "AI ANOMALY DETECTION", the title, the subtitle, the date pill and the plant switcher ("All Plants") | M |
| AN-2 | Four KPI tiles (Active, New, Resolved, Critical) with deltas "vs. last 7 days", plus an **Anomaly Trends** mini chart with a "Last 7 days" selector | M |
| AN-3 | **Detected Anomalies** table: checkbox, time, equipment (icon, name, ID), type, severity pill, confidence (% + bar), status pill, actions. Page size 5 with pagination. Selecting a row loads it into the details panel; double-click or "View Details" opens the detail page | M |
| AN-4 | **Anomaly Details** panel (for the selected row, default the newest critical): severity tag, a title like "Pump P-104 – Vibration Anomaly", detection time and confidence, an asset illustration, and Overview, Sensor Data, AI Analysis and Investigation tabs. Overview shows equipment, type, severity, status, the current reading with % change and normal range, detection time and location. Buttons: View Details and Create Work Order | M |
| AN-5 | **Detection Types** donut (6 types, counts and %, total in the center) | M |
| AN-6 | **Anomaly Trends** multi-line chart by type over 7 days | M |
| AN-7 | **AI Insights** (5) and **Recent AI Analysis** (4) lists, with scenario items added at the top | M |
| AN-8 | **Detection Summary**: 6 tiles by type with count and delta | M |
| AN-9 | Bulk actions on selected rows: Acknowledge, Assign, Mark resolved | S |

### 3.5 Anomaly detail (`/anomalies/[id]`)

| ID | Requirement | P |
|---|---|---|
| AD-1 | The same information as the panel, full width, plus a status workflow: Active → Investigating → Resolved, or False positive. Each change asks for an optional comment and logs to the timeline | M |
| AD-2 | Sensor Data: the trend chart around the detection time with the band and the anomaly marker | M |
| AD-3 | AI Analysis: root cause and contributing factors, similar past events, model name and version, confidence | M |
| AD-4 | Investigation: a timeline of comments and status changes, with an "Add comment" box | M |
| AD-5 | Linked work order: shown if one exists, otherwise a "Create Work Order" button | M |
| AD-6 | Marking an anomaly "False positive" sends feedback that shows on AI & Models as a logged feedback event | S |

### 3.6 Predictions (`/predictions`)

| ID | Requirement | P |
|---|---|---|
| PR-1 | KPIs: Predicted Failures (next 7 days), Avg. Lead Time, Prediction Accuracy, Assets at Risk | M |
| PR-2 | A table of predictions: asset, failure mode, probability (bar), predicted window, RUL, confidence, recommended action, status (Open, Scheduled, Mitigated). Rows open the equipment page | M |
| PR-3 | A risk matrix (probability × impact), with each asset as a dot. Clicking a dot opens the asset | S |
| PR-4 | Action "Schedule maintenance" opens the work-order modal prefilled | M |

### 3.7 Maintenance (`/maintenance`)

| ID | Requirement | P |
|---|---|---|
| MA-1 | KPIs: Due This Week, Overdue, Planned Compliance, Predictive Share (% of jobs triggered by AI) | M |
| MA-2 | A week calendar (Mon–Sun, current week, with next/previous) of scheduled jobs as colored chips by type (Preventive, Predictive, Corrective, Inspection). Clicking a chip opens the work order | M |
| MA-3 | Planned maintenance windows shown as shaded bands (for example "Line 1 planned stop, Thu 06:00–12:00") | S |
| MA-4 | A list of maintenance plans (asset, task, interval, last done, next due) with "Generate work order" | S |

### 3.8 Work Orders (`/work-orders`, `/work-orders/[id]`)

| ID | Requirement | P |
|---|---|---|
| WO-1 | Status tabs with counts: All, Open, Scheduled, In Progress, Completed | M |
| WO-2 | Table: WO number (WO-2026-0412 style), title, asset, type, priority, assignee (avatar), due date, status, source (AI or Manual). Search and filters | M |
| WO-3 | **Create Work Order** modal (from Work Orders, an equipment page, an anomaly or a prediction): title, asset, type, priority, assignee, team, planned window, estimated hours, parts (from a list with stock), checklist. When opened from an anomaly, everything is prefilled from the AI recommendation and marked "Suggested by MaintaX AI" | M |
| WO-4 | Detail page: header with status workflow buttons (Schedule → Start → Complete), linked anomaly and prediction, checklist (tick items), parts, labor hours, comments and activity log | M |
| WO-5 | Completing a work order linked to a scenario starts the scenario's recovery phase (see the simulation spec) | M |
| WO-6 | Completing any work order raises the asset's health to its post-maintenance value and logs it to the asset history | S |

### 3.9 Reliability (`/reliability`)

| ID | Requirement | P |
|---|---|---|
| RE-1 | KPIs: MTBF (hours), MTTR (hours), Availability %, Failure Count (30 days) | M |
| RE-2 | MTBF trend (12 weeks) and failures by asset type (bar) | M |
| RE-3 | A bad-actor table: the top 10 assets by downtime and failures, with MTBF and MTTR | M |

### 3.10 Downtime (`/downtime`)

Reference: `04-mobile-downtime.png` (rebuilt for desktop)

| ID | Requirement | P |
|---|---|---|
| DT-1 | Header eyebrow "DOWNTIME ANALYTICS", title "Downtime Dashboard", a date-range pill (last 7 days) | M |
| DT-2 | KPIs: Total (48.6 hrs, ↑12%), Unplanned (32.4 hrs, ↑18%), Planned (16.2 hrs, ↓8%), plus Downtime Cost in the chosen currency | M |
| DT-3 | Downtime by Equipment donut (top 5 plus Other) | M |
| DT-4 | Downtime by Production Line stacked bars (Unplanned, Planned) for Lines 1–5 with totals on top | M |
| DT-5 | Downtime by Failure Type donut (Mechanical, Electrical, Thermal, Hydraulic, Sensor, Other) | M |
| DT-6 | A downtime events table: start, duration, asset, line, type, cause, planned or unplanned | M |
| DT-7 | A 7D, 30D and 90D selector that changes the figures | S |

### 3.11 Production (`/production`)

| ID | Requirement | P |
|---|---|---|
| PD-1 | KPIs: Current Output, Target Attainment %, OEE %, Production Impact from equipment issues (%) | M |
| PD-2 | Actual vs Target chart (as on the dashboard) with 7D and 30D | M |
| PD-3 | OEE broken into Availability, Performance and Quality (three gauges) | M |
| PD-4 | A line table: line, product, output, target, OEE, status, the asset limiting it | M |

### 3.12 AI Assistant (`/assistant`)

| ID | Requirement | P |
|---|---|---|
| AI-1 | A chat layout: a conversation pane, a suggested-questions panel and a context panel (current plant, active anomalies) | M |
| AI-2 | 8 suggested questions with prepared answers. Answers stream word by word. They may contain mini tables, asset links and an action button (for example "Create work order") | M |
| AI-3 | Answers use live state: if a scenario has detected an anomaly, "What needs my attention?" leads with that asset | M |
| AI-4 | Free-text questions match keywords to the closest prepared answer. With no match: "In this demo I can answer the suggested questions. Try one of them on the right." | M |
| AI-5 | "Ask AI Assistant" from an equipment or anomaly page opens the chat with a question about that asset already asked | S |

### 3.13 Alerts (`/alerts`)

| ID | Requirement | P |
|---|---|---|
| AL-1 | Tabs: All, Unacknowledged, Acknowledged, Resolved. Severity filter | M |
| AL-2 | Each alert shows severity, title, asset, plant and line, trigger (rule or AI), time, and actions Acknowledge, Resolve and Open asset | M |
| AL-3 | Acknowledging reduces the sidebar badge and the bell. Scenario alerts arrive live with a toast | M |
| AL-4 | A notification-rules panel (who gets which alert by email, SMS or Teams), toggles only | C |

### 3.14 Reports (`/reports`)

Reference: the phone screen inside `07-platform-overview.png`

| ID | Requirement | P |
|---|---|---|
| RP-1 | Six category cards: Equipment (12), Maintenance (10), Reliability (8), Downtime (9), Production (7), Failure (6) | M |
| RP-2 | A Recent Reports list (name, scope, date, download) | M |
| RP-3 | **Generate report** modal (category, plant, date range, format CSV) → a progress state → the report appears at the top of Recent Reports | M |
| RP-4 | Download creates a real CSV in the browser from the store's data | M |

### 3.15 Data & Integrations (`/integrations`)

| ID | Requirement | P |
|---|---|---|
| DI-1 | KPIs: Connected Sources, Sensors Online (118/118), Data Points per Minute, Data Latency | M |
| DI-2 | A source list: OPC UA (Mesaieed DCS), Modbus TCP (utility gateways), MQTT (edge sensors), process historian, SAP PM (CMMS), IBM Maximo, Microsoft Teams, Email/SMS gateway. Each has a status, last sync and Connect/Manage/Disconnect | M |
| DI-3 | Connect shows a progress spinner, then Connected with a toast | M |
| DI-4 | A sensor inventory table filterable by type (opened from the Sensor Monitoring tiles) | S |

### 3.16 AI & Models (`/ai-models`)

Reference: `05-mobile-ai-models.png` (rebuilt for desktop)

| ID | Requirement | P |
|---|---|---|
| ML-1 | Tabs: AI Models and Model Performance, with a "9 models" chip | M |
| ML-2 | Five model-family cards (Failure Prediction 3, Anomaly Detection 2, Remaining Useful Life 2, Root Cause 1, Reliability 1), each with a status pill (Healthy or Training) | M |
| ML-3 | Performance KPIs: Prediction Accuracy 92.4%, False Positives 4.8%, False Negatives 2.1%, Model Drift 1.3%, and "Overall Model Performance: Excellent" | M |
| ML-4 | Model Accuracy Trend chart (5 families, 7 days) | M |
| ML-5 | A model registry table: name, family, version, last trained, accuracy, drift, status, with "Retrain" (progress → new version → toast) | M |
| ML-6 | A feedback log: confirmed predictions and false positives, including the scenario's confirmation | S |

### 3.17 Administration (`/admin`)

Reference: `06-users-administration.png`

| ID | Requirement | P |
|---|---|---|
| UA-1 | Tabs: Users, Teams, Roles, Permissions | M |
| UA-2 | KPIs: Total Users 24 (↑3 this month), Teams 5, Roles 8 (↑1), Permission Sets 12 (↑2) | M |
| UA-3 | Users table: checkbox, name (avatar), email, team, role, status (Active, Pending, Inactive), last login, actions. Search plus team and role filters, 10 per page | M |
| UA-4 | Add User modal; Edit role, Deactivate and Resend invite actions. Each logs to Recent Activity | M |
| UA-5 | Right column: Teams (5 with member counts), Roles (6 shown with user counts), and Access Control (Facility Access 3 facilities, Equipment Access 24 equipment types, Data Permissions 5 data sources, AI Permissions 4 permission sets) | M |
| UA-6 | A Recent Activity table (time, user, action icon, details) | M |
| UA-7 | Teams, Roles and Permissions tabs show their own tables. The Permissions tab shows a role × permission matrix with toggles | S |

### 3.18 Security (`/security`)

| ID | Requirement | P |
|---|---|---|
| SC-1 | Cards: Single Sign-On (Microsoft Entra ID, connected), Multi-factor authentication (enforced), Session timeout, IP allow-list, data retention | M |
| SC-2 | A full audit log of user, permission and configuration changes, with filters, including entries created during the session | M |
| SC-3 | An API keys list (masked) with "Create key", which shows the key once with a copy button and a note that it's a demo key | C |

---

## 4. Simulation requirements

Details are in `05-SIMULATION-SPEC.md`.

| ID | Requirement | P |
|---|---|---|
| SIM-1 | Three scenarios: Pump P-104 bearing wear (vibration), Agitator motor M-301 overheating (temperature), Compressor C-110 seal leak (pressure) | M |
| SIM-2 | A time-lapse clock: 1 real second = 2 plant hours at 1×; speeds 1×, 2× and 4×; pause and resume | M |
| SIM-3 | Phases: Normal → Drift (early warning) → Anomaly confirmed → Prediction and root cause → Awaiting action → Work order → Repair → Recovered, with an outcome summary | M |
| SIM-4 | Each phase changes the store, so the badges, KPIs, tables, insights, alerts, charts and assistant answers update at once | M |
| SIM-5 | A **scenario bar** while running (phase, time-lapse clock, progress, Pause, speed, "Open live view", Stop) visible on every page | M |
| SIM-6 | The scenario waits at "Awaiting action" until a work order is created. A presenter shortcut can skip ahead | M |
| SIM-7 | "Fast-forward to repair" on the work order (and in the scenario bar) completes the repair over about 10 seconds | M |
| SIM-8 | An outcome modal: downtime avoided, cost avoided (in the chosen currency), lead time, prediction confirmed; with buttons "View on dashboard" and "Close" | M |
| SIM-9 | Stopping a scenario rolls back everything it added | M |
| SIM-10 | Once a scenario completes, its effects stay (persisted) until Reset, and it can be run again | S |

## 5. Presenter requirements

| ID | Requirement | P |
|---|---|---|
| PRS-1 | The presenter panel contains: a scenario picker (3 cards), speed, currency, plant, keyboard shortcuts, and "Reset demo data" with an inline confirm | M |
| PRS-2 | Keyboard: **S** starts or opens the scenario picker, **Space** pauses or resumes a running scenario, **W** creates the work order at "Awaiting action", **F** fast-forwards the repair. Keys are ignored while typing or when a modal is open | M |
| PRS-3 | The footer says "All companies, people, assets and figures in this demo are fictional." | M |

## 6. Other requirements

| ID | Requirement | P |
|---|---|---|
| NF-1 | First load under 2.5s on broadband (static build, no images over 200 KB) | M |
| NF-2 | Charts and the time-lapse run at 60 fps on a mid-range laptop. Live updates are throttled to the time-lapse step | M |
| NF-3 | Accessibility: every icon-only button has a label, focus is visible, modals trap focus and close with Esc, and color is never the only signal (severity pills carry text) | M |
| NF-4 | `prefers-reduced-motion` disables pulsing, flashes and chart transitions | M |
| NF-5 | Works in current Chrome, Edge, Safari and Firefox | M |
| NF-6 | `npm run build` and `npm run lint` pass with no warnings | M |
| NF-7 | No console errors during the QA script | M |

## 7. Traceability to the website

| Website claim | Requirements |
|---|---|
| Plant-wide real-time health score | DB-2, DB-3, EQ-3 |
| Critical equipment and maintenance ranked by priority | DB-6, DB-7, MA-2 |
| AI insights on emerging issues and predicted failures | DB-5, AN-7, PR-2 |
| Live health score and remaining life per asset | ED-2, EQ-4 |
| Temperature, vibration, pressure monitoring | ED-3, ED-4, EQ-5, SIM-1 |
| AI anomaly detection with root-cause analysis | AN-3, AN-4, AD-3, ED-5 |
| Downtime by equipment, line and failure type | DT-3, DT-4, DT-5 |
| AI model health, accuracy and drift | ML-2, ML-3, ML-4 |
| Role-based access, permissions, audit log | UA-1 to UA-7, SC-2 |
