import { OrgRepo } from '@/repos/org-repo'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error.ts'

const SignupUseCaseSchema = z.object({
  title: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string().length(2),
  zip: z.string().length(8),
  password: z.string().min(6),
})

type SignupUseCaseRequest = z.infer<typeof SignupUseCaseSchema>

export class SignupUseCase {
  constructor(private repo: OrgRepo) {}

  async execute(data: SignupUseCaseRequest) {
    const orgAlreadyExists = await this.repo.findByEmail(data.email)
    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    data = SignupUseCaseSchema.parse(data)

    const org = await this.repo.create({
      title: data.title,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      password_hash: await hash(data.password, 6),
    })
    return { org }
  }
}
