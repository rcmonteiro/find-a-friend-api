import { OrgRepo } from '@/repos/org-repo'
import { PetRepo } from '@/repos/pet-repo'
import { z } from 'zod'

const PetListUseCaseSchema = z.object({
  city: z.string(),
  age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'SENIOR']).nullish(),
  size: z.enum(['MINI', 'SMALL', 'MEDIUM', 'LARGE']).nullish(),
  species: z.enum(['DOG', 'CAT', 'BIRD', 'OTHER']).nullish(),
  energy: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']).nullish(),
  environment: z
    .enum(['APT_CONDO', 'SMALL_YARD', 'LARGE_YARD', 'FARM_RURAL'])
    .nullish(),
  independence_level: z.enum(['VERY_LOW', 'LOW', 'MODERATE', 'HIGH']).nullish(),
})

export type PetListUseCaseQuery = z.infer<typeof PetListUseCaseSchema>

export class PetListUseCase {
  constructor(
    private petRepo: PetRepo,
    private orgRepo: OrgRepo,
  ) {}

  async execute(data: PetListUseCaseQuery) {
    data = PetListUseCaseSchema.parse(data)
    const pets = await this.petRepo.findMany(data)

    return { pets }
  }
}
