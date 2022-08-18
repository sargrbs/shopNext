-- DropForeignKey
ALTER TABLE "ProductOnAux" DROP CONSTRAINT "ProductOnAux_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductOnAux" ADD CONSTRAINT "ProductOnAux_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
