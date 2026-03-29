import { Router } from "express";
import { customerRouter } from "./customer-routes.js";
import { healthRouter } from "./health-routes.js";

const router = Router();

router.use("/customer", customerRouter);
router.use("/health", healthRouter);

export { router as apiRouter };
