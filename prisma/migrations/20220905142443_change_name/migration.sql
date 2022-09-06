/*
  Warnings:

  - You are about to drop the `ProductERPLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductERPLink" DROP CONSTRAINT "ProductERPLink_ProductId_fkey";

-- DropForeignKey
ALTER TABLE "ProductERPLink" DROP CONSTRAINT "ProductERPLink_ProductVariationsId_fkey";

-- DropTable
DROP TABLE "ProductERPLink";

-- CreateTable
CREATE TABLE "Producterplink" (
    "id" STRING NOT NULL,
    "erp_code" STRING,
    "ProductId" STRING NOT NULL,
    "ProductVariationsId" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Producterplink_id_key" ON "Producterplink"("id");

-- AddForeignKey
ALTER TABLE "Producterplink" ADD CONSTRAINT "Producterplink_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producterplink" ADD CONSTRAINT "Producterplink_ProductVariationsId_fkey" FOREIGN KEY ("ProductVariationsId") REFERENCES "ProductVariations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
