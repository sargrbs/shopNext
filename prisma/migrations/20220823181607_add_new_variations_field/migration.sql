/*
  Warnings:

  - A unique constraint covering the columns `[web_erp_code]` on the table `ProductVariations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductVariations" ADD COLUMN     "web_erp_code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariations_web_erp_code_key" ON "ProductVariations"("web_erp_code");
