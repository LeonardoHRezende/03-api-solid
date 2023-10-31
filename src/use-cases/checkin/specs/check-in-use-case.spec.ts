import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users-repository';
import { InMemoryCheckINRepository } from '@/repositories/checkin/in-memory-checkin-repository';
import { CheckInUseCase } from '../check-in-use-case';


let checkInRepository: InMemoryCheckINRepository;
let checkInUseCase: CheckInUseCase;

describe('Authenticate use case', () => {

  beforeEach(() => {
    checkInRepository = new InMemoryCheckINRepository();
    checkInUseCase = new CheckInUseCase(checkInRepository);
  })

  it('it should be able to checkin', async () => {

    const { checkIn } = await checkInUseCase.execute({
      userId: '123',
      gymId: '123'
    })

    expect(checkIn.id).toEqual(expect.any(String));
  })
})
