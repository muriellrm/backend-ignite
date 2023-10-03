import { EmailAlreadyExistsError } from '#/services/errors/email-already-exists-error'
import { makeRegisterService } from '#/services/factories/make-register-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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
    const registerService = makeRegisterService()
    await registerService.execute(data)
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError)
      return reply.status(409).send({ message: err.message })

    throw err
  }

  return reply.status(201).send()
}
