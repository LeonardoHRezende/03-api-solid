import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users-repository';
import { GetUserUseCase } from './get-user-use-case';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';


let usersRepository: InMemoryUsersRepository;
let getUserUseCase: GetUserUseCase;

describe('Register use case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserUseCase = new GetUserUseCase(usersRepository);
  })


  it('it should be get user profile', async () => {

    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345678', 6)
    })

    const { user } = await getUserUseCase.execute({
      id: createdUser.id
    })

    expect(user.name).toEqual('John Doe');
  })

  it('it should not be able get user profile with wrong id', async () => {
    await expect(() => 
      getUserUseCase.execute({
        id: 'wrong id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
