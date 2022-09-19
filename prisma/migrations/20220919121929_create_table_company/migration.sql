-- CreateTable
CREATE TABLE "Company" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "cnpj" STRING NOT NULL,
    "serial" STRING NOT NULL,
    "branch_number" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_id_key" ON "Company"("id");
