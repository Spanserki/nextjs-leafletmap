-- CreateTable
CREATE TABLE "Uf" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "initials" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ufId" TEXT,
    CONSTRAINT "City_ufId_fkey" FOREIGN KEY ("ufId") REFERENCES "Uf" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "lat" REAL,
    "lgt" REAL,
    "cityId" TEXT,
    CONSTRAINT "Company_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Uf_name_key" ON "Uf"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Uf_initials_key" ON "Uf"("initials");
