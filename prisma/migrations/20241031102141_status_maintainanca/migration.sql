-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Maintenance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "acId" INTEGER NOT NULL,
    "start_date" BIGINT NOT NULL,
    "end_date" BIGINT,
    "technician" TEXT NOT NULL,
    "cost" REAL,
    "description" TEXT,
    "repair_details" TEXT,
    "replacement_details" TEXT,
    "maintainance_type" TEXT,
    "status" TEXT,
    CONSTRAINT "Maintenance_acId_fkey" FOREIGN KEY ("acId") REFERENCES "AC" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Maintenance" ("acId", "cost", "description", "end_date", "id", "maintainance_type", "repair_details", "replacement_details", "start_date", "technician") SELECT "acId", "cost", "description", "end_date", "id", "maintainance_type", "repair_details", "replacement_details", "start_date", "technician" FROM "Maintenance";
DROP TABLE "Maintenance";
ALTER TABLE "new_Maintenance" RENAME TO "Maintenance";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
