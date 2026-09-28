# Suraksha web

Next.js (App Router) + TypeScript + Tailwind. No other runtime dependencies.

## Run
    npm install
    cp .env.example .env.local   # set BACKEND_URL to your FastAPI server
    npm run dev

The browser calls `POST /api/test` on this site; `next.config.mjs` forwards it to `BACKEND_URL`.
Preview the results UI without a backend: `/results?demo=1`.

## API contract
Defined once in `lib/api.ts` (`TestRequest`, `TestResponse`). Reuse the same JSON shapes in Flutter.

## Deploy
Set `BACKEND_URL` in your host (e.g. Vercel) to the public FastAPI URL, then `npm run build`.
