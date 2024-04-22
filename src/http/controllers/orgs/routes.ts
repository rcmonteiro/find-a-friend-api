import { SigninUseCaseSchema } from '@/use-cases/signin'
import { SignupUseCaseSchema } from '@/use-cases/signup'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { signin } from './signin'
import { signup } from './signup'

export const orgRoutes = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/orgs',
    {
      schema: {
        summary: 'Org Sign-up',
        tags: ['Org'],
        body: SignupUseCaseSchema,
        response: {
          201: z.string().nullable().default(''),
        },
      },
    },
    signup,
  )
  app.post(
    '/sessions',
    {
      schema: {
        summary: 'Org Sign-in',
        tags: ['Org'],
        body: SigninUseCaseSchema,
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    signin,
  )
}
