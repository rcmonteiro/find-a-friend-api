/*
  Warnings:

  - The values [FARM_RURAl] on the enum `PetEnvironment` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PetEnvironment_new" AS ENUM ('APT_CONDO', 'SMALL_YARD', 'LARGE_YARD', 'FARM_RURAL');
ALTER TABLE "pets" ALTER COLUMN "environment" TYPE "PetEnvironment_new" USING ("environment"::text::"PetEnvironment_new");
ALTER TYPE "PetEnvironment" RENAME TO "PetEnvironment_old";
ALTER TYPE "PetEnvironment_new" RENAME TO "PetEnvironment";
DROP TYPE "PetEnvironment_old";
COMMIT;
