/*
  Warnings:

  - Made the column `alias` on table `Location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "alias" SET NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;
