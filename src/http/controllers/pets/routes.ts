import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { PetCreateSchema, create } from './create'
import { get } from './get'
import { list } from './list'

export const petRoutes = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/pets',
    {
      schema: {
        summary: 'Pet Create',
        tags: ['Pet'],
        body: PetCreateSchema,
        response: {
          201: z.string().nullable().default(''),
        },
      },
      onRequest: [verifyJwt],
    },
    create,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/pets',
    {
      schema: {
        summary: 'Pet List',
        tags: ['Pet'],
      },
    },
    list,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/pets/:id',
    {
      schema: {
        summary: 'Pet Get',
        tags: ['Pet'],
      },
    },
    get,
  )
}
