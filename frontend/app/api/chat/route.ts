import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { prisma } from "@/lib/prisma";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { message, chatId } = await request.json();

    // Demo user
    let user = await prisma.user.findUnique({
      where: {
        email: "demo@nikhila.ai",
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Demo User",
          email: "demo@nikhila.ai",
        },
      });
    }

    // Use existing chat if available
    let chat = null;

    if (chatId) {
      chat = await prisma.chat.findUnique({
        where: {
          id: chatId,
        },
      });
    }

    // Otherwise create a new chat
    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          title: message.slice(0, 30),
          userId: user.id,
        },
      });
    }

    // Save user message
    await prisma.message.create({
      data: {
        role: "user",
        content: message,
        chatId: chat.id,
      },
    });

    // Get AI response
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are Nikhila AI, a friendly and intelligent AI assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message.content ?? "";

    // Save AI response
    await prisma.message.create({
      data: {
        role: "assistant",
        content: reply,
        chatId: chat.id,
      },
    });

    return NextResponse.json({
      reply,
      chatId: chat.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        reply: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
