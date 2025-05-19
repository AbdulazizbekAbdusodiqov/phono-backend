/*
  Warnings:

  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "brith_date" DROP NOT NULL,
ALTER COLUMN "profile_img" DROP NOT NULL;
