/*
  Warnings:

  - You are about to drop the column `codeContentLink` on the `Component` table. All the data in the column will be lost.
  - Added the required column `codeSource` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Component` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `salt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tag_name_key";

-- AlterTable
ALTER TABLE "Component" DROP COLUMN "codeContentLink",
ADD COLUMN     "codeSource" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "isPrivate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "salt" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
