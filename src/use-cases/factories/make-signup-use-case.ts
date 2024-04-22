import { PrismaOrgRepo } from '@/repos/prisma/prisma-org-repo'
import { SignupUseCase } from '../signup'

export const makeSignupUseCase = () => {
  const orgRepo = new PrismaOrgRepo()
  const signupUserCase = new SignupUseCase(orgRepo)

  return signupUserCase
}
