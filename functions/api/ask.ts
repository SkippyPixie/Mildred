// functions/api/ask.ts — no SDK version
export const onRequestPost: PagesFunction<{ OPENAI_API_KEY: string }> = async ({ request, env }) => {
  try {
    const { prompt } = await request.json().catch(() => ({}));
    if (!prompt || typeof prompt !== "string") {
      return new Response("Bad request", { status: 400 });
    }

    const sys = "You are Mildred, a warm, practical knitting expert. Use cm and inches; be concise; include gauge math when useful.";

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          { role: "system", content: sys },
          { role: "user", content: prompt }
        ]
      })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return new Response("OpenAI error: " + errText, { status: 502 });
    }

    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content ?? "No answer.";
    return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (e: any) {
    return new Response("Server error: " + (e?.message || "unknown"), { status: 500 });
  }
};
