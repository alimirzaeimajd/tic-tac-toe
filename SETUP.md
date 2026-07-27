# Local Setup Guide

This is a step-by-step guide for running, building, deploying, and customizing this project. It assumes no prior context beyond having a computer with internet access.

---

## 1. Prerequisites

You need:

- **Node.js version 20 or later.** Vite 8 (the build tool this project uses) requires it. Check your version with:

  ```bash
  node --version
  ```

  If you don't have Node installed, or have an older version, download it from [nodejs.org](https://nodejs.org) (choose the "LTS" build), or use a version manager like [nvm](https://github.com/nvm-sh/nvm):

  ```bash
  nvm install 20
  nvm use 20
  ```

- **npm**, which ships with Node automatically. Check with:

  ```bash
  npm --version
  ```

- A code editor (VS Code recommended, but any editor works).

No database, no API keys, and no additional accounts are required — this is a fully static, client-side application.

---

## 2. Installation

1. Get the project files onto your machine (clone the repository, or unzip the files you were given) and open a terminal in the project's root folder — the one containing `package.json`.

2. Install dependencies:

   ```bash
   npm install
   ```

   This reads `package.json` and downloads everything listed under `dependencies` and `devDependencies` into a `node_modules/` folder. It typically takes 10–30 seconds. You'll see a `node_modules` folder appear — this is normal and should never be edited by hand or committed to version control (it's already excluded via `.gitignore`).

---

## 3. Environment setup

None needed. This project has no environment variables, no `.env` file, and no external services to configure. If you later add something that *does* need configuration (an analytics ID, for example), the conventional place for it is a `.env` file at the project root, read via Vite's `import.meta.env.VITE_*` variables — but none of that exists in the current project.

---

## 4. Running the development server

```bash
npm run dev
```

This starts Vite's dev server, typically at `http://localhost:5173`. Open that URL in your browser. The terminal output will show you the exact address (it may pick a different port if 5173 is already in use).

While this is running:

- Any change you save to a file in `src/` reloads instantly in the browser (Hot Module Replacement) — you generally don't need to manually refresh.
- Errors (syntax errors, failed imports) show up both in the terminal and as an overlay in the browser.
- Press `Ctrl+C` in the terminal to stop the server.

---

## 5. Production build

When you're ready to deploy:

```bash
npm run build
```

This runs Vite's production build and outputs static files into a `dist/` folder: minified JS, minified CSS, and an `index.html` that references them. This `dist/` folder is what you deploy — it's a complete, self-contained static site.

To sanity-check the production build locally before deploying it:

```bash
npm run preview
```

This serves the contents of `dist/` locally (default `http://localhost:4173`) exactly as a static host would.

---

## 6. Deployment

Because the output is a static site (just HTML/CSS/JS files), you can deploy `dist/` to any static host. A few common options:

### Vercel
1. Push the project to a GitHub repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Vite; leave the defaults (Build Command: `npm run build`, Output Directory: `dist`).
4. Deploy.

