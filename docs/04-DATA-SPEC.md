# MaintaX Live Demo — Data Specification

Version 1.0 (draft for review). This file defines every piece of sample data and how the numbers on different screens agree with each other. The typed seed files in the starter kit will implement it exactly.

## 0. Rules

1. **One store, derived numbers.** Counts (badges, KPI tiles, donut totals) are calculated from the records wherever practical. Figures that would need months of history (trends, MTBF, OEE, production volumes) come from **per-plant preset tables** in this file.
2. **Dates are relative to now.** Every timestamp is stored as an offset (for example "−45 min" or "day −2, 09:15") and resolved in the browser when the app starts.
3. **Deterministic generation.** Generated records use a seeded random generator (mulberry32), so every load produces identical data.
4. **Two states.** The **seed state** is the plant before any scenario. The **post-scenario state** is what a scenario adds. After the P-104 scenario the Anomalies page matches screenshot 01.
5. **Money** is stored in USD. Display rates: 1 USD = 3.64 QAR = 3.6725 AED.

## 1. Company and plants

**Company:** Gulf Crest Chemicals (fictional), Qatar.

| ID | Plant | Location | Type | Assets | Output unit | Lines and areas |
|---|---|---|---|---|---|---|
| `MES` | Mesaieed Chemical Plant | Mesaieed Industrial City | Basic chemicals | 142 | kg | Production Line 1 (Reactor feed), Line 2 (Compression & separation), Line 3 (Thermal processing), Line 4 (Drying & handling), Line 5 (Packaging), Power Plant, Utilities |
| `RLF` | Ras Laffan Polymer Plant | Ras Laffan Industrial City | Polymers | 64 | kg | Polymer Line A, Polymer Line B, Utilities |
| `DOH` | Doha Pharmaceutical Facility | Doha | Pharmaceuticals (tablets) | 42 | units | Granulation, Compression, Coating & Packaging, Cleanroom HVAC, Utilities |
| `ALL` | All Plants | | | **248** | | |

The Plant Overview defaults to `MES`, so its Equipment Health total is 142, matching screenshot 02. Equipment Monitoring defaults to `ALL`, so its total is 248, matching screenshot 03.

## 2. Equipment

### 2.1 Named assets (from the screenshots, plus scenario assets)

| ID | Name | Type | Plant · Line | Status | Health | Condition | Reliability | Remaining life | Risk |
|---|---|---|---|---|---|---|---|---|---|
| P-104 | Pump P-104 (Feed pump) | Pump | MES · Line 1 | Running | **92** | Good | 95% | 2.4 yrs | Low |
| C-203 | Compressor C-203 | Compressor | MES · Line 2 | Warning | 68 | Fair | 78% | 1.2 yrs | Medium |
| M-12 | Motor M-12 | Motor | MES · Line 1 | Running | 71 | Fair | 82% | 1.8 yrs | Medium |
| F-3 | Furnace F-3 | Furnace | MES · Line 3 | Critical | 54 | Poor | 61% | 0.6 yrs | High |
| CV-7 | Conveyor CV-7 | Conveyor | MES · Line 2 | Running | 78 | Good | 88% | 2.1 yrs | Low |
| G-1 | Generator G-1 | Generator | MES · Power Plant | Idle | 85 | Good | 90% | 3.2 yrs | Low |
| HVAC-01 | HVAC-01 | HVAC | MES · Utilities | Running | 93 | Good | 96% | 4.5 yrs | Low |
| P-207 | Pump P-207 | Pump | MES · Line 2 | Maintenance | 76 | Fair | 84% | 1.5 yrs | Medium |
| F-08 | Fan F-08 | HVAC | MES · Line 4 | Running | 81 | Good | 89% | 2.6 yrs | Low |
| M-112 | Motor M-112 | Motor | MES · Line 3 | Running | 74 | Fair | 83% | 1.9 yrs | Medium |
| HX-2 | Heat Exchanger HX-2 | Heat exchanger | MES · Line 3 | Critical | 47 | Poor | 58% | 0.4 yrs | High |
| R-301 | Reactor R-301 | Reactor | MES · Line 1 | Running | 88 | Good | 93% | 6.1 yrs | Low |
| M-301 | Agitator Motor M-301 (R-301 agitator) | Motor | MES · Line 1 | Running | **90** | Good | 94% | 3.1 yrs | Low |
| C-110 | Compressor C-110 (Process gas) | Compressor | RLF · Polymer Line A | Running | **89** | Good | 93% | 2.8 yrs | Low |
| B-2 | Boiler B-2 | Boiler | RLF · Utilities | Critical | 49 | Poor | 60% | 0.5 yrs | High |
| P-311 | Pump P-311 | Pump | RLF · Polymer Line B | Warning | 66 | Fair | 79% | 1.1 yrs | Medium |
| CF-2 | Centrifuge CF-2 | Centrifuge | DOH · Granulation | Warning | 69 | Fair | 81% | 1.4 yrs | Medium |
| TP-4 | Tablet Press TP-4 | Tablet press | DOH · Compression | Running | 73 | Fair | 85% | 2.0 yrs | Medium |
| AHU-04 | Air Handling Unit AHU-04 | HVAC | DOH · Cleanroom HVAC | Running | 86 | Good | 92% | 3.6 yrs | Low |

