import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'

export class FakeUserRepository implements IUsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: 'user-id-1',
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    return this.items.find((user) => user.email === email) ?? null
  }
}
