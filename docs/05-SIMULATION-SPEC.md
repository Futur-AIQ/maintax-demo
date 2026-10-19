# MaintaX Live Demo — Simulation Specification

Version 1.0 (draft for review). This is the "live moment": a scripted failure that unfolds in time-lapse and moves through the whole app.

## 1. Concepts

| Term | Meaning |
|---|---|
| **Scenario** | A scripted failure story for one asset: sensor curves, phase triggers and store events |
| **Time-lapse clock** | Plant time inside the scenario. At 1×, **1 real second = 2 plant hours**. Speeds are 1×, 2× and 4× |
| **Step** | The engine ticks every **250 ms of real time**, which is 0.5 plant hours at 1×. Each step updates sensor values, checks triggers and appends chart points |
| **Phase** | A named stage shown in the scenario bar. Phases are entered by triggers (a time or a value) or by user actions |
| **Event** | A change the scenario makes to the store, such as adding an anomaly. Every event is recorded so **Stop** can undo it |

The clock label reads "Day {n} · {HH:00}". It starts at Day 1 · 00:00 when the scenario starts.

## 2. Phases (same for every scenario)

| # | Phase | Bar label | Entered by | What the user sees |
|---|---|---|---|---|
| 0 | Normal | Monitoring | start | Live sensors tick inside their normal bands |
| 1 | Drift | Early warning | time trigger | Key sensors drift up but stay in band. An AI early-warning insight appears. The anomaly score in the live view rises |
| 2 | Anomaly | Anomaly detected | value trigger (crosses the band, then reaches the confirm level) | A critical anomaly is created: toast, bell dot, sidebar badge +1, new table row, alert, insight. Health drops. The asset's status becomes Warning |
| 3 | Analysis | Predicting failure | 4 plant hours after the anomaly | A prediction is added (probability, window, RUL). 4 hours later the root cause and recommendation appear, along with a "Recent AI Analysis" entry |
| 4 | Awaiting action | Action needed | after the analysis | The bar turns amber with a **Create Work Order** button. The clock slows to 1 s = 15 plant minutes. Values creep and the RUL counts down |
| 5 | Scheduled | Work order scheduled | user creates the work order | The WO appears in Work Orders and Maintenance Due, the prediction becomes Scheduled, and the anomaly becomes Investigating |
| 6 | Repair | Repair in progress | user clicks **Fast-forward to repair** (on the WO, in the bar, or the **F** key) | About 10 s: the WO goes In Progress, the checklist ticks one item at a time, the asset goes to Maintenance (sensors flat or zero), then restarts at healthy values |
| 7 | Recovered | Failure avoided | repair finished | The WO is Completed, the anomaly Resolved, the alert resolved, the prediction Mitigated, health restored, the model feedback logged, and downtime avoided added. The **Outcome modal** opens |

Phases 0–3 run on their own: about 48 s at 1×, 24 s at 2× and 12 s at 4×. Phase 4 waits for the presenter.

**Presenter skip:** pressing **W** in phase 4 opens the prefilled work-order modal. Pressing **F** in phase 5 starts the repair.

## 3. Sensor curves

Each sensor value at plant hour `h` is calculated as baseline + drift(h) + noise:
- Noise is a small seeded random wobble, ±2% of the band width, the same every run.
- Drift is piecewise: flat → linear → accelerating (quadratic), defined by the key points below. Interpolate linearly between points, then add the curve shape.
- During the repair, values ease to the post-repair values over the animation.

## 4. Scenario A — Pump P-104 bearing wear (headline)

| | |
|---|---|
| Asset | Pump P-104 (Feed pump), Mesaieed · Production Line 1 |
| Story | The drive-end bearing's outer race is wearing. Vibration rises first, then temperature and noise. Left alone it would seize and damage the mechanical seal within about a week |
| Starting state | Health 92, Running, RUL 2.4 yrs, risk Low |

**Sensor key points** (plant hours → value):

