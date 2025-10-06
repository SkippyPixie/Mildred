export const onRequest: PagesFunction<{ BASIC_USER?: string; BASIC_PASS?: string }> = async (ctx) => {
  const user = ctx.env.BASIC_USER || "mildred";
  const pass = ctx.env.BASIC_PASS || "knit";
  const header = ctx.request.headers.get("Authorization") || "";

  let ok = false;
  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const idx = decoded.indexOf(":");
      if (idx !== -1) {
        const u = decoded.slice(0, idx);
        const p = decoded.slice(idx + 1);
        ok = u === user && p === pass;
      }
    } catch {
      ok = false;
    }
  }
  if (!ok) {
    return new Response("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Mildred"' }
    });
  }
  return ctx.next();
};
