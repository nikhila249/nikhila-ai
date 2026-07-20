import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  try {
    const { id, title } = await request.json();

    if (!id || !title) {
      return NextResponse.json(
        { message: "Chat ID and title are required." },
        { status: 400 }
      );
    }

    const updatedChat = await prisma.chat.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to rename chat.",
      },
      { status: 500 }
    );
  }
} 