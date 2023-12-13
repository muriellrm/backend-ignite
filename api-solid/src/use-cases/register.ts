import { IUsersRepository } from '#/repositories/users-repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { User } from '@prisma/client'

interface IUseCaseRequest {
  name: string
  email: string
  password: string
}

interface IUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: IUseCaseRequest): Promise<IUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const existsUser = await this.usersRepository.findByEmail(email)

    if (existsUser) {
      throw new EmailAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return {
      user,
    }
  }
}