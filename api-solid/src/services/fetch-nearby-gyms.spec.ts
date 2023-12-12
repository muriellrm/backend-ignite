import { beforeEach, describe, expect, it } from 'vitest'

import { FakeGymRepository } from '#/repositories/fakes/fake-gyms-repositories'
import { FetchNearbyGymsService } from './fetch-nearby-gyms'

let gymsRepository: FakeGymRepository
let sut: FetchNearbyGymsService

describe('Fetch Near By Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new FakeGymRepository()
    sut = new FetchNearbyGymsService(gymsRepository)
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
