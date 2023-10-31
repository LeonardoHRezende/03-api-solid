import { Prisma, User } from '@prisma/client';
import { UsersRepository } from './users-repository';

export class InMemoryUsersRepository implements UsersRepository {

  public users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user);
    return user;
  }

  async find(data: Prisma.UserWhereUniqueInput) {
    const user = this.users.find(user => user.email === data.email || user.id === data.id);
    if (!user) {
      return null;
    }

    return user;
  }
}