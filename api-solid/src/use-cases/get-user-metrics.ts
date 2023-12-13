import { ICheckInsRepository } from '#/repositories/check-ins-repository'

interface IUseCaseRequest {
  userId: string
}

interface IUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ userId }: IUseCaseRequest): Promise<IUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
