# MaintaX Live Demo — UI and Design Specification

Version 1.0 (draft for review). It is derived from the 7 reference screenshots in `screens/reference/`. Colors were sampled from them, then rounded to a clean palette.

## 1. Design direction

A professional industrial-operations console: a **near-black navy sidebar**, a **cool light content area**, white cards with soft shadows, one strong **blue** for primary actions, and a strict severity color set (red, orange, amber, green). Dense but calm. Data-first, with no decorative flourishes beyond the plant skyline in the dashboard header.

The difference from the AI Clinical Scribe is the dark sidebar, the uppercase eyebrows above page titles, the bigger and bolder titles, and the denser cards. The primitives (cards, pills, tables, modals, toasts) are the same pattern, so they can be ported.

## 2. Tokens

### 2.1 Color

| Token | Value | Use |
|---|---|---|
| `sidebar` | `#06142b` | sidebar background (sampled `#031428`) |
| `sidebar-2` | `#0b1d3d` | sidebar hover, context card |
| `sidebar-line` | `#1a2b4d` | sidebar dividers, card border |
| `sidebar-text` | `#c6d0e2` | nav labels |
| `sidebar-muted` | `#7d8aa6` | tagline, small text |
| `bg` | `#f2f6fc` | page background |
| `surface` | `#ffffff` | cards, top bar |
| `surface-2` | `#f7f9fd` | table header, hover, inner tiles |
| `line` | `#e3e9f3` | card borders |
| `line-2` | `#edf1f7` | inner dividers |
| `ink` | `#0b1437` | titles, main text (sampled `#000730`) |
| `ink-2` | `#334160` | secondary text |
| `muted` | `#6b7793` | captions, comparison labels |
| `faint` | `#9aa5bd` | placeholders, axis labels |
| `blue` / `blue-600` / `blue-50` / `blue-100` | `#1b5fe8` / `#154fcc` / `#edf3ff` / `#d7e4ff` | primary, active nav, links |
| `green` / `green-50` | `#13a37f` / `#e5f6f0` | healthy, running, low, positive delta |
| `amber` / `amber-50` | `#f2b52c` / `#fff6e0` | at risk, medium |
| `orange` / `orange-50` | `#f57c20` / `#fff0e3` | degraded, high, warning |
| `red` / `red-50` | `#e5383f` / `#fdecee` | critical, active anomaly, negative delta, badges |
| `purple` / `purple-50` | `#7c4ddb` / `#f2edfc` | maintenance status, predictions, AI items |
| `gray-50` | `#f0f3f8` | neutral pills, segmented track |
| `offline` | `#9aa5bd` | offline status |

**Status and severity mapping (use everywhere):**

| Meaning | Pill (background / text) | Chart color |
|---|---|---|
| Critical / Active (anomaly) | `red-50` / `red`, with a ↑ icon | `#e5383f` |
| High | `orange-50` / `orange`, ↑ | `#f57c20` |
| Medium | `amber-50` / `#b7790a`, ↑ | `#f2b52c` |
| Low / Resolved / Running / Healthy | `green-50` / `green` | `#13a37f` |
| Investigating / Idle / Scheduled | `blue-50` / `blue` | `#1b5fe8` |
| Maintenance / In Progress | `purple-50` / `purple` | `#7c4ddb` |
| Pending | `amber-50` / `#b7790a` | |
| Inactive / Offline | `gray-50` / `muted` | `#9aa5bd` |

**Health bands:** Healthy ≥ 80 (green), At Risk 65–79 (amber), Degraded 50–64 (orange), Critical < 50 (red), Offline (gray). Health bars and gauges use these colors.

**Chart series** (anomaly types, in order): Sensor `#5b6cf0`, Behavioral `#f2b52c`, Performance `#13a37f`, Energy `#f57c20`, Temperature `#a26bf5`, Vibration `#f0607a`. Model families: Failure Prediction `#7c4ddb`, Anomaly Detection `#1b9be8`, RUL `#13a37f`, Root Cause `#f0607a`, Reliability `#5b6cf0`.

