import { InMemoryOrgRepo } from '@/repos/in-memory/in-memory-org-repo'
import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgInvalidCredentialsError } from './errors/org-invalid-credentials-error.js'
import { SigninUseCase } from './signin.js'

let orgRepo: InMemoryOrgRepo
let sut: SigninUseCase
let orgInput: Prisma.OrgCreateInput

describe('use-cases/signin', () => {
  beforeEach(async () => {
    orgRepo = new InMemoryOrgRepo()
    sut = new SigninUseCase(orgRepo)
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

  it('should be able to signin', async () => {
    await orgRepo.create(orgInput)
    const { org } = await sut.execute({
      email: 'john@doe.com',
      password: '123456',
    })
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to signin with an non-existing email', async () => {
    await expect(() =>
      sut.execute({
        email: 'not-john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgInvalidCredentialsError)
  })

  it('should not be able to signin with an invalid password', async () => {
    await orgRepo.create(orgInput)
    await expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: 'xxxxxx',
      }),
    ).rejects.toBeInstanceOf(OrgInvalidCredentialsError)
  })
})
