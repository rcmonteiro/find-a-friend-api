import { PrismaOrgRepo } from '@/repos/prisma/prisma-org-repo'
import { SigninUseCase } from '../signin'

export const makeSigninUseCase = () => {
  const orgRepo = new PrismaOrgRepo()
  const signinUserCase = new SigninUseCase(orgRepo)

  return signinUserCase
}
