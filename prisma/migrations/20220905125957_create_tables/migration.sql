-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "privilege" STRING NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL
);

-- CreateTable
CREATE TABLE "Token" (
    "id" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ProductStock" (
    "id" STRING NOT NULL,
    "quantity" INT4 NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "productId" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "ProductERPVariations" (
    "id" STRING NOT NULL,
    "erp_code" STRING,
    "ProductId" STRING NOT NULL,
    "ProductVariationsId" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ProductVariations" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "code" STRING NOT NULL,
    "web_erp_code" STRING,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "productStockId" STRING NOT NULL,
    "productId" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "Aux" (
    "id" STRING NOT NULL,
    "code" STRING NOT NULL,
    "name" STRING NOT NULL,
    "group_name" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VariationtOnAux" (
    "variationId" STRING NOT NULL,
    "auxId" STRING NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" STRING NOT NULL,

    CONSTRAINT "VariationtOnAux_pkey" PRIMARY KEY ("variationId","auxId")
);

-- CreateTable
CREATE TABLE "ProductOnAux" (
    "productId" STRING NOT NULL,
    "auxId" STRING NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" STRING NOT NULL,

    CONSTRAINT "ProductOnAux_pkey" PRIMARY KEY ("productId","auxId")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" STRING NOT NULL,
    "code_default" INT4,
    "name" STRING NOT NULL,
    "type" INT4,
    "gtin" STRING,
    "nettWeight" DECIMAL(15,2),
    "grossWeight" DECIMAL(15,2),
    "height" DECIMAL(15,2),
    "width" DECIMAL(15,2),
    "length" DECIMAL(15,2),
    "currentsupply" DECIMAL(15,2),
    "price" DECIMAL(15,2),
    "detailurl" STRING,
    "urldetailstock" STRING,
    "urlpricetable" STRING,
    "urloffers" STRING,
    "urlpics" STRING,
    "web_erp_code" STRING,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_id_key" ON "Token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductStock_id_key" ON "ProductStock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductERPVariations_id_key" ON "ProductERPVariations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariations_id_key" ON "ProductVariations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariations_web_erp_code_key" ON "ProductVariations"("web_erp_code");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariations_productStockId_key" ON "ProductVariations"("productStockId");

-- CreateIndex
CREATE UNIQUE INDEX "Aux_id_key" ON "Aux"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_code_default_key" ON "Product"("code_default");

-- CreateIndex
CREATE UNIQUE INDEX "Product_web_erp_code_key" ON "Product"("web_erp_code");

-- AddForeignKey
ALTER TABLE "ProductStock" ADD CONSTRAINT "ProductStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductERPVariations" ADD CONSTRAINT "ProductERPVariations_ProductVariationsId_fkey" FOREIGN KEY ("ProductVariationsId") REFERENCES "ProductVariations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductERPVariations" ADD CONSTRAINT "ProductERPVariations_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariations" ADD CONSTRAINT "ProductVariations_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "ProductStock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariations" ADD CONSTRAINT "ProductVariations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationtOnAux" ADD CONSTRAINT "VariationtOnAux_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "ProductVariations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationtOnAux" ADD CONSTRAINT "VariationtOnAux_auxId_fkey" FOREIGN KEY ("auxId") REFERENCES "Aux"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnAux" ADD CONSTRAINT "ProductOnAux_auxId_fkey" FOREIGN KEY ("auxId") REFERENCES "Aux"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnAux" ADD CONSTRAINT "ProductOnAux_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
