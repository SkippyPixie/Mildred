import { afterEach, describe, expect, it } from "bun:test";
import { onRequestPost } from "../functions/api/ask";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function createRequest(body: unknown) {
  return new Request("https://example.com/api/ask", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  });
}

describe("ask API", () => {
  it("requires a prompt", async () => {
    const request = createRequest({});
    const resp = await onRequestPost({ request, env: { OPENAI_API_KEY: "key" }, params: {}, data: {} } as any);
    expect(resp.status).toBe(400);
  });

  it("requires an API key", async () => {
    const request = createRequest({ prompt: "Hello" });
    const resp = await onRequestPost({ request, env: {}, params: {}, data: {} } as any);
    expect(resp.status).toBe(500);
    expect(await resp.text()).toContain("Missing API key");
  });

  it("returns the model response text", async () => {
    const request = createRequest({ prompt: "Hello" });
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ choices: [{ message: { content: "Hi there" } }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });

    const resp = await onRequestPost({ request, env: { OPENAI_API_KEY: "key" }, params: {}, data: {} } as any);
    expect(resp.status).toBe(200);
    expect(await resp.text()).toBe("Hi there");
  });

  it("bubbles up OpenAI errors with status 502", async () => {
    const request = createRequest({ prompt: "Hello" });
    globalThis.fetch = async () => new Response("No quota", { status: 429 });

    const resp = await onRequestPost({ request, env: { OPENAI_API_KEY: "key" }, params: {}, data: {} } as any);
    expect(resp.status).toBe(502);
    expect(await resp.text()).toContain("OpenAI error");
  });
});
