/*
  Warnings:

  - You are about to drop the `comment_reports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `comment_reports` DROP FOREIGN KEY `comment_reports_comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment_reports` DROP FOREIGN KEY `comment_reports_user_id_fkey`;

-- DropTable
DROP TABLE `comment_reports`;

-- CreateTable
CREATE TABLE `report_comments` (
    `id` CHAR(36) NOT NULL,
    `comment_id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `reportComments_fkey`(`comment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `report_comments` ADD CONSTRAINT `report_comments_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `report_comments` ADD CONSTRAINT `report_comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
