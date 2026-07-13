# Berks Property Response — Soft Launch Checklist

Use this checklist before a public soft launch. Check items only after they are tested.

> Internal note: complete a final attorney and insurance review before paid advertising. Do not display “not legally reviewed” on customer-facing pages.

## Infrastructure

- [ ] Custom domain connected (`berkspropertyresponse.com` or chosen domain)
- [ ] HTTPS working
- [ ] `NEXT_PUBLIC_SITE_URL` set to the custom HTTPS domain (not `*.vercel.app`)
- [ ] Canonical domain confirmed in sitemap / page source
- [ ] BPR phone tested (`NEXT_PUBLIC_PHONE` set explicitly in Vercel — confirmed `(484) 509-0748`)
- [ ] BPR SMS / text-photos tested (same as phone, or `NEXT_PUBLIC_TEXT_NUMBER` when different)
- [ ] Voicemail tested
- [ ] Missed-call behavior tested
- [ ] Business email tested (if used)

## Lead delivery

- [ ] Google Sheets submission tested (`LEAD_WEBHOOK_URL`)
- [ ] Discord notification tested (optional secondary alert — not a durable ledger alone)
- [ ] Admin email tested (durable fallback when Sheets is unavailable; requires full Resend admin config)
- [ ] Customer confirmation email tested when email is provided
- [ ] Lead ID consistent across destinations
- [ ] Mobile submission tested
- [ ] Failure behavior tested (503 / call fallback when durable destinations fail)
- [ ] Spam rejection tested (honeypot / too-fast)

## Provider operations

- [ ] Apex scope confirmed
- [ ] Ridge Line Plumbing scope confirmed
- [ ] RHI Pros scope confirmed
- [ ] Provider service areas confirmed
- [ ] Provider contact details confirmed
- [ ] Permission to use provider names and logos confirmed
- [ ] Written provider agreements completed
- [ ] Registration and insurance documents collected where applicable
- [ ] Warm handoff tested
- [ ] Provider-decline and rerouting procedure tested

## Analytics and SEO

- [ ] GA4 connected (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- [ ] Phone clicks tracked
- [ ] Text clicks tracked
- [ ] Form conversions tracked
- [ ] No PII sent to analytics (spot-check GA4 DebugView)
- [ ] Search Console connected
- [ ] Sitemap submitted (`/sitemap.xml`)
- [ ] Social preview tested (`/opengraph-image`)
- [ ] UTM attribution tested

## Legal and trust

- [ ] Privacy Policy reviewed
- [ ] Terms reviewed
- [ ] Disclosure reviewed
- [ ] Form consent reviewed
- [ ] Referral-compensation disclosure present (footer / disclosure)
- [ ] Unsupported claims removed
- [ ] Final Pennsylvania business and legal review completed before paid advertising

## Soft launch

- [ ] iPhone call test
- [ ] Android call test
- [ ] Mobile-data form test
- [ ] Desktop form test
- [ ] Drain / sewer route test
- [ ] Plumbing route test
- [ ] Repair / water-damage route test
- [ ] Manual-review route test
- [ ] Provider acceptance test
- [ ] Provider rejection / reroute test
- [ ] Customer follow-up test
- [ ] First ten leads manually reviewed for bottlenecks

## Operational sheet fields (manual)

The Apps Script webhook preserves the existing header contract. Track these ops columns in the sheet (or a second tab) manually as needed:

- Contact attempted
- Customer reached
- Provider contacted
- Provider accepted
- Warm handoff completed
- Appointment booked
- Job won / Job lost / Lost reason
- Follow-up date
- Referral fee status