Bold values are the starting points that the scenarios change.

### 2.2 Generated assets

The remaining assets are generated to reach 142 / 64 / 42, using each plant's type mix (pumps, motors, compressors, valves, tanks, heat exchangers, fans, conveyors; for DOH also tablet presses, coaters, blenders and AHUs). IDs follow the type prefix plus a number unique within the plant.

**Status targets for All Plants (248)**, from screenshot 03. Generation assigns statuses so the totals land exactly on these:

| Running | Idle | Maintenance | Warning | Critical | Offline |
|---|---|---|---|---|---|
| 182 (73%) | 28 (11%) | 14 (6%) | 12 (5%) | 8 (3%) | 4 (2%) |

**Health-band targets for Mesaieed (142)**, from screenshot 02:

| Healthy | At Risk | Degraded | Critical | Offline |
|---|---|---|---|---|
| 108 (76%) | 18 (13%) | 8 (6%) | 5 (4%) | 3 (2%) |

Average health score: MES 92%, ALL 87% (the screenshot 03 gauge).

### 2.3 Sensors

Each asset has 3 to 6 sensors, by type. The sensor-type totals across monitored assets give the Sensor Monitoring tiles: **Temperature 24, Vibration 18, Pressure 16, Humidity 12, Voltage 10, Current 10, RPM 8, Flow 8, Acoustic 6, Power 6 = 118**, all online. Only key assets carry detailed sensor records; the counts come from the preset.

**P-104 sensors (seed baseline):**

| Sensor | Unit | Baseline | Normal band |
|---|---|---|---|
| Vibration (DE bearing, RMS) | mm/s | 3.43 | 3.4–5.2 |
| Bearing temperature | °C | 58 | 45–75 |
| Discharge pressure | bar | 6.2 | 5.6–6.8 |
| Motor current | A | 42 | 36–48 |
| Flow rate | m³/h | 120 | 105–130 |
| Acoustic level | dB | 72 | 60–80 |

The M-301 and C-110 sensors are listed in the simulation spec.

## 3. Anomalies

### 3.1 Seed state: today's list

Ordered newest first. The P-104 row is added later by the scenario.

"New" marks the 7 rows detected today that nobody has acknowledged yet (AN-1043, 1041, 1039, 1038, 1037, 1035, 1034).

