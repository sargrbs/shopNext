-- DropForeignKey
ALTER TABLE "ProductOnAux" DROP CONSTRAINT "ProductOnAux_auxId_fkey";

-- AddForeignKey
ALTER TABLE "ProductOnAux" ADD CONSTRAINT "ProductOnAux_auxId_fkey" FOREIGN KEY ("auxId") REFERENCES "Aux"("id") ON DELETE CASCADE ON UPDATE CASCADE;
