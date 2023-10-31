import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users/users-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const password_hash = await hash(password, 4);

    const userWithSameEmail = await this.usersRepository.find({ email })
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash
    })

    return {
      user
    }

  }
}