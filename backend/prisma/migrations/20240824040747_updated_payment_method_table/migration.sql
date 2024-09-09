/*
  Warnings:

  - You are about to drop the column `user_id` on the `payment_methods` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `payment_methods` DROP FOREIGN KEY `payment_methods_user_id_fkey`;

-- AlterTable
ALTER TABLE `payment_methods` DROP COLUMN `user_id`,
    ADD COLUMN `cardExpiryDate` CHAR(5) NULL,
    ADD COLUMN `cardHolderName` VARCHAR(100) NULL,
    ADD COLUMN `cardLastDigits` CHAR(4) NULL,
    ADD COLUMN `cvv` CHAR(3) NULL;
