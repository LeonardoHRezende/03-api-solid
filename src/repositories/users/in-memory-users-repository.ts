import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { UsersRepository } from './users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user;
  }

  async find(data: Prisma.UserWhereUniqueInput) {
    const user = await prisma.user.findUnique({
      where: data
    });

    return user;
  }

}