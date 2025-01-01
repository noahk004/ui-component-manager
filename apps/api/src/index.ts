const cors = require("cors");
import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/login", (req: Request, res: Response) => {
    const jsonData = req.body;
    console.log(jsonData);
    res.status(200).send({ message: "this works yippee", data: jsonData });
});

app.post("/signup", async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    console.log(email, username, password);
    res.status(200).send({ message: "this works yippee", data: req.body });
});

app.listen(PORT, () => {
    console.log(
        `server on port ${PORT} good job for not crashing everything - justin`
    );
});