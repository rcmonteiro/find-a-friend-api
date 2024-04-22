import { makeCreateUseCase } from '@/use-cases/factories/make-create-use-case'
import { PetCreateUseCaseBody } from '@/use-cases/pet-create'
import { FastifyReply, FastifyRequest } from 'fastify'

export const create = (request: FastifyRequest, reply: FastifyReply) => {
  const createUseCase = makeCreateUseCase()
  const data = request.body as PetCreateUseCaseBody
  createUseCase.execute(data)
  return reply.status(201).send()
}
