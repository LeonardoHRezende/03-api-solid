import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialError } from "@/use-cases/errors/invalid-credential-error";
import { makeAuthenticateUseCase } from "@/factories/users/authenticate-factory";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateUseCase = makeAuthenticateUseCase();

  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255)
  })

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    await authenticateUseCase.execute({ email, password });
  }
  catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({
        message: err.message
      });
    }

    throw err;
  }

  return reply.status(200).send();
}
