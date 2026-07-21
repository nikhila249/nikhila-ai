import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function GET() {
  return NextResponse.json({
    message: "Streaming API is ready 🚀",
  });
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      stream: true,
      messages: [
        {
          role: "system",
          content: "You are Nikhila AI.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    let reply = "";

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      reply += content;
    }

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to connect to Groq",
      },
      { status: 500 }
    );
  }
} 