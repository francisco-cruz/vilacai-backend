/*
  Warnings:

  - You are about to drop the `pedidos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `idProduto` on the `recheios` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `recheios` table. All the data in the column will be lost.
  - You are about to drop the column `idPedido` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `qntd` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `qntd_additional` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `idSecao` to the `recheios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSecao` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qntd_max_adicionais` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "pedidos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "secoes_produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "possuiAdicionais" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "secoes_recheios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recheios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "qntd_recheio" INTEGER NOT NULL,
    "idSecao" TEXT NOT NULL,
    CONSTRAINT "recheios_idSecao_fkey" FOREIGN KEY ("idSecao") REFERENCES "secoes_recheios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_recheios" ("id", "name", "qntd_recheio") SELECT "id", "name", "qntd_recheio" FROM "recheios";
DROP TABLE "recheios";
ALTER TABLE "new_recheios" RENAME TO "recheios";
CREATE UNIQUE INDEX "recheios_name_key" ON "recheios"("name");
CREATE TABLE "new_produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "qntd_max_adicionais" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    "idSecao" TEXT NOT NULL,
    CONSTRAINT "produtos_idSecao_fkey" FOREIGN KEY ("idSecao") REFERENCES "secoes_produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("created_at", "id", "img", "name", "obs", "price", "update_at") SELECT "created_at", "id", "img", "name", "obs", "price", "update_at" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE UNIQUE INDEX "produtos_name_key" ON "produtos"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
