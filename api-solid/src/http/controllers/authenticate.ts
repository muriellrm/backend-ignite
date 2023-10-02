import { PrismaUsersRepository } from '#/repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '#/services/authenticate'
import { InvalidCredentialsError } from '#/services/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const authenticateBodySchemaZ = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const data = authenticateBodySchemaZ.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerService = new AuthenticateService(usersRepository)

    await registerService.execute(data)
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return reply.status(400).send({ message: err.message })

    throw err
  }

  return reply.status(200).send()
}
