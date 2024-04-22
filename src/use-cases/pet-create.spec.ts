import { InMemoryOrgRepo } from '@/repos/in-memory/in-memory-org-repo'
import { InMemoryPetRepo } from '@/repos/in-memory/in-memory-pet-repo'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetCreateUseCase } from './pet-create'

let petRepo: InMemoryPetRepo
let orgRepo: InMemoryOrgRepo
let sut: PetCreateUseCase

describe('use-cases/PetCreate', () => {
  beforeEach(async () => {
    orgRepo = new InMemoryOrgRepo()
    petRepo = new InMemoryPetRepo(orgRepo)
    sut = new PetCreateUseCase(petRepo, orgRepo)
  })

  it('should be able to create a pet', async () => {
    const org = await orgRepo.create({
      id: randomUUID(),
      title: 'Sample Org',
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '1124512154',
      address: 'Rua dos bobos, 0',
      city: 'Camboriú',
      state: 'SC',
      zip: '88248000',
      password_hash: await hash('123456', 6),
    })
    const { pet } = await sut.execute({
      org_id: org.id,
      name: 'Kimchi',
    })
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet with an invalid Org ID', async () => {
    await expect(() =>
      sut.execute({
        org_id: randomUUID(),
        name: 'Kimchi',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
