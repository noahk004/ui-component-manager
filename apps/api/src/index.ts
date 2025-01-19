import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);

app.listen(PORT, () => {
    console.log(
        `server on port ${PORT} good job for not crashing everything - justin`
    );
});
