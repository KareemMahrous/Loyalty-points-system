import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../../infrastructure/docs/swagger.js";

const router = Router();

router.get("/json", (_req, res) => {
  res.status(200).json(swaggerSpec);
});

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerSpec));

export { router as docsRouter };
