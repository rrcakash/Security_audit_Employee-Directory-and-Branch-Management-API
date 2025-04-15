import { branchRepository } from "../repository/firebaserepository"; // Import the Firestore repository
import { Branch } from "../interface/branch";

// Create a new branch
export const addBranch = async (branchData: Omit<Branch, "id">): Promise<Branch> => {
  try {
    // Use Firestore repository to create a branch
    const newBranch = await branchRepository.createBranch(branchData);
    return newBranch;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to create branch: ${error.message}`);
    }
    throw new Error("An unknown error occurred while creating branch.");
  }
};

// Get all branches
export const getAllBranches = async (): Promise<Branch[]> => {
  try {
    const branches = await branchRepository.getAllBranches();
    return branches;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to get branches: ${error.message}`);
    }
    throw new Error("An unknown error occurred while getting branches.");
  }
};

// Get branch by ID

export const getBranchById = async (id: string): Promise<Branch | null> => {
  try {
    const branch = await branchRepository.getBranchById(id);
    return branch;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to get branch by ID: ${error.message}`);
    }
    throw new Error("An unknown error occurred while getting branch by ID.");
  }
};

// Update an existing branch
export const updateBranch = async (id: string, branchData: Partial<Branch>): Promise<Branch | string> => {
  try {
    const updatedBranch = await branchRepository.updateBranch(id, branchData);
    if (typeof updatedBranch === 'string') {
      return updatedBranch; // Return error message if branch wasn't found
    }
    return updatedBranch; // Return updated branch data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to update branch: ${error.message}`);
    }
    throw new Error("An unknown error occurred while updating branch.");
  }
};

// Delete a branch
export const deleteBranch = async (id: string): Promise<boolean | string> => {
  try {
    const result = await branchRepository.deleteBranch(id);
    return result; // Return true if deletion was successful or an error message
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete branch: ${error.message}`);
    }
    throw new Error("An unknown error occurred while deleting branch.");
  }
};
