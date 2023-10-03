import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInsRepository {
  create(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
