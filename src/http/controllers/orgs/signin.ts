import { OrgInvalidCredentialsError } from '@/use-cases/errors/org-invalid-credentials-error'
import { makeSigninUseCase } from '@/use-cases/factories/make-signin-use-case'
import { SigninUseCaseBody } from '@/use-cases/signin'
import { FastifyReply, FastifyRequest } from 'fastify'

export const signin = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = request.body as SigninUseCaseBody

  try {
    const signinUseCase = makeSigninUseCase()
    const { org } = await signinUseCase.execute(data)

    const token = await reply.jwtSign({
      sign: {
        sub: org.id,
      },
    })

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: org.id,
        expiresIn: '7d',
      },
    })

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (error) {
    if (error instanceof OrgInvalidCredentialsError) {
      return reply.code(409).send({ message: 'Invalid Credentials' })
    }
    throw error
  }
}
