# MaintaX — live demo app

A clickable demo of Hansa Technologies' **MaintaX** predictive maintenance platform. Plant managers see equipment health; MaintaX spots a failing machine days early, explains why, and turns the warning into a work order that avoids unplanned downtime.

**It is a demo.** There is no backend, no real sensors, no real AI and no real integrations. A simulation engine plays scripted failures in time-lapse. All data is fictional, generated in the browser, and saved in localStorage.

## Where things are

| Path | What it is | How to use it |
|---|---|---|
| `docs/specs/NN-*.md` | **What to build in each phase** | Read only the spec named in the prompt |
| `docs/screens/prototype/*.png` | 54 screenshots of every prototype screen and state | Match these closely |
| `docs/screens/reference/*.png` | The 7 original product screenshots from Hansa's website | The visual source of truth |
| `docs/prototype.html` | Working HTML prototype (one file, ~260 KB, 1,541 lines) | **Never read it whole.** Grep for the function named in the spec and read only that region. Line 381 is an 8 KB base64 logo; never print it |
| `docs/01-PRD.md` … `07-DEMO-SCRIPT.md` | Product docs: PRD, SRS, UI spec, data spec, simulation spec, plan, demo script | Background. Read a section only when a spec points to it |
| `seed/` | Typed seed data ported from the prototype, plus `verify.ts` | Copied to `src/data/` in Phase 2. Don't invent other data |
| `public/logo-mark.png` | Hansa "H" mark | Sidebar logo and favicon |

If a spec and a screenshot disagree, follow the screenshot and mention it in your summary.

**Prototype lookup:** page renderers are `ROUTES.dashboard`, `ROUTES.equipment`, `eqDetail`, `ROUTES.anomalies`, `anPanel`, `anDetail`, `ROUTES['work-orders']`, `woDetail`, and so on. The simulation is `SCEN`, `simTick`, `evConfirm`, `completeScenario`. Run `grep -n "ROUTES\.\|^function " docs/prototype.html` to list them, then read only the lines you need.

## Stack

- Next.js (App Router, the version `create-next-app@latest` installs), TypeScript strict, `src/` directory, `@/*` alias
- Tailwind CSS v4 (CSS-first: tokens in `@theme` inside `src/app/globals.css`, no `tailwind.config` file)
- `zustand` for state (with `persist`), `lucide-react` for icons, `clsx` for class names
- Font: Inter via `next/font/google` (weights 400–800)
- **Do not add** UI kits (shadcn/ui, MUI…), chart libraries, animation libraries, date libraries, or a backend. Charts are hand-written SVG components.

Commands: `npm run dev`, `npm run build`, `npm run lint`, `npx tsx seed/verify.ts`.

## Folder structure

```
src/
  app/
    layout.tsx                    <html>, Inter, metadata (title "MaintaX · Hansa Technologies", robots noindex), icon
    page.tsx                      redirect → /dashboard
    (app)/layout.tsx              AppShell (client): Sidebar, Topbar, ScenarioBar, <main>, modals, toasts, presenter badge
    (app)/dashboard/page.tsx      Plant Overview
    (app)/equipment/page.tsx      Equipment Monitoring
    (app)/equipment/[id]/page.tsx Equipment detail + live view
    (app)/anomalies/page.tsx      Anomaly Dashboard
    (app)/anomalies/[id]/page.tsx
    (app)/predictions/  maintenance/  work-orders/  work-orders/[id]/  reliability/  downtime/  production/
    (app)/assistant/  alerts/  reports/  integrations/  ai-models/  admin/  security/
    not-found.tsx
  components/
    ui/          Card, CardHeader, Kpi, Button, IconButton, Pill (Severity/Status/Risk/Condition), HealthBar, ConfidenceBar,
                 EquipmentCell, Tabs, PillTabs, Segmented, Switch, Input, Select, Checkbox, Modal, Menu, Toast, Pager, EmptyState, Avatar
    charts/      LineChart, LiveChart, Donut (+Legend), Ring, ArcGauge, StackedBars, HBars, Sparkline, RiskMatrix
    illustrations/ Skyline, PumpIllustration, MotorIllustration, CompressorIllustration, AssetIllustration
    layout/      AppShell, Sidebar, Topbar, PageHeader, PlantSwitcher, DatePill, GlobalSearch, ScenarioBar, PresenterBadge
    <feature>/   dashboard/, equipment/, anomalies/, work-orders/, simulation/, assistant/, admin/ …
  data/          copy of seed/ (Phase 2)
  store/         demo-store.ts (DB + prefs, persisted), sim-store.ts (engine, not persisted), ui-store.ts (modals, toasts)
  lib/           selectors.ts (derived counts), format.ts, icons.ts (name → lucide map), csv.ts, assistant.ts, hooks.ts
```

