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

  it('should be able to create a pet', async () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john@doe.com',
      password: '123456',
    })
    const { token } = authResponse.body

    const sutResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        org_id: orgId,
        name: 'Chanfro',
        species: 'Dog',
      })
    expect(sutResponse.statusCode).toEqual(201)
  })
})
