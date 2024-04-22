import { PrismaOrgRepo } from '@/repos/prisma/prisma-org-repo'
import { PrismaPetRepo } from '@/repos/prisma/prisma-pet-repo'
import { PetCreateUseCase } from '../pet-create'

export const makeCreateUseCase = () => {
  const orgRepo = new PrismaOrgRepo()
  const petRepo = new PrismaPetRepo()
  const createUserCase = new PetCreateUseCase(petRepo, orgRepo)

  return createUserCase
}
