/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `Aux` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "Products";

-- CreateTable
CREATE TABLE "ProductOnAux" (
    "productId" TEXT NOT NULL,
    "auxId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ProductOnAux_pkey" PRIMARY KEY ("productId","auxId")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "codigo" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "observacao1" TEXT NOT NULL,
    "observacao2" TEXT NOT NULL,
    "observacao3" TEXT NOT NULL,
    "tipo" INTEGER NOT NULL,
    "codigoClasse" INTEGER NOT NULL,
    "codigoSubclasse" INTEGER NOT NULL,
    "codigoCor" INTEGER NOT NULL,
    "codigoTamanho" INTEGER NOT NULL,
    "codigoGrupo" INTEGER NOT NULL,
    "codigoMoeda" INTEGER NOT NULL,
    "codigoFamilia" INTEGER NOT NULL,
    "codigoUnidadeVenda" INTEGER NOT NULL,
    "codigoPesquisa1" INTEGER NOT NULL,
    "codigoPesquisa2" INTEGER NOT NULL,
    "codigoPesquisa3" INTEGER NOT NULL,
    "pesoLiquido" DECIMAL(15,2) NOT NULL,
    "pesoBruto" DECIMAL(15,2) NOT NULL,
    "altura" DECIMAL(15,2) NOT NULL,
    "largura" DECIMAL(15,2) NOT NULL,
    "comprimento" DECIMAL(15,2) NOT NULL,
    "estoqueAtual" DECIMAL(15,2) NOT NULL,
    "codigoFabricante" INTEGER NOT NULL,
    "codigoBarras" TEXT NOT NULL,
    "urlDetalhe" TEXT NOT NULL,
    "urlEstoqueDetalhe" TEXT NOT NULL,
    "urlTabelaPreco" TEXT NOT NULL,
    "urlPromocoes" TEXT NOT NULL,
    "urlFotos" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Aux_code_key" ON "Aux"("code");

-- AddForeignKey
ALTER TABLE "ProductOnAux" ADD CONSTRAINT "ProductOnAux_auxId_fkey" FOREIGN KEY ("auxId") REFERENCES "Aux"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnAux" ADD CONSTRAINT "ProductOnAux_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
