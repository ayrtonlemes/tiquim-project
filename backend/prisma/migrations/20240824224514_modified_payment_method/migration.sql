/*
  Warnings:

  - You are about to drop the column `cardExpiryDate` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `cardHolderName` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `cardLastDigits` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `cvv` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `payment_methods` table. All the data in the column will be lost.
  - Added the required column `payment_type_id` to the `payment_methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment_methods` DROP COLUMN `cardExpiryDate`,
    DROP COLUMN `cardHolderName`,
    DROP COLUMN `cardLastDigits`,
    DROP COLUMN `cvv`,
    DROP COLUMN `type`,
    ADD COLUMN `payment_type_id` VARCHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE `payment_method_type` (
    `id` CHAR(36) NOT NULL,
    `label` CHAR(8) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `credit_card` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `cardHolderName` VARCHAR(100) NULL,
    `cardLastDigits` CHAR(4) NULL,
    `cardExpiryDate` CHAR(5) NULL,
    `cvv` CHAR(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `payment_method_type_id_fkey` ON `payment_methods`(`payment_type_id`);

-- AddForeignKey
ALTER TABLE `payment_methods` ADD CONSTRAINT `payment_methods_payment_type_id_fkey` FOREIGN KEY (`payment_type_id`) REFERENCES `payment_method_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `credit_card` ADD CONSTRAINT `credit_card_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
