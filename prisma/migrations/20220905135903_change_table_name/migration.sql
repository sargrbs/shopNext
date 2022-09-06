/*
  Warnings:

  - You are about to drop the `ProductERPVariations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductERPVariations" DROP CONSTRAINT "ProductERPVariations_ProductId_fkey";

-- DropForeignKey
ALTER TABLE "ProductERPVariations" DROP CONSTRAINT "ProductERPVariations_ProductVariationsId_fkey";

-- DropTable
DROP TABLE "ProductERPVariations";

-- CreateTable
CREATE TABLE "ProductERPLink" (
    "id" STRING NOT NULL,
    "erp_code" STRING,
    "ProductId" STRING NOT NULL,
    "ProductVariationsId" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductERPLink_id_key" ON "ProductERPLink"("id");

-- AddForeignKey
ALTER TABLE "ProductERPLink" ADD CONSTRAINT "ProductERPLink_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductERPLink" ADD CONSTRAINT "ProductERPLink_ProductVariationsId_fkey" FOREIGN KEY ("ProductVariationsId") REFERENCES "ProductVariations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
