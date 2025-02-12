import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Component Manager API",
            version: "1.0.0",
            description: "API documentation for Component Manager",
        },
        servers: [{ url: "http://localhost:5000" }], // Change for production
    },
    apis: ["./src/routes/*.ts"], // Adjust path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export default (app: any) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
