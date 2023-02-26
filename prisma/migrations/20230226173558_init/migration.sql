/*
  Warnings:

  - Changed the type of `is_free` on the `schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `is_free`,
    ADD COLUMN `is_free` BOOLEAN NOT NULL;
