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
    "update_at" DATETIME NOT NULL
);
INSERT INTO "new_produtos" ("created_at", "id", "name", "obs", "price", "qntd", "qntd_additional", "section", "update_at") SELECT "created_at", "id", "name", "obs", "price", "qntd", "qntd_additional", "section", "update_at" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE UNIQUE INDEX "produtos_name_key" ON "produtos"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
