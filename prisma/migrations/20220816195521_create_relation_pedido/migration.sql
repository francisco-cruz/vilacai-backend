/*
  Warnings:

  - The primary key for the `pedidos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idProduto` on the `pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `idRecheio` on the `pedidos` table. All the data in the column will be lost.
  - Added the required column `idPedido` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `pedidos` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `idProduto` to the `recheios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "qntd" INTEGER NOT NULL,
    "qntd_additional" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    "idPedido" TEXT NOT NULL,
    CONSTRAINT "produtos_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("created_at", "id", "img", "name", "obs", "price", "qntd", "qntd_additional", "section", "update_at") SELECT "created_at", "id", "img", "name", "obs", "price", "qntd", "qntd_additional", "section", "update_at" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE UNIQUE INDEX "produtos_name_key" ON "produtos"("name");
CREATE TABLE "new_pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY
);
DROP TABLE "pedidos";
ALTER TABLE "new_pedidos" RENAME TO "pedidos";
CREATE TABLE "new_recheios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "qntd_recheio" INTEGER NOT NULL,
    "idProduto" TEXT NOT NULL,
    CONSTRAINT "recheios_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_recheios" ("id", "name", "qntd_recheio", "section") SELECT "id", "name", "qntd_recheio", "section" FROM "recheios";
DROP TABLE "recheios";
ALTER TABLE "new_recheios" RENAME TO "recheios";
CREATE UNIQUE INDEX "recheios_name_key" ON "recheios"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
