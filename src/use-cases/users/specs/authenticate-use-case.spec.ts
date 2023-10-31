import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users-repository';


import { hash } from 'bcryptjs';
import { AuthenticateUseCase } from '../authenticate-use-case';
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credential-error';


let usersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe('Authenticate use case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(usersRepository);
  })

  it('it should be able to authenticate', async () => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String));
  })

  it('it should not be able to authenticate', async () => {

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('it should not be able to authenticate with wrong password', async () => {

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
