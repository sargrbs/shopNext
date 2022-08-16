/*
  Warnings:

  - Added the required column `group_name` to the `Aux` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Aux_code_key";

-- AlterTable
ALTER TABLE "Aux" ADD COLUMN     "group_name" TEXT NOT NULL;
