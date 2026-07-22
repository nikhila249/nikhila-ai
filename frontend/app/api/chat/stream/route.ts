import { prisma } from "@/lib/prisma"; 
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
   const { message, chatId } = await request.json(); 
   console.log("Received chatId:", chatId);
console.log("Received message:", message); 
   if (chatId) {
  await prisma.message.create({
    data: {
      role: "user",
      content: message,
      chatId,
    },
  });

  await prisma.chat.update({
    where: {
      id: chatId,
    },
    data: {
      updatedAt: new Date(),
    },
  });
} 

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

    const encoder = new TextEncoder();

const stream = new ReadableStream({
  async start(controller) {
    try {
      let fullResponse = "";

      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || "";

        if (content) {
          fullResponse += content;
          controller.enqueue(encoder.encode(content));
        }
      }

      if (chatId && fullResponse) {
        await prisma.message.create({
          data: {
            role: "assistant",
            content: fullResponse,
            chatId,
          },
        });

        await prisma.chat.update({
          where: {
            id: chatId,
          },
          data: {
            updatedAt: new Date(),
          },
        });
      }

      controller.close();
    } catch (err) {
      controller.error(err);
    }
  },
}); 

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
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

   