Prototype hash routes map to app paths one to one: `#equipment/P-104` → `/equipment/P-104`, `#work-orders/WO-2026-0371` → `/work-orders/WO-2026-0371`.

## Design system (copy exactly)

Single light theme, no dark mode. These values come from `docs/03-UI-SPEC.md`.

| Token | Value | Use |
|---|---|---|
| sb / sb2 / sbl | `#06142b` / `#0b1d3d` / `#1a2b4d` | sidebar background, hover and context card, divider |
| sbt / sbm | `#c6d0e2` / `#7d8aa6` | sidebar text, tagline |
| bg | `#f2f6fc` | page background |
| surface / surface-2 | `#ffffff` / `#f7f9fd` | cards, table header and hover |
| line / line-2 | `#e3e9f3` / `#edf1f7` | borders, inner dividers |
| ink / ink-2 / muted / faint | `#0b1437` / `#334160` / `#6b7793` / `#9aa5bd` | text levels |
| blue / blue-600 / blue-50 / blue-100 | `#1b5fe8` / `#154fcc` / `#edf3ff` / `#d7e4ff` | primary, active nav |
| green / green-50 | `#13a37f` / `#e5f6f0` | healthy, running, low, good delta |
| amber / amber-50 / amber-text | `#f2b52c` / `#fff6e0` / `#a86d00` | at risk, medium |
| orange / orange-50 | `#f57c20` / `#fff0e3` | degraded, high, warning |
| red / red-50 | `#e5383f` / `#fdecee` | critical, active anomaly, bad delta, badges |
| purple / purple-50 | `#7c4ddb` / `#f2edfc` | maintenance, predictions, AI |
| gray-50 / offline | `#f0f3f8` / `#9aa5bd` | neutral pills, offline |

- **Health bands:** Healthy ≥80 green · At Risk 65–79 amber · Degraded 50–64 orange · Critical <50 red · Offline gray (`BANDC` in `seed/reference.ts`).
- **Status colors** in `STC`, anomaly-type colors in `TYPEC`, model-family colors in `FAMC`.
- **Pills:** Critical/Active red · High orange · Medium amber · Low/Resolved/Running/Healthy green · Investigating/Idle/Scheduled blue · Maintenance/In Progress purple · Inactive/Offline gray. High and Critical carry a small ↑ icon.
- **Type:** Inter. Eyebrow 11.5px/600 uppercase, tracking .06em. Page title 28px/700, tracking −.02em. Subtitle 14px muted. Card title 15px/600. KPI value 28px/700 tabular. Table 13px, header 12px/500 muted. All numbers use `tabular-nums`.
- **Shape:** cards radius 12, 1px line border, shadow `0 1px 2px rgba(11,20,55,.04), 0 4px 14px rgba(11,20,55,.045)`. Buttons and inputs radius 8 (38px tall; sm 30, lg 44). Pills fully rounded. Active nav item radius 8. Modal shadow `0 20px 50px rgba(11,20,55,.22)`.
- **Layout:** sidebar 236px dark; top bar 64px white sticky; content padding 22px 28px; card gap 16px. Below 1024px the sidebar becomes a drawer. Below 640px KPI rows become 2 columns and tables scroll inside their cards. Nothing scrolls the page sideways at 390px.
- **Logo block:** `logo-mark.png` (38px on a white rounded square), "Mainta**X**" 22px/800 white with the X in `#3b82f6`, "Predict. Prevent. Perform." 10.5px sbm.

## Icons

The prototype uses short icon names. Map them in `src/lib/icons.ts` to lucide-react:

`dash` LayoutDashboard · `cog` Cog · `alert` TriangleAlert · `chartl` ChartLine · `wrench` Wrench · `clip` ClipboardList · `shieldc` ShieldCheck · `shield` Shield · `clock` Clock · `factory` Factory · `bot` Bot · `bell` Bell · `filec` FileChartColumn · `file` FileText · `db` Database · `brain` BrainCircuit · `gear` Settings · `pump` CircleDot · `gauge` Gauge · `zap` Zap · `fan` Fan · `flame` Flame · `move` MoveHorizontal · `cyl` Cylinder · `waves` Waves · `rot` RotateCw · `pkg` Package · `wind` Wind · `thermo` Thermometer · `pulse` Activity · `drop` Droplet · `amp` CircleGauge · `flow` ArrowLeftRight · `vol` Volume2 · `power` Power · `sliders` SlidersHorizontal · `spark` Sparkles · `heart` HeartPulse · `bars` ChartColumn · `target` Target · `trend` TrendingUp · `history` History · `key` Key · `lock` Lock · `users` Users · `user` User · `userplus` UserPlus · `build` Building2 · `cal` Calendar · `plug` Plug · `server` Server · `cpu` Cpu · `wifi` Wifi · `mail` Mail · `msg` MessageSquare · `globe` Globe · `layers` Layers · `star` Star · `list` List · `grid` LayoutGrid · `info` Info · `pin` MapPin · `checkc` CircleCheck · `ff` FastForward · `box` Box

