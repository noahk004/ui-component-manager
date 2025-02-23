import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import swaggerDocs from "../swagger";

import { requireAuth } from "./middleware/auth";

import { authRouter, publicComponentRouter, protectedRouter, tagRouter } from "./routes";

dotenv.config();

const app = express();
swaggerDocs(app); // Add documentation

app.use(
    cors({
        origin: "http://localhost:3000", // Allow only your frontend
        methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
        credentials: true, // Allow cookies/auth headers
    })
);

// Configure middleware functions
app.use(express.json());
app.use(cookieParser());

// Publicly accessible api routes
app.use("/api/auth", authRouter);
app.use("/api/tags", tagRouter)
app.use("/api/components", publicComponentRouter);

// Require authentication for below routes
app.use(requireAuth);
app.use("/api/components", protectedRouter);

export { app };
