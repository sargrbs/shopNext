-- DropForeignKey
ALTER TABLE "ProductOnAux" DROP CONSTRAINT "ProductOnAux_auxId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnAux" DROP CONSTRAINT "ProductOnAux_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductOnAux" ADD CONSTRAINT "ProductOnAux_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnAux" ADD CONSTRAINT "ProductOnAux_auxId_fkey" FOREIGN KEY ("auxId") REFERENCES "Aux"("id") ON DELETE SET NULL ON UPDATE CASCADE;
