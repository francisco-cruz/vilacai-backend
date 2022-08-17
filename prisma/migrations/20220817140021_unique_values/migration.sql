/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `secoes_produto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `secoes_recheios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "secoes_produto_name_key" ON "secoes_produto"("name");

-- CreateIndex
CREATE UNIQUE INDEX "secoes_recheios_name_key" ON "secoes_recheios"("name");