| ID | Time | Asset | Type | Severity | Confidence | Status |
|---|---|---|---|---|---|---|
| AN-1043 | now −45 min | Compressor C-203 | Temperature | High | 87% | Active |
| AN-1042 | now −2 h 00 | Motor M-12 | Performance | Medium | 76% | Investigating |
| AN-1041 | now −3 h 12 | Furnace F-3 | Energy | Medium | 68% | Active |
| AN-1040 | now −4 h 17 | Conveyor CV-7 | Vibration | Low | 52% | Resolved |
| AN-1039 | now −5 h 30 | Heat Exchanger HX-2 | Temperature | Critical | 91% | Active |
| AN-1038 | now −6 h 05 | Boiler B-2 | Sensor | Critical | 89% | Active |
| AN-1037 | now −6 h 50 | Pump P-311 | Vibration | High | 81% | Active |
| AN-1036 | now −7 h 40 | Centrifuge CF-2 | Behavioral | Medium | 72% | Active |
| AN-1035 | now −8 h 25 | Tablet Press TP-4 | Performance | Medium | 70% | Active |
| AN-1034 | now −9 h 10 | Motor M-112 | Energy | Low | 58% | Active |
| AN-1033 | now −10 h 00 | Pump P-207 | Sensor | Low | 55% | Active |

That is 11 rows today, 10 of them not resolved. The **Detected Anomalies** table shows today's rows in pages of 5: "Showing 5 of 11" in the seed state, and "Showing 5 of 12" after P-104 is added.

**The first page of the table is the 5 newest rows**, so after detection it shows P-104 (Critical 96%), C-203, M-12, F-3 and CV-7, exactly as in screenshot 01. In the seed state the first page is C-203, M-12, F-3, CV-7 and HX-2. To guarantee that ordering, the seed offsets above are relative to the moment the app loads; P-104's detection time is "now" at the moment it fires.

There are also 24 resolved anomalies from the previous 7 days, generated across the plants and dated day −1 to day −7.

### 3.2 KPI tiles and badge

| Tile | Definition | Seed | After P-104 detection | Screenshot 01 |
|---|---|---|---|---|
| Active Anomalies | status Active or Investigating, last 7 days | 11 | **12** | 12, ↑3 |
| New Anomalies | detected today, not yet acknowledged | 7 | **8** | 8, ↓5 |
| Resolved Anomalies | resolved in the last 7 days | 24 | 24 | 24, ↑7 |
| Critical Anomalies | active with severity Critical | 2 | **3** | 3, ↑2 |
| Sidebar badge "Anomalies" | = Critical Anomalies | 2 | **3** | 3 |

How the Active count works: the 10 unresolved rows from today plus 1 older still-active item (AN-1029, Cooling Tower CT-1, day −2, Low, Investigating) make 11.

### 3.3 Detection types and summary (presets, 30 days)

These counts move by +1 Vibration after the scenario.

| Sensor | Behavioral | Performance | Energy | Temperature | Vibration | Total |
|---|---|---|---|---|---|---|
| 24 (35%) | 14 (21%) | 10 (15%) | 8 (12%) | 7 (10%) | 4 → **5** | 67 → **68** |

Deltas in the Detection Summary tiles: ↑6%, ↑4%, ↓12%, ↑2%, ↑8%, ↑15%.

### 3.4 Anomaly trends (presets, last 7 days, by type)

Per-day counts for each of the 6 series, values 5–35, ending higher on the last day. The mini trend on the KPI row is the daily total. Exact series go in the seed file.

## 4. Predictions

| Asset | Failure mode | Probability | Window | RUL | Confidence | Recommended action | Status |
|---|---|---|---|---|---|---|---|
| Heat Exchanger HX-2 | Tube fouling, loss of heat transfer | 74% | 3–6 days | 5 days | 88% | Chemical clean during the Line 3 stop | Scheduled |
| Boiler B-2 | Burner flame sensor failure | 66% | 4–8 days | 7 days | 84% | Replace flame scanner | Open |
| Compressor C-203 | Valve wear, discharge overheating | 58% | 6–12 days | 10 days | 82% | Inspect valves and cooler | Open |
| Furnace F-3 | Refractory hot spot | 52% | 10–20 days | 16 days | 77% | Thermography and refractory repair | Open |
| *Pump P-104 (added by the scenario)* | *Bearing failure (outer race)* | *68%* | *≤ 5 days* | *6 days* | *96%* | *Replace DE bearing, check alignment* | *Open → Scheduled* |

**Predicted Failures** (next 7 days) = predictions with an RUL of 7 days or less at the selected plant.
- **MES:** seed **4** (HX-2 plus 3 generated MES predictions with an RUL of 2–7 days). After P-104 it is **5**, matching screenshot 02.
- **RLF:** 1 (B-2). **DOH:** 0. **ALL:** 5 in the seed state.

