/*
  Warnings:

  - You are about to drop the column `codigoClasse` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoCor` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoFabricante` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoFamilia` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoGrupo` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoMoeda` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoPesquisa1` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoPesquisa2` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoPesquisa3` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoSubclasse` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoTamanho` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codigoUnidadeVenda` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `observacao1` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `observacao2` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `observacao3` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "codigoClasse",
DROP COLUMN "codigoCor",
DROP COLUMN "codigoFabricante",
DROP COLUMN "codigoFamilia",
DROP COLUMN "codigoGrupo",
DROP COLUMN "codigoMoeda",
DROP COLUMN "codigoPesquisa1",
DROP COLUMN "codigoPesquisa2",
DROP COLUMN "codigoPesquisa3",
DROP COLUMN "codigoSubclasse",
DROP COLUMN "codigoTamanho",
DROP COLUMN "codigoUnidadeVenda",
DROP COLUMN "observacao1",
DROP COLUMN "observacao2",
DROP COLUMN "observacao3";

-- CreateTable
CREATE TABLE "ProductOnAux" (
    "productId" TEXT NOT NULL,
    "auxId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ProductOnAux_pkey" PRIMARY KEY ("productId","auxId")
);

-- AddForeignKey
ALTER TABLE "ProductOnAux" ADD CONSTRAINT "ProductOnAux_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnAux" ADD CONSTRAINT "ProductOnAux_auxId_fkey" FOREIGN KEY ("auxId") REFERENCES "Aux"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
