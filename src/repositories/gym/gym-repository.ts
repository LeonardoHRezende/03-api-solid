import { Gym, Prisma } from "@prisma/client";

export interface FindNearByParams {
  latitude: number;
  longitude: number;
}

export interface GymRepository {
  create: (data: Prisma.GymCreateInput) => Promise<Gym>;
  find: (data: Prisma.GymWhereUniqueInput) => Promise<Gym | null>;
  findNearBy: (params: FindNearByParams) => Promise<Gym[]>;
  searchMany: (query: string, page: number) => Promise<Gym[]>;
}