import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "./check-in-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";


export class InMemoryCheckInRepository implements CheckInRepository {
  public checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null
    }

    this.checkIns.push(checkIn);

    return checkIn;
  }

  async find(data: Prisma.CheckInWhereUniqueInput, date?: Date) {
    if (date) {
      const startOfTheDay = dayjs(date).startOf('date');
      const endOfTheDay = dayjs(date).endOf('date');

      const checkInOnSameDay = this.checkIns.find(checkIn => {
        const checkInDate = dayjs(checkIn.created_at);
        const inOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

        return checkIn.user_id === data.user_id && checkIn.gym_id === data.gym_id && inOnSameDate;
      })

      if (!checkInOnSameDay) return null;

      return checkInOnSameDay;
    }

    const checkIn = this.checkIns.find(checkIn => checkIn.id === data.id);

    if (!checkIn) return null;

    return checkIn;
  }

  async findMany(data: Prisma.CheckInWhereUniqueInput, page: number) {

    return this.checkIns
      .filter(checkIn => checkIn.user_id === data.user_id)
      .slice((page - 1) * 20, page * 20)
  }

  async count(data: Prisma.CheckInWhereUniqueInput) {
    return this.checkIns
      .filter(checkIn => checkIn.user_id === data.user_id)
      .length;
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(item => item.id === checkIn.id);

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}