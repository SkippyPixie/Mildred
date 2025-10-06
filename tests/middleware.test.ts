import { describe, expect, it } from "bun:test";
import { onRequest } from "../functions/_middleware";

function createContext(header?: string, env?: Record<string, string>) {
  const request = new Request("https://example.com", {
    headers: header ? { Authorization: header } : undefined
  });
  const nextResponse = new Response("ok");
  return {
    env: env ?? {},
    request,
    params: {},
    data: {},
    next: () => Promise.resolve(nextResponse)
  } as unknown as Parameters<typeof onRequest>[0];
}

describe("basic auth middleware", () => {
  it("allows matching credentials", async () => {
    const creds = btoa("user:pass");
    const ctx = createContext(`Basic ${creds}`, { BASIC_USER: "user", BASIC_PASS: "pass" });
    const resp = await onRequest(ctx);
    expect(resp.status).toBe(200);
    expect(await resp.text()).toBe("ok");
  });

  it("rejects invalid base64 input", async () => {
    const ctx = createContext("Basic not-base64");
    const resp = await onRequest(ctx);
    expect(resp.status).toBe(401);
    expect(resp.headers.get("WWW-Authenticate")).toContain("Basic realm=\"Mildred\"");
  });

  it("rejects wrong password", async () => {
    const ctx = createContext(`Basic ${btoa("user:bad")}`, { BASIC_USER: "user", BASIC_PASS: "pass" });
    const resp = await onRequest(ctx);
    expect(resp.status).toBe(401);
  });
});
