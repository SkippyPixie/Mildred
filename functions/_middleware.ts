const REALM_HEADER = { "WWW-Authenticate": 'Basic realm="Mildred"' } as const;

function unauthorized(): Response {
  return new Response("Auth required", {
    status: 401,
    headers: REALM_HEADER
  });
}

function decodeCredentials(header: string): { user: string; pass: string } | null {
  if (!header.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6));
    const sep = decoded.indexOf(":");
    if (sep === -1) return null;
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);
    return { user, pass };
  } catch {
    return null;
  }
}

export const onRequest: PagesFunction<{ BASIC_USER?: string; BASIC_PASS?: string }> = async (ctx) => {
  const expectedUser = ctx.env.BASIC_USER || "mildred";
  const expectedPass = ctx.env.BASIC_PASS || "knit";
  const header = ctx.request.headers.get("Authorization") || "";

  const creds = decodeCredentials(header);
  if (!creds || creds.user !== expectedUser || creds.pass !== expectedPass) {
    return unauthorized();
  }

  return ctx.next();
};
