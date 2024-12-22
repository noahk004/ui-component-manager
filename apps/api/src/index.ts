import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('this works yippee');
});

app.listen(PORT, () => {
    console.log(`server on port ${PORT} good job for not crashing everything - justin`);
});