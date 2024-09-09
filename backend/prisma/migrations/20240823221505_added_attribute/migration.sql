/*
  Warnings:

  - Added the required column `user_id` to the `comment_reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment_reports` ADD COLUMN `user_id` CHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `comment_reports` ADD CONSTRAINT `comment_reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
