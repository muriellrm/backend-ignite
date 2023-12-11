import { ICheckInsRepository } from '#/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface IServiceRequest {
  userId: string
  page: number
}

interface IServiceResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ userId, page }: IServiceRequest): Promise<IServiceResponse> {
    const checkIns = await this.checkInsRepository.findAllByUserId(userId, page)

    return { checkIns }
  }
}
