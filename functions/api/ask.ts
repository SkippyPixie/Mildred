import OpenAI from "openai";
export const onRequestPost: PagesFunction<{ OPENAI_API_KEY: string }> = async ({ request, env }) => {
  const { prompt } = await request.json().catch(() => ({}));
  if (!prompt || typeof prompt !== "string") return new Response("Bad request", { status: 400 });
  const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  const chat = await openai.chat.completions.create({
    model: "gpt-5-thinking",
    messages: [
      { role: "system", content: "You are Mildred, a warm, practical knitting expert. Use cm and inches; explain concisely." },
      { role: "user", content: prompt }
    ],
    temperature: 0.4
  });
  const text = chat.choices?.[0]?.message?.content ?? "No answer.";
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