### 2.2 Type

- **Font:** Inter (Google Fonts) with weights 400, 500, 600, 700, 800.
- **Eyebrow:** 11.5px/600 uppercase, letter-spacing .06em, color `ink-2`.
- **Page title:** 28px/700, letter-spacing −.02em, `ink`.
- **Subtitle:** 14px, `muted`.
- **Card title:** 15px/600. **KPI label:** 12.5px/500 `ink-2`. **KPI value:** 28px/700 tabular. **Delta:** 12px/600 with an arrow, plus a 11.5px `muted` comparison label underneath.
- **Table:** header 12px/500 `muted`; body 13px; IDs under names at 11.5px `muted`.
- Numbers always use `tabular-nums`.

### 2.3 Shape and depth

- **Radius:** cards 12px; KPI icon tiles 10px; buttons and inputs 8px; pills fully rounded; sidebar active item 8px.
- **Card:** white, 1px `line` border, shadow `0 1px 2px rgba(11,20,55,.04), 0 4px 14px rgba(11,20,55,.04)`.
- **Modal and menu shadow:** `0 20px 50px rgba(11,20,55,.20)`.
- **Spacing:** content padding 24px 28px; card gap 16px; card padding 16px 18px; card header 52px minimum.

### 2.4 Icons

lucide-react, 18px, stroke 1.8. Equipment-type icons in a 30px `blue-50` tile:

| Type | Icon |
|---|---|
| Pump | `circle-dot` |
| Motor | `cog` |
| Compressor | `gauge` |
| Furnace / Boiler | `flame` |
| Conveyor | `move-horizontal` |
| Generator | `zap` |
| HVAC / Fan | `fan` |
| Reactor / Tank | `cylinder` |
| Heat exchanger | `waves` |
| Centrifuge | `rotate-cw` |
| Tablet press / Packaging | `package` |
| Cooling tower | `wind` |

## 3. Layout

```
┌──────────┬──────────────────────────────────────────────────────────┐
│ SIDEBAR  │ TOP BAR (64px): [plant switcher*] [search……]   🔔  (JD) John Doe ▾ │
│ 236px    ├──────────────────────────────────────────────────────────┤
│ dark     │ EYEBROW                                   [date pill][Plant Online][plant ▾] │
│          │ Page Title                                                │
│ logo     │ subtitle                                                  │
│ 12 items │ ┌KPI┐┌KPI┐┌KPI┐┌KPI┐ …                                     │
│ ──────── │ ┌ card ───────────────┐ ┌ card ──────┐ ┌ card ───┐       │
│ 4 items  │ │                      │ │            │ │         │       │
│          │ └──────────────────────┘ └────────────┘ └─────────┘       │
│ context  │                                                           │
│ card     │                                         [Demo · Sample data] │
└──────────┴──────────────────────────────────────────────────────────┘
* the plant switcher sits in the top bar on Plant Overview only; elsewhere it sits in the page header
```

- **Grids:** most pages use a 12-column grid with a 16px gap. The common splits are 8/4 and 4/4/4. KPI rows are equal columns: 4, 5 or 7.
- **Breakpoints:** ≥ 1280 full; 1024–1279 KPI rows wrap to 4 and 3-column card rows become 2; < 1024 drawer sidebar, single column; < 640 KPI rows become 2 columns and tables scroll inside their cards.

## 4. Shell components

### 4.1 Sidebar

