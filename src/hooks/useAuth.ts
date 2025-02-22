import { userLoginDataType } from "@/app/utils/interface";
import axios from "axios";
import useAuthContext from "./useAuthContext";
import useNotifications from "@/hooks/useNotifications";
import {deleteCookie} from "cookies-next"
const useAuth = () => {
  const {notifyError,notifySuccess,notifyWarning} = useNotifications() 

  const {setAuthState} = useAuthContext()
    const signin = async (data: userLoginDataType) => {
        try {
          setAuthState({
            data:null,
            error:null,
            loading:true,
            loginStatus:false,
            logoutStatus:false
          })
    
          const response = await axios.post("/api/auth/signin", data);
    
          if (response.data.success) {
           setAuthState({
            error:null,
            loading:false,
            data:response.data.result,
            loginStatus:true,
            logoutStatus:false
           })
           notifySuccess("Login succefully 🥳 ")
           

          } else {
            console.warn("⚠️ Login failed:", response.data.errorMessage);
          }
        } catch (error: any) {
          setAuthState({
            data:null,
            loading:false,
            error:error.response?.data?.errorMessage || "Internal Server Error",
            loginStatus:false,
            logoutStatus:false,
          })
          console.error("❌ Sign-in error:", error.response?.data?.errorMessage || "Unknown error");
        } 
      };
    const singout = () => {
      deleteCookie("jwt")
      setAuthState({
        data:null,
        loading:false,
        error:null,
        loginStatus:false,
        logoutStatus:true,
      })
    };
  
    return { signin, singout };
  };
  
  export default useAuth;
  