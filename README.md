# Berks Property Response

Independent local referral and intake website for plumbing, drains, water damage, and property repairs in **Berks County, PA**.

Berks Property Response is **not** a fake contractor company and **not** the direct service provider. It helps homeowners, landlords, property managers, and small businesses describe what happened and routes requests to approved local partners.

## Provider routing summary

| Provider | Routes to | Status |
|----------|-----------|--------|
| **Apex Drain Services** | Emergency drains, sewer backups, hydro jetting, camera inspection, commercial drains | Confirmed |
| **Evan Simons** | Small plumbing repairs (leaks, faucets, toilets, valves) | **CONFIRMATION REQUIRED** — partial |
| **RHI Pros** | Water damage repair, drywall, flooring, build-back after plumbing events | Confirmed for build-back lane |
| **Manual review** | Unclear requests, unconfirmed Evan scope, broad remodeling | Always available |

Broader remodeling and general contractor work should hand off to [RHIpros.com](https://rhipros.com).

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Zod + React Hook Form
- Vitest for routing tests
- Vercel-ready deployment

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                    # Pages and API routes
components/             # Reusable UI (LeadForm, Header, Footer, etc.)
lib/                    # Data models, routing, SEO, schema, mappers
scripts/                # Content QA checks
public/images/          # Placeholder service images (SVG)
```

## Phase 1 pages (MVP)

- Home, How It Works, Request Help, Disclosure, Privacy, Terms
- Emergency Sewer Backup, Hydro Jetting, Drain Cleaning, Main Sewer Line Clog
- Sewer Camera Inspection, Commercial Drain Cleaning
- Small Plumbing Repairs (draft/noindex — Evan scope pending)
- Water Damage Repair After Leak, Property Repairs hub
- Service Areas hub + Reading, Birdsboro, Wyomissing, Exeter, Sinking Spring, Douglassville

## How to add a service

1. Add an entry to `lib/services.ts` with slug, copy, provider, `draftStatus`, `needsConfirmation`, and `noindex`.
2. Create `app/{slug}/page.tsx` using `ServicePageTemplate`.
3. Add the slug to `app/sitemap.ts` (automatic if published and not noindex).
4. Run `npm run check:content`.

## How to add a city

1. Add a unique entry to `lib/cities.ts` — unique intro, local context, FAQs, and service links.
2. Create `app/service-areas/{slug}/page.tsx` using `CityPageTemplate`.
3. Run `npm run check:city-pages`.

City pages must **not** duplicate hero copy or reuse body content from other cities.

## How to verify provider claims

1. Update `verifiedClaims` in `lib/providers.ts` only after explicit verification.
2. Set `evanConfirmedServices` in `lib/services.ts` to `true` per service when Evan confirms scope.
3. Run `npm run check:content-claims` — flags words like licensed, insured, 24/7, guaranteed, best, etc. unless verified.

## Lead routing

`POST /api/route-lead` — returns routing decision only.

`POST /api/submit-lead` — validates form, routes lead, maps to webhook/Google Sheets format.

Run routing tests:

```bash
npm test
```

## Call tracking configuration

Set in `.env.local`:

```env
NEXT_PUBLIC_PHONE=(484) 525-0459
NEXT_PUBLIC_TEXT_NUMBER=(484) 525-0459
```

Replace placeholder numbers before launch. Integrate CallRail or WhatConverts by forwarding tracked numbers or using their JavaScript swap.

## Webhook / Google Sheets

Set `LEAD_WEBHOOK_URL` in `.env.local` to POST lead payloads from `lib/webhookMapper.ts`.

Google Sheets column mapping is in `lib/googleSheetsMapper.ts` (`GOOGLE_SHEET_COLUMNS`).

Connect via Zapier, Make, or Google Apps Script webhook receiver.

## Content QA scripts

```bash
npm run check:city-pages      # Unique city content, word count, FAQs
npm run check:content-claims  # Unverified marketing claims
npm run check:action-items      # ACTION ITEM tags on published pages
npm run check:seo               # Metadata on all pages
npm run check:content           # Run all checks
```

## Deploy to Vercel

1. Push to GitHub.
2. Import project in Vercel.
3. Set environment variables from `.env.example`.
4. Deploy — `next build` runs automatically.

```bash
npx vercel
```

## Launch checklist

- [ ] Confirm domain
- [ ] Confirm Apex service scope
- [ ] Confirm Evan service scope (update `evanConfirmedServices`, remove noindex from Evan pages)
- [ ] Confirm RHI service scope
- [ ] Confirm payout agreement
- [ ] Add real provider phone routing (replace placeholder numbers)
- [ ] Add CallRail or WhatConverts
- [ ] Test all forms
- [ ] Test hidden tracking fields (UTM, gclid, referrer, landing page)
- [ ] Test mobile sticky CTA
- [ ] Test sitemap.xml and robots.txt
- [ ] Test structured data (Organization, WebPage, BreadcrumbList, Service, FAQPage)
- [ ] Test noindex on unconfirmed Evan pages
- [ ] Run `npm run check:content`
- [ ] Submit to Google Search Console (see [docs/seo-launch.md](docs/seo-launch.md))
- [ ] Add GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID` — see [docs/seo-launch.md](docs/seo-launch.md))
- [ ] Privacy, disclosure, and terms pages live
- [ ] **Do not** create a Google Business Profile for Berks Property Response unless it becomes a real direct-service business

## Referral disclosure

> Berks Property Response is an independent local intake and matching service for plumbing, drain, water damage, and property repair issues in Berks County. We help you describe the problem and connect with independent local providers suited to the request. Providers perform the work, set pricing, and are responsible for scheduling, licensing, insurance, workmanship, and service outcomes. Some participating providers may pay Berks Property Response for intake, marketing, or administrative services.

## License

Private — All rights reserved.
