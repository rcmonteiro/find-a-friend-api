import { OrgRepo } from '@/repos/org-repo'
import { PetRepo } from '@/repos/pet-repo'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class PetGetUseCase {
  constructor(
    private petRepo: PetRepo,
    private orgRepo: OrgRepo,
  ) {}

  async execute(id: string) {
    const petData = await this.petRepo.getById(id)
    if (!petData) throw new ResourceNotFoundError()

    const orgData = await this.orgRepo.getById(petData.org_id)
    if (!orgData) throw new ResourceNotFoundError()

    return {
      pet: petData,
      org: {
        title: orgData.title,
        address: orgData.address,
        city: orgData.city,
        state: orgData.state,
        zip: orgData.zip,
        phone: orgData.phone,
      },
    }
  }
}
