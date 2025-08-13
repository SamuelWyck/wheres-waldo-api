/*
  Warnings:

  - Added the required column `characterId` to the `CharacterCoords` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconUrl` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CharacterCoords" ADD COLUMN     "characterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Image" ADD COLUMN     "iconUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."CharacterCoords" ADD CONSTRAINT "CharacterCoords_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
