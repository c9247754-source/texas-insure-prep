# Texas Insure Prep

Free Texas Life, Accident & Health insurance license practice site — SEO content → Creem checkout + Aceable affiliate.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Static original question bank in `src/data/`
- Creem (Merchant of Record) for paid unlocks

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Monetization

1. **Free → $12.99 unlock** — full question bank + longer mocks (`/pricing`)
2. **$9.99 Texas Law PDF** — printable cheat sheet (`/guide/texas-law`)
3. **Affiliate course CTA** — Aceable / similar link in `src/data/catalog.ts`

### Creem setup

1. Sign up at [creem.io](https://www.creem.io/)
2. Create two **one-time** products:
   - Full Question Bank Unlock — $12.99
   - Texas Law Cheat Sheet PDF — $9.99
3. Copy each product ID (`prod_...`)
4. Developers → copy API key (`creem_test_...` for sandbox)
5. Set env (local `.env.local` + Vercel Project Settings):

```bash
NEXT_PUBLIC_APP_URL=https://texas-insure-prep.vercel.app
CREEM_API_KEY=creem_test_...
CREEM_PRODUCT_UNLOCK=prod_...
CREEM_PRODUCT_PDF=prod_...
```

Until Creem is configured, Buy buttons open **/unlock/demo** and grant a local access cookie.

### Access cookie

Paid (or demo) unlocks set httpOnly cookie `tip_access` with `{ premium, pdf }`.

## Deploy

Connected to GitHub → Vercel: https://texas-insure-prep.vercel.app

## Expand content

- Add questions in `src/data/questions/tx-life-health.ts`
- Or copy the pattern for `tx-property-casualty` and register in `src/data/catalog.ts`

## Disclaimer

Educational use only. Not affiliated with TDI or Pearson VUE.
