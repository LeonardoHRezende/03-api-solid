import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in/check-in-repository";

interface FetchUserCheckInHistoryRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInHistoryResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page
  }: FetchUserCheckInHistoryRequest): Promise<FetchUserCheckInHistoryResponse> {
    const checkIns = await this.checkInRepository.findMany({ id: undefined, user_id: userId }, page);

    return {
      checkIns
    };
  }
}
