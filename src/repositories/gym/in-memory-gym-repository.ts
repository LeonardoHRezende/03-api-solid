import { Gym, Prisma } from "@prisma/client";
import { GymRepository } from "./gym-repository";
import { randomUUID } from "node:crypto";
import { Decimal } from "@prisma/client/runtime/library";


export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      phone: data.phone || null,
      description: data.description || null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };

    this.gyms.push(gym);

    return gym;
  }

  async find(data: Prisma.GymWhereUniqueInput) {
    const gym = this.gyms.find((gym) => gym.id === data.id);

    if (!gym) return null;

    return gym;
  }
}