### Netlify
1. Push the project to GitHub (or drag-and-drop the `dist/` folder directly at [app.netlify.com/drop](https://app.netlify.com/drop) for a one-off deploy).
2. If connecting a repo: Build command `npm run build`, publish directory `dist`.

### GitHub Pages
1. Build locally: `npm run build`.
2. Publish the `dist/` folder to a `gh-pages` branch (the `gh-pages` npm package, or GitHub's own Pages-from-a-branch workflow, both work).
3. If the site will live at a sub-path (e.g. `username.github.io/repo-name/`), set `base: '/repo-name/'` in `vite.config.js` before building, or asset paths will be wrong.

### Any other static host (S3, Cloudflare Pages, Render, etc.)
Upload the contents of `dist/` as-is. There's no server-side code to run.

---

## 7. Troubleshooting

**`npm install` fails or hangs**
- Confirm your Node version is 20+ (`node --version`).
- Delete `node_modules` and `package-lock.json` and try again: `rm -rf node_modules package-lock.json && npm install`.
- Check you have a working internet connection and aren't behind a proxy blocking `registry.npmjs.org`.

**Dev server starts but the page is blank / shows an error overlay**
- Check the terminal for a compile error — it will point to the exact file and line.
- Hard-refresh the browser (`Ctrl+Shift+R` / `Cmd+Shift+R`) in case of a stale cache.

**Styles look broken / unstyled**
- Confirm `src/index.css` is still imported in `src/main.jsx` (`import "./index.css"`) — this is what pulls in Tailwind and the theme tokens.
- If you added new class names dynamically built as JS string concatenation (e.g. `` `text-${color}` ``), Tailwind's v4 scanner can't see them at build time and won't generate the CSS. Always use complete, literal class name strings (this project already follows that rule — see `src/lib/utils.js`'s `cx()` helper for how conditional classes are composed safely).

**Port already in use**
- Vite will automatically try the next available port and print it in the terminal — just use the URL it shows you. You can also force a specific port: `npm run dev -- --port 3000`.

**Build succeeds but deployed site 404s on refresh at a route**
- Not applicable to the current version of this app (it's a single page with no client-side router), but if you add one later, configure your host to redirect all paths to `index.html`.

**I changed a CSS variable and nothing changed**
- Make sure you edited it in the correct block: `:root` controls the light theme, `.dark` controls the dark theme. If you only see the change in one theme, you likely edited only one of the two blocks.
- Hard-refresh the browser; some hosts aggressively cache CSS.

---

## 8. How to customise colours

All colors live in `src/index.css`, defined once and reused everywhere:

1. Open `src/index.css`.
2. Find the `:root { ... }` block (light theme) near the top — each line like `--primary: #4f46e5;` is one token.
3. Find the matching `.dark { ... }` block just below it — this holds the dark-theme value for the same tokens.
4. Change a hex value, save, and the dev server updates instantly. For example, to change the primary accent color:

   ```css
   :root {
     --primary: #4f46e5;   /* change this hex value */
   }
   .dark {
     --primary: #818cf8;   /* and its dark-theme counterpart, if you want it to differ */
   }
   ```

5. You do **not** need to touch any component file (`.jsx`) — every component references these tokens through Tailwind utility classes (`bg-primary`, `text-x`, `border-border`, etc.), so a single edit here propagates everywhere that token is used.

Tokens available to customize: `background`, `foreground`, `card`, `border`, `input`, `primary`, `secondary`, `muted`, `accent`, `success`, `warning`, `error`, `board`, `board-line`, `x` (X symbol color), `o` (O symbol color), and `ring` (focus ring color). Each has a plain color and, where relevant, a `-soft` tinted-background variant (e.g. `x-soft`) used for badges and highlights.

---

## 9. How to customise themes

The app ships with three theme *preferences*: `light`, `dark`, and `system` (matches the OS setting). This is handled by `src/hooks/useTheme.js` and doesn't normally need editing.

If you want to:

- **Add a third fixed theme** (e.g. a "high contrast" mode) beyond light/dark: add a new class block in `src/index.css` (e.g. `.high-contrast { ... }` with all the same token names, different values), then extend the `THEME_ORDER` array and the class-application logic in `src/hooks/useTheme.js` to include it.
- **Change the default theme** for first-time visitors (before they've made a choice): change the fallback value in `readStoredPreference()` in `src/hooks/useTheme.js` (currently defaults to `"system"`).
- **Change fonts**: edit the `--font-display`, `--font-sans`, and `--font-mono` values inside the `@theme inline { ... }` block in `src/index.css`, and update the Google Fonts `@import` at the very top of the same file to match.

---

That's the whole setup. If something in this guide is out of date with the actual project, the source of truth is always `package.json` (scripts and dependencies) and `src/index.css` (theme tokens).
