import { PrismaUsersRepository } from "@/repositories/users/prisma-users-repository";
import { GetUserUseCase } from "@/use-cases/users/get-user-use-case";

export function makeGetUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const getUserUseCase = new GetUserUseCase(usersRepository);

  return getUserUseCase;
}