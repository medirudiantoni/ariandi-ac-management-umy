/*
  Warnings:

  - You are about to drop the `Maintainance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Maintainance";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "acId" INTEGER NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT,
    "technician" TEXT NOT NULL,
    "cost" REAL,
    "description" TEXT,
    "repair_details" TEXT,
    "replacement_details" TEXT,
    "maintenance_type" TEXT,
    "status" TEXT,
    CONSTRAINT "Maintenance_acId_fkey" FOREIGN KEY ("acId") REFERENCES "AC" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
