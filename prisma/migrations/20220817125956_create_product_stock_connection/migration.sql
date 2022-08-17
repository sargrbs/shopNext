/*
  Warnings:

  - Added the required column `productId` to the `ProductStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductStock" ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductStock" ADD CONSTRAINT "ProductStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
