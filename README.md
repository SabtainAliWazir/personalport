# Sabtain Ali Portfolio

Run `npm install` and `npm run dev` to work locally. Use `npm run build` and `npm run preview` to inspect the generated pages. Vercel serves the `dist` output, the redirects in `vercel.json`, and the `/api/contact` function. Vite preview serves static pages only.

## Publishing and search

The production build generates HTML for each public route, a sitemap, robots.txt, and the custom 404. The checked-in articles in `src/lib/supabase.js` are the default publishing source. Edit them and push to the Vercel production branch to publish.

To publish from Supabase, run `npm run --silent blog:seed-sql` and execute its output in the Supabase SQL editor after creating the `posts` table. This inserts missing articles and preserves existing edits and publication flags. Review existing rows before switching. Then set `VITE_BLOG_SOURCE=supabase`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_ANON_KEY` in Vercel. In this mode only published database articles are deployed. Connect a Vercel Deploy Hook to a Supabase Database Webhook for inserts, updates, and deletes on `public.posts` so publishing and unpublishing trigger a rebuild. Keep the deploy hook URL private.

After deployment, submit `https://www.devcop.xyz/sitemap.xml` in Google Search Console and inspect the homepage, a project, a service, and a blog article.

## Contact and conversion tracking

Run `scripts/portfolio-operations.sql` in Supabase. Set these server-side variables in Vercel and redeploy to enable direct submissions and tracking.

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` from a sender domain verified in Resend
- `CONTACT_TO_EMAIL` for the inbox receiving inquiries
- `SUPABASE_URL` for the database project. The function also accepts the existing `VITE_SUPABASE_URL`.
- `SUPABASE_SERVICE_ROLE_KEY` for the server-only legacy `service_role` key. Keep this out of any `VITE_` variable.
- `CONTACT_ALERT_WEBHOOK_URL` (optional) for an HTTPS webhook that accepts a JSON `text` field. Provider errors can trigger one alert per 30-minute window.

Contact requests are limited to five per IP per 10-minute window. An unavailable limiter leaves the email draft as the fallback. Conversion tracking records event type, a random ID, and UTC day. Contact form contents stay out of the event table. Inspect totals in the Supabase SQL editor.

```sql
select day, event, count(*) as total
from public.portfolio_events
group by day, event
order by day desc, event;
```

After deployment, send a labeled test inquiry and confirm it arrives in the destination inbox. The application records provider acceptance. Use the provider's delivery log to confirm delivery or investigate bounces.

The email draft and WhatsApp links are available on the contact page. To exercise the live endpoint locally, use `vercel dev` with the server-side variables configured.

## Verification

Run `npm run lint`, `npm run build`, and `npm test`. GitHub Actions runs the same checks for pushes and pull requests. Contact tests simulate both Resend and Supabase.
