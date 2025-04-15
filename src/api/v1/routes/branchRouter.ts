import express from "express";
import {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../controllers/branchController";
import { validateRequest } from "../middlewares/validateRequest";
import { branchSchema, updateBranchSchema } from "../schemas/branchSchemas";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Branch API
 *     description: This API contains endpoints for managing branches.
 */

/**
 * @swagger
 * /api/v1/branches:
 *   get:
 *     description: Get all branches
 *     tags:
 *       - Branch API
 *     responses:
 *       200:
 *         description: A list of all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get("/", getAllBranches); // Get all branches

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   get:
 *     description: Get a branch by ID
 *     tags:
 *       - Branch API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 */
router.get("/:id", getBranchById); // Get branch by ID

/**
 * @swagger
 * /api/v1/branches:
 *   post:
 *     description: Create a new branch
 *     tags:
 *       - Branch API
 *     responses:
 *       201:
 *         description: Branch created successfully
 */
router.post("/", validateRequest(branchSchema), createBranch); // Create a branch

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   put:
 *     description: Update a branch by ID
 *     tags:
 *       - Branch API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch updated successfully
 */
router.put("/:id", validateRequest(updateBranchSchema), updateBranch); // Update a branch

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   delete:
 *     description: Delete a branch by ID
 *     tags:
 *       - Branch API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 */
router.delete("/:id", deleteBranch); // Delete a branch

export default router;
