import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const chats = await prisma.chat.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(chats);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
} 