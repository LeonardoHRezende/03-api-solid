import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in/check-in-repository";
import { GymRepository } from "@/repositories/gym/gym-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { calculateDistanceWithCoordinates } from "@/utils/calculcate-distance-with-cordinates";
import { MaxDistanceError } from "../errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "../errors/max-number-of-check-ins-error";

interface CheckInRequest {
  userId: string;
  gymId: string;
  userLatitude?: number;
  userLongitude?: number;
}

interface CheckInResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {

  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymRepository
  ) { }
  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude
  }: CheckInRequest): Promise<CheckInResponse> {

    const gym = await this.gymRepository.find({ id: gymId })
    if (!gym) throw new ResourceNotFoundError();

    const distance = calculateDistanceWithCoordinates({ latitude: userLatitude!, longitude: userLongitude! }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })
    const MAX_DISTANCE_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_KILOMETERS) throw new MaxDistanceError();

    const checkInOnSameDay = await this.checkInRepository.find({
      id: undefined,
      user_id: userId,
      gym_id: gymId
    }, new Date())
    if (checkInOnSameDay) throw new MaxNumberOfCheckInsError();

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return {
      checkIn
    }
  }
}