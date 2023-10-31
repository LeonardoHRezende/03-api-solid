import { UsersRepository } from "@/repositories/users/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetUserRequest {
  id: string;
}

interface GetUserResponse {
  user: User;
}

export class GetUserUseCase {

  constructor(private usersRepository: UsersRepository) { }
  async execute(
    {
      id
    }: GetUserRequest
  ): Promise<GetUserResponse> {
    const user = await this.usersRepository.find({ id })

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user
    }
  }
}