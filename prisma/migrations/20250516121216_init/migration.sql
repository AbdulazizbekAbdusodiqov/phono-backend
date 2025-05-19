/*
  Warnings:

  - You are about to drop the column `phoneNumberId` on the `otp` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `otp` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "otp" DROP CONSTRAINT "otp_phoneNumberId_fkey";

-- DropForeignKey
ALTER TABLE "otp" DROP CONSTRAINT "otp_userId_fkey";

-- AlterTable
ALTER TABLE "otp" DROP COLUMN "phoneNumberId",
DROP COLUMN "userId",
ADD COLUMN     "phone_number" TEXT;
