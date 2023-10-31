import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymRepository } from '@/repositories/gym/in-memory-gym-repository';
import { SearchGymUseCase } from '../serach-gym-use-case';

let gymRepository: InMemoryGymRepository;
let searchGymUseCase: SearchGymUseCase;

describe('Search Gyms use case', () => {

  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    searchGymUseCase = new SearchGymUseCase(gymRepository);
  })

  it('should be able search gyms', async () => {
    await gymRepository.create({
      title: 'Academia js',
      description: 'Academia de musculação',
      phone: '999999999',
      latitude: -22.9951541,
      longitude: -49.8708319,
    })

    await gymRepository.create({
      title: 'Academia ts',
      description: 'Academia de musculação',
      phone: '999999999',
      latitude: -25.9951541,
      longitude: -56.8708319,
    })

    const { gyms } = await searchGymUseCase.execute({
      query: 'Academia js',
      page: 1,
    })

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia js'
      })
    ])
  })

  it('should be able search gyms with paginations', async () => {

    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Academia js ${i}`,
        description: 'Academia de musculação',
        phone: '999999999',
        latitude: -22.9951541,
        longitude: -49.8708319,
      })
    }

    const { gyms } = await searchGymUseCase.execute({
      query: 'Academia js',
      page: 2,
    })

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia js 21'
      }),
      expect.objectContaining({
        title: 'Academia js 22'
      })
    ])
  })

})

