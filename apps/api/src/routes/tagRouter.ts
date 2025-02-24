import { Router, Request, Response } from "express";
import { getTags } from "../lib/data";
import prisma from "../lib/prisma";

const tagRouter = Router();

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     description: Fetches a list of all available tags.
 *     operationId: getTags
 *     tags:
 *       - Tags
 *     responses:
 *       200:
 *         description: A list of tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "React"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
tagRouter.get("/", async (req: Request, res: Response) => {
    try {
        const componentData = await getTags(prisma);

        res.status(200).json(componentData);
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default tagRouter;
