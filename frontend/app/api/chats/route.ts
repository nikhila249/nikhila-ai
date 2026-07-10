import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: "demo@nikhila.ai",
      },
    });

    if (!user) {
      return NextResponse.json([]);
    }

    const chats = await prisma.chat.findMany({
      where: {
        userId: user.id,
      },
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
