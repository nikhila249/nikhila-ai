import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message, response } = await req.json(); 

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
         content:
  "You create chat titles. Respond with ONLY a title of 2 to 5 words. Do not write explanations, summaries, punctuation, quotes, or complete sentences.",

        },
       {
  role: "user",
  content: `User Message:
${message}

Assistant Response:
${response}

Generate a short title (2–5 words) for this conversation. Return ONLY the title.`,
}, 
      ],
    });

   const rawTitle =
  completion.choices[0]?.message?.content?.trim() || "New Chat";

const title = rawTitle
  .replace(/^["']|["']$/g, "")
  .split("\n")[0]
  .slice(0, 50); 
    return NextResponse.json({ title });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate title" },
      { status: 500 }
    );
  }
} 