import { IUsersRepository } from '#/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IServiceRequest {
  userId: string
}

interface IServiceResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ userId }: IServiceRequest): Promise<IServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
