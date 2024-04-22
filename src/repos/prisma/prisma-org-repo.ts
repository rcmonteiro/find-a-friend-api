import { prisma } from '@/lib/prisma'
import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrgRepo } from '../org-repo'

export class PrismaOrgRepo implements OrgRepo {
  public orgs: Org[] = []

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

    await prisma.org.create({ data: org })

    return org
  }

  async getById(id: string) {
    const org = await prisma.org.findUnique({ where: { id } })
    return org ?? null
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } })
    return org ?? null
  }
}
