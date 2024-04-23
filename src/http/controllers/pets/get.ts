import { makeGetUseCase } from '@/use-cases/factories/make-get-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const PetGetSchema = z.object({
  id: z.string().uuid(),
})

export const get = async (request: FastifyRequest, reply: FastifyReply) => {
  const GetUseCase = makeGetUseCase()
  const petId = PetGetSchema.parse(request.params).id

  const { pet } = await GetUseCase.execute(petId)
  return reply.status(200).send({ pet })
}
