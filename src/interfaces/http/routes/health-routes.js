import { Router } from "express";
import { healthController } from "../controllers/health-controller.js";

const router = Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check API health
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthSuccessResponse'
 */
router.get("/", healthController);

export { router as healthRouter };
