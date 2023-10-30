import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "@/repositories/users/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { RegisterUseCase } from "@/use-cases/users/register-use-cases";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(255)
  })

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    await registerUseCase.execute({ name, email, password });
  }
  catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message
      });
    }

    return reply.status(500).send();
  }

  return reply.status(201).send();
}
