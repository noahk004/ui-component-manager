import { Router, Request, Response } from "express";

const protectedRouter = Router();

protectedRouter.post("/", (req: Request, res: Response) => {
    res.send("protected router");
});

export default protectedRouter;
