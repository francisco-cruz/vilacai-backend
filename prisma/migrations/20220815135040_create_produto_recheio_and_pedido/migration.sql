-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "qntd" INTEGER NOT NULL,
    "qntd_additional" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "recheios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pedidos" (
    "idProduto" TEXT NOT NULL,
    "idRecheio" TEXT NOT NULL,

    PRIMARY KEY ("idProduto", "idRecheio"),
    CONSTRAINT "pedidos_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_idRecheio_fkey" FOREIGN KEY ("idRecheio") REFERENCES "recheios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "produtos_name_key" ON "produtos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "recheios_name_key" ON "recheios"("name");
