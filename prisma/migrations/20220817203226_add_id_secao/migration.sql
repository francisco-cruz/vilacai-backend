/*
  Warnings:

  - You are about to drop the column `idSecao` on the `recheios` table. All the data in the column will be lost.
  - You are about to drop the column `idSecao` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `id_secao` to the `recheios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_secao` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recheios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "qntd_recheio" INTEGER NOT NULL,
    "id_secao" TEXT NOT NULL,
    CONSTRAINT "recheios_id_secao_fkey" FOREIGN KEY ("id_secao") REFERENCES "secoes_recheios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "id_secao" TEXT NOT NULL,
    CONSTRAINT "produtos_id_secao_fkey" FOREIGN KEY ("id_secao") REFERENCES "secoes_produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("created_at", "id", "img", "name", "obs", "price", "qntd_max_adicionais", "update_at") SELECT "created_at", "id", "img", "name", "obs", "price", "qntd_max_adicionais", "update_at" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE UNIQUE INDEX "produtos_name_key" ON "produtos"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
