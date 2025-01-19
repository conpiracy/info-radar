/*
  Warnings:

  - You are about to drop the column `validated` on the `scraped_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "scraped_data" DROP COLUMN "validated",
ALTER COLUMN "content" SET DATA TYPE TEXT;
