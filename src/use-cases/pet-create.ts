import { OrgRepo } from '@/repos/org-repo'
import { PetRepo } from '@/repos/pet-repo'
import { z } from 'zod'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export const PetCreateUseCaseSchema = z.object({
  org_id: z.string().uuid(),
  name: z.string(),
  bio: z.string().nullish(),
  age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'SENIOR']).nullish(),
  size: z.enum(['MINI', 'SMALL', 'MEDIUM', 'LARGE']).nullish(),
  species: z.enum(['DOG', 'CAT', 'BIRD', 'OTHER']).nullish(),
  energy: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']).nullish(),
  environment: z
    .enum(['APT_CONDO', 'SMALL_YARD', 'LARGE_YARD', 'FARM_RURAL'])
    .nullish(),
  independence_level: z.enum(['VERY_LOW', 'LOW', 'MODERATE', 'HIGH']).nullish(),
})

export type PetCreateUseCaseBody = z.infer<typeof PetCreateUseCaseSchema>

export class PetCreateUseCase {
  constructor(
    private petRepo: PetRepo,
    private orgRepo: OrgRepo,
  ) {}

  async execute(data: PetCreateUseCaseBody) {
    data = PetCreateUseCaseSchema.parse(data)

    const orgExists = await this.orgRepo.getById(data.org_id)
    if (!orgExists) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petRepo.create(data)
    return { pet }
  }
}
