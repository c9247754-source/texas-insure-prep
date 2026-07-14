# Texas Insure Prep

Free Texas Life, Accident & Health insurance license practice site — SEO content → affiliate monetization (Aceable / similar).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Static original question bank in `src/data/`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Monetization

Three stacked revenue paths:

1. **Free → $12.99 unlock** — full question bank + longer mocks (`/pricing`)
2. **$9.99 Texas Law PDF** — printable cheat sheet (`/guide/texas-law`)
3. **Affiliate course CTA** — Aceable / similar link in `src/data/catalog.ts`

### Stripe setup

```bash
cp .env.example .env.local
# add STRIPE_SECRET_KEY=sk_test_...
# add NEXT_PUBLIC_APP_URL=http://127.0.0.1:3000
```

Until Stripe is configured, the Buy buttons open **/unlock/demo** and grant a local access cookie so you can test the funnel end-to-end.

### Access cookie

Paid (or demo) unlocks set httpOnly cookie `tip_access` with `{ premium, pdf }`.


## Expand content

- Add questions in `src/data/questions/tx-life-health.ts`
- Or copy the pattern for `tx-property-casualty` and register in `src/data/catalog.ts`

## Disclaimer

Educational use only. Not affiliated with TDI or Pearson VUE.
