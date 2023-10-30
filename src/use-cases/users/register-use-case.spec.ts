import { expect, describe, it } from 'vitest';
import { RegisterUseCase } from './register-use-cases';
import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users-repository';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';

const usersRepository = new InMemoryUsersRepository();
const registerUseCase = new RegisterUseCase(usersRepository);

describe('Register use case', () => {
  it('should has user password upon registration', async () => {

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const isPasswordHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordHashed).toBe(true);
  })

  it("it shouldn't be able create user with same email", async () => {
    const email = 'johndoe2@example.com';

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456'
    });

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

  })
})
