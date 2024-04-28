import { qa } from "@/utils/ai";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { question } = await req.json();
  const user = await getUserFromClerkID();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const answer = await qa(question, entries);

  return NextResponse.json({ data: answer });
};
