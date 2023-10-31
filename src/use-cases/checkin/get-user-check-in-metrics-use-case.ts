import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in/check-in-repository";

interface GetUserCheckInMetricsRequest {
  userId: string;
  page: number;
}

interface GetUserCheckInMetricsResponse {
  checkInsCount: number;
}

export class GetUserCheckInMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) { }

  async execute({
    userId,
    page
  }: GetUserCheckInMetricsRequest): Promise<GetUserCheckInMetricsResponse> {
    const checkInsCount = await this.checkInRepository.count({ id: undefined, user_id: userId });

    return { checkInsCount }
  }
}
