import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterService } from '#/services/register'
import { PrismaUsersRepository } from '#/repositories/prisma/prisma-users-repository'
import { EmailAlreadyExistsError } from '#/services/errors/email-already-exists-error'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchemaZ = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const data = registerBodySchemaZ.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(usersRepository)

    await registerService.execute(data)
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError)
      return reply.status(409).send({ message: err.message })

    throw err
  }

  return reply.status(201).send()
}
