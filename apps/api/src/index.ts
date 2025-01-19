import { app } from "./app"

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `server on port ${PORT} good job for not crashing everything - justin`
    );
});