There are about 14 predictions in total (the 5 above plus generated ones with longer windows).

## 5. Alerts

There are 12 alerts in the last 48 hours. **Unacknowledged: seed 4** (HX-2 critical temperature, B-2 flame sensor, C-203 high temperature, P-311 vibration). Each scenario adds 1 critical alert, giving **5**, which matches the screenshot 01 badge. The 8 acknowledged or resolved alerts are generated.

The Plant Overview "Active Alerts" tile counts unacknowledged plus acknowledged-but-open alerts at the selected plant: MES seed **6**, and 7 after P-104 (the screenshot shows 7).

## 6. Work orders and maintenance

- About 40 work orders in total: 12 Open, 9 Scheduled, 5 In Progress, and 14 Completed in the last 30 days.
- Numbering: `WO-2026-0371` to `WO-2026-0410`. A new one gets the next number.

**Maintenance Due (this week):**

| Due | Asset | Type | Priority |
|---|---|---|---|
| day +2 | Motor M-12 | Bearing Check | High |
| day +3 | Compressor C-203 | Service | Medium |
| day +4 | Fan F-08 | Inspection | Medium |
| day +6 | Conveyor CV-7 | Belt Replacement | Low |

The Plant Overview tile reads "12 This Week": the 4 rows above plus 8 generated jobs at MES. The table shows the 5 most urgent. After the scenario, **Pump P-104 · Inspection/Bearing replacement · day +2 · High** is added at the top, giving 13.

**Planned maintenance windows:** Line 1 every Thursday 06:00–12:00; Line 3 day +3 08:00–16:00.

**Parts list (for the work-order modal):**

| Part | Stock |
|---|---|
| SKF 6312 bearing | 4 |
| Mechanical seal kit P-100 series | 2 |
| Coupling insert | 6 |
| Motor cooling fan 315 frame | 1 |
| Dry gas seal cartridge | 1 |
| Lubricant (2 kg) | 12 |

**Technicians:** David Martinez (Maintenance · Technician), Sarah Wilson (Maintenance Lead), Omar Al-Sulaiti (Maintenance · Technician), Rajesh Nair (Engineering · Engineer).

## 7. Plant Overview presets (per plant)

| Field | MES (seed) | RLF | DOH | ALL |
|---|---|---|---|---|
| Overall equipment health | 92% ↑3% | 86% ↑1% | 90% ↑2% | 87% ↑4% |
| Production status | 94% On Track · 120,400 kg ↑6% | 91% · 58,200 kg ↑3% | 97% · 1.84 M units ↑5% | 93% |
| Active alerts | 6 (↑2 vs last 24h) | 3 | 2 | 11 |
| Critical equipment (assets with an active Critical anomaly) | 1: HX-2 (↓1) | 1: B-2 | 0 | 2 |
| Maintenance due | 12 this week (↑3) | 6 | 4 | 22 |
| Predicted failures (7 days) | 4 (↑2) | 1 | 0 | 5 |
| Downtime | 2.4% ↓1.1% | 3.1% | 1.2% | 2.5% |
| Production impact | −1.8% vs planned | −2.6% | −0.4% | −1.9% |
| Potential downtime (next 7 days) | 6.5 hrs | 4.1 hrs | 1.3 hrs | 11.9 hrs |
| Estimated downtime avoided (7 days) | 18.2 hrs | 7.4 hrs | 3.0 hrs | 28.6 hrs |
| Maintenance cost impact (this month) | $12,400 | $6,900 | $3,100 | $22,400 |

**Production chart (MES, last 7 days):** actual = 84k, 82k, 91k, 98k, 102k, 113k, 120.4k; target = 90k → 125k dashed line. The other plants are scaled.

**Scenario effects on MES:**
- **P-104:** active alerts +1, critical equipment +1, predicted failures +1, maintenance due +1; on completion, downtime avoided +14.6 hrs.
- **M-301:** active alerts +1, critical equipment +1, predicted failures +1, maintenance due +1; on completion, downtime avoided +22.0 hrs.
- **C-110:** applies the same deltas to RLF; on completion, downtime avoided +11.0 hrs.

