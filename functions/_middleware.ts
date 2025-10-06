export const onRequest: PagesFunction<{ BASIC_USER?: string; BASIC_PASS?: string }> = async (ctx) => {
  const user = ctx.env.BASIC_USER || "mildred";
  const pass = ctx.env.BASIC_PASS || "knit";
  const header = ctx.request.headers.get("Authorization") || "";
  const ok = header.startsWith("Basic ") && (() => {
    const [u, p] = atob(header.slice(6)).split(":");
    return u === user && p === pass;
  })();
  if (!ok) {
    return new Response("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Mildred"' }
    });
  }
  return ctx.next();
};
