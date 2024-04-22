import { PetListUseCaseQuery } from '@/use-cases/pet-list'
import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetRepo } from '../pet-repo'
import { InMemoryOrgRepo } from './in-memory-org-repo'

export class InMemoryPetRepo implements PetRepo {
  private pets: Pet[] = []

  constructor(private orgRepo: InMemoryOrgRepo) {}

  async getById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id)
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
    this.pets.push(pet)
    return pet
  }

  async findMany(data: PetListUseCaseQuery) {
    const orgs = this.orgRepo.orgs.filter((org) => (org.city = data.city))
    const pets = this.pets
      .filter((pet) => orgs.some((org) => org.id === pet.org_id))
      .filter((pet) => (data.species ? pet.species === data.species : true))
      .filter((pet) => (data.size ? pet.size === data.size : true))
      .filter((pet) => (data.energy ? pet.energy === data.energy : true))
      .filter((pet) => (data.age ? pet.age === data.age : true))
      .filter((pet) =>
        data.environment ? pet.environment === data.environment : true,
      )
      .filter((pet) =>
        data.independence_level
          ? pet.independence_level === data.independence_level
          : true,
      )
    return pets
  }
}