## 8. Downtime (presets, last 7 days, MES)

- **Totals:** 48.6 hrs (↑12%), unplanned 32.4 (↑18%), planned 16.2 (↓8%).
- **Downtime cost:** unplanned hours × each line's hourly cost. The lines are Line 1 $681, Line 2 $540, Line 3 $720, Line 4 $410, Line 5 $380 per hour, which gives about $19,900 for the week.
- **By equipment:** P-104 12.8 hrs (26%), C-203 10.4 (21%), M-112 8.7 (18%), F-3 6.2 (13%), CV-7 5.1 (10%), Other 5.4 (12%).
- **By line (unplanned / planned):** Line 1 12.1 / 4.3 (16.4); Line 2 9.0 / 2.8 (11.8); Line 3 6.6 / 2.0 (8.6); Line 4 4.6 / 1.6 (6.2); Line 5 3.4 / 2.2 (5.6).
- **By failure type:** Mechanical 18.2 (37%), Electrical 11.6 (24%), Thermal 7.8 (16%), Hydraulic 5.4 (11%), Sensor 3.2 (7%), Other 2.4 (5%).
- **30-day and 90-day:** the presets are scaled ×4.1 and ×12.6, with deltas varied.
- **Events:** about 25 events in the last 7 days that add up to the totals above.

The P-104 downtime of 12.8 hrs is history from earlier seal and coupling issues. It explains why P-104 is watched closely.

## 9. Reliability (presets)

- MTBF 412 hrs (↑6%), MTTR 3.8 hrs (↓9%), Availability 97.6%, Failures in 30 days: 14.
- MTBF trend over 12 weeks: 352 rising to 412.
- Failures by type: Pumps 5, Motors 3, Compressors 2, Heat exchangers 2, Conveyors 1, Other 1.
- **Bad-actor table:** the top 10 by downtime, starting with P-104, C-203, M-112, F-3, CV-7, HX-2.

## 10. Production (presets)

- Current output 120,400 kg, target attainment 94%, OEE 81.6% (Availability 92.1%, Performance 91.4%, Quality 96.9%), production impact −1.8%.
- **Line table (MES):**

| Line | Product | OEE | Limiting asset |
|---|---|---|---|
| Line 1 | Ammonia solution | 83% | P-104 |
| Line 2 | Separated gases | 79% | C-203 |
| Line 3 | Thermal processing | 74% | F-3 |
| Line 4 | Drying & handling | 86% | none |
| Line 5 | Packaged product | 88% | none |

## 11. AI models

| Family | Models | Status |
|---|---|---|
| Failure Prediction | FP-Rotating v3.2, FP-Thermal v2.4, FP-Static v1.9 | Healthy |
| Anomaly Detection | AD-Multivariate v4.1, AD-Vibration v3.0 | Healthy |
| Remaining Useful Life | RUL-Bearing v2.2, RUL-General v1.7 | Healthy |
| Root Cause | RCA-Graph v1.3 | Training (68%, finishes in about 40 s if watched) |
| Reliability | REL-Weibull v2.0 | Healthy |

That is 9 models across 5 families.

- **KPIs:** accuracy 92.4% (↑3.2%), false positives 4.8% (↓1.6%), false negatives 2.1% (↓0.8%), drift 1.3% (↓0.5%), overall "Excellent".
- **Accuracy trend (7 days):** Failure Prediction about 88%, Anomaly Detection about 91%, RUL about 84%, Root Cause about 78%, Reliability about 70%.
- **Feedback log:** 6 seed entries. Each scenario adds "Prediction confirmed — {asset} {failure mode}, lead time {n} days".

## 12. Users, teams, roles

**Teams:** Operations 8, Maintenance 6, Engineering 4, Quality & Safety 3, IT & Admin 3 = 24.

**Roles (8):** System Administrator 3, Operations Manager 5, Maintenance Lead 4, Engineer 4, Data Analyst 3, Auditor 2, Technician 2, IT Support 1 = 24.

