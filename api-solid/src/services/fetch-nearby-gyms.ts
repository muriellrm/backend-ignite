import { IGymsRepository } from '#/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface IServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface IServiceResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IServiceRequest): Promise<IServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
