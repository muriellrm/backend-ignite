import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'

import { FakeCheckInRepository } from '#/repositories/fakes/fake-check-ins-repositories'
import { randomUUID } from 'node:crypto'
import { CheckInService } from './check-in'

let checkInsRepository: FakeCheckInRepository
let sut: CheckInService

describe('Check In Service', () => {
  beforeEach(() => {
    checkInsRepository = new FakeCheckInRepository()
    sut = new CheckInService(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: randomUUID(),
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 7, 20, 12, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in different days', async () => {
    vi.setSystemTime(new Date(2022, 7, 20, 12, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2022, 7, 21, 12, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
