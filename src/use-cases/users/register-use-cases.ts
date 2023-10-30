import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

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
    
    const password_hash = await hash(password, 4);

    const userWithSameEmail = await this.usersRepository.find({ email })
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash
    })

  }
}