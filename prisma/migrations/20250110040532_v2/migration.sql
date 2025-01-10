/*
  Warnings:

  - Made the column `content` on table `scraped_data` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "scraped_data" ALTER COLUMN "content" SET NOT NULL;
