import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/validation";

import planetsRoute from "./routes/planets";
import { initCorsMiddleware } from "./lib/middleware/cors";

const app = express();

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/planets", planetsRoute);

app.use(validationErrorMiddleware);

export default app;
