import { axiosInstance } from "@/app/utils/axiosInstance";

// ✅ Get All Branches
export async function getAllBranches() {
  try {
    const response = await axiosInstance.get("/branches", {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.errorMessage || "An error occurred while fetching branches.";
    throw new Error(errorMessage);
  }
}

// ✅ Get Single Branch by ID
export async function getBranchById(branchId: number) {
  try {
    const response = await axiosInstance.get(`/branches/${branchId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.errorMessage || "An error occurred while fetching the branch.";
    throw new Error(errorMessage);
  }
}

// ✅ Create New Branch
export async function createBranch(data: any) {
  try {
    const response = await axiosInstance.post("/branches", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.errorMessage || "An error occurred while creating the branch.";
    throw new Error(errorMessage);
  }
}

// ✅ Update Branch
export async function updateBranch(branchId: number, data: any) {
  try {
    const response = await axiosInstance.put(`/branches/${branchId}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.errorMessage || "An error occurred while updating the branch.";
    throw new Error(errorMessage);
  }
}

// ✅ Delete Branch
export async function deleteBranch(branchId: number) {
  try {
    const response = await axiosInstance.delete(`/branches/${branchId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.errorMessage || "An error occurred while deleting the branch.";
    throw new Error(errorMessage);
  }
}
