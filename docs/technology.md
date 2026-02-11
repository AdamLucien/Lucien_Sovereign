# Technology Documentation (Lucien Sovereign)

Purpose: This document describes the technical architecture in enough detail for any AI or engineer to extend the project safely.

## Project Type

- Single-page marketing site / brand experience
- Frontend only (no backend server)
- Runs entirely in the browser

## Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Lucide React icons
- ESLint 9

## Repository Layout

```
akl-sovereignty/
  docs/
    visuals.md
    technology.md
  public/
    image1.svg
    vite.svg
  src/
    App.jsx
    App.css
    App.css
    index.css
    main.jsx
    assets/
      react.svg
  index.html
  package.json
  tailwind.config.js
  vite.config.js
```

Notes:
- `src/App.jsx` contains almost all UI, logic, and content.
- `src/App.css` is unused (default Vite template). It is not imported anywhere.
- Styling is handled via Tailwind utilities + `src/index.css`.

## Build / Run

Commands:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Build output goes to `dist/` (ignored by git).

## Styling Pipeline

- Tailwind is imported in `src/index.css`:
  - `@import "tailwindcss";`
- Tailwind config: `tailwind.config.js`
  - Content scanning includes `index.html` and `src/**/*.{js,ts,jsx,tsx}`.
  - Custom `spin-slow` animation exists but is not used.
- Global CSS (`src/index.css`) sets body background, custom scrollbar, and selection colors.

## Application Structure

Entry:
- `src/main.jsx` mounts React into `#root` and imports `src/index.css`.

Main app:
- `src/App.jsx` is a single large component with:
  - Global content map (multi-language strings)
  - UI sections rendered in sequence
  - Simple state machine for modals and forms

## Content System

- All visible text lives in `CONTENT_MAP` inside `src/App.jsx`.
- Languages: EN, CS, DE, UK, ZH.
- Selected language is stored in state (`lang`), set by the navbar buttons.
- `t` is the resolved content object for the current language.

To add a language:
1) Add a new key in `CONTENT_MAP`.
2) Add the language code to the navbar array: `['en', 'cs', 'de', 'uk', 'zh']`.
3) Provide full translation coverage for all keys.

## State and UI Logic

State is managed with `useState` in `App.jsx`:
- `isModalOpen`, `isContactModalOpen` for dialogs
- `selectedTier` for pricing selection
- `email`, `loading`, `submissionStatus`, `contactStatus`
- `slotsLeft` (simulated countdown)
- `mousePos` for background glow
- `lang` for language
- `logoError` for image fallback
- `auditInput`, `aiAnalysis`, `isAnalyzing` for AI audit panel

Lifecycle and effects:
- A `setInterval` reduces `slotsLeft` every 45s (min 1).
- A mousemove listener updates `mousePos` (throttled via `requestAnimationFrame`).

## AI Diagnostic Panel

- The AI audit feature calls Google Gemini via REST.
- It requires `VITE_GEMINI_API_KEY` in `.env`.
- Endpoint used in `App.jsx`:
  - `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=...`
- If the key is missing, it displays an error in the UI.

Request format:
- `POST` JSON body: `{ contents: [{ parts: [{ text: prompt }] }] }`
- The prompt is crafted to return a 3-part diagnosis in the same language as the user input.

Important:
- This is client-side and exposes the API key to the browser. If security is required, move this to a backend.

## Forms and Modals

- "Purchase" and "Contact" flows are simulated with `setTimeout`.
- No data is persisted or sent to a backend.
- Loading and success states are purely client UI states.

## External Links

- LinkedIn link is hardcoded in the contact CTA.

## Assets

- Primary logo: `public/image1.svg`.
- Favicon: `public/vite.svg` (default Vite icon).
- There is a reference to `1.png` in the navbar; the file does not exist. Use `image1.svg` for actual branding.

## Environment Variables

- `.env` should contain:
  - `VITE_GEMINI_API_KEY=...`
- `.env` is ignored in `.gitignore`.

## Deployment

- This is a static frontend build.
- Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Quality Notes / Known Gaps

- No tests are present.
- `App.css` is unused.
- Custom `fadeIn` animation keyframes are referenced but not defined in CSS.
- All logic is in a single large component; refactoring into smaller components would improve maintainability.

