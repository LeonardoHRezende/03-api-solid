import { PrismaUsersRepository } from "@/repositories/users/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/users/register-use-cases";

export function makeRegisterUseCase(){
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}