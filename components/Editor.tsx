"use client";

import { updateEntry } from "@/utils/api";
import { JournalEntry } from "@prisma/client";
import { FC, useState } from "react";
import { useAutosave } from "react-autosave";

interface EditorProps {
  entry: JournalEntry;
}

const Editor: FC<EditorProps> = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsSaving(true);
      const updatedEntry = await updateEntry(entry.id, _value);
      setIsSaving(false);
    },
  });
  return (
    <div className="w-full h-full">
      {isSaving && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <p className="text-white text-2xl">Saving...</p>
        </div>
      )}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
