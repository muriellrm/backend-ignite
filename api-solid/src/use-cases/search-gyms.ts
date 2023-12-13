import { IGymsRepository } from '#/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface IUseCaseRequest {
  query: string
  page: number
}

interface IUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({ query, page }: IUseCaseRequest): Promise<IUseCaseResponse> {
    const gyms = await this.gymsRepository.findAll(query, page)

    return {
      gyms,
    }
  }
}