| Sensor | Band | 0 h | 24 h | 54 h | 72 h | 84 h | 96 h | Awaiting max | Post-repair |
|---|---|---|---|---|---|---|---|---|---|
| Vibration (mm/s) | 3.4–5.2 | 3.43 | 3.6 | **5.3** (leaves the band) | 6.7 | **8.4** (confirm) | 8.6 | 8.9 | 2.9 |
| Bearing temp (°C) | 45–75 | 58 | 58 | 62 | 66 | 71 | 72 | 74 | 55 |
| Discharge pressure (bar) | 5.6–6.8 | 6.2 | 6.2 | 6.1 | 6.0 | 5.9 | 5.9 | 5.8 | 6.3 |
| Motor current (A) | 36–48 | 42 | 42 | 43 | 44 | 45 | 45.5 | 46 | 41 |
| Flow (m³/h) | 105–130 | 120 | 120 | 119 | 117 | 116 | 115 | 114 | 122 |
| Acoustic (dB) | 60–80 | 72 | 72 | 75 | 78 | **81** | 82 | 83 | 70 |

**Triggers and events:**

| Plant time | Phase | Events (store changes) |
|---|---|---|
| 0 h | Normal | Scenario bar appears. If the presenter is not on P-104, a toast says "Live sensor feed started for Pump P-104 · Open live view" |
| 24 h | Drift | — |
| 40 h | Drift | AI insight added at the top of the Anomaly Dashboard and Plant Overview: "Early warning: vibration trending up on Pump P-104 (61% confidence)". Anomaly score 0.38 |
| 54 h | Drift | The vibration card turns red (out of band). Anomaly score 0.71 |
| **84 h** | **Anomaly** | **AN-1044** created: now, Pump P-104, Vibration, **Critical, 96%**, Active, value 8.4 mm/s (+145%, normal 3.4–5.2), Production Line 1. Alert AL-… "Critical vibration on Pump P-104". Toast "Critical anomaly detected · Pump P-104 · Vibration 8.4 mm/s". The insight changes to "Rising vibration levels detected in Pump P-104 (96% confidence)". P-104 health becomes 62, status Warning, risk High, condition Fair. The Anomaly Details panel selects AN-1044 if the Anomalies page is open |
| 88 h | Analysis | Prediction added: bearing failure (outer race), **68%**, window ≤ 5 days, **RUL 6 days**, confidence 96%. Plant Overview insight: "Predicted Failure: Pump P-104 failure probability at 68% (next 5 days)" |
| 92 h | Analysis | Root cause: **Bearing wear (outer race) 87%**, shaft misalignment 9%, lubrication degradation 4%. Evidence: "Peaks at the bearing outer-race frequency (BPFO, 4.1× running speed) with harmonics; temperature rise follows the vibration by about 12 h". Recommendation: "Replace the DE bearing (SKF 6312), check alignment, regrease. Estimated 4.5 h during the Line 1 planned stop." Recent AI Analysis: "Root cause identified for Pump P-104 anomaly: bearing wear." |
| 96 h | Awaiting action | Bar turns amber. The RUL counts down from 6.0 days at plant speed. Health drifts down to a floor of 60 |

**Work order (prefilled):**

| Field | Value |
|---|---|
| Title | Replace DE bearing — Pump P-104 |
| Type | Predictive |
| Priority | High |
| Asset | P-104 |
| Assignee | David Martinez (Technician) |
| Team | Maintenance |
| Planned window | Next Line 1 planned stop (Thursday 06:00–12:00, or "in 2 days" if that is sooner) |
| Estimated hours | 4.5 |
| Parts | SKF 6312 bearing ×1, Lubricant (2 kg) ×1, Coupling insert ×1 |
| Checklist | Isolate and lock out pump · Remove coupling guard and coupling · Replace DE bearing · Check shaft alignment (laser) · Regrease and refit coupling · Run test and record vibration |
| Source | Suggested by MaintaX AI · AN-1044 |

