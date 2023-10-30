import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";


export const app = fastify();

app.register(appRoutes);


app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply
      .status(400)
      .send({
        message: 'Validation failed',
        issues: err.format()
      })
  }

  if (env.AMBIENT === "dev") {
    console.log(err)
  } else {
    //ADICIONAR SENTRY OU PARECIDO
  }

  return reply.status(500).send({ message: 'Internal Server Erro' })
})