-- CreateEnum
CREATE TYPE "PetSpecies" AS ENUM ('DOG', 'CAT', 'BIRD', 'OTHER');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "species" "PetSpecies",
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "energy" DROP NOT NULL,
ALTER COLUMN "environment" DROP NOT NULL,
ALTER COLUMN "independence_level" DROP NOT NULL;
