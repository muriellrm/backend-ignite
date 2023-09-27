import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { registerService } from '#/services/register'

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
    await registerService(data)
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
