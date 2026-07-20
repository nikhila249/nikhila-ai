import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Chat ID is required." },
        { status: 400 }
      );
    }

    await prisma.chat.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Chat deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete chat.",
      },
      { status: 500 }
    );
  }
}
