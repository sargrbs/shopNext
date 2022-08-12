/*
  Warnings:

  - Added the required column `expireAt` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "expireAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Products" (
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
CREATE UNIQUE INDEX "Products_id_key" ON "Products"("id");
