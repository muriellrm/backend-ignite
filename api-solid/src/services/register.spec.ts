import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { FakeUserRepository } from '#/repositories/fakes/fake-users-repositories'

import { RegisterService } from './register'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

describe('Register Service', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new FakeUserRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      email: 'james@prisma.com',
      password: '123456',
      name: 'James',
    })

    const isPasswordMatchesHash = await compare('123456', user.password_hash)

    expect(isPasswordMatchesHash).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new FakeUserRepository()
    const registerService = new RegisterService(usersRepository)

    const user = {
      email: 'james@prisma.com',
      password: '123456',
      name: 'James',
    }

    await registerService.execute(user)

    await expect(() => registerService.execute(user)).rejects.toBeInstanceOf(
      EmailAlreadyExistsError,
    )
  })

  it('should be able to register', async () => {
    const usersRepository = new FakeUserRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      email: 'james@prisma.com',
      password: '123456',
      name: 'James',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
