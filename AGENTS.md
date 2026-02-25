# AGENTS.md

## Cursor Cloud specific instructions

This is a React + Vite portfolio SPA with Tailwind CSS. No backend, database, or external services required.

### Key commands

See `package.json` scripts:
- **Dev server:** `npm run dev` (Vite on port 3000, binds `0.0.0.0`)
- **Lint:** `npm run lint` (ESLint; note: the codebase has pre-existing lint warnings/errors in `src/context/ThemeContext.jsx`)
- **Build:** `npm run build`
- **Preview:** `npm run preview`

### Caveats

- The `main` branch contains only a README. All source code lives on the `develop` branch (and branches derived from it). Make sure your working branch has the source code merged.
- Node.js 20 is required (per `Dockerfile`). Use `nvm use 20` if the default node version differs.
- The dev server runs on port **3000** (configured in `vite.config.js`), not Vite's default 5173.
