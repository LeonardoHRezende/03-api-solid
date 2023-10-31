import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymRepository } from '@/repositories/gym/in-memory-gym-repository';
import { SearchGymUseCase } from '../serach-gym-use-case';
import { FetchNearByhGymUseCase } from '../featch-near-by-gyms-use-case';

let gymRepository: InMemoryGymRepository;
let fetchNearByhGymUseCase: FetchNearByhGymUseCase;

describe('Search Gyms use case', () => {

  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    fetchNearByhGymUseCase = new FetchNearByhGymUseCase(gymRepository);
  })

  it('should be able search near gyms', async () => {
    await gymRepository.create({
      title: 'Near Academia js',
      description: 'Academia de musculação',
      phone: '999999999',
      latitude: -22.9951541,
      longitude: -49.8708319,
    })

    await gymRepository.create({
      title: 'Far Academia ts',
      description: 'Academia de musculação',
      phone: '999999999',
      latitude: -25.9951541,
      longitude: -56.8708319,
    })

    const { gyms } = await fetchNearByhGymUseCase.execute({
      userLatitude: -22.9951541,
      userLongitude: -49.8708319
    })

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Academia js'
      })
    ])
  })

})

