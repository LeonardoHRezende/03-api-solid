import { PrismaUsersRepository } from "@/repositories/users/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/users/authenticate";

export function makeAuthenticateUseCase(){
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}