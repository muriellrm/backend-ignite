import { ICheckInsRepository } from '#/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface IUseCaseRequest {
  userId: string
  page: number
}

interface IUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ userId, page }: IUseCaseRequest): Promise<IUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findAllByUserId(userId, page)

    return { checkIns }
  }
}
