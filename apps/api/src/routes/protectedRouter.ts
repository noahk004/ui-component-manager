import multer from "multer";

import { Router, Request, Response } from "express";

import jwt from "jsonwebtoken";

import prisma from "../lib/prisma";
import { createComponent, deleteComponent } from "../lib/data";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const protectedRouter = Router();

protectedRouter.post(
    "/",
    upload.single("file"),
    async (req: Request, res: Response) => {
        try {
            const token = req.cookies.token;

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
            const { title, alias, tagIds, isPrivate, description } = req.body;
            const tags = JSON.parse(tagIds);
            const isPrivateBool = isPrivate === "true";
            const file = req.file;

            if (!file) {
                res.status(400).json({ error: "File upload is missing." });
                return;
            }

            const component = await createComponent(
                prisma,
                file.originalname,
                title,
                alias,
                tags,
                file.buffer,
                isPrivateBool,
                decoded.userId,
                description
            );

            res.status(201).json({ message: "Component successfully created" });
        } catch (error) {
            console.error("Error fetching component:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

protectedRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        // Delete file in S3
        const component = await prisma.component.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

        if (!component) {
            res.status(204).json({ message: "Component does not exist" });
            return;
        }

        if (decoded.userId !== component.userId) {
            res.status(403).json({ error: "Unauthorized user" });
            return;
        }

        await deleteComponent(prisma, component);

        res.status(200).json({ message: "Component successfully deleted" });
    } catch (error) {
        console.error("Error deleting component:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default protectedRouter;
