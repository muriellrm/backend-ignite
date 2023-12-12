import { IGymsRepository } from '#/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface IServiceRequest {
  query: string
  page: number
}

interface IServiceResponse {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({ query, page }: IServiceRequest): Promise<IServiceResponse> {
    const gyms = await this.gymsRepository.findAll(query, page)

    return {
      gyms,
    }
  }
}
