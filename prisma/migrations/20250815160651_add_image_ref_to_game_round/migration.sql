/*
  Warnings:

  - Added the required column `imageId` to the `GameRound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."GameRound" ADD COLUMN     "imageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."GameRound" ADD CONSTRAINT "GameRound_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
