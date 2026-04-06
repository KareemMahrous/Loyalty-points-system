import { Router } from "express";
import { authenticateBearer } from "../middleware/authenticate-bearer.js";
import {
  convertDiscountController,
  listDiscountCodesController,
} from "../controllers/discount-controller.js";

const router = Router();

router.get("/", authenticateBearer, listDiscountCodesController);
router.post("/convert", authenticateBearer, convertDiscountController);

export { router as discountRouter };
