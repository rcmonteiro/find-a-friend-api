import { makeListUseCase } from '@/use-cases/factories/make-list-use-case'
import { PetListUseCaseSchema } from '@/use-cases/pet-list'
import { FastifyReply, FastifyRequest } from 'fastify'

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  const listUseCase = makeListUseCase()
  const query = PetListUseCaseSchema.parse(request.query)

  const { pets } = await listUseCase.execute(query)
  return reply.status(200).send({ pets })
}
