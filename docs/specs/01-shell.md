# Phase 1 — Design system and app shell

**Screens:** `reference/02-plant-overview.png`, `reference/01-anomaly-dashboard.png` (shell), and in `prototype/`: `01-dashboard`, `31-search-results`, `32-notifications-menu`, `33-user-menu`, `52-phone-dashboard`, `53-phone-drawer`.
**Prototype:** the `<style>` block at the top of `docs/prototype.html` (read in chunks; it is about 300 lines), and the functions `renderSide`, `renderTop`, `ph`, `card`, `ch`, `kpi`, `eqCell`, `pager`, `searchResults`, `openFloat`, `modal`, `toast`, `sevPill`, `stPill`, `condPill`, `hbar`, `confBar`, `delta`, `avatar`.

## 1.1 Tokens, fonts and primitives

- **`globals.css`:** `@import "tailwindcss";` and an `@theme` block with every token from CLAUDE.md as `--color-*`, plus `--font-sans` (Inter), `--radius-card: 12px`, `--shadow-card` and `--shadow-pop`.
- **`body`:** background bg, 14px, line-height 1.45.
- **Focus ring:** `:focus-visible` 2px blue.
- **Keyframes:**
  - `blink` (opacity .25 at 50%, 1.2s)
  - `nw`: row highlight, background `#e6eeff` fading to transparent over 1.8s
  - `pop` (4px rise and fade, .15s)
  - `glow`: red ring fading, 1.4s
  - `spin`
- **Reduced motion:** animations and transitions effectively off.
- **Root layout:** Inter from `next/font/google`. Metadata title `MaintaX · Hansa Technologies`, description "Live demo of the MaintaX predictive maintenance platform", `robots: { index: false, follow: false }`. Icon: copy `public/logo-mark.png` to `src/app/icon.png`.
- **`components/ui/`:**
  - **Card**, plus **CardHeader** (icon, title, optional muted suffix such as "last 24 hours", right slot) and **ViewAll** link ("View All →", blue 12.5px/500).
  - **Kpi**: 38px tinted icon tile, label, value with optional unit, optional sub line and color, delta, comparison label. It accepts children for the ring and gauge variants.
  - **Button**: variants primary, secondary, outline-blue, danger, amber; sizes sm, md, lg.
  - **IconButton** (aria-label required).
  - **Pill**, with **SeverityPill**, **StatusPill**, **RiskPill** and **ConditionPill** using the color mapping in CLAUDE.md.
  - **HealthBar**: 56px track, colored by band. A `stacked` variant puts a small % above the bar, as in the equipment table.
  - **ConfidenceBar**: % plus a 54px blue bar.
  - **ProbabilityBar**: red ≥60, orange ≥45, else blue.
  - **Delta**: arrow and value; green if good, red if bad, given a `goodUp` flag; "No change" when 0.
  - **EquipmentCell**: 30px blue-50 tile with the type icon, name, and the ID below.
  - **Tabs** (underline), **CardTabs** (tabs inside a white card strip), **PillTabs** (equipment types: active is solid blue), **Segmented**, **Switch**.
  - **Input**, **SearchInput**, **Select** (custom chevron), **Textarea**, **Checkbox**.
  - **Modal**: 620px, or `wide` 900px. Header, body, footer. Esc and backdrop close it unless `locked`.
  - **Menu**: floating, anchored right or left, flips up when needed, closes on outside click, Esc and route change.
  - **Toast**: `toast(msg, type, link?)` with types ok, info, warn and crit. `crit` is dark red and stays 5.2s; the others stay 3.6s. An optional link label navigates.
  - **Pager**: "Showing 1–8 of 248", prev/next buttons and page numbers with ellipsis.
  - **EmptyState** and **Avatar** (initials on a color from a name hash, or a fixed color).
- **`lib/icons.ts`:** the full icon map from CLAUDE.md. Export `<Icon name="..." size={18} />`.
- Add a temporary `/ui-preview` page showing every primitive.

## 1.2 Sidebar, top bar, page header, routes

- **Sidebar**, matching `renderSide`:
  - Dark, 236px, sticky.
  - Logo block.
  - 12 main items, a divider, then 4 more, using the icons in CLAUDE.md.
  - Active item: solid blue. Detail routes highlight their parent.
  - Red count badges on Anomalies and Alerts. Hard-code 2 and 4 for now; Phase 2 connects them.
- **Context card** at the bottom, with copy and button per route:
  - Default: "AI Assistant" → `/assistant`.
  - `/equipment*`: chart icon, "Keep your operations running at peak performance with AI-powered insights.", "Explore AI Assistant".
  - `/admin`: users icon, "Manage users, teams, roles and access permissions across your organization.", "Go to Settings" → `/security`.
  - `/security`: same text, "Go to Users" → `/admin`.
  - `/assistant`: "Presenter tip", "Try a suggested question, or ask about any asset by its ID, for example P-104.", "Run a scenario". The button opens the scenario picker; a toast is fine until Phase 6.
- **Top bar**, matching `renderTop`:
  - 64px tall.
  - On `/dashboard` only, a plant button ("Mesaieed Chemical Plant") sits at the left.
  - Global search pill, max 440px, placeholder "Search equipment, sensors, anomalies, or anything…".
  - Bell with a red dot while there are unread unacknowledged alerts.
  - User block: blue "JD" avatar, "John Doe", "Operations Manager", chevron.
  - Hamburger below 1024px.
- **Menus.** Real data arrives in Phase 2; static content is fine now.
  - **Notifications** (340px): "Mark all as read", the 5 latest alerts, "View all alerts".
  - **User menu**:
    - My profile → `/admin`
    - Preferences (modal in Phase 10)
    - Presenter controls
    - Help → `/assistant`
    - Sign out, which shows the toast "Sign out is turned off in the demo."
- **Global search**, matching `searchResults`:
  - Starts at 2 or more characters. Results are grouped as Equipment, Anomalies and Work Orders, up to 5 each.
  - Arrow keys move, Enter opens, Esc closes.
  - No match: "No matches for “q”".
  - Wire it to data in Phase 2.
- **PageHeader** component: eyebrow, title, subtitle, and a right-hand slot for actions.
  - **DatePill**: calendar icon and a live "Oct 19, 2026  14:32" that updates every 30s. A menu offers Today / 7 / 30 / 90 days with the note "Ranges are fixed in this demo."
  - **Plant Online** pill: green dot.
  - **PlantSwitcher**.
- **Routes:** create every page in CLAUDE.md with a placeholder PageHeader, plus `not-found`. `/` redirects to `/dashboard`.
- **Presenter badge:** fixed bottom-**right**, navy pill "● Demo · Sample data". The panel comes in Phase 6.

## Done when

- [ ] The shell matches `prototype/01-dashboard.png` (sidebar, top bar, header spacing).
- [ ] Every nav item opens its page, detail paths highlight their parent, and the context card changes per page.
- [ ] Menus and search open and close correctly.
- [ ] At 390px the drawer works and there is no horizontal scroll.
- [ ] Build and lint pass.
