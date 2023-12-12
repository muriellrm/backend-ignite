import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInsRepository {
  create(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  findById(id: string): Promise<CheckIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findAllByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
}
