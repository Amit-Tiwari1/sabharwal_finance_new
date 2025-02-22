import {axiosFileInstance, axiosInstance} from "@/app/utils/axiosInstance";

export interface SignupData {
  username: string;
  fullName:string,
  email: string;
  mobilenumber: string;
  basicsalary:Number | string;
  roleId: string;
  address1: string;
  landmark?: string;
  city: string;
  state: string;
  pin: string;
  userpic?: File | null;
  password: string;
  branches: number[];

}
export interface LoginData {
  email?: string;
  username?: string;
  password: string;
}

export async function signupUser(data: SignupData) {
  try {
    const formData = new FormData();
    
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });
    for (let [key, value] of formData.entries()) {
      console.log(`FormData entry: ${key} = ${value}`);
    }

    const response = await axiosFileInstance.post("/auth/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error || "An unexpected error occurred.";
    throw new Error(errorMessage);
  }
}

export async function loginUser(data: LoginData) {
  try {
    if ((!data.email && !data.username) || !data.password) {
      throw new Error("Email or Username and Password are required.");
    }

    const response = await axiosInstance.post("/users/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error || "An unexpected error occurred during login.";
    throw new Error(errorMessage);
  }
}

export const handleLogout = async () => {
  
  try {
    const response = await axiosInstance.post("/users/logout", null, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error || "An unexpected error occurred during logout.";
    throw new Error(errorMessage);
  }
};

export async function getAllUsers() {
  try {
    const response = await axiosInstance.get("/user", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = 
      error?.response?.data?.error || "An unexpected error occurred while fetching users.";
    throw new Error(errorMessage);
  }
}