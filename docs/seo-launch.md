# SEO and analytics launch checklist

Use this after deploying to production at `https://berkspropertyresponse.com`.

## Google Search Console

1. Sign in at [Google Search Console](https://search.google.com/search-console).
2. Add property type **Domain** for `berkspropertyresponse.com` (or URL prefix if you prefer).
3. Verify ownership via DNS TXT record (recommended on Vercel/registrar) or HTML file upload.
4. Submit sitemap: `https://berkspropertyresponse.com/sitemap.xml`
5. After 48–72 hours, review **Pages** and **Indexing** for crawl errors.
6. Monitor **Performance** weekly for impressions, clicks, and top queries.

## Rich Results validation

Test these URLs in [Google Rich Results Test](https://search.google.com/test/rich-results):

- Home: `/`
- Service page: `/emergency-sewer-backup-berks-county-pa`
- City page: `/service-areas/reading-pa`

Confirm Organization, WebPage, WebSite (home), BreadcrumbList, Service, and FAQPage where applicable. Do **not** add LocalBusiness schema for Berks Property Response (referral site).

## GA4 setup

1. Create a GA4 property for Berks Property Response.
2. Copy the Measurement ID (format `G-XXXXXXXXXX`).
3. Set in Vercel/production env:

   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

4. Redeploy. Verify Realtime reports show page views.
5. Test conversion events by clicking **Call**, **Text**, **Request Help**, and submitting the lead form.

### Tracked events

| Event | Trigger |
|-------|---------|
| `phone_click` | Call Now / tel links |
| `text_click` | Send Photos / SMS links |
| `click_request_help` | Request Help links |
| `generate_lead` | Successful lead form submission |

UTM and `gclid` parameters are captured in lead payloads and available for attribution in your CRM/webhook.

## Post-launch monitoring (4–8 weeks)

- Search Console: indexing coverage, new query impressions, click-through rate on service pages.
- GA4: `generate_lead` volume by landing page and source/medium.
- Confirm call CTAs use the live Google Voice number before relying on `phone_click` conversion data (measures button clicks, not completed calls).
- Do **not** create a Google Business Profile for Berks Property Response unless it becomes a direct-service business.

## Optional later

- IndexNow for Bing/Yandex on publish
- Core Web Vitals audit via PageSpeed Insights
- City × service landing pages only with unique local copy per page
