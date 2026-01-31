<p align="center">
  <img src="public/image1.svg" alt="Lucien Sovereign logo" width="140" />
</p>

<h1 align="center">Lucien Sovereign</h1>

<p align="center">
  A cinematic, multi-language landing page for a high-end consulting/sovereignty brand.
  Built as a single-page React experience with Tailwind styling and a lightweight AI diagnostic widget.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=06121a" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/License-Proprietary-black" alt="License" />
</p>

---

## What this is

Lucien Sovereign is a branded, high-contrast, single-page web experience with multi-language content and a guided, narrative user flow. It is optimized for bold typography, cinematic motion, and conversion into a direct contact channel.

## Features

- Multi-language UI (EN, CS, DE, UK, ZH)
- Hero, audit, identity, capabilities, protocol, pricing, and contact flows
- AI diagnostic panel (optional, via API key)
- Tailwind-driven visual system and custom effects
- Static deployment ready (no backend required)

## Tech stack

- React 19 + Vite 7
- Tailwind CSS 4
- Lucide React icons
- ESLint

## Quick start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Environment variables

Create a local `.env` file if you want the AI diagnostic panel to function:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

Without it, the UI will still render, but the AI analysis response will show an error state.

## Project structure

```
akl-sovereignty/
  public/
    image1.svg
  src/
    App.jsx
    App.css
    main.jsx
    index.css
```

## Content and localization

All copy is defined in `src/App.jsx` under `CONTENT_MAP`. This is the single source of truth for all supported languages.

## Deployment

The build output is generated in `dist/`. Deploy it to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

## Notes

- No backend required.
- Keep `.env` out of version control (already ignored in `.gitignore`).

