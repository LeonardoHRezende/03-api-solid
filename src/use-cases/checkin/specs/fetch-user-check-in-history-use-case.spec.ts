import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCheckInRepository } from '@/repositories/check-in/in-memory-check-in-repository';
import { FetchUserCheckInHistoryUseCase } from '../fetch-user-check-in-history-use-case';


let checkInRepository: InMemoryCheckInRepository;
let fetchUserCheckInHistoryUseCase: FetchUserCheckInHistoryUseCase;

describe('Fetch Check in history users use case', () => {

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    fetchUserCheckInHistoryUseCase = new FetchUserCheckInHistoryUseCase(checkInRepository);
  })


  it('it should be able to fetch check in history', async () => {

    await checkInRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1',
    })

    await checkInRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-2',
    })

    const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
      userId: 'user-1',
      page: 1
    })

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-1' }),
      expect.objectContaining({ gym_id: 'gym-2' })
    ])
  })


  it('it should be able to paginated fetch check in history', async () => {

    for (let i = 0; i < 22; i++) {
      await checkInRepository.create({
        user_id: 'user-1',
        gym_id: `gym-${i}`,
      })
    }

    const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
      userId: 'user-1',
      page: 2
    })

    expect(checkIns).toHaveLength(2);
  })
})
