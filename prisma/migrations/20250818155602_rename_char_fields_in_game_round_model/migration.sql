/*
  Warnings:

  - You are about to drop the column `foundWaldo` on the `GameRound` table. All the data in the column will be lost.
  - You are about to drop the column `foundWilma` on the `GameRound` table. All the data in the column will be lost.
  - You are about to drop the column `foundWizard` on the `GameRound` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."GameRound" DROP COLUMN "foundWaldo",
DROP COLUMN "foundWilma",
DROP COLUMN "foundWizard",
ADD COLUMN     "waldo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wilma" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wizard" BOOLEAN NOT NULL DEFAULT false;
