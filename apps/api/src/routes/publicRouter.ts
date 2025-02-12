import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { fetchComponents, fetchComponentById } from "../lib/data";

const publicRouter = Router();

publicRouter.get("/", async (req: Request, res: Response) => {
    try {
        const components = await fetchComponents(prisma);

        res.status(200).json(components);
    } catch (error) {
        console.error("Error fetching component:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

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
