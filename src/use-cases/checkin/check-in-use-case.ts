import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/checkin/check-in-repository";

interface CheckInRequest {
  userId: string;
  gymId: string;
}

interface CheckInResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {

  constructor(private checkInRepository: CheckInRepository) { }
  async execute({
    userId,
    gymId
  }: CheckInRequest): Promise<CheckInResponse> {
    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return {
      checkIn
    }
  }
}