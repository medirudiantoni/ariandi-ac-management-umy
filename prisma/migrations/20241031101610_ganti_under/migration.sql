/*
  Warnings:

  - You are about to drop the column `endDate` on the `Maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Maintenance` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `Maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Maintenance` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Maintenance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "acId" INTEGER NOT NULL,
    "start_date" BIGINT NOT NULL,
    "end_date" BIGINT NOT NULL,
    "technician" TEXT NOT NULL,
    "cost" REAL,
    "description" TEXT,
    "repair_details" TEXT,
    "replacement_details" TEXT,
    CONSTRAINT "Maintenance_acId_fkey" FOREIGN KEY ("acId") REFERENCES "AC" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Maintenance" ("acId", "cost", "description", "id", "repair_details", "replacement_details", "technician") SELECT "acId", "cost", "description", "id", "repair_details", "replacement_details", "technician" FROM "Maintenance";
DROP TABLE "Maintenance";
ALTER TABLE "new_Maintenance" RENAME TO "Maintenance";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
