# Mildred

A knitting chat demo with file attachments and keyboard-friendly controls.

## Local development

This project is a static page served from `public/index.html`. To preview locally, you can use any static file server, for example:

```bash
npx serve public
```

Then open the printed URL in your browser.

### Running tests

The project uses the [Bun](https://bun.sh) runtime for its lightweight test runner. Once Bun is installed locally, run:

```bash
bun test
```

## Deployment auth

The production deployment is protected with HTTP Basic authentication using the Cloudflare Pages middleware in `functions/_middleware.ts`. Unless you override the credentials with environment variables, the defaults are:

- **Username:** `mildred`
- **Password:** `knit`

Set the `BASIC_USER` and `BASIC_PASS` environment variables in your hosting provider to change them, or remove the middleware if you do not need authentication.
