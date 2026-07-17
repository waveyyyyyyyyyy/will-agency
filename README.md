# Will Agency — Website

Sito multi-pagina di Will Agency: social media, content e video per attività locali.

Stack: React 19 + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + React Router + Lenis (smooth scroll).

## Sviluppo

```bash
npm install
npm run dev
```

## Build di produzione

```bash
npm run build
npm run preview
```

## Pagine

- `/` — Home
- `/servizi` — Servizi
- `/risultati` — Case study e risultati reali dei clienti
- `/chi-siamo` — Chi siamo
- `/contatti` — Contatti

## Deploy

Il sito è una SPA con routing client-side. Sono inclusi i file di rewrite per:

- **Netlify**: `public/_redirects`
- **Vercel**: `vercel.json`

I contenuti dei clienti (servizi, case study, numeri) vivono in `src/data/content.ts`.
