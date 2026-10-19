# Phase 2 — Data, stores and selectors

**Read:** `seed/` (all files), CLAUDE.md "State architecture", `docs/04-DATA-SPEC.md` §0 and §7.
**Prototype:** `load`, `save`, `shiftDates`, `indexDB`, `resetDemo`, the "DERIVED" block (`inPl` … `avoidedHrs`), `money`, `sensorsFor`, `sensorHist`, `curVal`, `histFor`.

## 2.1 Copy the data and build the stores

- Copy `seed/*` to `src/data/` (keep `seed/` as the original and the verify target).
- **`store/demo-store.ts`** (zustand + persist):
  - State: `ready`, `db: DB`, `prefs: { cur: 'USD', plant: 'ALL', ovPlant: 'MES', speed: 1, openLive: true }`, `notifRead`.
  - **Custom storage:** save `{ savedAt, db, prefs, notifRead }`. On rehydrate, shift timestamps (keys `t` or `*At`) by `Date.now() - savedAt`.
  - With no stored data or a bad version: `buildDB(Date.now())`.
  - **`init()`** runs once on the client in AppShell and sets `ready`.
  - **Saving is skipped while a scenario is active.** Read a flag from sim-store; Phase 6 adds it. Write a `canSave()` hook point now.
  - **Mutations:** an `update(fn: (db) => void)` helper that clones, applies, sets and saves. Also add prefs setters, `setNotifRead`, and `resetDemo()` (clear the key, reload to `/dashboard`).
  - Keep an index `eqById` (a memoised selector is fine).
- **`store/ui-store.ts`:** the modal stack (a discriminated union of modal kinds plus props), the toast queue, and drawer open/closed.
- **AppShell:** call `init()`. Until `ready`, show a light skeleton: sidebar and top bar outlines plus three grey card blocks.

## 2.2 Selectors, formatting and wiring

- **`lib/selectors.ts`** mirrors the prototype's derived functions exactly. Everything takes `(db, plant)`:
  - `inPl`, `anActive`, `critAn`, `badgeAn` (all plants), `badgeAl`, `an24` (last 24 hours, newest first), `alOpen`, `critEq`, `predWeek`, `maintDue`, `eqList`
  - `avoidedHrs(db, plant)`, which uses `OV[plant].avoided` plus `db.avoided`
  - `band(e)`, `woKind(w)`, `anTitle(a)`, `anChange(a)`
- **`lib/sensors.ts`:**
  - `sensorsFor(e)`: scenario assets use their `SCEN` sensors; others use `SENSOR_TPL` with values derived from health, exactly as in the prototype.
  - `sensorHist(e, s, n)`: deterministic history.
  - `curVal(e, s)`: uses live sim values when a scenario runs on that asset (Phase 6), the post-repair value when `e.post`, otherwise the base value.
- **`lib/format.ts`:** re-export the seed util formatters, plus `useMoney()` returning `(usd) => money(usd, prefs.cur)`.
- **Wire the shell to the store:**
  - Sidebar badges use `badgeAn` and `badgeAl`. The seed state shows **2** and **4**.
  - The bell dot shows when unacknowledged alerts exist and `!notifRead`.
  - The notifications menu shows the 5 latest alerts; "Mark all as read" works.
  - Global search uses real data.
  - Plant switcher (`prefs.plant`) and overview plant switcher (`prefs.ovPlant`) both persist.
- Temporary proof on the dashboard placeholder: "248 assets · 11 active anomalies · 4 unacknowledged alerts". Remove it in Phase 3.

## Done when

- [ ] `npm run verify:seed` passes.
- [ ] The badges read 2 and 4. Searching "pump" lists pumps, anomalies and work orders.
- [ ] Changing the plant or currency survives a reload. Calling `resetDemo()` from a temporary button or the console restores the defaults.
- [ ] No hydration warnings in the console.
- [ ] Build and lint pass.
