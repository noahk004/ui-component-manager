import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { requireAuth } from "./middleware/auth";

import { authRouter, publicRouter, protectedRouter } from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/components", publicRouter);

// Require authentication for below routes
app.use(requireAuth);
app.use("/api/components", protectedRouter);

export { app };
