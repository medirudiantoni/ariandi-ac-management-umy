/*
  Warnings:

  - You are about to alter the column `floor` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `room` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "building" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "room" INTEGER NOT NULL
);
INSERT INTO "new_Location" ("building", "floor", "id", "room") SELECT "building", "floor", "id", "room" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
