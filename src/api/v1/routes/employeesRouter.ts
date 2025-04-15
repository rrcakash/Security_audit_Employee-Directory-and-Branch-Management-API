import express from 'express';

import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeByIdController,
  getAllEmployeesForBranch,
  getEmployeesByDepartment,
} from '../controllers/employeeController';
import { updateEmployeeSchema,employeeSchema } from "../schemas/employeeSchemas";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Employee API
 *     description: This API contains endpoints for managing employees.
 */

/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     description: Get all employees
 *     tags:
 *       - Employee API
 *     responses:
 *       200:
 *         description: A list of all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get('/', getAllEmployees); // GET all employees

/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     description: Add a new employee
 *     tags:
 *       - Employee API
 *     responses:
 *       201:
 *         description: Employee created successfully
 */
router.post('/', validateRequest(employeeSchema), addEmployee); // POST to add a new employee

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   put:
 *     description: Update an employee by ID
 *     tags:
 *       - Employee API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 */
router.put("/:id", validateRequest(updateEmployeeSchema), updateEmployee); // PUT to update an employee by ID

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   delete:
 *     description: Delete an employee by ID
 *     tags:
 *       - Employee API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 */
router.delete('/:id', deleteEmployee); // DELETE to delete an employee by ID

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   get:
 *     description: Get an employee by ID
 *     tags:
 *       - Employee API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
router.get('/:id', getEmployeeByIdController); // GET employee by ID

/**
 * @swagger
 * /api/v1/employees/branches/{branchId}/employees:
 *   get:
 *     description: Get all employees for a specific branch
 *     tags:
 *       - Employee API
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         description: The branch ID to filter employees by
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of employees from the specified branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/branches/:branchId/employees", getAllEmployeesForBranch);
 // Get all employees for a specific branch

/**
 * @swagger
 * /api/v1/employees/departments/{department}/employees:
 *   get:
 *     description: Get all employees for a specific department
 *     tags:
 *       - Employee API
 *     parameters:
 *       - in: path
 *         name: department
 *         required: true
 *         description: The department name to filter employees by
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of employees from the specified department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get('/departments/:department/employees', getEmployeesByDepartment); // Get all employees for a specific department

export default router;
