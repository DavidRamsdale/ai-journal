import { JournalEntry } from "@prisma/client";

const EntryCard = ({ entry }: any) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow cursor-pointer">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">{entry.analysis.summary}</div>
      <div className="px-4 py-5 sm:p-6">{entry.analysis.mood}</div>
    </div>
  );
};

export default EntryCard;
