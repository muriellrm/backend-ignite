import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { randomUUID } from 'node:crypto'

import { CheckInUseCase } from './check-in'

import { InMemoryCheckInRepository } from '#/repositories/in-memory/in-memory-check-ins-repositories'
import { InMemoryGymRepository } from '#/repositories/in-memory/in-memory-gyms-repositories'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('Check In UseCase', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      description: 'Typescript check',
      title: 'Node Gym',
      latitude: 0,
      longitude: 0,
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
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
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

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      description: 'Typescript check',
      title: 'React Gym',
      latitude: new Decimal(-28.7380733),
      longitude: new Decimal(-49.3630325),
      phone: '4812345678',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: randomUUID(),
        userLatitude: -28.7478485,
        userLongitude: -49.4889183,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
