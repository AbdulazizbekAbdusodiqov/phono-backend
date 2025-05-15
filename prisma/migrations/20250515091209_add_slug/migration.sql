/*
  Warnings:

  - The `is_checked` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[slug]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `color_id` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "isChecked" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_color_id_fkey";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "slug" TEXT,
ALTER COLUMN "color_id" SET NOT NULL,
DROP COLUMN "is_checked",
ADD COLUMN     "is_checked" "isChecked" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "product_slug_key" ON "product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "user_slug_key" ON "user"("slug");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
