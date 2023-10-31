import { Gym, Prisma } from "@prisma/client";

export interface GymRepository {
  create: (data: Prisma.GymCreateInput) => Promise<Gym>;
  find: (data: Prisma.GymWhereUniqueInput) => Promise<Gym | null>;
}