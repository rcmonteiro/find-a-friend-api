import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error.ts'
import { makeSignupUseCase } from '@/use-cases/factories/make-signup-use-case'
import { SignupUseCaseBody } from '@/use-cases/signup'
import { FastifyReply, FastifyRequest } from 'fastify'

export const signup = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = request.body as SignupUseCaseBody

  try {
    const signupUseCase = makeSignupUseCase()
    await signupUseCase.execute(data)
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.code(409).send({ message: error.message })
    }
    throw error
  }
}
