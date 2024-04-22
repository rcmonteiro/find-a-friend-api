import { OrgRepo } from '@/repos/org-repo'
import { compare } from 'bcryptjs'
import { z } from 'zod'
import { OrgInvalidCredentialsError } from './errors/org-invalid-credentials-error.js'

export const SigninUseCaseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SigninUseCaseRequest = z.infer<typeof SigninUseCaseSchema>

export class SigninUseCase {
  constructor(private repo: OrgRepo) {}

  async execute(data: SigninUseCaseRequest) {
    data = SigninUseCaseSchema.parse(data)
    const org = await this.repo.findByEmail(data.email)
    if (!org) {
      throw new OrgInvalidCredentialsError()
    }

    const isValidPassword = await compare(data.password, org.password_hash)

    if (!isValidPassword) {
      throw new OrgInvalidCredentialsError()
    }

    return { org }
  }
}
