-- DropForeignKey
ALTER TABLE "Producterplink" DROP CONSTRAINT "Producterplink_ProductId_fkey";

-- DropForeignKey
ALTER TABLE "Producterplink" DROP CONSTRAINT "Producterplink_ProductVariationsId_fkey";

-- AlterTable
ALTER TABLE "Producterplink" ALTER COLUMN "ProductId" DROP NOT NULL;
ALTER TABLE "Producterplink" ALTER COLUMN "ProductVariationsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Producterplink" ADD CONSTRAINT "Producterplink_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producterplink" ADD CONSTRAINT "Producterplink_ProductVariationsId_fkey" FOREIGN KEY ("ProductVariationsId") REFERENCES "ProductVariations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
