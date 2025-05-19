/*
  Warnings:

  - You are about to drop the column `text` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `brith_date` on the `user` table. All the data in the column will be lost.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'FILE');

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "text",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "type" "MessageType" NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "brith_date",
ADD COLUMN     "birth_date" TIMESTAMP(3),
ALTER COLUMN "profile_img" DROP NOT NULL;
