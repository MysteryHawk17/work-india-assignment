/*
  Warnings:

  - Added the required column `departureTime` to the `Train` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Train" ADD COLUMN     "departureTime" TIMESTAMP(3) NOT NULL;
