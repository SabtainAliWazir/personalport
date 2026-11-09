# Sabtain Ali Portfolio

Run `npm install` and `npm run dev` to work locally. Use `npm run build` and `npm run preview` to inspect the generated pages. Vercel serves the `dist` output, the redirects in `vercel.json`, and the `/api/contact` function. Vite preview serves static pages only.

## Publishing and search

The production build generates HTML for each public route, a sitemap, robots.txt, and the custom 404. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel to include published database posts. Checked-in articles are also public. When a database post and a checked-in article share a slug, the build retains the longer article body to preserve the existing publishing behavior. Trigger a fresh deployment when posts change.

After deployment, submit `https://www.devcop.xyz/sitemap.xml` in Google Search Console and inspect the homepage, a project, a service, and a blog article.

## Contact form

Set these server-side variables in Vercel and redeploy to enable direct submissions.

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` from a sender domain verified in Resend
- `CONTACT_TO_EMAIL` for the inbox receiving inquiries

The email draft and WhatsApp links are available on the contact page. To exercise the live endpoint locally, use `vercel dev` with the server-side variables configured.
