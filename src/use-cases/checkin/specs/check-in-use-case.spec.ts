import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { CheckInUseCase } from '../check-in-use-case';
import { InMemoryCheckInRepository } from '@/repositories/check-in/in-memory-check-in-repository';
import { InMemoryGymRepository } from '@/repositories/gym/in-memory-gym-repository';
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error';
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error';


let checkInRepository: InMemoryCheckInRepository;
let checkInUseCase: CheckInUseCase;
let gymRepository: InMemoryGymRepository;

describe('Check in use case', () => {

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    gymRepository = new InMemoryGymRepository();
    checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository);

    await gymRepository.create({
      id: '123',
      title: 'Academia',
      latitude: -22.9951541,
      longitude: -49.8708319,
      description: 'Academia',
      phone: '11999999999'
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('it should be able to check in', async () => {
    vi.setSystemTime(new Date(2023, 1, 1, 12, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      userId: '123',
      gymId: '123'
    })

    expect(checkIn.id).toEqual(expect.any(String));
  })

  it('it should not be able to check in twice in the same day', async () => {

    vi.setSystemTime(new Date(2023, 1, 1, 12, 8, 0, 0))

    await checkInUseCase.execute({
      userId: '123',
      gymId: '123'
    })

    await expect(() =>
      checkInUseCase.execute({
        userId: '123',
        gymId: '123'
      })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('it should be able to check in twice in the different day', async () => {

    vi.setSystemTime(new Date(2023, 1, 1, 12, 8, 0, 0))

    await checkInUseCase.execute({
      userId: '123',
      gymId: '123'
    })

    vi.setSystemTime(new Date(2023, 1, 2, 12, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      userId: '123',
      gymId: '123'
    })

    expect(checkIn.id).toEqual(expect.any(String));
  })

  it('it should not be able to check in distant academy', async () => {

    await expect(() =>
      checkInUseCase.execute({
        userId: '123',
        gymId: '123',
        userLatitude: -22.989892,
        userLongitude: -49.8649932
      })).rejects.toBeInstanceOf(MaxDistanceError)

  })
})
