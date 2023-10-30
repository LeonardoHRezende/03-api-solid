import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/users/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: any) { }

  async execute({
    name,
    email,
    password
  }: RegisterUseCaseRequest) {

    const prismaUsersRepository = new PrismaUsersRepository();

    const password_hash = await hash(password, 4);

    const userWithSameEmail = await this.usersRepository.find({ email })
    if (userWithSameEmail) {
      throw new Error("Email already exists");
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash
    })

  }
}