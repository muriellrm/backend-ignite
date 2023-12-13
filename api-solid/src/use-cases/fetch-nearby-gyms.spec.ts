import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymRepository } from '#/repositories/in-memory/in-memory-gyms-repositories'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Near By Gyms UseCase', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      description: null,
      phone: null,
      title: 'Near Gym',
      latitude: -28.7531004,
      longitude: -49.4725013,
    })

    await gymsRepository.create({
      description: null,
      phone: null,
      title: 'Far Gym',
      latitude: -28.721026,
      longitude: -49.2639675,
    })

    const { gyms } = await sut.execute({
      userLatitude: -28.7531007,
      userLongitude: -49.4725013,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
