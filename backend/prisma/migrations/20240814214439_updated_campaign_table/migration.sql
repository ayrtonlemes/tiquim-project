/*
  Warnings:

  - Added the required column `city` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `campaigns` ADD COLUMN `city` VARCHAR(50) NOT NULL,
    ADD COLUMN `state` VARCHAR(20) NOT NULL;
