import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { FakeUserRepository } from '#/repositories/fakes/fake-users-repositories'

import { RegisterService } from './register'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

let usersRepository: FakeUserRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new FakeUserRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'james@prisma.com',
      password: '123456',
      name: 'James',
    })

    const isPasswordMatchesHash = await compare('123456', user.password_hash)

    expect(isPasswordMatchesHash).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const user = {
      email: 'james@prisma.com',
      password: '123456',
      name: 'James',
    }

    await sut.execute(user)

    await expect(() => sut.execute(user)).rejects.toBeInstanceOf(
      EmailAlreadyExistsError,
    )
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      email: 'james@prisma.com',
      password: '123456',
      name: 'James',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
