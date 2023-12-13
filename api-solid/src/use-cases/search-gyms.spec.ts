import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymRepository } from '#/repositories/in-memory/in-memory-gyms-repositories'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe('Search Gyms UseCase', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new SearchGymsUseCase(gymsRepository)
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
