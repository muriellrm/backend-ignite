import { IUsersRepository } from '#/repositories/users-repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

interface IProps {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: IProps) {
    const password_hash = await hash(password, 6)

    const existsUser = await this.usersRepository.findByEmail(email)

    if (existsUser) {
      throw new EmailAlreadyExistsError()
    }

    await this.usersRepository.create({ email, name, password_hash })
  }
}
