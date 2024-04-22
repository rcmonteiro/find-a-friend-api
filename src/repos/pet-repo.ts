import { PetListUseCaseQuery } from '@/use-cases/pet-list'
import { Pet, Prisma } from '@prisma/client'

export interface PetRepo {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findMany(data: PetListUseCaseQuery): Promise<Pet[]>
  getById(id: string): Promise<Pet | null>
}
