import { prisma } from '#/lib/prisma'
import { PrismaUsersRepository } from '#/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface IProps {
  name: string
  email: string
  password: string
}

export const registerService = async ({ email, name, password }: IProps) => {
  const password_hash = await hash(password, 6)

  const existsUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existsUser) {
    throw new Error(`Email already exists.`)
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({ email, name, password_hash })
}
