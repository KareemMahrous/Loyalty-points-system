import { Router } from "express";
import { authenticateBearer } from "../middleware/authenticate-bearer.js";
import {
  authenticateCustomerController,
  customerProfileController,
  sendOtpController,
} from "../controllers/customer-controller.js";
import {
  createCustomerController,
  listCustomersController,
} from "../controllers/customers-controller.js";

const router = Router();

/**
 * @swagger
 * /api/customer:
 *   get:
 *     summary: List customers
 *     tags:
 *       - Customer
 *     responses:
 *       200:
 *         description: Customers returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerListSuccessResponse'
 * /api/customer/create:
 *   post:
 *     summary: Create customer
 *     tags:
 *       - Customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCustomerRequest'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerSuccessResponse'
 *       422:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 * /api/customer/sendOtp:
 *   post:
 *     summary: Send customer OTP
 *     tags:
 *       - Customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendOtpRequest'
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendOtpSuccessResponse'
 *       422:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 * /api/customer/authenticate:
 *   post:
 *     summary: Authenticate customer with OTP
 *     tags:
 *       - Customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticateCustomerRequest'
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticateCustomerSuccessResponse'
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *       422:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 * /api/customer/profile:
 *   get:
 *     summary: Get authenticated customer profile
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer profile returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerSuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 */
router.get("/", listCustomersController);
router.post("/create", createCustomerController);
router.post("/sendOtp", sendOtpController);
router.post("/authenticate", authenticateCustomerController);
router.get("/profile", authenticateBearer, customerProfileController);

export { router as customerRouter };