## State architecture (important)

1. **`demo-store.ts`** holds `db: DB` (from `seed/types.ts`), `prefs` (`cur`, `plant`, `ovPlant`, `speed`, `openLive`) and `notifRead`.
   - It is persisted under the localStorage key `maintax-demo-v1` as `{ savedAt, db, prefs, notifRead }`.
   - **On load**, shift every number stored under a key named `t` or ending in `At` by `Date.now() - savedAt`, so ages ("2h ago") stay the same on later days. With no saved state, call `buildDB(Date.now())`.
   - **Never save while a scenario is running.** Wrap storage in try/catch; blocked storage falls back to memory.
2. **`sim-store.ts`** is the scenario engine (Phase 6). It is not persisted.
   - When a scenario starts, it takes a **snapshot** (`structuredClone(db)`). **Stop** restores that snapshot, which is the rollback.
   - A completed scenario commits its changes and saves.
   - This snapshot approach replaces the "event log" wording in the SRS.
3. **`lib/selectors.ts`** holds the derived counts, mirroring the prototype exactly: `anActive`, `critAn`, `badgeAn`, `badgeAl`, `an24`, `alOpen`, `critEq`, `predWeek`, `maintDue`, `eqList`, `avoidedHrs`. Badges, KPIs and tables use these, so every screen agrees.
4. **Client-only data.** Seed dates come from the browser clock. AppShell renders a light skeleton until the store has hydrated. Never build data during server rendering.
5. **Page-local UI state** (tabs, filters, pages, selected row) lives in components. The prototype's `UI` object shows the defaults.

## Rules

- **Honest copy.** Copy (labels, toasts, empty states) comes from the specs and the prototype. Never claim that an email was sent, a system was connected or a file was really exported to a third party. The prototype's toasts already say "In this demo…".
- **No side effects.** No network calls at runtime, no `alert`/`confirm`/`prompt`. Confirmations are in-page modals. Report CSV downloads are real browser downloads (`Blob` + `a[download]`).
- **Accessibility.** Every icon-only button has an `aria-label`. Focus is visible (2px blue outline). Modals close on Esc and backdrop click, except locked progress modals. Respect `prefers-reduced-motion`.
- **Scope.** Build only what the current spec lists. No mobile-app screens. Pages must still work at phone width.
- **Quality bar for every step.** `npm run build` and `npm run lint` pass with no new warnings. No console errors or hydration warnings. Components are typed with no `any` (except the generated `seed/build.ts`).
- **Finish each step** with a short summary: files changed, how to see the result, anything different from the screenshots. **Do not run git commands**; the developer commits.

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**This project has a knowledge graph. Start with the code-review-graph
MCP tools to narrow scope, then read the source.** The graph is cheaper than scanning files and
gives you structural context (callers, dependents, test coverage) that file search cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes_tool` or `query_graph_tool` instead of Grep
- **Understanding impact**: `get_impact_radius_tool` instead of manually tracing imports
- **Code review**: `detect_changes_tool` + `get_review_context_tool` instead of reading entire files
- **Finding relationships**: `query_graph_tool` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview_tool` + `list_communities_tool`

### Verify in the source

- Narrow scope with the graph, then read the source. Do not change code from graph output alone.
- For any non-trivial change, read the implementation and the relevant tests before concluding.
- Verify the exact source when touching behavior, database logic, migrations, retries, fallbacks,
  recovery, or compatibility code.
- When the graph and the source disagree, the source wins. The graph may be stale or may not
  model that relationship.
- An empty graph result can mean "not indexed" or "not statically visible", not "does not exist".

### Key Tools

| Tool | Use when |
| ------ | ---------- |
| `detect_changes_tool` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context_tool` | Need source snippets for review — token-efficient |
| `get_impact_radius_tool` | Understanding blast radius of a change |
| `get_affected_flows_tool` | Finding which execution paths are impacted |
| `query_graph_tool` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes_tool` | Finding functions/classes by name or keyword |
| `get_architecture_overview_tool` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes_tool` for code review.
3. Use `get_affected_flows_tool` to understand impact.
4. Use `query_graph_tool` pattern="tests_for" to check coverage.
<!-- /code-review-graph MCP tools -->
