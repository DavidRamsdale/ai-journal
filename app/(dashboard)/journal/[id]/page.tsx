import Editor from "@/components/Editor";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { JournalEntry } from "@prisma/client";

const getEntry = async (id: string): Promise<JournalEntry> => {
  const user = await getUserFromClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  });

  if (!entry) {
    throw new Error("Entry not found");
  }

  return entry;
};

const EntryPage = async ({ params }: any) => {
  const entry = await getEntry(params.id);
  const analysisData = [
    {
      name: "Summary",
      value: "",
    },
    {
      name: "Subject",
      value: "",
    },
    {
      name: "Mood",
      value: "",
    },
    {
      name: "Negative",
      value: "False",
    },
  ];
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2>Analysis</h2>
        </div>
        <div className="">
          <ul>
            {analysisData.map((data) => (
              <li
                key={data.name}
                className="flex justify-between px-2 py-2 border-b border-black/10"
              >
                <span className="text-lg font-semibold">{data.name}</span>
                <span>{data.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
