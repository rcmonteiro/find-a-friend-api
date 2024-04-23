import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('/controllers/pets/create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const { id: orgId } = await prisma.org.create({
      data: {
        title: 'Sample Org',
        name: 'John Doe',
        email: 'john@doe.com',
        phone: '1124512154',
        address: 'Rua dos bobos, 0',
        city: 'Camboriú',
        state: 'SC',
        zip: '88248000',
        password_hash: await hash('123456', 6),
      },
    })
    const { id: petId } = await prisma.pet.create({
      data: {
        org_id: orgId,
        name: 'Chanfro',
        species: 'DOG',
      },
    })

    const sutResponse = await request(app.server).get(`/pets/${petId}`).send()
    expect(sutResponse.statusCode).toEqual(200)
    expect(sutResponse.body.pet).toEqual(expect.objectContaining({ id: petId }))
    expect(sutResponse.body.pet).toEqual(
      expect.objectContaining({ name: 'Chanfro' }),
    )
  })
})
