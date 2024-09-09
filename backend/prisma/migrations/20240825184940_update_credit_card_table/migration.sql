/*
  Warnings:

  - Added the required column `cardNumber` to the `credit_card` table without a default value. This is not possible if the table is not empty.
  - Made the column `cardHolderName` on table `credit_card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cardLastDigits` on table `credit_card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cardExpiryDate` on table `credit_card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cvv` on table `credit_card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `credit_card` ADD COLUMN `cardNumber` VARCHAR(50) NOT NULL,
    MODIFY `cardHolderName` VARCHAR(100) NOT NULL,
    MODIFY `cardLastDigits` CHAR(4) NOT NULL,
    MODIFY `cardExpiryDate` CHAR(5) NOT NULL,
    MODIFY `cvv` CHAR(3) NOT NULL;
