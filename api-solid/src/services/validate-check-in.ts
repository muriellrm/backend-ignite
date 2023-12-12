import { ICheckInsRepository } from '#/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IServiceRequest {
  checkInId: string
}

interface IServiceResponse {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ checkInId }: IServiceRequest): Promise<IServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