**Repair animation** (about 10 s at any speed):
1. WO In Progress, asset status Maintenance, sensors drop to 0 / ambient.
2. The 6 checklist items tick at 1.4 s intervals.
3. Restart: values ease to their post-repair values.
4. WO Completed, with 4.5 h of labor recorded.

**Recovered state:**
- P-104: health **96**, RUL **2.9 yrs**, risk Low, Running, condition Good.
- AN-1044 Resolved (resolution: "Bearing replaced via WO-2026-04xx"). The alert is resolved and the prediction Mitigated.
- Model feedback: "Prediction confirmed — P-104 bearing failure, lead time 5.0 days".
- Downtime avoided **+14.6 hrs**; cost avoided **$9,940**.
- Asset history entry added.

**Outcome modal:**

| | |
|---|---|
| Title | "Failure avoided — Pump P-104" |
| Warning lead time | 5.0 days |
| Planned repair | 4.5 hrs |
| Unplanned failure estimate | 19.1 hrs (bearing seizure → seal damage → pump rebuild) |
| Downtime avoided | 14.6 hrs |
| Cost avoided | $9,940 at $681/hr for Line 1 (shown in the chosen currency) |
| AI model | Prediction confirmed, feedback sent to RUL-Bearing v2.2 |
| Buttons | View on dashboard · Close |

## 5. Scenario B — Agitator motor M-301 overheating (temperature)

| | |
|---|---|
| Asset | Agitator Motor M-301 (drives Reactor R-301), Mesaieed · Line 1 |
| Story | The motor's cooling fan is clogging with process dust. The winding temperature climbs. If it trips mid-batch, the reactor batch is lost |
| Starting state | Health 90, RUL 3.1 yrs |

**Sensor key points:**

| Sensor | Band | 0 h | 24 h | 56 h | 72 h | 84 h | 96 h | Post-repair |
|---|---|---|---|---|---|---|---|---|
| Winding temp (°C) | 60–100 | 78 | 80 | **101** | 108 | **114** (confirm) | 117 | 76 |
| Motor current (A) | 50–68 | 61 | 61 | 65 | 67 | 69 | 70 | 60 |
| Cooling airflow (%) | 80–100 | 96 | 92 | 79 | 70 | 61 | 57 | 98 |
| Vibration (mm/s) | 1.0–3.5 | 2.1 | 2.1 | 2.3 | 2.4 | 2.5 | 2.6 | 2.0 |
| Speed (RPM) | 1440–1490 | 1476 | 1476 | 1474 | 1471 | 1468 | 1466 | 1477 |

**Events:**
- **Anomaly** AN-1044 (or the next free ID): Temperature, Critical, 93%, value 114 °C (+46% vs 78).
- **Prediction:** winding insulation failure / thermal trip, **72% within 4 days**, RUL 5 days.
- **Root cause:** cooling fan blockage 74%, overload from high batch viscosity 18%, insulation ageing 8%. Evidence: "Airflow fell 37% while load stayed steady; temperature rise tracks the airflow loss."
- **Recommendation:** clean or replace the cooling fan and shroud, and check the load at the next batch change. 3.0 h.
- **Work order:** Clean / replace cooling fan — Motor M-301. Parts: Motor cooling fan 315 frame. Assignee Omar Al-Sulaiti.
- **Outcome:** warning lead time 4.0 days, planned 3.0 hrs vs unplanned 25.0 hrs (mid-batch trip, batch loss and restart). **Avoided 22.0 hrs**, cost avoided **$31,500** ($14,980 of downtime at $681/hr plus $16,520 of batch value).
- **Post-repair:** health 95, RUL 3.4 yrs.

## 6. Scenario C — Compressor C-110 dry gas seal leak (pressure)

