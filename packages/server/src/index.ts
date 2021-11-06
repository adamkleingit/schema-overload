import "reflect-metadata";
import { createConnection } from "typeorm";
import Fastify, { FastifyInstance } from "fastify";
import fastifyCors from "fastify-cors";
import { registerSwagger } from "./register-swagger";
import { carRoutes } from "./car.routes";
import { manufacturerRoutes } from "./manufacturer.routes";

const server: FastifyInstance = Fastify({});

registerSwagger(server);
server.register(fastifyCors, {
  origin: true,
  methods: "*",
  allowedHeaders: "*",
  credentials: true,
});
server.register(carRoutes);
server.register(manufacturerRoutes);

const start = async () => {
  try {
    await createConnection();
    server.listen(3333, "0.0.0.0", function onReady(err, address) {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
      server.log.info(`server listening on ${address}`);
      server.swagger();
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
