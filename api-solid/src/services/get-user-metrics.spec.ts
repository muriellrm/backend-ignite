import { beforeEach, describe, expect, it } from 'vitest'

import { FakeCheckInRepository } from '#/repositories/fakes/fake-check-ins-repositories'
import { GetUserMetricsService } from './get-user-metrics'

let checkInsRepository: FakeCheckInRepository
let sut: GetUserMetricsService

describe('Get User Metrics Service', () => {
  beforeEach(async () => {
    checkInsRepository = new FakeCheckInRepository()
    sut = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toBe(2)
  })
})
