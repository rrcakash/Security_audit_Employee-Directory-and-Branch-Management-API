import { db } from '../../../../config/firebaseConfig'; // Import Firebase configuration
import { Branch } from "../interface/branch";
import { Employee } from "../interface/employees";
// Branch Repository
class BranchRepository {
    async getAllBranches(): Promise<any[]> {
      try {
        const snapshot = await db.collection('branches').get();
        return snapshot.docs.map(doc => doc.data());
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to get branches: ${error.message}`);
        }
        throw new Error("An unknown error occurred while getting branches.");
      }
    }
  
    async getBranchById(id: string): Promise<any | undefined> {
        try {
          const docRef = db.collection('branches').doc(id);
          const doc = await docRef.get();
          
          // Check if the document exists
          if (!doc.exists) return undefined;
      
          // Return the document data along with the id
          return { id: doc.id, ...doc.data() }; // Ensure `id` is included with other data
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(`Failed to get branch: ${error.message}`);
          }
          throw new Error("An unknown error occurred while getting branch.");
        }
      }
      
  
    async createBranch(branchData: any): Promise<any> {
      try {
        const docRef = await db.collection('branches').add(branchData);
        return { id: docRef.id, ...branchData };
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to create branch: ${error.message}`);
        }
        throw new Error("An unknown error occurred while creating branch.");
      }
    }
  
    async updateBranch(id: string, branchData: Partial<any>): Promise<any | string> {
      try {
        const docRef = db.collection('branches').doc(id);
        const branch = await docRef.get();
        if (!branch.exists) return "Branch not found.";
  
        await docRef.update(branchData);
        return { id, ...branchData };
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to update branch: ${error.message}`);
        }
        throw new Error("An unknown error occurred while updating branch.");
      }
    }
  
    async deleteBranch(id: string): Promise<boolean | string> {
      try {
        const docRef = db.collection('branches').doc(id);
        const branch = await docRef.get();
        if (!branch.exists) return "Branch not found.";
  
        await docRef.delete();
        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to delete branch: ${error.message}`);
        }
        throw new Error("An unknown error occurred while deleting branch.");
      }
    }
  }
  
  class EmployeeRepository {
    async getAllEmployees(): Promise<any[]> {
      try {
        const snapshot = await db.collection('employees').get();
        return snapshot.docs.map(doc => doc.data());
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to get employees: ${error.message}`);
        }
        throw new Error("An unknown error occurred while getting employees.");
      }
    }
  
    async getEmployeeById(id: string): Promise<any> {
        try {
            const doc = await db.collection('employees').doc(id).get();
            if (!doc.exists) {
                return null;
            }
            const employee = doc.data();
            return { id: doc.id, ...employee }; // Ensure 'id' is included when returning the employee
        } catch (error: unknown) {
            console.error("Failed to get employee by ID:", error);
            throw new Error("Failed to get employee by ID");
        }
    }
  
    async createEmployee(employeeData: any): Promise<any> {
        try {
            const docRef = await db.collection('employees').add(employeeData);
            const createdEmployee = { id: docRef.id, ...employeeData }; // Ensure 'id' is included
            return createdEmployee;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Failed to create employee: ${error.message}`);
                throw new Error(`Failed to create employee: ${error.message}`);
            }
            console.error("An unknown error occurred while creating employee.", error);
            throw new Error("An unknown error occurred while creating employee.");
        }
    }
    
  
    async updateEmployee(id: string, employeeData: Partial<any>): Promise<any | string> {
      try {
        const docRef = db.collection('employees').doc(id);
        const employee = await docRef.get();
        if (!employee.exists) return "Employee not found.";
  
        await docRef.update(employeeData);
        return { id, ...employeeData };
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to update employee: ${error.message}`);
        }
        throw new Error("An unknown error occurred while updating employee.");
      }
    }
  
    async deleteEmployee(id: string): Promise<boolean | string> {
      try {
        const docRef = db.collection('employees').doc(id);
        const employee = await docRef.get();
        if (!employee.exists) return "Employee not found.";
  
        await docRef.delete();
        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to delete employee: ${error.message}`);
        }
        throw new Error("An unknown error occurred while deleting employee.");
      }
    }
  
    async getEmployeesForBranch(branchId: string): Promise<any[]> {
      try {
        const snapshot = await db
          .collection('employees')
          .where('branchId', '==', branchId)
          .get();
        return snapshot.docs.map(doc => doc.data());
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to get employees for branch: ${error.message}`);
        }
        throw new Error("An unknown error occurred while getting employees for branch.");
      }
    }
  
    async getEmployeesByDepartment(department: string): Promise<any[]> {
      try {
        const snapshot = await db
          .collection('employees')
          .where('department', '==', department)
          .get();
        return snapshot.docs.map(doc => doc.data());
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to get employees by department: ${error.message}`);
        }
        throw new Error("An unknown error occurred while getting employees by department.");
      }
    }
  }
  
  export const branchRepository = new BranchRepository();
  export const employeeRepository = new EmployeeRepository();
  