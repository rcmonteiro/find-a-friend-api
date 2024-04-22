import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrgRepo } from '../org-repo'

export class InMemoryOrgRepo implements OrgRepo {
  private orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      title: data.title,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      password_hash: data.password_hash,
    }
    this.orgs.push(org)
    return org
  }

  async findById(id: string) {
    const org = this.orgs.find((org) => org.id === id)
    return org ?? null
  }

  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email)
    return org ?? null
  }
}
