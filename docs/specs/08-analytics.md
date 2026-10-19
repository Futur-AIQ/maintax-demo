# Phase 8 — Downtime, Production, Reliability, Reports

**Screens** (`prototype/`): `17-downtime`, `18-production`, `16-reliability`, `20-reports`, `21-generate-report-modal`, `22-report-csv-modal`. Downtime is the desktop version of `reference/04-mobile-downtime.png`; Reports follows the phone screen in `reference/07-platform-overview.png`.
**Prototype:** `ROUTES.downtime`, `downtimeEvents`, `stackBars`, `ROUTES.production`, `ROUTES.reliability`, `hbars`, `ROUTES.reports`, `REPCATS`, `reportModal`, `submitRep`, `reportCSV`, `viewReport`.

## 8.1 Downtime and Production

**Downtime:**
- **Header:** eyebrow "DOWNTIME ANALYTICS", title "Downtime Dashboard", subtitle "Monitor and analyze downtime across your facility for better operational efficiency."
- **Right-hand controls:** a 7D / 30D / 90D Segmented (factors ×1, ×4.1, ×12.6), a date-range pill ("Oct 13 – Oct 19, 2026") and PlantSwitcher.
- **Four tinted KPI cards**, with "vs. previous {range}" and up = red:
  - Total 48.6 hrs ↑12% (red tint)
  - Unplanned 32.4 ↑18% (amber tint)
  - Planned 16.2 ↓8% (green tint)
  - Downtime Cost: unplanned hours × line rates, in the chosen currency (blue tint)
- **Three cards:**
  - **Downtime by Equipment:** donut, center "48.6 hrs" with "Total Downtime", legend in hrs and %.
  - **Downtime by Production Line:** **StackedBars**, Unplanned `#f0607a` and Planned `#1b5fe8`, totals above the bars.
  - **Downtime by Failure Type:** donut.
- **Downtime Events** table, from `downtimeEvents()`: start, duration, equipment, line, failure type, cause, Planned/Unplanned pill.

**Production:**
- **Header:** eyebrow "PRODUCTION PERFORMANCE".
- **KPIs:**
  - Current Output: 120,400 kg, ↑6%
  - Target Attainment: 94%, "On Track"
  - OEE: 81.6%
  - Production Impact: −1.8%
- **Actual vs Target** chart (7D / 14D), with an **OEE Breakdown** card beside it: three rings (Availability 92.1, Performance 91.4, Quality 96.9) and the explanatory note.
- **Production Lines** table: line, product, output, target, OEE bar, status pill (On track / Slightly behind / Behind), and the limiting asset as a link.

## 8.2 Reliability and Reports

**Reliability:**
- **Header:** eyebrow "RELIABILITY ENGINEERING".
- **KPIs:** MTBF 412 hrs ↑6%, MTTR 3.8 hrs ↓9% (shown green), Availability 97.6%, Failures (30 days) 14.
- **MTBF Trend:** 12 weeks, area chart. Beside it, **Failures by Asset Type** as HBars.
- **Bad Actors** table: the top 10, with downtime, failures, MTBF, MTTR and health. Rows open the asset.

**Reports:**
- **Header:** eyebrow "REPORTS", title "Reports Dashboard", subtitle "Access comprehensive reports and insights to optimize your operations.", and a "+ Generate report" button.
- **Six category cards** (3×2) from `REPCATS`: tinted icon tile, "{name} Reports", description, "{n} reports" (base plus generated), and a Generate button.
- **Recent Reports** table: icon and name, scope, created, a CSV pill, and Download.
- **Generate modal:** category, plant, date range, format CSV. A locked progress modal runs 3 steps of 550 ms (Collecting data → Calculating metrics → Building CSV). The new report appears at the top with the `nw` highlight; toast "{name} is ready".
- **Download:**
  - Opens a preview modal: the first 40 rows in a `<pre>`, row count, and **Download** and Copy CSV buttons.
  - Download makes a real file with `Blob` + `URL.createObjectURL` + `a[download]`, named like `downtime-report.csv`.
  - Use `reportCSV` for the columns per category. Escape quotes and commas.

## Done when

- [ ] The Downtime range switch rescales every figure, and the currency changes the cost.
- [ ] Generating a report adds it to the list, and Download saves a valid CSV that opens in Excel.
- [ ] All four pages match their screenshots. Build and lint pass.
