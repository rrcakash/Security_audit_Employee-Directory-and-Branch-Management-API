import { Employee } from "../interface/employees";
import { employeeRepository } from "../repository/firebaserepository";

// Get all employees
export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const employees = await employeeRepository.getAllEmployees();
    return employees as Employee[];
  } catch (error) {
    throw new Error(`Error fetching employees: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

// Get an employee by ID
export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  try {
    // Retrieve employee from the repository
    const employee = await employeeRepository.getEmployeeById(id);

    // Return the employee if found, or null if not found
    if (!employee) {
      return null; // Employee not found
    }

    return employee; // Return the found employee
  } catch (error) {
    // Handle errors with a proper message
    throw new Error(`Error fetching employee: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};
// Add a new employee
export const addEmployee = async (employeeData: Omit<Employee, "id">): Promise<Employee | string> => {
  try {
    // Check for duplicate email or phone using Firestore
    const existingEmployeeByEmail = await employeeRepository.getAllEmployees();
    const duplicate = existingEmployeeByEmail.some(
      (e) => e.email === employeeData.email || e.phone === employeeData.phone
    );
    if (duplicate) {
      return "Employee with the same email or phone already exists.";
    }

    const newEmployee = await employeeRepository.createEmployee(employeeData);
    return newEmployee as Employee;
  } catch (error) {
    throw new Error(`Error creating employee: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

// Update an employee
export const updateEmployee = async (id: string, employeeData: Partial<Employee>): Promise<Employee | string> => {
  try {
    const updatedEmployee = await employeeRepository.updateEmployee(id, employeeData);
    if (typeof updatedEmployee === "string") {
      return updatedEmployee; // Return error message
    }
    return updatedEmployee as Employee;
  } catch (error) {
    throw new Error(`Error updating employee: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

// Delete an employee
export const deleteEmployee = async (id: string): Promise<boolean | string> => {
  try {
    const result = await employeeRepository.deleteEmployee(id);
    return result;
  } catch (error) {
    throw new Error(`Error deleting employee: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

// Get employees for a specific branch
export const getEmployeesForBranch = async (branchId: string): Promise<Employee[]> => {
  try {
    const employees = await employeeRepository.getEmployeesForBranch(branchId);
    return employees as Employee[];
  } catch (error) {
    throw new Error(`Error fetching employees for branch: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

// Get employees for a specific department
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
  try {
    const employees = await employeeRepository.getEmployeesByDepartment(department);
    return employees as Employee[];
  } catch (error) {
    throw new Error(`Error fetching employees by department: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};
