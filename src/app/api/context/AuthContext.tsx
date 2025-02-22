"use client";
import { ReactNode, useState, createContext, Dispatch, SetStateAction, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import useNotifications from "@/hooks/useNotifications";

interface User {
  username: string;
  fullName: string;
  email: string;
  mobilenumber: string;
  roleId: number;
  address1: string;
  city: string;
  state: string;
  pin: string;
  userpic: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
  loginStatus: boolean
  logoutStatus:boolean
}

interface AuthState extends State {
  setAuthState: Dispatch<SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  loginStatus:false,
  logoutStatus:false,
  setAuthState: null as unknown as Dispatch<SetStateAction<State>>,
});

export default function AuthContext({ children }: { children: ReactNode }) {
  const { notifySuccess, notifyError } = useNotifications();

  const router = useRouter()
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null,
    loginStatus:false,
    logoutStatus:false,
  });

  const fetchUserDetails = async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      const jwt = getCookie("jwt");
      if (!jwt) {
        setAuthState({ data: null, error: null, loading: false,loginStatus:false,logoutStatus:false });
        notifyError("Token not found please login first!")
        router.push("/")
      }

      const response = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      setAuthState({ error: null, loading: false, data: response.data.result,loginStatus:false,logoutStatus:false });
    } catch (error: any) {
      setAuthState({
        data: null,
        loading: false,
        error: error?.response?.data?.errorMessage || "Internal Server Error",
        loginStatus:false,
        logoutStatus:false
      });
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
