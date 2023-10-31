import { Gym, Prisma } from "@prisma/client";
import { FindNearByParams, GymRepository } from "./gym-repository";
import { randomUUID } from "node:crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { calculateDistanceWithCoordinates } from "@/utils/calculcate-distance-with-cordinates";


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

  async searchMany(query: string, page: number) {
    const gyms = this.gyms.filter((gym) => gym.title.includes(query)).slice((page - 1) * 20, page * 20);

    return gyms;
  }

  async findNearBy({ latitude, longitude }: FindNearByParams) {

    return this.gyms.filter((gym) => {
      const distance = calculateDistanceWithCoordinates({latitude, longitude}, {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()});

      const MAX_DISTANCE_KILOMETERS = 10;

      return distance < MAX_DISTANCE_KILOMETERS;
    });
  }
}
