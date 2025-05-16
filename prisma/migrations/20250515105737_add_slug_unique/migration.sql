/*
  Warnings:

  - You are about to drop the column `address_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `model_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `product` table. All the data in the column will be lost.
  - Made the column `other_model` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_address_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_model_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_user_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "address_id",
DROP COLUMN "model_id",
DROP COLUMN "user_id",
ALTER COLUMN "other_model" SET NOT NULL;
