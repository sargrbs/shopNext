/*
  Warnings:

  - A unique constraint covering the columns `[code_default]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[web_erp_code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_code_default_key" ON "Product"("code_default");

-- CreateIndex
CREATE UNIQUE INDEX "Product_web_erp_code_key" ON "Product"("web_erp_code");
