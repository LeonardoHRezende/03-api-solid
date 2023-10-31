import { expect, describe, it, beforeEach } from 'vitest';
import { CreateGymUseCase } from '../create-gym-use-case';
import { InMemoryGymRepository } from '@/repositories/gym/in-memory-gym-repository';

let gymRepository: InMemoryGymRepository;
let createGymUseCase: CreateGymUseCase;

describe('create gym use case', () => {

  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    createGymUseCase = new CreateGymUseCase(gymRepository);
  })

  it('should to register', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'Academia',
      description: 'Academia de musculação',
      phone: '999999999',
      latitude: -22.9951541,
      longitude: -49.8708319,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
