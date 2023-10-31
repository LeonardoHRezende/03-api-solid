import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>;
  find: (data: Prisma.CheckInWhereUniqueInput, date: Date) => Promise<CheckIn | null>;
  findMany: (data: Prisma.CheckInWhereUniqueInput, page: number) => Promise<CheckIn[]>;
}