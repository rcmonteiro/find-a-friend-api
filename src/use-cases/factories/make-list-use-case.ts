import { PrismaOrgRepo } from '@/repos/prisma/prisma-org-repo'
import { PrismaPetRepo } from '@/repos/prisma/prisma-pet-repo'
import { PetListUseCase } from '../pet-list'

export const makeListUseCase = () => {
  const orgRepo = new PrismaOrgRepo()
  const petRepo = new PrismaPetRepo()
  const createUserCase = new PetListUseCase(petRepo, orgRepo)

  return createUserCase
}
