PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recheios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "qntd_recheio" INTEGER NOT NULL
);
INSERT INTO "new_recheios" ("id", "name", "section", "qntd_recheio") SELECT "id", "name", "section", "qntd_recheio" FROM "recheios";
DROP TABLE "recheios";
ALTER TABLE "new_recheios" RENAME TO "recheios";
CREATE UNIQUE INDEX "recheios_name_key" ON "recheios"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
