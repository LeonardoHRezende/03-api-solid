import { UsersRepository } from "@/repositories/users/users-repository";
import { InvalidCredentialError } from "../errors/invalid-credential-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  user: User;
}

export class AuthenticateUseCase {

  constructor(private usersRepository: UsersRepository) { }
  async execute(
    { 
      email,
      password
    }: AuthenticateRequest
  ): Promise<AuthenticateResponse> {
    const user = await this.usersRepository.find({ email })

    if (!user) {
      throw new InvalidCredentialError();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialError();
    }

    return {
      user
    }
  }
}