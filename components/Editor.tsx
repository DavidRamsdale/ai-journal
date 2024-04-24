import { JournalEntry } from "@prisma/client";
import { FC } from "react";

interface EditorProps {
  entry: JournalEntry;
}

const Editor: FC<EditorProps> = ({ entry }) => {
  return (
    <div>
      <h1>{entry.content}</h1>
    </div>
  );
};

export default Editor;
