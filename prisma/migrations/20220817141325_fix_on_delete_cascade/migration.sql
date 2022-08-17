-- DropForeignKey
ALTER TABLE "ProductVariations" DROP CONSTRAINT "ProductVariations_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariations" DROP CONSTRAINT "ProductVariations_productStockId_fkey";

-- DropForeignKey
ALTER TABLE "VariationtOnAux" DROP CONSTRAINT "VariationtOnAux_auxId_fkey";

-- DropForeignKey
ALTER TABLE "VariationtOnAux" DROP CONSTRAINT "VariationtOnAux_variationId_fkey";

-- AddForeignKey
ALTER TABLE "ProductVariations" ADD CONSTRAINT "ProductVariations_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "ProductStock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariations" ADD CONSTRAINT "ProductVariations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationtOnAux" ADD CONSTRAINT "VariationtOnAux_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "ProductVariations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationtOnAux" ADD CONSTRAINT "VariationtOnAux_auxId_fkey" FOREIGN KEY ("auxId") REFERENCES "Aux"("id") ON DELETE SET NULL ON UPDATE CASCADE;
