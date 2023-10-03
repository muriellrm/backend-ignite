import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { FakeUserRepository } from '#/repositories/fakes/fake-users-repositories'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileService } from './get-user-profile'

let usersRepository: FakeUserRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new FakeUserRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john_doe@prisma.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to autenthicate with non existent email', async () => {
    await expect(
      sut.execute({
        userId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
