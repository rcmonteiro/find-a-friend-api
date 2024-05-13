import { InMemoryOrgRepo } from '@/repos/in-memory/in-memory-org-repo'
import { InMemoryPetRepo } from '@/repos/in-memory/in-memory-pet-repo'
import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { PetGetUseCase } from './pet-get'

let petRepo: InMemoryPetRepo
let orgRepo: InMemoryOrgRepo
let sut: PetGetUseCase
let orgInput: Prisma.OrgCreateInput

describe('use-cases/PetGet', () => {
  beforeEach(async () => {
    orgRepo = new InMemoryOrgRepo()
    petRepo = new InMemoryPetRepo(orgRepo)
    sut = new PetGetUseCase(petRepo, orgRepo)
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

  it('should be able to get all the pet information', async () => {
    await orgRepo.create(orgInput)
    const { id } = await petRepo.create({
      org_id: 'org-01',
      name: 'Kimchi',
      bio: 'Um cão muito amigável e simpático',
      species: 'DOG',
      age: 'ADULT',
      size: 'SMALL',
      environment: 'APT_CONDO',
      energy: 'HIGH',
      independence_level: 'MODERATE',
    })
    const { pet, org } = await sut.execute(id)
    expect(pet?.id).toEqual(id)
    expect(pet).toEqual({
      id,
      org_id: 'org-01',
      name: 'Kimchi',
      bio: 'Um cão muito amigável e simpático',
      species: 'DOG',
      age: 'ADULT',
      size: 'SMALL',
      environment: 'APT_CONDO',
      energy: 'HIGH',
      independence_level: 'MODERATE',
    })

    expect(org).toEqual({
      title: 'Sample Org',
      phone: '1124512154',
      address: 'Rua dos bobos, 0',
      city: 'Camboriú',
      state: 'SC',
      zip: '88248000',
    })
  })
})
