import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { prisma } from "@/lib/prisma";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Demo user
    let user = await prisma.user.findUnique({
      where: {
        email: "nikhila@example.com",
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Nikhila",
          email: "nikhila@example.com",
        },
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are Nikhila AI, a friendly intelligent AI assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices[0].message.content ??
      "Sorry, I couldn't generate a response.";

    await prisma.chat.create({
      data: {
        message,
        reply,
        userId: user.id,
      },
    });

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        reply: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
