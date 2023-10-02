import { IUsersRepository } from '#/repositories/users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface IServiceRequest {
  email: string
  password: string
}

interface IServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IServiceRequest): Promise<IServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
