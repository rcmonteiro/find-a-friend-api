import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { PetCreateUseCaseSchema } from '@/use-cases/pet-create'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { create } from './create'

export const petRoutes = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/pets',
    {
      schema: {
        summary: 'Pet Create',
        tags: ['Pet'],
        body: PetCreateUseCaseSchema,
        response: {
          201: z.string().nullable().default(''),
        },
      },
      onRequest: [verifyJwt],
    },
    create,
  )
}
