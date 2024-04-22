import { InMemoryOrgRepo } from '@/repos/in-memory/in-memory-org-repo'
import { InMemoryPetRepo } from '@/repos/in-memory/in-memory-pet-repo'
import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { PetListUseCase } from './pet-list'

let petRepo: InMemoryPetRepo
let orgRepo: InMemoryOrgRepo
let sut: PetListUseCase
let orgInput: Prisma.OrgCreateInput

describe('use-cases/PetCreate', () => {
  beforeEach(async () => {
    orgRepo = new InMemoryOrgRepo()
    petRepo = new InMemoryPetRepo(orgRepo)
    sut = new PetListUseCase(petRepo, orgRepo)
    orgInput = {
      id: 'org-01',
      title: 'Sample Org',
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '1124512154',
      address: 'Rua dos bobos, 0',
      city: 'Camboriú',
      state: 'SC',
      zip: '88248000',
      password_hash: await hash('123456', 6),
    }
  })

  it('should be able to list all the pets in a given city', async () => {
    await orgRepo.create(orgInput)
    await petRepo.create({
      org_id: 'org-01',
      name: 'Kimchi',
      species: 'DOG',
    })
    await petRepo.create({
      org_id: 'org-01',
      name: 'Nestor',
      species: 'CAT',
    })
    const { pets } = await sut.execute({
      city: 'Camboriú',
    })
    expect(pets).toHaveLength(2)
  })

  it('should be able to list pets filtered by species', async () => {
    await orgRepo.create(orgInput)
    await petRepo.create({
      org_id: 'org-01',
      name: 'Kimchi',
      species: 'DOG',
    })
    await petRepo.create({
      org_id: 'org-01',
      name: 'Nestor',
      species: 'CAT',
    })
    const { pets } = await sut.execute({
      city: 'Camboriú',
      species: 'DOG',
    })
    expect(pets).toHaveLength(1)
  })

  it('should be able to list pets filtered by age', async () => {
    await orgRepo.create(orgInput)
    await petRepo.create({
      org_id: 'org-01',
      name: 'Kimchi',
      age: 'ADULT',
    })
    await petRepo.create({
      org_id: 'org-01',
      name: 'Nestor',
      age: 'PUPPY',
    })
    const { pets } = await sut.execute({
      city: 'Camboriú',
      age: 'PUPPY',
    })
    expect(pets).toHaveLength(1)
  })

  it('should be able to list pets filtered by size', async () => {
    await orgRepo.create(orgInput)
    await petRepo.create({
      org_id: 'org-01',
      name: 'Kimchi',
      size: 'LARGE',
    })
    await petRepo.create({
      org_id: 'org-01',
      name: 'Nestor',
      size: 'MEDIUM',
    })
    const { pets } = await sut.execute({
      city: 'Camboriú',
      size: 'MEDIUM',
    })
    expect(pets).toHaveLength(1)
  })

  it('should be able to list pets filtered by environment', async () => {
    await orgRepo.create(orgInput)
    await petRepo.create({
      org_id: 'org-01',
      name: 'Kimchi',
      environment: 'APT_CONDO',
    })
    await petRepo.create({
      org_id: 'org-01',
      name: 'Nestor',
      environment: 'FARM_RURAL',
    })
    const { pets } = await sut.execute({
      city: 'Camboriú',
      environment: 'FARM_RURAL',
    })
    expect(pets).toHaveLength(1)
  })

  it('should be able to list pets filtered by energy', async () => {
    await orgRepo.create(orgInput)
    await petRepo.create({
      org_id: 'org-01',
      name: 'Kimchi',
      energy: 'HIGH',
    })
    await petRepo.create({
      org_id: 'org-01',
      name: 'Nestor',
      energy: 'MODERATE',
    })
    const { pets } = await sut.execute({
      city: 'Camboriú',
      energy: 'MODERATE',
    })
    expect(pets).toHaveLength(1)
  })

  it('should be able to list pets filtered by independence level', async () => {
    await orgRepo.create(orgInput)
    await petRepo.create({
      org_id: 'org-01',
      name: 'Kimchi',
      independence_level: 'HIGH',
    })
    await petRepo.create({
      org_id: 'org-01',
      name: 'Nestor',
      independence_level: 'MODERATE',
    })
    const { pets } = await sut.execute({
      city: 'Camboriú',
      independence_level: 'MODERATE',
    })
    expect(pets).toHaveLength(1)
  })
})
