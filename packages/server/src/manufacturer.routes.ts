import { FastifyInstance } from "fastify";
import {
  ManufacturerSchema,
  GetManufacturerParamsSchema,
  GetManufacturerParamsType,
  ManufacturerType,
  CreateManufacturerBodySchema,
  CreateManufacturerBodyType,
} from "common";
import { Manufacturer } from "./entity/Manufacturer";

declare module "fastify" {
  interface FastifySchema {
    tags?: string[];
  }
}

export function manufacturerRoutes(server: FastifyInstance, opts, done) {
  server.post<{
    Body: CreateManufacturerBodyType;
    Reply: ManufacturerType;
  }>(
    "/manufacturers",
    {
      schema: {
        body: CreateManufacturerBodySchema,
        response: {
          201: ManufacturerSchema,
        },
        tags: ["manufacturers"],
      },
    },
    async function createManufacturer(request) {
      const manufacturer = Manufacturer.create(request.body);
      await manufacturer.save();

      return manufacturer;
    }
  );

  server.get<{
    Params: GetManufacturerParamsType;
    Reply: ManufacturerType;
  }>(
    "/manufacturers/:id",
    {
      schema: {
        params: GetManufacturerParamsSchema,
        response: {
          200: ManufacturerSchema,
        },
        tags: ["manufacturers"],
      },
    },
    async function getManufacturer(request, reply) {
      const manufacturer = await Manufacturer.findOne(request.params.id);

      return manufacturer;
    }
  );

  done();
}
