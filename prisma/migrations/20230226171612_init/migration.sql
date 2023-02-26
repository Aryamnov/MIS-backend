-- AlterTable
ALTER TABLE `schedule` MODIFY `date` DATE NOT NULL,
    MODIFY `time_from` TIMESTAMP(3) NOT NULL,
    MODIFY `time_to` TIMESTAMP(3) NOT NULL;
