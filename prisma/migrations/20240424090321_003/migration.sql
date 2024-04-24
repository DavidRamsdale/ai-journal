/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `JournalEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "JournalEntry_userId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_id_userId_key" ON "JournalEntry"("id", "userId");
