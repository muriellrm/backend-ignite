import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { FakeUserRepository } from '#/repositories/fakes/fake-users-repositories'

import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: FakeUserRepository
let sut: AuthenticateService

describe('Autenthicate Service', () => {
  beforeEach(() => {
    usersRepository = new FakeUserRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to autenthicate ', async () => {
    await usersRepository.create({
      name: 'james',
      email: 'james@prisma.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'james@prisma.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to autenthicate with non existent email', async () => {
    await expect(
      sut.execute({
        email: 'james@prisma.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to autenthicate with wrong password', async () => {
    await usersRepository.create({
      name: 'james',
      email: 'james@prisma.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        email: 'james@prisma.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
