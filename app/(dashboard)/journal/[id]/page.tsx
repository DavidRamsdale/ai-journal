import Editor from "@/components/Editor";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { Analysis, JournalEntry } from "@prisma/client";

const getEntry = async (id: string) => {
  const user = await getUserFromClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });

  if (!entry) {
    throw new Error("Entry not found");
  }

  return entry;
};

const EntryPage = async ({ params }: any) => {
  const entry = await getEntry(params.id);

  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;
