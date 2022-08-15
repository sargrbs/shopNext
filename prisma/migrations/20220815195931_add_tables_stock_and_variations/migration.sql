/*
  Warnings:

  - You are about to drop the `ProductOnAux` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductOnAux" DROP CONSTRAINT "ProductOnAux_auxId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnAux" DROP CONSTRAINT "ProductOnAux_productId_fkey";

-- DropTable
DROP TABLE "ProductOnAux";

-- CreateTable
CREATE TABLE "ProductStock" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ProductVariations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "productStockId" TEXT NOT NULL,
    "productId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VariationtOnAux" (
    "variationId" TEXT NOT NULL,
    "auxId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "VariationtOnAux_pkey" PRIMARY KEY ("variationId","auxId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductStock_id_key" ON "ProductStock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariations_id_key" ON "ProductVariations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariations_productStockId_key" ON "ProductVariations"("productStockId");

-- AddForeignKey
ALTER TABLE "ProductVariations" ADD CONSTRAINT "ProductVariations_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "ProductStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariations" ADD CONSTRAINT "ProductVariations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationtOnAux" ADD CONSTRAINT "VariationtOnAux_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "ProductVariations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationtOnAux" ADD CONSTRAINT "VariationtOnAux_auxId_fkey" FOREIGN KEY ("auxId") REFERENCES "Aux"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
