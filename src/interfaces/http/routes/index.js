import { Router } from "express";
import { authRouter } from "./auth-routes.js";
import { customerRouter } from "./customer-routes.js";
import { discountRouter } from "./discount-routes.js";
import { healthRouter } from "./health-routes.js";

const router = Router();

router.use("/customer", customerRouter);
router.use("/customer", authRouter);
router.use("/customer/discount", discountRouter);
router.use("/health", healthRouter);

export { router as apiRouter };
