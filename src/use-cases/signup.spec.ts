import { InMemoryOrgRepo } from '@/repos/in-memory/in-memory-org-repo'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error.ts'
import { SignupUseCase } from './signup'

let orgRepo: InMemoryOrgRepo
let sut: SignupUseCase

const orgInput = {
  title: 'Sample Org',
  name: 'John Doe',
  email: 'john@doe.com',
  phone: '1124512154',
  address: 'Rua dos bobos, 0',
  city: 'Camboriú',
  state: 'SC',
  zip: '88248000',
  password: '123456',
}

describe('use-cases/signup', () => {
  beforeEach(() => {
    orgRepo = new InMemoryOrgRepo()
    sut = new SignupUseCase(orgRepo)
  })

  it('should be able to signup', async () => {
    const { org } = await sut.execute(orgInput)
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to signup with an existing email', async () => {
    await sut.execute(orgInput)
    await expect(() => sut.execute(orgInput)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    )
  })

  it('should hash the password on signup', async () => {
    const { org } = await sut.execute(orgInput)
    const isPasswordCorrectlyHashed = await compare(
      orgInput.password,
      org.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to signup with a short password', async () => {
    await expect(() =>
      sut.execute({ ...orgInput, password: '123' }),
    ).rejects.toBeInstanceOf(ZodError)
  })
})
