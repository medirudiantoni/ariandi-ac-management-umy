-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AC" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unit_code" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT,
    "PK" TEXT,
    "condition" BOOLEAN NOT NULL,
    "loc_id" INTEGER NOT NULL,
    "installed_at" TEXT NOT NULL,
    CONSTRAINT "AC_loc_id_fkey" FOREIGN KEY ("loc_id") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AC" ("PK", "brand", "condition", "id", "installed_at", "loc_id", "type", "unit_code") SELECT "PK", "brand", "condition", "id", "installed_at", "loc_id", "type", "unit_code" FROM "AC";
DROP TABLE "AC";
ALTER TABLE "new_AC" RENAME TO "AC";
CREATE UNIQUE INDEX "AC_unit_code_key" ON "AC"("unit_code");
CREATE TABLE "new_Maintenance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "acId" INTEGER NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT,
    "technician" TEXT NOT NULL,
    "cost" REAL,
    "description" TEXT,
    "repair_details" TEXT,
    "replacement_details" TEXT,
    "maintainance_type" TEXT,
    "status" TEXT,
    CONSTRAINT "Maintenance_acId_fkey" FOREIGN KEY ("acId") REFERENCES "AC" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Maintenance" ("acId", "cost", "description", "end_date", "id", "maintainance_type", "repair_details", "replacement_details", "start_date", "status", "technician") SELECT "acId", "cost", "description", "end_date", "id", "maintainance_type", "repair_details", "replacement_details", "start_date", "status", "technician" FROM "Maintenance";
DROP TABLE "Maintenance";
ALTER TABLE "new_Maintenance" RENAME TO "Maintenance";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
