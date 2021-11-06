import fastifySwagger from "fastify-swagger";

export function registerSwagger(fastify) {
  fastify.register(fastifySwagger, {
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      host: "localhost:3333",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "cars" }, { name: "manufacturers" }],
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
      definitions: {},
    },
    uiConfig: {
      docExpansion: "full",
      deepLinking: true,
      tryItOutEnabled: true,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
}
