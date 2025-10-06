# Mildred

A knitting chat demo with file attachments and keyboard-friendly controls.

## Local development

This project is a static page served from `public/index.html`. To preview locally, you can use any static file server, for example:

```bash
npx serve public
```

Then open the printed URL in your browser.

### Running tests

The project uses the [Bun](https://bun.sh) runtime for its lightweight test runner. Once Bun is installed locally, install dependencies from the project root and run the suite with:

```bash
bun test
```

Running `bun install` ensures the lockfile dependencies are synced before `bun test` executes; reinstall only when the dependency manifest changes.

## Deployment auth

The production deployment is protected with HTTP Basic authentication using the Cloudflare Pages middleware in `functions/_middleware.ts`. Unless you override the credentials with environment variables, the defaults are:

- **Username:** `mildred`
- **Password:** `knit`

Set the `BASIC_USER` and `BASIC_PASS` environment variables in your hosting provider to change them, or remove the middleware if you do not need authentication.

On Cloudflare Pages you can provide those values from **Settings → Environment variables**. Add the same pair under both the _Production_ and _Preview_ sections if you want every deployment to use your custom credentials. The middleware always checks the runtime environment first, so whatever you configure there takes precedence over the defaults documented above.

> ℹ️ If you copy credentials from a password manager, Cloudflare's UI can pick up an extra newline at the end of the value. The middleware strips trailing newlines before comparing so you do not get locked out by a pasted secret that looks correct.

