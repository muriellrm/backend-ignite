import { beforeEach, describe, expect, it } from 'vitest'

import { FakeCheckInRepository } from '#/repositories/fakes/fake-check-ins-repositories'
import { randomUUID } from 'node:crypto'
import { CheckInService } from './check-in'

let checkInsRepository: FakeCheckInRepository
let sut: CheckInService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    checkInsRepository = new FakeCheckInRepository()
    sut = new CheckInService(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: randomUUID(),
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