| | |
|---|---|
| Asset | Compressor C-110 (Process gas), Ras Laffan Polymer Plant · Polymer Line A |
| Story | The compressor's dry gas seal is leaking. Discharge pressure sags and the seal vent flow climbs; the motor works harder to compensate |
| Starting state | Health 89, RUL 2.8 yrs |

When this scenario starts, the plant switcher changes to Ras Laffan, with a toast saying so.

**Sensor key points:**

| Sensor | Band | 0 h | 24 h | 60 h | 76 h | 84 h | 96 h | Post-repair |
|---|---|---|---|---|---|---|---|---|
| Discharge pressure (bar) | 8.0–9.0 | 8.5 | 8.5 | **7.95** | 7.5 | **7.1** (confirm) | 6.9 | 8.6 |
| Seal vent flow (Nm³/h) | 0.5–2.5 | 1.2 | 1.4 | **2.6** | 3.9 | 4.8 | 5.3 | 1.0 |
| Motor power (kW) | 380–430 | 410 | 410 | 424 | 432 | 439 | 443 | 405 |
| Discharge temp (°C) | 85–100 | 94 | 94 | 97 | 99 | 101 | 102 | 93 |
| Vibration (mm/s) | 1.5–4.5 | 2.8 | 2.8 | 2.9 | 3.0 | 3.1 | 3.1 | 2.7 |

**Events:**
- **Anomaly:** Pressure (counted under Sensor in the type donut), Critical, 91%, value 7.1 bar (−16% vs 8.5).
- **Prediction:** seal failure, **61% within 9 days**, RUL 10 days.
- **Root cause:** dry gas seal leak 81%, suction valve wear 12%, pressure transmitter drift 7%. Evidence: "Vent flow up 4× while the pressure transmitter matches the redundant gauge."
- **Recommendation:** replace the dry gas seal cartridge at the next Polymer Line A changeover. 6.0 h.
- **Work order:** Replace dry gas seal — Compressor C-110. Parts: Dry gas seal cartridge. Assignee Rajesh Nair.
- **Outcome:** lead time 8.0 days, planned 6.0 vs unplanned 17.0 hrs. **Avoided 11.0 hrs**, cost avoided **$14,800** at $1,345/hr.
- **Post-repair:** health 94, RUL 3.0 yrs.

## 7. Engine rules

1. **One scenario at a time.** Starting another while one runs asks "Stop the current scenario and start {name}?" in a modal.
2. **The engine lives in a store**, not in a page, and survives navigation. A reload clears a running scenario (see rule 4).
3. **Event log.** Every event records what it added or changed (IDs and the previous values). **Stop** replays the log backwards. A **completed** scenario's events are committed and persisted.
4. **On reload** with an unfinished scenario in storage: roll it back silently.
5. **Live view** (`/equipment/{assetId}`):
   - It shows "LIVE · time-lapse" on the sensor cards.
   - The main chart shows the scenario window (0 h → now) with the normal band and markers: "Early warning" at 40 h, "Anomaly" at 84 h, "Work order" at creation, "Repaired" at the end.
   - It also shows an anomaly score gauge (0–1) and an RUL counter.
6. **Other pages** read the same store, so they update with no extra work. Lists use the highlight animation for rows added in the last 4 s.
7. **Speed** changes apply at the next step. **Pause** freezes the clock, values and chart.
8. **Reduced motion:** steps still advance, but tweens and glows are off.
9. **Running a completed scenario again** first resets that asset's scenario effects to the seed values, so it can be demoed repeatedly in one session. The completed WO and the resolved anomaly stay in history; new IDs are used.

## 8. Scenario picker (modal)

- Three cards. Each shows the asset illustration, the asset name and plant, the failure type pill (Vibration, Temperature or Pressure), a one-line story, "About {n} seconds to detection at {speed}×", and the outcome teaser ("Avoids ~14.6 hrs of downtime").
- Footer: the speed control (1× 2× 4×), "Open live view when it starts" (checkbox, default on), Cancel, and **Start scenario**.
