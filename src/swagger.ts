import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import fs from "fs"; // Import fs to write the output to a file

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API",
    version: "1.0.0",
    description: "A simple Express API",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      Employee: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          position: { type: "string" },
          department: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          branchId: { type: "integer" },
        },
      },
      Branch: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          location: { type: "string" },
        },
      },
    },
  },
};

// Set up the Swagger options
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "api/v1/routes/*.ts")], // Path to your API routes
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Specify the output path for the openapi.json file
const outputPath = path.join(__dirname, '../openapi.json');

// Write the swagger spec to the openapi.json file
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

console.log(`OpenAPI specification has been written to ${outputPath}`);

export default swaggerSpec;
