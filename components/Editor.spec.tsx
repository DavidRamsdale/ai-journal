import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import Editor from "@/components/Editor";
import { JournalEntry as PrismaJournalEntry } from "@prisma/client";

interface JournalEntry extends PrismaJournalEntry {
  analysis: {
    summary: string;
    mood: string;
    negative: boolean;
    subject: string;
  };
}

describe("Editor", () => {
  const entry = {
    id: "1",
    content: "Initial content",
    analysis: {
      summary: "Journal Summary",
      mood: "Very Good",
      negative: false,
      subject: "My mood today is very good.",
    },
  } as JournalEntry;

  vi.mock("@/utils/api", () => ({
    updateEntry: () => Promise.resolve({ id: "1", content: "Updated content" }),
  }));

  it("should display the initial content", () => {
    render(<Editor entry={entry} />);

    expect(screen.getByRole("textbox")).toHaveValue("Initial content");
    expect(screen.getByText("Journal Summary")).toBeInTheDocument();
    expect(screen.getByText("My mood today is very good.")).toBeInTheDocument();
  });

  it("should display the spinner when isSaving is true", () => {
    vi.mock("react-autosave", () => ({
      useAutosave: () => ({ isSaving: true }),
    }));

    render(<Editor entry={entry} isSavingState={true} />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("should not display the spinner when isSaving is false", () => {
    vi.mock("react-autosave", () => ({
      useAutosave: () => ({ isSaving: false }),
    }));

    render(<Editor entry={entry} isSavingState={false} />);

    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });

  it("should change the textarea value when the user types in it", () => {
    render(<Editor entry={entry} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Updated content" } });

    expect(textarea).toHaveValue("Updated content");
  });
});
