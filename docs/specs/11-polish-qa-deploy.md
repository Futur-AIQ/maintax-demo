# Phase 11 — Polish, QA, README and deploy

**Screens:** `prototype/52-phone-dashboard.png`, `53-phone-drawer.png`, `54-phone-anomalies.png`, plus every earlier screenshot for a final comparison.

## 11.1 Polish pass

Check every page at **1440px** and at **390px**:
- No horizontal page scroll. Tables scroll inside their cards. KPI rows wrap to 2 columns. Card headers wrap their controls.
- Grid children use `min-width: 0`. SVGs shrink (`max-width: 100%`). Long labels wrap.
- Modals fit the phone (scenario cards stack). The scenario bar wraps cleanly.
- Toasts don't cover the presenter badge in a confusing way.
- **Reduced motion:** no blinking, glow or highlight animations. Live values still update.
- Every icon-only button has an `aria-label`. Focus rings are visible. Esc closes menus and modals, except locked ones.
- Page `<title>`s read "{Page} · MaintaX".
- `not-found` and unknown IDs show the empty state.
- Remove `/ui-preview` and any temporary proof text. No `console.log`.
- **Performance:** the 250 ms ticker updates only live elements. Open the React Profiler during a scenario and confirm pages don't re-render every tick.

## 11.2 QA script, README and deploy

Run this in a browser and report each step as pass or fail:
1. Fresh load, after Reset demo data. Dashboard values: 92%, 94%, 6, 1, 12, 4, 2.4%. Badges 2 and 4.
2. Equipment: 248 assets with the status split 182/28/14/12/8/4. `/equipment/HX-2` opens.
3. Anomalies seed: 11/7/24/2, "Showing 5 of 11", panel on HX-2.
4. **S** → Pump P-104 → 2× → Start. The live view opens, values tick, the early warning appears, then the critical anomaly toast. Anomalies now shows **12/8/24/3**, badges **3/5**, P-104 at the top, 96%.
5. Dashboard: alerts 7, critical 2, predicted 5. New insights are at the top.
6. **W** → the prefilled modal → Create. The WO appears in Maintenance Due and on the calendar.
7. **F** → the repair animation on the WO page → the Outcome modal (14.6 hrs, $9,940). Switch the currency to QAR: QAR 36,182.
8. View on dashboard: downtime avoided 32.8 hrs. Anomalies back to 11 active, 25 resolved.
9. The motor scenario, stopped midway with **Stop**: everything rolls back.
10. The compressor scenario: the plant switches to Ras Laffan.
11. Assistant: "What needs my attention today?" and "Why is Pump P-104 flagged?" both answer correctly.
12. Reports: generate a Downtime report and download the CSV.
13. Admin: add a user, change a role. Both entries appear in the Security audit log.
14. Reload. All changes persist. Reset demo data restores the seed.

Fix anything that fails. Where you cannot click in a real browser, say which steps the developer must check by hand.

**README.md** (replace the kit README):
- What the demo is.
- Requirements: Node 20.9+.
- `npm install`, `npm run dev`, `npm run verify:seed`.
- **Presenter guide:** Reset before each session; S, Space, W and F; recommended 2× speed; currency switch. Link `docs/07-DEMO-SCRIPT.md`.
- Project structure overview.
- **Deploy:** push to GitHub and import into Vercel (framework Next.js, no environment variables). Note that client-facing demos should use a paid Vercel plan or the client's own account, because the Hobby plan is for non-commercial use.

## Done when

- [ ] The QA script passes end to end, with no console errors.
- [ ] `npm run build` and `npm run lint` are clean. `npm run verify:seed` passes.
- [ ] The README is written.
