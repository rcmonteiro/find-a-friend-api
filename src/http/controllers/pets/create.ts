import { makeCreateUseCase } from '@/use-cases/factories/make-create-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const PetCreateSchema = z.object({
  name: z.string(),
  bio: z.string().nullish(),
  age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'SENIOR']).nullish(),
  size: z.enum(['MINI', 'SMALL', 'MEDIUM', 'LARGE']).nullish(),
  species: z.enum(['DOG', 'CAT', 'BIRD', 'OTHER']).nullish(),
  energy: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']).nullish(),
  environment: z
    .enum(['APT_CONDO', 'SMALL_YARD', 'LARGE_YARD', 'FARM_RURAL'])
    .nullish(),
  independence_level: z.enum(['VERY_LOW', 'LOW', 'MODERATE', 'HIGH']).nullish(),
})

export const create = (request: FastifyRequest, reply: FastifyReply) => {
  const createUseCase = makeCreateUseCase()
  const input = PetCreateSchema.parse(request.body)
  createUseCase.execute({
    ...input,
    org_id: request.user.sub,
  })
  return reply.status(201).send()
}