**First 10 users** (screenshot 06; emails become `@gulfcrest.example`):

| Name | Team | Role | Status | Last login |
|---|---|---|---|---|
| John Doe | Operations | Operations Manager | Active | now |
| Sarah Wilson | Maintenance | Maintenance Lead | Active | −2 h 15 |
| Michael Brown | Engineering | Engineer | Active | −3 h 29 |
| Emily Davis | Quality & Safety | Quality Manager | Active | −4 h 08 |
| Robert Johnson | IT & Admin | System Administrator | Active | −4 h 34 |
| Lisa Garcia | Operations | Data Analyst | Active | −5 h 51 |
| David Martinez | Maintenance | Technician | Active | day −1 |
| Jennifer Lee | Engineering | Engineer | Pending | day −1 |
| Daniel Clark | IT & Admin | IT Support | Active | day −1 |
| Sophia Anderson | Quality & Safety | Auditor | Inactive | day −4 |

"Quality Manager" counts under Operations Manager for the role totals.

**14 more users**, including Ahmed Al-Mansoori, Fatima Al-Kuwari, Omar Al-Sulaiti, Rajesh Nair, Priya Menon, Khalid Al-Marri, Aisha Rahman, Mohammed Al-Thani, Arjun Shah, Noor Hassan, Yusuf Qureshi, Maria Santos, Thomas Mathew and Hana Al-Emadi. They are spread so the team and role totals above hold.

- **KPIs:** 24 users (↑3 this month), 5 teams (no change), 8 roles (↑1), 12 permission sets (↑2).
- **Access Control:** Facility Access 3 facilities, Equipment Access 24 equipment types, Data Permissions 5 data sources, AI Permissions 4 permission sets. The screenshot shows "6 facilities"; we show **3** to match our three plants.
- **Recent activity (seed):** the 5 rows from the screenshot, re-dated relative to now.

## 13. Integrations

| Source | Type | Status | Detail |
|---|---|---|---|
| OPC UA — Mesaieed DCS | Industrial protocol | Connected | 1,840 tags |
| Modbus TCP — Utility gateways | Industrial protocol | Connected | 6 gateways |
| MQTT — Edge sensors | IoT | Connected | 118 sensors |
| Process historian (PI System) | Historian | Connected | 5 years history |
| SAP PM | CMMS | Connected | work orders sync both ways |
| IBM Maximo | CMMS | Not connected | |
| Microsoft Teams | Notifications | Connected | |
| Email / SMS gateway | Notifications | Not connected | |

- **KPIs:** connected sources 6/8, sensors online 118/118, data points 24,600 per minute, latency 1.4 s.

## 14. Reports

- **Categories and counts:** Equipment 12, Maintenance 10, Reliability 8, Downtime 9, Production 7, Failure 6.
- **Recent reports**, re-dated relative to now:

| Report | Scope |
|---|---|
| Equipment Health Report | All Equipment · Mesaieed |
| Maintenance Summary | All Facilities |
| Reliability Report | Production Line 2 |
| Downtime Analysis | Mesaieed |
| Production Performance | Line 2 |
| Failure Analysis | Compressors |

## 15. AI Assistant prepared answers

1. **What needs my attention today?** Top 3 risks, ranked live. After the scenario, P-104 is first.
2. **Why is Pump P-104 flagged?** Vibration trend, the bearing-wear root cause, the 68% failure probability and a "Create work order" action. Before the scenario: "P-104 is healthy (92). Vibration 3.4 mm/s is within its normal band."
3. **Which assets are likely to fail this week?** A table built from predictions with an RUL of 7 days or less.
4. **What caused most downtime last week?** By failure type and equipment (from §8).
5. **How much downtime has MaintaX helped avoid?** Hours and cost in the chosen currency, including completed scenarios.
6. **Show the health of Line 1.** Assets on Line 1 with health bars.
7. **How accurate are the AI models?** From §11.
8. **What maintenance is due this week?** From §6.

The keyword map for free text matches asset IDs, "fail", "downtime", "accuracy", "maintenance", "line" and "attention".