- 236px wide, `sidebar` background, full height, sticky.
- **Logo block** (padding 18px 18px 22px): the Hansa mark (36px, on a white rounded square so it reads on navy), then "Maint**a**X" in 22px/800 white with the **X in `#3b82f6`**, and "Predict. Prevent. Perform." in 10.5px `sidebar-muted`.
- **Nav items:** 40px tall, padding 0 14px, gap 12px, 14px/500 `sidebar-text`, icon 19px. Hover `sidebar-2`. Active: `blue` background, white text and icon, radius 8.
- **Badges:** right-aligned, 18px red circle with white 11px/700 text.
- **Main group:** Dashboard (`layout-dashboard`), Equipment (`cog`), Anomalies (`triangle-alert`), Predictions (`chart-line`), Maintenance (`wrench`), Work Orders (`clipboard-list`), Reliability (`shield-check`), Downtime (`clock-alert`), Production (`factory`), AI Assistant (`bot`), Alerts (`bell`), Reports (`file-chart-column`).
- A 1px `sidebar-line` divider, then: Data & Integrations (`database`), AI & Models (`brain-circuit`), Administration (`settings`), Security (`shield`).
- **Context card** at the bottom: `sidebar-2` background, `sidebar-line` border, radius 12, padding 16px. Icon, title, 12.5px text in `sidebar-text`, and a full-width blue button with an arrow.

### 4.2 Top bar

- 64px tall, white, bottom border `line`.
- **Search pill** (max-width 420px, `surface-2` background, radius 10, search icon, placeholder "Search equipment, sensors, anomalies, or anything…"). Its results dropdown is 480px wide.
- **Bell:** 38px with a red 8px dot while unread.
- **User:** a 36px blue circle with white "JD", then "John Doe" (13px/600) over "Operations Manager" (12px muted), and a chevron.
- On Plant Overview the plant switcher button (building icon, plant name, chevron, white with a `line` border, radius 10) sits at the left of the top bar, as in the screenshot.

### 4.3 Context card copy

| Page | Title | Text | Button |
|---|---|---|---|
| Default (Dashboard, Anomalies, most pages) | AI Assistant | Get instant insights, investigate anomalies, and get recommendations. | Open AI Assistant → |
| Equipment pages | (chart icon only) | Keep your operations running at peak performance with AI-powered insights. | Explore AI Assistant → |
| Administration, Security | (users icon only) | Manage users, teams, roles and access permissions across your organization. | Go to Settings → (opens the Security page) |
| AI Assistant page | Presenter tip | Try a suggested question, or ask about any asset by its ID. | Run a scenario → (opens the scenario picker) |

### 4.4 Page header

- Eyebrow, title and subtitle on the left.
- On the right, in a row: the date pill (calendar icon, "Oct 19, 2026 14:32", white with border, radius 8, a chevron that opens a small date-range menu where the page uses ranges), "Plant Online" (green dot, white pill), and the plant switcher ("All Plants" with a building icon).
- **Plant Overview only:** the header sits on a light band with a **plant skyline illustration** on the right half. It's an SVG of distillation columns, stacks, pipe racks and a flare at dusk (sky gradient `#f3c9a8 → #9fb7d8 → #e9f1fb`, structures in `#2b3a55` at 70% opacity), fading into the band with a horizontal mask.

### 4.5 Scenario bar (only while a scenario runs)

- Sticky under the top bar, 52px tall, `ink` background (navy), white text.
- Left: a pulsing red "LIVE" dot, the scenario name, and the phase pill (for example "Anomaly detected").
- Center: the time-lapse clock ("Day 4 · 18:00", "1 s = 2 h"), and a progress bar with phase ticks.
- Right: Pause/Resume, a 1× 2× 4× segmented control, "Open live view", and Stop (×).
- Under the phase "Awaiting action" the bar turns amber and shows a "Create Work Order" button.

### 4.6 Presenter badge and panel

Same pattern as the scribe: a navy pill at the bottom-left reading "Demo · Sample data". The panel contents are in SRS §5.

## 5. Shared components

