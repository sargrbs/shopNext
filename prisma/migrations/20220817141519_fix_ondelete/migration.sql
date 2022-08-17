-- DropForeignKey
ALTER TABLE "VariationtOnAux" DROP CONSTRAINT "VariationtOnAux_auxId_fkey";

-- DropForeignKey
ALTER TABLE "VariationtOnAux" DROP CONSTRAINT "VariationtOnAux_variationId_fkey";

-- AddForeignKey
ALTER TABLE "VariationtOnAux" ADD CONSTRAINT "VariationtOnAux_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "ProductVariations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationtOnAux" ADD CONSTRAINT "VariationtOnAux_auxId_fkey" FOREIGN KEY ("auxId") REFERENCES "Aux"("id") ON DELETE CASCADE ON UPDATE CASCADE;
