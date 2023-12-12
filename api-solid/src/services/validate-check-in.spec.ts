import { beforeEach, describe, expect, it } from 'vitest'

import { FakeCheckInRepository } from '#/repositories/fakes/fake-check-ins-repositories'
import { ValidateCheckInService } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: FakeCheckInRepository

let sut: ValidateCheckInService

describe('Validate Check In Service', () => {
  beforeEach(async () => {
    checkInsRepository = new FakeCheckInRepository()
    sut = new ValidateCheckInService(checkInsRepository)
  })

  it('should be able to validate the check in', async () => {
    const { id } = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an non-existent check in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
