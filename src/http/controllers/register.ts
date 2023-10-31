import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/factories/users/register-factory";


export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerUseCase = makeRegisterUseCase();

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(255)
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

    throw err;
  }

  return reply.status(201).send();
}
