import { IGymsRepository } from '#/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface IUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface IUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: IUseCaseRequest): Promise<IUseCaseResponse> {
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
