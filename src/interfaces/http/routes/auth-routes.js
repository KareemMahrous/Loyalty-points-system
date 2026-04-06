import { Router } from "express";
import {
  authenticateCustomerController,
  sendOtpController,
  storeOtpController,
} from "../controllers/customer-controller.js";
import { authenticateBearer } from "../middleware/authenticate-bearer.js";

const router = Router();

router.post("/sendOtp", sendOtpController);
router.post("/storeOtp", authenticateBearer, storeOtpController);
router.post("/authenticate", authenticateCustomerController);

export { router as authRouter };
