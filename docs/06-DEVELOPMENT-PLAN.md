# MaintaX Live Demo — Development Plan

Version 1.0 (draft for review).

## 1. Method

The same proven method as the AI Clinical Scribe demo:

```
Documents (this set) → HTML prototype (Claude, here) → Starter kit → Claude Code phases in VS Code → Vercel
```

| Stage | Who | Output |
|---|---|---|
| 1. Documents | Claude | PRD, SRS, UI, data and simulation specs, this plan, the demo script |
| 2. HTML prototype | Claude | One self-contained file with every screen, the full simulation and sample data, published as a private link for review |
| 3. Starter kit | Claude | `CLAUDE.md`, phase specs (with "Done when" checklists), `PROMPTS.md`, prototype screenshots for every screen and state, typed and compiled seed data, logo |
| 4. Build | Ketan with Claude Code | Next.js app, phase by phase; a commit after each step |
| 5. Review | Claude | Check each phase report against the specs; QA before deploy |
| 6. Deploy | Ketan | Private GitHub repo `maintax-demo` → Vercel |

## 2. Stack

The same as the scribe, so the code and skills transfer:

- Next.js (App Router) + TypeScript strict + Tailwind CSS v4
- zustand (with persist) for state; lucide-react for icons; clsx
- Hand-written SVG charts (line, area, donut, ring gauge, stacked bars, sparkline, risk matrix)
- Static build on Vercel, no environment variables
- Not used: UI kits, chart libraries, date libraries, a backend

## 3. Reuse from the scribe repo

Ketan's `ai-clinical-scribe-demo` repo is on the same machine. Claude Code will **copy and adapt** these parts instead of rebuilding them:

| Reused | Adaptation for MaintaX |
|---|---|
| UI primitives: Card, Button, Pill, Tabs, Segmented, Switch, Modal, Menu, Toast, Input, Select, Checkbox, EmptyState, Avatar | New tokens: darker ink, 12px card radius, severity colors |
| AppShell structure, drawer, route group | A dark sidebar variant, the context card, the plant switcher, the search |
| Persisted store pattern with `init(now)` and hydration safety | New data model |
| LineChart, Donut, Gauge (SVG) | Add multiple series, a normal band, markers, stacked bars, sparklines |
| Recording engine pattern (a ticker in a store, events, flash timestamps) | It becomes the scenario engine with an event log and rollback |
| Presenter badge and panel, reset, keyboard handling | Scenario picker, currency, plant |
| README and QA structure | |

**Why copy rather than share a package now:** two demos don't justify a shared library yet. **When the third Hansa demo starts**, we extract `@hansa/demo-kit`: the shell, primitives, charts, presenter and engine pattern. Each new demo then starts about 3 phases ahead.

## 4. Build phases (Claude Code)

Each step is one prompt. `/clear` after each phase. Estimates assume the Pro plan and Ketan reviewing between steps.

| Phase | Steps | What it delivers | Est. hours |
|---|---|---|---|
| 0 | 0.1 | Project set up, kit copied in, scribe primitives copied | 0.5 |
| 1 | 1.1, 1.2 | Tokens, dark sidebar shell, top bar, search shell, plant switcher, page header, all routes | 2 |
| 2 | 2.1, 2.2 | Seed data (plants, 248 assets, sensors, anomalies, predictions, alerts, WOs, users, presets), stores, currency, persistence | 2.5 |
| 3 | 3.1 | Plant Overview, matching screenshot 02 | 1.5 |
| 4 | 4.1, 4.2 | Equipment Monitoring (screenshot 03) and Equipment detail with live sensor cards and the trend chart | 2.5 |
| 5 | 5.1, 5.2 | Anomaly Dashboard (screenshot 01), anomaly detail, Alerts | 2.5 |
| 6 | 6.1, 6.2 | **Scenario engine**, scenario bar, picker, live view, presenter panel, all three scenarios | 3 |
| 7 | 7.1, 7.2 | Work Orders (list, create modal, detail, repair), Maintenance schedule, Predictions, Outcome modal | 2.5 |
| | | **Milestone M4: demo-ready.** The full story works end to end. Can deploy early | |
| 8 | 8.1, 8.2 | Downtime, Production, Reliability, Reports (with CSV) | 2.5 |
| 9 | 9.1, 9.2 | AI Assistant (scripted chat), AI & Models, Data & Integrations | 2.5 |
| 10 | 10.1 | Administration (screenshot 06), Security, Preferences | 1.5 |
| 11 | 11.1, 11.2 | Polish, phone-width pass, QA script, README, deploy | 2 |
| | **21 steps** | | **≈ 26 hours** |

For reference, the scribe build was 17 steps.

**Order rationale:** the shell and data first, then the three screenshot-matched pages, then the engine. The engine needs Equipment and Anomalies to show its effects. Then the action loop (work orders) completes the story at M4. Everything after M4 is breadth.

## 5. Schedule (at 20–25 hrs/week)

| Day block | Work |
|---|---|
| Block 1 | Review docs → Claude builds the prototype → review the prototype |
| Block 2 | Claude builds the starter kit → Phases 0–3 |
| Block 3 | Phases 4–7 → **M4 demo-ready** (optional early deploy) |
| Block 4 | Phases 8–10 |
| Block 5 | Phase 11, QA review, deploy |

That is about 1.5 to 2 weeks of evenings and weekends, depending on review time.

## 6. Recommendations built into this plan

1. **No indexing** from day one: `robots: { index: false, follow: false }` in the root metadata.
2. **Varied timestamps** in all generated history (a lesson from the scribe).
3. **Bulk actions match their tab:** "Restore" in archive-style tabs, "Acknowledge" in Unacknowledged (a lesson from the scribe).
4. **Hosting:** deploy client-facing demos from a paid Vercel account or Hansa's own account. The free Hobby plan is for personal, non-commercial use.
5. **Presenter cues:** the scenario picker, the S, Space, W and F keys, and the Reset.
6. **Early deploy at M4**, so a client meeting never waits for the breadth pages.
7. **Shared demo kit** when the third Hansa demo starts (see §3).
8. **Later options**, not in version 1:
   - Arabic language with right-to-left layout for Gulf prospects
   - Mobile app screens (Downtime, AI Models, Reports) in a phone frame
   - A custom domain such as `maintax.demo.hansatechnologies.org`
   - A "real data" mode that reads a CSV of sensor readings uploaded by a prospect

## 7. Quality gates

| Gate | Check |
|---|---|
| After each step | `npm run build` and `npm run lint` clean, the page compared with its named screenshot, a commit |
| After Phase 6 | The three scenarios run start to finish at 1×, 2× and 4×; Stop rolls everything back; the numbers agree across pages |
| After Phase 7 (M4) | The demo script (07) runs end to end in under 5 minutes |
| Before deploy | The full QA script in the Phase 11 spec; Claude reviews the report |

## 8. Repository

- Name: `maintax-demo` (private GitHub repo, created and pushed by Ketan)
- Vercel project: `maintax-demo` → `maintax-demo.vercel.app`
- localStorage key: `maintax-demo-v1`

## 9. Open items for Ketan

1. Approve this document set, or list changes.
2. Confirm the fictional company name "Gulf Crest Chemicals" and the plant names.
3. Confirm keeping the screenshot people's names (John Doe and others) plus the added Gulf names.
