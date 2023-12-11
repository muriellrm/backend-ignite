import { IGymsRepository } from '#/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface IServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface IServiceResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: IServiceRequest): Promise<IServiceResponse> {
    const gym = await this.gymsRepository.create({
      description,
      latitude,
      longitude,
      phone,
      title,
    })

    return {
      gym,
    }
  }
}
