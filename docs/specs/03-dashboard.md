# Phase 3 — Dashboard (Plant Overview)

**Target:** `reference/02-plant-overview.png`. Also `prototype/01-dashboard.png`, `03-dashboard-ras-laffan.png` and `02-plant-switcher-menu.png`.
**Prototype:** `ROUTES.dashboard`, `skyline`, `ring`, `donut`, `legend`, `lineChart`, `legendRow`, `woKind`, `lastDays`.

## Charts (build now, reused later) — `components/charts/`

- **LineChart:** props `series [{name, color, data, dash?, area?, width?}]`, `labels`, `w`, `h`, `min`, `max`, `ticks`, `yfmt`, `every`, `dots`.
  - "Nice" max as in `niceMax`. Gridlines `#edf1f7`, tick labels 10px `#8a95ad`.
  - Area fill gradient from 22% to 0%. Dashed target line with no dots. Points have a `<title>` tooltip.
  - The viewBox is set by `w` and `h`. Callers pick sizes so text stays readable: about 440×250 in a third-width card.
- **Donut:** `parts [label, value, color]`, `size`, `thick`, center text and sub text, 2px gaps. **Legend:** dot, label, value, % columns.
- **Ring:** circular progress with center text.

## Page

- **Hero band:** the full-width light band at the top of the content, with the **Skyline** SVG on the right half, faded in by a left-to-right mask.
  - Eyebrow "OPERATIONS DASHBOARD", title "Plant Overview", subtitle "Real-time insights into your equipment, production and maintenance operations."
  - Top right: a white pill containing the live date, a divider, a green dot and "Plant Online".
- **Plant:** `prefs.ovPlant` (top-bar button, default Mesaieed). Presets come from `OV[plant]`. The counts are derived:
  - Active Alerts = `alOpen(plant)` → MES **6**
  - Critical Equipment = `critEq(plant)` → **1**
  - Maintenance Due = `maintDue(plant)` → **12**
  - Predicted Failures = `predWeek(plant)` → **4**
- **Seven KPI tiles** (equal columns, wrapping to 4, then 2):
  1. Overall Equipment Health: green ring with "92%", ↑3% vs. last 7 days.
  2. Production Status: 94%, green "On Track", "120,400 kg" with ↑6%, "current output".
  3. Active Alerts: red "Requires Attention", ↑ delta vs. last 24h.
  4. Critical Equipment: red "Needs Immediate Attention".
  5. Maintenance Due: "This Week".
  6. Predicted Failures: "Next 7 Days".
  7. Downtime Overview: 2.4%, "Total Downtime", ↓1.1%.

  Deltas come from `OV`. A delta is red when the change is bad: alerts up is red, downtime down is green.
- **Row 2** (columns 1 / 1.3 / .95):
  - **Equipment Health:** donut of the 5 bands over the plant's assets (MES: 108 / 18 / 8 / 5 / 3, total 142), with a legend. "View All" goes to `/equipment`.
  - **Production Status:** a callout box showing current output with its delta. LineChart, Target dashed grey and Actual blue with area, last 7 days labels, `yfmt` "120K". Scale it by plant as the prototype does.
  - **AI Insights:** the first 5 of `db.insDash` (icon tile, title, text, relative time). New items, under 4s old, get the `nw` highlight.
- **Row 3:**
  - **Critical Equipment** table: equipment cell, health bar, risk pill, last alert time. Top 5 by risk, then health. Rows open the equipment page.
  - **Maintenance Due** table: equipment, type (`woKind`), due date, priority. The 5 most urgent. Rows open the work order.
  - **Production Impact:** a 2×2 grid of mini tiles:
    - Current Production Impact −1.8%
    - Potential Downtime 6.5 hrs, next 7 days
    - Estimated Downtime Avoided `avoidedHrs`, "(last 7 days)"
    - Maintenance Cost Impact, via `useMoney`, "(est. this month)"

## Done when

- [ ] Side by side with `reference/02-plant-overview.png`, the layout, density and colors match. The photo is replaced by the skyline, by design.
- [ ] Switching the plant to Ras Laffan changes the figures, as in `prototype/03-dashboard-ras-laffan.png`.
- [ ] Changing the currency changes the cost tile.
- [ ] Build and lint pass.
