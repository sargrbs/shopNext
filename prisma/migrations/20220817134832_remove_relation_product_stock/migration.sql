/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductStock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductStock" DROP CONSTRAINT "ProductStock_productId_fkey";

-- AlterTable
ALTER TABLE "ProductStock" DROP COLUMN "productId";
