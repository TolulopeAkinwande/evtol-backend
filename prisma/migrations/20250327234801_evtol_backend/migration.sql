/*
  Warnings:

  - Added the required column `evtolId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "evtolId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_evtolId_fkey" FOREIGN KEY ("evtolId") REFERENCES "evtol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
