
import { GymRepository } from "@/repositories/gym/gym-repository";
import { Gym } from "@prisma/client";

interface FetchNearByhGymUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearByhGymUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearByhGymUseCase {
  constructor(private gymRepository: GymRepository) { }

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearByhGymUseCaseRequest): Promise<FetchNearByhGymUseCaseResponse> {

    const gyms = await this.gymRepository.findNearBy({ latitude: userLatitude, longitude: userLongitude });

    return {
      gyms
    }

  }
}