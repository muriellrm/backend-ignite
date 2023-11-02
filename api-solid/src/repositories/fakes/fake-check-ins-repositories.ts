import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ICheckInsRepository } from '../check-ins-repository'
import dayjs from 'dayjs'

export class FakeCheckInRepository implements ICheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const inTheSameDay =
        dayjs(checkIn.created_at).isAfter(startOfDay) &&
        dayjs(checkIn.created_at).isBefore(endOfDay)

      return checkIn.user_id === userId && inTheSameDay
    })

    return checkInOnSameDate ?? null
  }
}
