import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Store App API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local Server",
      },
    ],
    paths: {
      "/test": {
        get: {
          responses: { "200": { description: "Success" } },
        },
      },
    },
  },
  apis: ["./src/routes/*.{ts,js}", "./src/dtos/*.{ts,js}"],
};

const specs = swaggerJSDoc(options);
export default specs;
