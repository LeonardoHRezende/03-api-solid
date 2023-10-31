import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCheckInRepository } from '@/repositories/check-in/in-memory-check-in-repository';
import { GetUserCheckInMetricsUseCase } from '../get-user-check-in-metrics-use-case';


let checkInRepository: InMemoryCheckInRepository;
let getUserCheckInMetricsUseCase: GetUserCheckInMetricsUseCase;

describe('get user check in metrics users use case', () => {

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    getUserCheckInMetricsUseCase = new GetUserCheckInMetricsUseCase(checkInRepository);
  })


  it('it should be able to get check ins count from metrics', async () => {

    await checkInRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1',
    })

    await checkInRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-2',
    })

    const { checkInsCount } = await getUserCheckInMetricsUseCase.execute({
      userId: 'user-1',
      page: 1
    })

    expect(checkInsCount).toEqual(2);
  })
})
