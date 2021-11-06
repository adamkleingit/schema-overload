import { FastifyInstance } from "fastify";
import {
  CarSchema,
  GetCarParamsSchema,
  GetCarParamsType,
  CarType,
  CreateCarBodySchema,
  CreateCarBodyType,
  GetCarsResponseSchema,
  GetCarsResponseType,
} from "common";
import { Car } from "./entity/Car";

declare module "fastify" {
  interface FastifySchema {
    tags?: string[];
  }
}

export function carRoutes(server: FastifyInstance, opts, done) {
  server.post<{
    Body: CreateCarBodyType;
    Reply: CarType;
  }>(
    "/cars",
    {
      schema: {
        body: CreateCarBodySchema,
        response: {
          201: CarSchema,
        },
        tags: ["cars"],
      },
    },
    async function createCar(request) {
      const car = Car.create(request.body);
      await car.save();

      return car;
    }
  );

  server.get<{
    Params: GetCarParamsType;
    Reply: CarType;
  }>(
    "/cars/:id",
    {
      schema: {
        params: GetCarParamsSchema,
        response: {
          200: CarSchema,
        },
        tags: ["cars"],
      },
    },
    async function getCar(request, reply) {
      const car = await Car.findOne(request.params.id);

      return car;
    }
  );

  server.get<{
    Reply: GetCarsResponseType;
  }>(
    "/cars",
    {
      schema: {
        response: {
          200: GetCarsResponseSchema,
        },
        tags: ["cars"],
      },
    },
    async function getCars(request, reply) {
      const cars = await Car.find({});

      return cars;
    }
  );

  done();
}
