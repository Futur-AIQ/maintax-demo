# Phase 6 — Simulation engine, scenario bar, live view and presenter panel

**Read:** `docs/05-SIMULATION-SPEC.md` (the whole file), `seed/scenarios.ts`.
**Screens** (`prototype/`): `36-scenario-picker`, `37-live-normal`, `38-live-early-warning`, `39-live-anomaly-detected`, `40-live-awaiting-action`, `41-anomalies-after-detection`, `42-dashboard-after-detection`, `49-motor-scenario-live`, `50-stop-confirm-modal`, `51-compressor-scenario-live`, `34-presenter-panel`.
**Prototype:** everything in the "SCENARIOS", "ENGINE", "LIVE UI" and "PICKER" blocks: `curve`, `simVals`, `scoreOf`, `startScenario`, `stopScenario`, `simTick`, `evEarly`, `evConfirm`, `evPred`, `evRca`, `onScenarioWO`, `ffRepair`, `repairStep`, `completeScenario`, `outcomeModal`, `clockLabel`, `progress`, `renderBar`, `liveUpdate`, `pickerModal`, `presenterModal`, and the keydown handler.

## 6.1 Engine, scenario bar and picker

**`store/sim-store.ts`** (not persisted). State:
- `active`, `id`, `eq`, `h` (plant hours), `phase` (0–7), `paused`
- `vals` (current values), `series` (`{[sensorKey]: [h, v][]}`, capped at 700 points), `markers` (`{x, label, color}`), `score`
- `snapshot` (a DB clone taken at start), `fired` flags, `woId`, `anId`, `prId`, `alId`, `repairStart`, `lastType`

**Ticker** (one `setInterval` of 250 ms, created once in AppShell):
- **Phases 0–3:** `h += 0.5 × speed`.
- **Phases 4–5:** `h += 0.0625 × speed`, the slower clock while waiting for the presenter.
- **Phase 6:** runs `repairStep`. **Phase 7:** idle.

On each tick:
- Compute `vals` with `curve` (piecewise smoothstep through `pts`, an exponential approach to `max` after the last point, and a small deterministic sine wobble). Append them to `series` and compute `score`.
- **Triggers:**
  - h ≥ 24 → phase 1
  - 40 → `evEarly`
  - 84 → `evConfirm`
  - 88 → `evPred`
  - 92 → `evRca`
  - 96 → phase 4
- **In phases 4–5:** the asset's `rulDays` counts down from the prediction's RUL, and health drifts down to `drop − 2`.

**Store events** mutate `demo-store.db`:
- `evConfirm`:
  - Creates the anomaly `AN-{nextAn}` (Critical) and alert `AL-{nextAl}`.
  - Sets the asset to health `drop`, Warning, High risk, Fair condition, and increments `detTypes`.
  - Rewrites the early insight text, selects the new anomaly in the panel, and shows the crit toast with a "View" link to `/anomalies`.
- The other events follow the prototype one to one.
- **Saving is disabled while `active`.** Use the `canSave` hook from Phase 2.

**`startScenario(id)`:**
- If a scenario is already active, show a warning toast instead.
- Reset the asset to `start` values (`post = false`, `rulDays = null`), take the snapshot, and set the sensor series to their base values.
- If the scenario's plant differs from the current non-ALL plant, switch plants with a toast. Set `ovPlant` to the scenario plant.
- Navigate to `/equipment/{eq}` if `openLive`; otherwise show a toast with an "Open live view" link.

**`stopScenario()`:** restore the snapshot, clear the sim, toast "Scenario stopped. Everything it changed was rolled back."

**ScenarioBar** (sticky under the top bar while `active`; navy, or amber `#4a3000` in phase 4):
- LIVE dot, scenario name, phase pill (`PHASES[phase].label`).
- Clock: "Day 4 · 18:00", with "1 s = 2 h · time-lapse", or "1 s = 15 min" in phases 4–5.
- Progress bar with tick marks at 40, 84 and 96 h. Width: up to 72% at 96 h, 76% scheduled, filling to 100% during repair.
- Buttons:
  - phase 4: "Create Work Order"; phase 5: "Fast-forward to repair"
  - Pause/Resume, the 1× 2× 4× Segmented, Live view link, Stop (×)
- In phases 4–5, Pause and Live view become icon-only so the bar stays on one line.
- The clock and progress update every tick without re-rendering pages.

**Scenario picker** modal (wide):
- 3 cards, each with the illustration, type pill, name, "{asset} · {plant} · {line}", story, "About {42/speed} s to detection at {speed}×", a green "Avoids ~{h} hrs of downtime" pill, and "Already run this session · can run again" when completed.
- Footer: speed Segmented, an "Open live view when it starts" checkbox, Cancel, **Start scenario**.

**Stop confirm** modal: "Stop and roll back" / "Keep running".

## 6.2 Live view, presenter panel, keyboard, all three scenarios

- **Live view** on `/equipment/[id]` while `sim.eq === id`:
  - Sensor cards read `vals` and update every tick, with a red state and glow when out of band. Sparklines use the last 40 points.
  - The trend chart is a LiveChart of `series[selected]`: `x0 = 0`, `x1 = max(96, h + 4)`, markers (Early warning 40, Anomaly 84, Work order, Repaired), labels "Day 2 12h".
  - The AI panel shows the live `score`, the phase pill, and the RUL counter.
  - **Performance:** update these through subscriptions or refs. Don't re-render the whole page 4 times a second.
- Other pages update when events fire, through the store. Rows created in the last 5 s get the `nw` highlight.
- **Presenter panel** (the badge opens it, and so does the user menu):
  - Live scenario row: Choose scenario, or Stop scenario while one runs.
  - Time-lapse speed.
  - Currency (USD / QAR / AED, with the rates note).
  - Keyboard help.
  - Reset demo data, with an inline Confirm.
  - Footer: "All companies, people, assets and figures in this demo are fictional."
- **Keyboard:**
  - **S** opens the picker (or "A scenario is already running.")
  - **Space** pauses or resumes
  - **W** opens the work-order modal in phase 4 (modal in Phase 7)
  - **F** fast-forwards in phase 5 (Phase 7)
  - Keys are ignored in inputs and while a modal is open.
- Verify all three scenarios: pump (MES, vibration), motor (MES, temperature), compressor (RLF, pressure, which switches the plant).

## Done when

- [ ] Pump at 4×: detection at about 10 s. Then `/anomalies` shows **12 / 8 / 24 / 3**, badges **3 / 5**, "Showing 5 of 12", P-104 at the top with 96%. That is exactly `reference/01-anomaly-dashboard.png`.
- [ ] Plant Overview after detection: alerts 7, critical equipment 2, predicted failures 5.
- [ ] Stop rolls everything back to the seed numbers. Reloading mid-scenario restores the seed state.
- [ ] Motor and compressor scenarios run with their own values (compare screenshots 49 and 51).
- [ ] No console errors. Smooth at 1×, 2× and 4×. Build and lint pass.
