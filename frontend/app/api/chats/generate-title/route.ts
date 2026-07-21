import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "Generate a short chat title (maximum 5 words). Respond with only the title and nothing else.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const title =
      completion.choices[0].message.content?.trim() || "New Chat";

    return NextResponse.json({
      title,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        title: "New Chat",
      },
      { status: 500 }
    );
  }
} 