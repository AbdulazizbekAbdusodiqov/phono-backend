/*
  Warnings:

  - You are about to drop the column `tg_link` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "tg_link",
ALTER COLUMN "is_creator" SET DEFAULT false;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";
