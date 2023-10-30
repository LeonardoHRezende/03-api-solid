import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  find(data: Prisma.UserWhereUniqueInput): Promise<User | null>;
}