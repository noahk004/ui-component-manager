import multer from "multer";

import { Router, Request, Response } from "express";

import jwt from "jsonwebtoken";

import prisma from "../lib/prisma";
import { createComponent } from "../lib/data";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const protectedRouter = Router();

protectedRouter.post("/", upload.single("file"), async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        const { title, alias, tagIds, isPrivate, description } = req.body;
        const file = req.file;

        if (!file) {
            res.status(400).json({ error: "File upload is missing." });
            return;
        }

        const component = await createComponent(
            prisma,
            req.file!.originalname,
            title,
            alias,
            tagIds,
            file.buffer,
            isPrivate,
            decoded.userId,
            description
        );

        res.json({ message: "Component successfully made" });
    } catch (error) {
        console.error("Error fetching component:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default protectedRouter;
