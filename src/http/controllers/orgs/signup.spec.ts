import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('/controllers/org/signup (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to signup', async () => {
    const response = await request(app.server).post('/orgs').send({
      title: 'Sample Org',
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '1124512154',
      address: 'Rua dos bobos, 0',
      city: 'Camboriú',
      state: 'SC',
      zip: '88248000',
      password: '123456',
    })
    expect(response.statusCode).toEqual(201)
  })
})
