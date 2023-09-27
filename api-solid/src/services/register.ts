import { IUsersRepository } from '#/repositories/users-repository'
import { hash } from 'bcryptjs'

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
      throw new Error(`Email already exists.`)
    }

    await this.usersRepository.create({ email, name, password_hash })
  }
}
