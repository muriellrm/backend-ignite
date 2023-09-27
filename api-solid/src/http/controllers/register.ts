import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterService } from '#/services/register'
import { PrismaUsersRepository } from '#/repositories/prisma/prisma-users-repository'

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
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
