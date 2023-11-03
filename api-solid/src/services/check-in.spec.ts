import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { randomUUID } from 'node:crypto'

import { CheckInService } from './check-in'

import { FakeCheckInRepository } from '#/repositories/fakes/fake-check-ins-repositories'
import { FakeGymRepository } from '#/repositories/fakes/fake-gyms-repositories'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: FakeCheckInRepository
let gymsRepository: FakeGymRepository
let sut: CheckInService

describe('Check In Service', () => {
  beforeEach(() => {
    checkInsRepository = new FakeCheckInRepository()
    gymsRepository = new FakeGymRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      description: 'Typescript check',
      title: 'Node Gym',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '4812345678',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: randomUUID(),
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 7, 20, 12, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in different days', async () => {
    vi.setSystemTime(new Date(2022, 7, 20, 12, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 7, 21, 12, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
