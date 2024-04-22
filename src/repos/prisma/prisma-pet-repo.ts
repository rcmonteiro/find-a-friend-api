import { prisma } from '@/lib/prisma'
import { PetListUseCaseQuery } from '@/use-cases/pet-list'
import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetRepo } from '../pet-repo'

export class PrismaPetRepo implements PetRepo {
  private pets: Pet[] = []

  async getById(id: string) {
    const pet = prisma.pet.findUnique({ where: { id } })
    return pet ?? null
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      bio: data?.bio ?? null,
      age: data?.age ?? null,
      species: data?.species ?? null,
      size: data?.size ?? null,
      energy: data?.energy ?? null,
      environment: data?.environment ?? null,
      independence_level: data?.independence_level ?? null,
      org_id: data.org_id,
    }
    const petResponse = await prisma.pet.create({ data: pet })
    return petResponse
  }

  async findMany(data: PetListUseCaseQuery) {
    const pets = prisma.pet.findMany({
      where: {
        species: data.species,
        size: data.size,
        age: data.age,
        energy: data.energy,
        environment: data.environment,
        independence_level: data.independence_level,
        org: {
          city: {
            contains: data.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }
}
