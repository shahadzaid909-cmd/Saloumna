# Saloumna | سلومنا 🇸🇦

An interactive Saudi-themed educational game built with **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Zustand**.

## Features
- Interactive map of Saudi regions
- Region-based mini-games and challenges
- In-game coins, unlockable regions, and shop
- Progress saved locally with Zustand

## Run locally

```bash
npm install
npm run dev
```

Then visit http://localhost:3000.

## Project structure
- `app/` — pages and routing
- `components/` — mini-games, map, and UI
- `data/` — region and shop content
- `store/` — saved game progress
- `utils/` — helpers and sound
- `public/assets/saloum/` — character images

## Asset status
All four Saloum character PNG assets are uploaded in `public/assets/saloum/`.

Do not commit `node_modules`, `.next`, secrets, or `.env` files.
