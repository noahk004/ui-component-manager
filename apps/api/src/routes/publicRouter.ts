import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { fetchComponents, fetchComponentById } from "../lib/data";

const publicRouter = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all public components
 *     tags: [Components]
 *     description: Fetches a list of all public components from the database.
 *     responses:
 *       200:
 *         description: A list of components.
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
 *                   title:
 *                     type: string
 *                     example: "My Component"
 *                   alias:
 *                     type: string
 *                     example: "my-component"
 *                   description:
 *                     type: string
 *                     example: "A public UI component"
 *                   isPrivate:
 *                     type: boolean
 *                     example: false
 *                   userId:
 *                     type: string
 *                     example: "123456"
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
publicRouter.get("/", async (req: Request, res: Response) => {
    try {
        const components = await fetchComponents(prisma);

        res.status(200).json(components);
    } catch (error) {
        console.error("Error fetching component:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a component by ID
 *     tags: [Components]
 *     description: Fetches a single component by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the component to retrieve
 *     responses:
 *       200:
 *         description: The requested component.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "My Component"
 *                 alias:
 *                   type: string
 *                   example: "my-component"
 *                 description:
 *                   type: string
 *                   example: "A public UI component"
 *                 isPrivate:
 *                   type: boolean
 *                   example: false
 *                 userId:
 *                   type: string
 *                   example: "123456"
 *       400:
 *         description: Invalid component ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid component ID"
 *       404:
 *         description: Component not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Component not found"
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
publicRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const componentId = parseInt(req.params.id, 10); // Convert the ID to a number
        if (isNaN(componentId)) {
            res.status(400).json({ error: "Invalid component ID" });
            return;
        }

        const component = await fetchComponentById(prisma, componentId);

        if (!component) {
            res.status(404).json({ error: "Component not found" });
            return;
        }

        res.status(200).json(component);
    } catch (error) {
        console.error("Error fetching component:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default publicRouter;
