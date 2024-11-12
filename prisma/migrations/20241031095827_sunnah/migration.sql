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
    "installed_at" BIGINT NOT NULL,
    CONSTRAINT "AC_loc_id_fkey" FOREIGN KEY ("loc_id") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AC" ("PK", "brand", "condition", "id", "installed_at", "loc_id", "type", "unit_code") SELECT "PK", "brand", "condition", "id", "installed_at", "loc_id", "type", "unit_code" FROM "AC";
DROP TABLE "AC";
ALTER TABLE "new_AC" RENAME TO "AC";
CREATE UNIQUE INDEX "AC_unit_code_key" ON "AC"("unit_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
