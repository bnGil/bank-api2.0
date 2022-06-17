import express from "express";

import { router as v1 } from "./routes/v1.js";

const app = express();

app.use("/api/v1", v1);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
