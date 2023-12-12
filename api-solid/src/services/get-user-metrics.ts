import { ICheckInsRepository } from '#/repositories/check-ins-repository'

interface IServiceRequest {
  userId: string
}

interface IServiceResponse {
  checkInsCount: number
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ userId }: IServiceRequest): Promise<IServiceResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
