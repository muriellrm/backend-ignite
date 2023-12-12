import { beforeEach, describe, expect, it } from 'vitest'

import { FakeGymRepository } from '#/repositories/fakes/fake-gyms-repositories'
import { SearchGymsService } from './search-gyms'

let gymsRepository: FakeGymRepository
let sut: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new FakeGymRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      description: null,
      phone: null,
      title: 'JavaScript Gym',
      latitude: -28.7380733,
      longitude: -49.3630325,
    })

    await gymsRepository.create({
      description: null,
      phone: null,
      title: 'TypeScript Gym',
      latitude: -29.7380733,
      longitude: -79.3630325,
    })

    const { gyms } = await sut.execute({
      page: 1,
      query: 'JavaScript',
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to search paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        description: null,
        phone: null,
        title: `Gym ${i}`,
        latitude: -29.7380733,
        longitude: -79.3630325,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' }),
    ])
  })
})