| Component | Notes |
|---|---|
| `KpiTile` | A 40px icon tile (tinted background, colored icon), label, value, delta (arrow plus colored %), comparison label. Variants: ring-gauge, donut-mini |
| `Card` / `CardHeader` | Icon, title, optional right slot (a "View All →" link in blue 12.5px/500, a range select, a button) |
| `SeverityPill`, `StatusPill`, `RiskPill` | Mapping as in §2.1. Severity and risk pills include an ↑ arrow icon for High and Critical |
| `HealthBar` | 56px track, 6px tall, colored by band, % to the right (or above, small, as in the equipment table) |
| `ConfidenceBar` | % with an 80px blue bar |
| `EquipmentCell` | Type icon tile, name (13px/500), ID (11.5px muted) |
| `Donut` | Configurable thickness, 2px gaps, center label, legend with value and % columns |
| `RingGauge` | 270° or 360° arc, value in the center |
| `LineChart` / `AreaChart` | Multiple series, optional target dashed line, optional normal band, markers, hover tooltip with a vertical guide |
| `StackedBars` | Totals above the bars |
| `Sparkline` | 80×24, no axes |
| `Tabs` (underline), `PillTabs` (equipment type tabs: active = solid blue pill, inactive = white with border), `Segmented` | |
| `DataTable` | Sticky header, checkbox column, row hover, page size, pagination ("Showing 1–10 of 24 users") |
| `Modal`, `Menu`, `Toast`, `EmptyState`, `Avatar` (initials, team color) | |
| `AssetIllustration` | Simple flat SVGs for pump, motor and compressor, used in the anomaly panel and the equipment header |
| `LiveValue` | A number that animates between time-lapse steps, turning red when outside its band |

## 6. Screen inventory

| # | Route | Screen | Reference | States to design |
|---|---|---|---|---|
| 1 | `/dashboard` | Plant Overview | 02 | default, during a scenario (new insight, alert count), plant = All / Ras Laffan / Doha |
| 2 | `/equipment` | Equipment Monitoring | 03 | tabs, filters, "Production Lines" grouping, empty search |
| 3 | `/equipment/[id]` | Equipment detail | new | normal, live scenario (values breaking the band), post-repair |
| 4 | `/anomalies` | Anomaly Dashboard | 01 | default (P-104 absent), after detection (P-104 at the top, matches the screenshot), row selected |
| 5 | `/anomalies/[id]` | Anomaly detail | new | Active, Investigating, Resolved, False positive; with or without a work order |
| 6 | `/predictions` | Predictions | new | default, scheduled |
| 7 | `/maintenance` | Maintenance schedule | new | week view, planned window band |
| 8 | `/work-orders` | Work Orders list | new | tabs, empty |
| 9 | `/work-orders/[id]` | Work Order detail | new | Open, Scheduled, In Progress (repair animation), Completed |
| 10 | `/reliability` | Reliability | new | |
| 11 | `/downtime` | Downtime Dashboard | 04 (mobile → desktop) | 7D, 30D, 90D |
| 12 | `/production` | Production | new | |
| 13 | `/assistant` | AI Assistant | new | empty, streaming, answer with a table and action |
| 14 | `/alerts` | Alerts | new | tabs, acknowledge |
| 15 | `/reports` | Reports | 07 (phone) | generate modal, progress, new report |
| 16 | `/integrations` | Data & Integrations | new | connect, connected |
| 17 | `/ai-models` | AI & Models | 05 (mobile → desktop) | two tabs, retrain progress |
| 18 | `/admin` | Users & Administration | 06 | 4 tabs, Add User modal |
| 19 | `/security` | Security | new | |
| — | modals | Scenario picker, Create Work Order, Outcome, Generate Report, Add User, Preferences, Presenter, Search results | new | |

**Desktop versions of mobile screens:**
- **Downtime:** the three KPI cards and the three charts become a 4-KPI row, then a row of 3 cards (by equipment donut, by line stacked bars, by failure type donut), then the events table.
- **AI & Models:** the five family cards become a row of 5, then KPIs, then the accuracy trend and the registry table side by side.

## 7. Motion

- **Live values:** a 300ms ease number tween per time-lapse step. A value outside its band turns red, with a 1.2s soft red glow on the card the first time.
- **New rows and insights:** slide down 6px and fade in, with a 1.6s blue-50 highlight.
- **Scenario bar:** the LIVE dot pulses (opacity 1 → .3, 1.2s).
- **Charts:** the line extends point by point during the time-lapse. There are no entrance animations on page load.
- **Reduced motion:** tweens, glows and pulses are off; values change instantly.
