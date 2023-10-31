import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users-repository';
import { compare } from 'bcryptjs';
import { RegisterUseCase } from '../register-use-cases';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';



let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe('Register use case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);
  })

  it('should to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

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
    const email = 'johndoe@example.com';

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
