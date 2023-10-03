import { ICheckInsRepository } from '#/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface IServiceRequest {
  userId: string
  gymId: string
}

interface IServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ userId, gymId }: IServiceRequest): Promise<IServiceResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })
    return { checkIn }
  }
}
