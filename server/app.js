import express from "express";
import cors from "cors";

import { router as v1 } from "./routes/v1.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1);
app.use(cors);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
