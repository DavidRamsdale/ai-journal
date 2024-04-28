"use client";

import { updateEntry } from "@/utils/api";
import { Analysis, JournalEntry } from "@prisma/client";
import { FC, useState } from "react";
import { useAutosave } from "react-autosave";
import Spinner from "./Spinner";

interface EditorProps {
  entry: JournalEntry;
}

const Editor: FC<EditorProps> = ({ entry }) => {
  // Fix rerendering performance issue
  const [value, setValue] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);
  const [currentEntry, setEntry] = useState(entry);

  const { summary, mood, negative, subject } =
    currentEntry?.analysis as Analysis;

  const analysisData = [
    {
      name: "Summary",
      value: summary,
    },
    {
      name: "Subject",
      value: subject,
    },
    {
      name: "Mood",
      value: mood,
    },
    {
      name: "Negative",
      value: negative ? "Yes" : "No",
    },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry.content) return;
      setIsSaving(true);
      const { data } = await updateEntry(entry.id, _value);
      setEntry(data);
      setIsSaving(false);
    },
  });

  return (
    <div className="grid grid-cols-3 w-full h-full relative">
      <div className="absolute left-0 top-0 p-2">
        {isSaving ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="col-span-2">
        <div className="w-full h-full">
          <textarea
            className="w-full h-full p-8 text-xl outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
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

export default Editor;
