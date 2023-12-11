import { beforeEach, describe, expect, it } from 'vitest'

import { FakeGymRepository } from '#/repositories/fakes/fake-gyms-repositories'
import { CreateGymService } from './create-gym'

let gymsRepository: FakeGymRepository
let sut: CreateGymService

describe('Create Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new FakeGymRepository()
    sut = new CreateGymService(gymsRepository)
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
