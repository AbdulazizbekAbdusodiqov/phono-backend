/*
  Warnings:

  - You are about to drop the column `phone_number` on the `otp` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `otp` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "otp" DROP CONSTRAINT "otp_user_id_fkey";

-- AlterTable
ALTER TABLE "otp" DROP COLUMN "phone_number",
DROP COLUMN "user_id",
ADD COLUMN     "phoneNumberId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "otp" ADD CONSTRAINT "otp_phoneNumberId_fkey" FOREIGN KEY ("phoneNumberId") REFERENCES "phone_number"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "otp" ADD CONSTRAINT "otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
