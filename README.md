# MaintaX demo — starter kit

This folder is the project. Open it in VS Code, run `claude` in the terminal, and build the app phase by phase with the prompts in **`docs/PROMPTS.md`**.

## Before you start

- Node.js 20.9 or newer, Git, VS Code and Claude Code (logged in).
- In this folder, run `git init` once.
- Optional: put your AI Clinical Scribe project next to this one, as `../ai-clinical-scribe-demo`, so Step 0.1 can reuse its UI components.

## What's inside

```
maintax-demo/
├── CLAUDE.md                 Project rules for Claude Code (loads automatically)
├── README.md                 This file (replaced by the real README in Step 11.2)
├── docs/
│   ├── PROMPTS.md            ← START HERE: 21 prompts, one per step, with commit messages
│   ├── specs/00 … 11         One spec per phase (what to build, references, "Done when")
│   ├── prototype.html        The working prototype; open it in a browser to compare
│   ├── 01-PRD.md … 07-DEMO-SCRIPT.md   PRD, SRS, UI spec, data spec, simulation spec, plan, demo script
│   └── screens/
│       ├── reference/        The 7 original MaintaX screenshots from the Hansa website
│       └── prototype/        54 screenshots of every prototype screen and state
├── seed/                     Typed sample data (verified) + verify.ts
└── public/                   logo-mark.png (Hansa "H"), logo-full.png
```

## The rhythm

1. Paste one prompt from `docs/PROMPTS.md`.
2. Wait for Claude's summary.
3. Run `npm run dev` and compare the page with the screenshots named in the step.
4. Ask for fixes in the same session if anything differs.
5. Commit with the suggested message.
6. `/clear` after each phase.

## The plan

| Phase | Delivers | Steps |
|---|---|---|
| 0 | Next.js set up inside this folder | 1 |
| 1 | Design system, dark sidebar, top bar, search, routes | 2 |
| 2 | Seed data, stores, selectors, saved demo state | 2 |
| 3 | Plant Overview dashboard | 1 |
| 4 | Equipment Monitoring and Equipment detail | 2 |
| 5 | Anomaly Dashboard, anomaly detail, Alerts | 2 |
| 6 | **Simulation engine, live view, presenter panel** | 2 |
| 7 | **Work orders, repair, outcome**, Maintenance, Predictions | 2 |
| 8 | Downtime, Production, Reliability, Reports | 2 |
| 9 | AI Assistant, AI & Models, Data & Integrations | 2 |
| 10 | Administration, Security, Preferences | 1 |
| 11 | Polish, QA, README, deploy | 2 |

After Phase 7 the full demo story works (anomaly → prediction → work order → repair → downtime avoided), so you can deploy early if a meeting comes up.
