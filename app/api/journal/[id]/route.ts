import { analyze } from "@/utils/ai";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }: any) => {
  const { content } = await req.json();
  const user = await getUserFromClerkID();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(content);

  if (!analysis) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const savedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      userId: user.id,
      ...analysis,
    },
    update: { ...analysis },
  });

  revalidatePath("/journal");

  return NextResponse.json({
    data: { ...updatedEntry, analysis: savedAnalysis },
  });
};
