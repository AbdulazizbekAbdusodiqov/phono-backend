-- DropForeignKey
ALTER TABLE "otp" DROP CONSTRAINT "otp_user_id_fkey";

-- AddForeignKey
ALTER TABLE "otp" ADD CONSTRAINT "otp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
