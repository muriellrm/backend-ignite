import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '#/lib/prisma'
import { hash } from 'bcryptjs'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchemaZ = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchemaZ.parse(request.body)

  const password_hash = await hash(password, 6)

  const existsUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existsUser) {
    return reply.status(409).send()
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash,
    },
  })

  return reply.status(201).send()
}
