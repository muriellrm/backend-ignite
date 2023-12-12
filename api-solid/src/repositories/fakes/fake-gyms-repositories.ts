import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { IGymsRepository } from '../gyms-repository'

export class FakeGymRepository implements IGymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    return this.items.find((item) => item.id === id) ?? null
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      phone: data.phone ?? null,
      title: data.title,
      description: data.description ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async findAll(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }
}
