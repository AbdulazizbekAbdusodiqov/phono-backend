-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_district_id_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_region_id_fkey";

-- AlterTable
ALTER TABLE "address" ALTER COLUMN "lat" DROP NOT NULL,
ALTER COLUMN "long" DROP NOT NULL,
ALTER COLUMN "region_id" DROP NOT NULL,
ALTER COLUMN "district_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE SET NULL ON UPDATE CASCADE;
