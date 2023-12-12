import { Gym, Prisma } from '@prisma/client'

export interface IFindManyNearby {
  latitude: number
  longitude: number
}

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findAll(query: string, page: number): Promise<Gym[]>
  findManyNearby(data: IFindManyNearby): Promise<Gym[]>
}
