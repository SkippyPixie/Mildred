# Mildred

A knitting chat demo with file attachments and keyboard-friendly controls.

## Local development

This project is a static page served from `public/index.html`. To preview locally, you can use any static file server, for example:

```bash
npx serve public
```

Then open the printed URL in your browser.

## Deployment auth

The production deployment can be protected with HTTP Basic authentication using the Cloudflare Pages middleware in `functions/_middleware.ts`. Set the `BASIC_USER` and `BASIC_PASS` environment variables in your hosting provider to enable authentication, or remove the middleware if you do not need it.
