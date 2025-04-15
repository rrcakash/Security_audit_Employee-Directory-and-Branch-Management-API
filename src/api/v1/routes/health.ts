import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Health API
 *     description: This API contains the health check endpoint for the server.
 */

/**
 * @swagger
 * /health:
 *   get:
 *     description: Get health status of the server
 *     tags:
 *       - Health API
 *     responses:
 *       200:
 *         description: Server is healthy
 */
router.get("/health", (req, res) => {
  res.send("Server is healthy");
});

export default router;
