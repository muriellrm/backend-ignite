import { InvalidCredentialsError } from '#/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '#/use-cases/factories/make-authenticate-use-case'
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
    const authenticateUseCase = makeAuthenticateUseCase()
    await authenticateUseCase.execute(data)
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return reply.status(400).send({ message: err.message })

    throw err
  }

  return reply.status(200).send()
}
