import { Request, Response } from "express";
import * as branchService from "../services/branchService";

// Get all branches
export const getAllBranches = async (req: Request, res: Response): Promise<void> => {
  try {
    const branches = await branchService.getAllBranches();
    res.status(200).json({ message: "Branches retrieved", data: branches });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving branches" });
  }
};

// Get branch by ID
export const getBranchById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const branch = await branchService.getBranchById(id);

    if (!branch) {
      res.status(404).json({ message: "Branch not found" });
      return;
    }

    res.status(200).json({ message: "Branch retrieved", data: branch }); // Ensure `data` is populated
  } catch (error) {
    res.status(500).json({ message: "Error retrieving branch" });
  }
};



// Create a new branch
export const createBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const branchData = req.body;
    const newBranch = await branchService.addBranch(branchData); // Ensure to await here
    res.status(201).json({ message: "Branch created", data: newBranch });
  } catch (error) {
    res.status(500).json({ message: "Error creating branch" });
  }
};

// Update an existing branch
export const updateBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const branchData = req.body;
    const updatedBranch = await branchService.updateBranch(id, branchData);

    if (typeof updatedBranch === "string") {
      res.status(404).json({ message: updatedBranch });
      return;
    }

    res.status(200).json({ message: "Branch updated", data: updatedBranch });
  } catch (error) {
    res.status(500).json({ message: "Error updating branch" });
  }
};

// Delete a branch
export const deleteBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await branchService.deleteBranch(id);

    if (result === "Branch not found.") {
      res.status(404).json({ message: result });
      return;
    }

    res.status(200).json({ message: "Branch deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting branch" });
  }
};
