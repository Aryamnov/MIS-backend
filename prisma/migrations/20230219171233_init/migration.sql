-- CreateTable
CREATE TABLE `Schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctor_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `time_from` DATETIME(3) NOT NULL,
    `time_to` DATETIME(3) NOT NULL,
    `is_free` DATETIME(3) NOT NULL,
    `patient_id` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
