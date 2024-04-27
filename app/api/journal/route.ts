import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const data = await request.json();
  const user = await getUserFromClerkID();
  const entry = await prisma.journalEntry.create({
    data: {
      content: data.content,
      user: {
        connect: {
          id: user.id,
        },
      },
      analysis: {
        create: {
          mood: "Neutral",
          subject: "None",
          negative: false,
          summary: "None",
          color: "#0101fe",
        },
      },
    },
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
};
