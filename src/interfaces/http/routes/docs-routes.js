import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../../infrastructure/docs/swagger.js";

const router = Router();

router.get("/json", (_req, res) => {
  res.status(200).json(swaggerSpec);
});

const options = {
  customCssUrl: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css",
  ],
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-standalone-preset.js",
  ],
};

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerSpec, options));

export { router as docsRouter };
