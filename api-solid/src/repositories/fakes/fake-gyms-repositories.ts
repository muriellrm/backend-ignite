import { Gym } from '@prisma/client'
import { IGymsRepository } from '../gyms-repository'

export class FakeGymRepository implements IGymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    return this.items.find((user) => user.id === id) ?? null
  }
}
