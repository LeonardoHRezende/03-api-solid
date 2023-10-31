import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInRepository } from '@/repositories/check-in/in-memory-check-in-repository';
import { ValidateCheckInUseCase } from '../validate-check-in-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';


let checkInRepository: InMemoryCheckInRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe('validate Check in use case', () => {

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository);

    vi.useFakeTimers();
  })

  afterEach(() => {
    vi.useRealTimers();
  })

  it('it should be able to validate check in', async () => {

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    })

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it('it should not be able to validate inexisting check in', async () => {

    await expect(validateCheckInUseCase.execute({
      checkInId: 'inexisting-check-in'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('it should not be able to validate check in after 20minutes', async () => {

    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    })

    const twentyOneMinutesInMiliSeconds = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMiliSeconds)

    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: createdCheckIn.id
      })).rejects.toBeInstanceOf(Error)
  })
})
