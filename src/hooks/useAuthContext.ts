import { useContext } from "react";
import { AuthenticationContext } from "@/app/api/context/AuthContext";



export default function useAuthContext() {
    const {loading,error,data,setAuthState,loginStatus,logoutStatus} = useContext(AuthenticationContext)
    
  return {loading,error,data,setAuthState,loginStatus,logoutStatus}
}
