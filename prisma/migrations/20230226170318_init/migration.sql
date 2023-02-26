/*
  Warnings:

  - You are about to alter the column `time_from` on the `schedule` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `time_to` on the `schedule` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `schedule` MODIFY `time_from` TIMESTAMP NOT NULL,
    MODIFY `time_to` TIMESTAMP NOT NULL;
