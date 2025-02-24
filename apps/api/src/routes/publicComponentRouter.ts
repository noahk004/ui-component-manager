import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { fetchComponents, fetchComponentById } from "../lib/data";

const publicComponentRouter = Router();

/**
 * @swagger
 * /api/components:
 *   get:
 *     summary: Fetch paginated components with optional search and tag filtering
 *     description: Retrieves a paginated list of components, optionally filtered by a search term and/or tags.
 *     tags:
 *       - Components
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: A search term to filter components by title, alias, description, or username.
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         required: false
 *         description: A comma-separated list of tag IDs. Only components containing all specified tags will be returned.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: The number of components per page.
 *     responses:
 *       200:
 *         description: A paginated list of matching components
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 components:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Custom Button"
 *                       description:
 *                         type: string
 *                         example: "A reusable UI button component."
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 3
 *                           username:
 *                             type: string
 *                             example: "devUser"
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 2
 *                             name:
 *                               type: string
 *                               example: "UI"
 *                       likes:
 *                         type: integer
 *                         example: 15
 *                       downloads:
 *                         type: integer
 *                         example: 5
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 50
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     currentPage:
 *                       type: integer
 *                       example: 2
 *                     itemsPerPage:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Internal Server Error
 */
publicComponentRouter.get("/", async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string | undefined;

        const tags = req.query.tags
            ? (req.query.tags as string).split(",")
            : undefined;

        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const limit = req.query.limit
            ? parseInt(req.query.limit as string)
            : 10;

        const componentData = await fetchComponents(
            prisma,
            search,
            tags,
            page,
            limit
        );

        res.status(200).json(componentData);
    } catch (error) {
        console.error("Error fetching component:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @swagger
 * /api/components/{id}:
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
publicComponentRouter.get("/:id", async (req: Request, res: Response) => {
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

export default publicComponentRouter;
