import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    timeoutErrorMessage: "Server timed out...",
    headers:{
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.response.use(
    (response) => {
        // console.log("Success Interceptoor",response)
        return response.data
    }, 
    (error) => {
        if(error.response.status === 401){
             // redirect user to login Screen 
            // refresh token 
            
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("user")
            toast.warning("Please login first")
            // window.location.href = "/login"
        } else if (error.response.status === 403){
            // access denied 
            toast.warning("You do not have previlege to access this panel")
            window.location.href = "/";
        } else if(error.response.status === '404'){
            window.localStorage.href = "/error"
        } else {
            throw error.response
        }
        console.error("Reject Interceptor", error)
    }
)


export default axiosInstance;