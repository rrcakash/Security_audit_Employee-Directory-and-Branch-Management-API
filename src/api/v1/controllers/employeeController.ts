import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";

export const getAllEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json({ message: "Employees retrieved", data: employees });
    } catch (error) {
        next(error);
    }
};

export const addEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newEmployee = req.body;
      const createdEmployee = await employeeService.addEmployee(newEmployee);

      if (typeof createdEmployee === "string") {
        res.status(400).json({ message: createdEmployee });
      } else {
        res.status(201).json({ message: "Employee added", data: createdEmployee });
      }
    } catch (error) {
      console.error("Error adding employee:", error); // Log the full error here
      next(error); // Pass the error to the error handling middleware
    }
};

  
export const updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedEmployee = await employeeService.updateEmployee(id, updatedData);

        if (typeof updatedEmployee === "string") {
            res.status(404).json({ message: updatedEmployee });
        } else {
            res.status(200).json({ message: "Employee updated", data: updatedEmployee });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const success = await employeeService.deleteEmployee(id);

        if (typeof success === "string") {
            res.status(404).json({ message: success });
        } else {
            res.status(200).json({ message: "Employee deleted" });
        }
    } catch (error) {
        next(error);
    }
};


export const getEmployeeByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const employee = await employeeService.getEmployeeById(id);

        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
        } else {
            console.log("Employee retrieved:", employee); // Log the employee for debugging
            res.status(200).json({
                message: "Employee retrieved",
                data: employee // The employee object now includes 'id'
            });
        }
    } catch (error) {
        next(error);
    }
};


export const getAllEmployeesForBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { branchId } = req.params;
        const employees = await employeeService.getEmployeesForBranch(branchId);

        if (employees.length === 0) {
            res.status(404).json({ message: "No employees found for this branch" });
        } else {
            res.status(200).json({ message: "Employees retrieved", data: employees });
        }
    } catch (error) {
        next(error);
    }
};

export const getEmployeesByDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { department } = req.params;
        const employees = await employeeService.getEmployeesByDepartment(department);

        if (employees.length === 0) {
            res.status(404).json({ message: "No employees found in this department" });
        } else {
            res.status(200).json({ message: "Employees retrieved", data: employees });
        }
    } catch (error) {
        next(error);
    }
};
