import { JournalEntry } from "@prisma/client";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { Document } from "langchain/document";

import z from "zod";
import { loadQARefineChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("The mood of the person who wrote the journal entry."),
    summary: z.string().describe("Quick summary of the journal entry."),
    subject: z.string().describe("The subject of the journal entry."),
    negative: z
      .boolean()
      .describe(
        "Whether the journal entry is negative? (i.e does it contain negative emotions?)."
      ),
    color: z
      .string()
      .describe(
        "a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."
      ),
  })
);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const result = await model.invoke(input);

  try {
    return parser.parse(result);
  } catch (error) {
    console.error("🚀 ~ analyze ~ error", error);
  }
};

export const qa = async (question: string, entries: JournalEntry[]) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: {
          id: entry.id,
          createdAt: new Date(entry.createdAt),
        },
      })
  );

  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const chain = loadQARefineChain(model);
  const embeddings = new OpenAIEmbeddings();

  // need to store the embeddings of the documents in database
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relevantDocs = await store.similaritySearch(question, 5);
  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  });

  return res.output_text;
};
