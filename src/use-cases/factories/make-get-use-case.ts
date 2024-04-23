import { PrismaOrgRepo } from '@/repos/prisma/prisma-org-repo'
import { PrismaPetRepo } from '@/repos/prisma/prisma-pet-repo'
import { PetGetUseCase } from '../pet-get'

export const makeGetUseCase = () => {
  const orgRepo = new PrismaOrgRepo()
  const petRepo = new PrismaPetRepo()
  const getUserCase = new PetGetUseCase(petRepo, orgRepo)

  return getUserCase
}
