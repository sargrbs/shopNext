/*
  Warnings:

  - You are about to drop the column `altura` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoBarras` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `comprimento` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `estoqueAtual` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `largura` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pesoBruto` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pesoLiquido` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `urlDetalhe` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `urlEstoqueDetalhe` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `urlFotos` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `urlPromocoes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `urlTabelaPreco` on the `Product` table. All the data in the column will be lost.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "altura",
DROP COLUMN "codigo",
DROP COLUMN "codigoBarras",
DROP COLUMN "comprimento",
DROP COLUMN "estoqueAtual",
DROP COLUMN "largura",
DROP COLUMN "nome",
DROP COLUMN "pesoBruto",
DROP COLUMN "pesoLiquido",
DROP COLUMN "tipo",
DROP COLUMN "urlDetalhe",
DROP COLUMN "urlEstoqueDetalhe",
DROP COLUMN "urlFotos",
DROP COLUMN "urlPromocoes",
DROP COLUMN "urlTabelaPreco",
ADD COLUMN     "code_default" INTEGER,
ADD COLUMN     "currentsupply" DECIMAL(15,2),
ADD COLUMN     "detailurl" TEXT,
ADD COLUMN     "grossWeight" DECIMAL(15,2),
ADD COLUMN     "gtin" TEXT,
ADD COLUMN     "height" DECIMAL(15,2),
ADD COLUMN     "length" DECIMAL(15,2),
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "nettWeight" DECIMAL(15,2),
ADD COLUMN     "type" INTEGER,
ADD COLUMN     "urldetailstock" TEXT,
ADD COLUMN     "urloffers" TEXT,
ADD COLUMN     "urlpics" TEXT,
ADD COLUMN     "urlpricetable" TEXT,
ADD COLUMN     "web_erp_code" TEXT,
ADD COLUMN     "width" DECIMAL(15,2);
