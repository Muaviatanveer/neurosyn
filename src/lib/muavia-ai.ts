import { createServerFn } from "@tanstack/react-start";
import { MUAVIA_KNOWLEDGE } from "./muavia-knowledge";

export const askMuavia = createServerFn({ method: "POST" })
  .validator((data: { question: string }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { answer: "The assistant isn't configured yet. Please email muaviatanveer27@gmail.com." };
    }
    const question = (data.question || "").slice(0, 500);
    if (!question.trim()) return { answer: "Ask me anything about Muavia or NeuroSyn." };

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: MUAVIA_KNOWLEDGE },
            { role: "user", content: question },
          ],
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Muavia AI error", res.status, text);
        return { answer: "I'm briefly unavailable. Try again or email muaviatanveer27@gmail.com." };
      }
      const json = await res.json();
      const answer = json?.choices?.[0]?.message?.content ?? "No response.";
      return { answer };
    } catch (e) {
      console.error(e);
      return { answer: "Something went wrong. Please try again." };
    }
  });
