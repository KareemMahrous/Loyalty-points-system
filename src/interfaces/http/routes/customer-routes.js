import { Router } from "express";
import { authenticateBearer } from "../middleware/authenticate-bearer.js";
import {
  customerProfileController,
  customerQrCodeController,
  customerTransactionsController,
  updateCustomerProfileController,
} from "../controllers/customer-controller.js";
import {
  createCustomerController,
  listCustomersController,
  updateCustomerCashbackController,
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
 *               $ref: '#/components/schemas/CreateCustomerSuccessResponse'
 *       422:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 * /api/customer/getProfile:
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
 * /api/customer/getQRCode:
 *   get:
 *     summary: Get authenticated customer QR code data
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer QR code data returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerQrCodeSuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 * /api/customer/transaction:
 *   get:
 *     summary: Get authenticated customer transactions
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer transactions returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerTransactionsSuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 * /api/customer/updateProfile:
 *   patch:
 *     summary: Update authenticated customer profile
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomerProfileRequest'
 *     responses:
 *       200:
 *         description: Customer profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateCustomerProfileSuccessResponse'
 *       401:
 *         description: Unauthorized
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
 * /api/customer/cashback/{actcd}:
 *   patch:
 *     summary: Update customer cashback and tier
 *     tags:
 *       - Customer
 *     parameters:
 *       - in: path
 *         name: actcd
 *         required: true
 *         schema:
 *           type: string
 *         example: BH1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomerCashbackRequest'
 *     responses:
 *       200:
 *         description: Customer cashback updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerCashbackSuccessResponse'
 *       422:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 */
router.get("/", listCustomersController);
router.post("/create", createCustomerController);
router.patch("/cashback/:actcd", updateCustomerCashbackController);
router.get("/getProfile", authenticateBearer, customerProfileController);
router.get("/getQRCode", authenticateBearer, customerQrCodeController);
router.get("/transaction", authenticateBearer, customerTransactionsController);
router.patch("/updateProfile", authenticateBearer, updateCustomerProfileController);

export { router as customerRouter };
