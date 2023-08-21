-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "lat" REAL,
    "lgt" REAL,
    "cityId" TEXT,
    "isAuthorized" TEXT,
    CONSTRAINT "Company_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("address", "cellphone", "cityId", "id", "isAuthorized", "lat", "lgt", "name") SELECT "address", "cellphone", "cityId", "id", "isAuthorized", "lat", "lgt", "name" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
