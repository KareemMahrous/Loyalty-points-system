import express from "express";
import cors from "cors";
import { docsRouter } from "./interfaces/http/routes/docs-routes.js";
import { jsonBodyParser } from "./interfaces/http/middleware/json-body-parser.js";
import { apiRouter } from "./interfaces/http/routes/index.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(...jsonBodyParser());

  app.use("/api", apiRouter);
  app.use("/api-docs", docsRouter);

  return app;
}
