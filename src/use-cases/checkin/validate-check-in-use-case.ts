import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in/check-in-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidateError } from "../errors/late-check-in-validate-error";

interface ValidateCheckInRequest {
  checkInId: string;
}

interface ValidateCheckInResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {

  constructor(private checkInRepository: CheckInRepository) { }
  async execute({
    checkInId
  }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {

    const checkIn = await this.checkInRepository.find({ id: checkInId })

    if (!checkIn) throw new ResourceNotFoundError();

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(dayjs(checkIn.created_at), 'minute');

    if (distanceInMinutesFromCheckInCreation > 20) throw new LateCheckInValidateError();

    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn)
    return {
      checkIn
    }
  }
}