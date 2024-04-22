import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('/controllers/org/signin (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to signin', async () => {
    await request(app.server).post('/orgs').send({
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
    const response = await request(app.server).post('/sessions').send({
      email: 'john@doe.com',
      password: '123456',
    })
    expect(response.statusCode).toEqual(200)
  })

  it('should not be able to signin with wrong credentials', async () => {
    await request(app.server).post('/orgs').send({
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

    const response = await request(app.server).post('/sessions').send({
      email: 'john@doe.com',
      password: '1234567',
    })
    expect(response.statusCode).toEqual(409)
  })
})
