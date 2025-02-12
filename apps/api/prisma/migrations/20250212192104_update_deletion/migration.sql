-- DropForeignKey
ALTER TABLE "ComponentTag" DROP CONSTRAINT "ComponentTag_componentId_fkey";

-- DropForeignKey
ALTER TABLE "Download" DROP CONSTRAINT "Download_componentId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_componentId_fkey";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Download" ADD CONSTRAINT "Download_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentTag" ADD CONSTRAINT "ComponentTag_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;
