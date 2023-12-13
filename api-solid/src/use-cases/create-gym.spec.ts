import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymRepository } from '#/repositories/in-memory/in-memory-gyms-repositories'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Create Gym UseCase', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      description: null,
      phone: null,
      title: 'JavaScript Gym',
      latitude: -28.7380733,
      longitude: -49.3630325,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
