# Phase 0 — Project setup

**Goal:** turn this folder into a working Next.js project without losing the kit files, and copy reusable parts from the AI Clinical Scribe demo if it is available.

## 0.1 Scaffold Next.js into this folder

`create-next-app` refuses to run in a folder that already has files, so scaffold in a temporary sub-folder and move the files up:

```bash
npx create-next-app@latest _tmp --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

Then:
- Move everything from `_tmp/` into the project root (including dotfiles such as `.gitignore`), **without overwriting** `CLAUDE.md`, `README.md`, `docs/`, `seed/` or `public/logo-*.png`. If `_tmp/README.md` exists, discard it; keep ours.
- Merge `_tmp/public/` into `public/`, then delete the default Next.js SVGs (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`).
- Delete `_tmp/`.
- Install: `npm install zustand lucide-react clsx` and `npm install -D tsx`.
- Add a script to `package.json`: `"verify:seed": "tsx seed/verify.ts"`.
- Make sure `tsconfig.json` excludes nothing that would hide `seed/` from the TypeScript build. It is fine if `seed/` is type-checked.
- Replace `src/app/page.tsx` with a placeholder that says "MaintaX setup OK".

## 0.2 Optional reuse from the scribe demo

If a folder `../ai-clinical-scribe-demo` exists (or the developer gives another path), list its `src/components/ui`, `src/components/charts` and `src/store` files. **Copy nothing yet.** In the summary, say which files look reusable in Phase 1 (UI primitives, Modal, Menu, Toast, LineChart, Donut, Gauge, presenter panel). If the folder is not there, say so; Phase 1 builds everything from the spec.

## Done when

- [ ] `npm run dev` shows "MaintaX setup OK".
- [ ] `npm run build` and `npm run lint` pass.
- [ ] `npm run verify:seed` prints "All seed checks passed".
- [ ] `CLAUDE.md`, `README.md`, `docs/`, `seed/`, `public/logo-mark.png` and `public/logo-full.png` are untouched.
- [ ] The summary reports the Next.js, React, Tailwind, zustand and lucide-react versions, and the scribe reuse findings.
