import multer from "multer";

import { Router, Request, Response } from "express";

import jwt from "jsonwebtoken";

import prisma from "../lib/prisma";
import { createComponent, deleteComponent } from "../lib/data";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const protectedRouter = Router();

/**
 * @swagger
 * /api/components:
 *   post:
 *     summary: Upload a file and create a component
 *     tags: [Components]
 *     description: Creates a new component with an uploaded file, associated tags, and metadata.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - title
 *               - alias
 *               - tagIds
 *               - isPrivate
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to be uploaded
 *               title:
 *                 type: string
 *                 example: "My Component"
 *               alias:
 *                 type: string
 *                 example: "my-component"
 *               tagIds:
 *                 type: string
 *                 example: '[32, 33]'
 *                 description: JSON string of tag IDs
 *               isPrivate:
 *                 type: string
 *                 example: "true"
 *                 description: "Boolean value (true or false) indicating if the component is private"
 *               description:
 *                 type: string
 *                 example: "This is a test component"
 *     responses:
 *       201:
 *         description: Component successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Component successfully created"
 *       400:
 *         description: Missing file or invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "File upload is missing."
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
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

/**
 * @swagger
 * /api/components/{id}:
 *   delete:
 *     summary: Delete a component by ID
 *     tags: [Components]
 *     description: Deletes a component from the database and its associated file from S3. Only the owner of the component can delete it.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the component to be deleted
 *     responses:
 *       200:
 *         description: Component successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Component successfully deleted"
 *       204:
 *         description: Component does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Component does not exist"
 *       403:
 *         description: Forbidden - User does not have permission to delete this component.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized user"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
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
