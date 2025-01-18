/*
  Warnings:

  - You are about to drop the column `type` on the `Component` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[alias]` on the table `Component` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alias` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Component" DROP COLUMN "type",
ADD COLUMN     "alias" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Component_alias_key" ON "Component"("alias");
