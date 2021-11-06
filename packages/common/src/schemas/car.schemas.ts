import { Static, Type } from "@sinclair/typebox";
import { ManufacturerSchema } from "./manufacturer.schemas";
// Entities
export enum BodyType {
  Station = "Station",
  Sedan = "Sedan",
  Suv = "Suv",
}

export const CarSchema = Type.Object({
  id: Type.Number(),
  bodyType: Type.Enum(BodyType),
  manufacturer: Type.Optional(Type.Partial(ManufacturerSchema)),
  manufactureDate: Type.DateTime(),
});

export type CarType = Static<typeof CarSchema>;

// API
// get
export const GetCarParamsSchema = Type.Object({
  id: Type.String(),
});
export type GetCarParamsType = Static<typeof GetCarParamsSchema>;

// list
export const GetCarsResponseSchema = Type.Array(CarSchema);
export type GetCarsResponseType = Static<typeof GetCarsResponseSchema>;

// create
export const CreateCarBodySchema = Type.Intersect([
  Type.Omit(CarSchema, ["id", "manufacturer"]),
  Type.Object({
    manufacturer: Type.Object({
      id: Type.Number(),
    }),
  }),
]);
export type CreateCarBodyType = Static<typeof CreateCarBodySchema>;
