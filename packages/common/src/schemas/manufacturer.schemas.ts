import { Static, Type } from "@sinclair/typebox";

export const ManufacturerSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
});

export type ManufacturerType = Static<typeof ManufacturerSchema>;

// API
// get
export const GetManufacturerParamsSchema = Type.Object({
  id: Type.String(),
});
export type GetManufacturerParamsType = Static<
  typeof GetManufacturerParamsSchema
>;

// list
export const GetManufacturersResponseSchema = Type.Array(ManufacturerSchema);
export type GetManufacturersResponseType = Static<
  typeof GetManufacturersResponseSchema
>;

// create
export const CreateManufacturerBodySchema = Type.Omit(ManufacturerSchema, [
  "id",
]);
export type CreateManufacturerBodyType = Static<
  typeof CreateManufacturerBodySchema
>;
