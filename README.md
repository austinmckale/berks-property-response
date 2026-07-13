# Berks Property Response

Locally operated **property-response intake and coordination** for drain, plumbing, and water-damage problems in **Berks County, PA**.

A local Berks Property Response coordinator reviews calls, texts, emails, and form requests, then coordinates a warm handoff to an appropriate local provider. The selected provider supplies the estimate, sets pricing, schedules the work, contracts with the customer, and performs the job.

**Positioning:** One local contact for drain, plumbing, and water-damage problems.

## Provider routing (source of truth: `lib/`)

| Lane | Provider | Typical scope |
|------|----------|---------------|
| Drain / sewer | **Apex Drain Services** | Backups, main lines, hydro jetting, cameras, commercial drains |
| Plumbing | **Ridge Line Plumbing** (`evan` route id) | Fixture leaks, toilets, faucets, valves, water heaters, small residential plumbing |
| Build-back | **RHI Pros** | Drywall, flooring, ceilings, paint, demo after water events |
| Manual review | Internal | Ambiguous, storm/fire/mold, unsupported, or out-of-scope |

Do not change `verifiedClaims` in `lib/providers.ts` from `false` to `true` without documentation.

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Zod + React Hook Form
- Vitest
- Vercel-ready deployment

## Getting started

```bash
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_PHONE and LEAD_WEBHOOK_URL (or Discord / Resend admin email)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example` for the full list.

**Critical in production** (validated by `lib/env.ts` when `VERCEL_ENV=production` or `FORCE_PRODUCTION_ENV_CHECK=1`):

- `NEXT_PUBLIC_SITE_URL` — HTTPS custom domain (not localhost / `*.vercel.app`)
- `NEXT_PUBLIC_PHONE` — must be set explicitly in Vercel (confirmed BPR number: `(484) 509-0748`)
- `NEXT_PUBLIC_TEXT_NUMBER` — only when the SMS line differs from the call number
- At least one durable lead destination: `LEAD_WEBHOOK_URL` or full Resend admin email trio (`RESEND_API_KEY` + `LEAD_EMAIL_FROM` + `LEAD_NOTIFICATION_EMAIL`). Discord alone is not enough.

**Optional:** GA4, Discord (secondary alerts), customer email, Turnstile, Upstash rate limiting, `NEXT_PUBLIC_CONTACT_EMAIL`.

## Google Sheets setup

1. Create a Google Sheet (e.g. “BPR Leads”).
2. Extensions → Apps Script → paste `scripts/google-apps-script/LeadWebhook.gs` → Save.
3. Deploy → New deployment → Web app → Execute as Me → Anyone → Deploy.
4. Copy the `/exec` URL into `LEAD_WEBHOOK_URL` (Vercel + `.env.local`).
5. Keep the existing header contract — do not reorder columns without a migration plan.
6. Operational status fields (contact attempted, handoff completed, etc.) can be tracked manually; see `docs/launch-checklist.md`.

## Discord setup

Server Settings → Integrations → Webhooks → New Webhook → paste URL into `DISCORD_WEBHOOK_URL`.

## Resend setup

1. Verify a sending domain in Resend.
2. Set `RESEND_API_KEY`, `LEAD_EMAIL_FROM`, `LEAD_NOTIFICATION_EMAIL`.
3. Customer confirmation sends only when the visitor provides an email and an ops destination already captured the lead.

## GA4 setup

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Events include `click_call`, `click_text`, `click_request_help`, `select_problem_category`, `form_started`, `form_submitted`, `form_error`, `generate_lead`. Do not send names, phones, emails, addresses, descriptions, or lead IDs.

## Spam protection

Always on: honeypot (`bprHpField`), form-start timestamp (~800ms minimum), implausible-speed rejection, field length limits, Zod validation.

Optional: Upstash Redis REST rate limiting; Cloudflare Turnstile. Form continues to work when optional services are unset.

## Custom domain

1. Attach the domain in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL=https://your-domain`.
3. Confirm `/sitemap.xml`, `/robots.txt`, and canonical tags.
4. Submit the sitemap in Google Search Console.

## Soft-launch testing

Follow `docs/launch-checklist.md`. Minimum: phone, SMS, Sheets, form on mobile + desktop, drain/plumbing/repair/manual-review routes, and provider handoff.

## Warm-handoff workflow

1. Customer contacts BPR (call / text / form).
2. Coordinator reviews details and selects a lane.
3. Coordinator shares details with the provider (warm handoff).
4. Provider contacts the customer about availability, pricing, and next steps.
5. Update sheet status fields manually.

## Legal / insurance reminder

Complete attorney and insurance review before paid advertising. Policies are written to match the operating model; they are not a substitute for professional legal advice.

## Scripts

```bash
npm test
npm run lint
npm run check:content
npm run build
npm run check:all
```

## Project structure

```
app/                    # Pages and API routes
components/             # UI
lib/                    # Routing, SEO, lead capture, env validation
scripts/                # Content QA + Apps Script
docs/                   # Launch checklist and SEO notes
```
