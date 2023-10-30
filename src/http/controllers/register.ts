import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterUseCase } from "@/use-cases/register.use-cases";
import { PrismaUsersRepository } from "@/repositories/users/prisma-users-repository";

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
  catch {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
