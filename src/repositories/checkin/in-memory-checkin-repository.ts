import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "./check-in-repository";
import { randomUUID } from "node:crypto";


export class InMemoryCheckINRepository implements CheckInRepository {

  public checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null
    }

    return checkIn;
  }
}