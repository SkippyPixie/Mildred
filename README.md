# Mildred

A knitting chat demo with file attachments and keyboard-friendly controls.

## Local development

This project is a static page served from `public/index.html`. To preview locally, you can use any static file server, for example:

```bash
npx serve public
```

Then open the printed URL in your browser.

## Deployment auth

The production deployment is protected with HTTP Basic authentication using the Cloudflare Pages middleware in `functions/_middleware.ts`. Unless you override the credentials with environment variables, the defaults are:

- **Username:** `mildred`
- **Password:** `knit`

Set the `BASIC_USER` and `BASIC_PASS` environment variables in your hosting provider to change them, or remove the middleware if you do not need authentication.

## Troubleshooting

### "Merging is blocked" on your pull request

If GitHub shows that merging is blocked, check the branch protections on `main`:

- Resolve any failing status checks (for example, make sure the preview deployment succeeds).
- Merge or rebase the branch on the latest `main` so it is up to date.
- Request a fresh approval if reviews are required; approvals can be dismissed after new commits.

Once these conditions are satisfied the merge button becomes available again.
