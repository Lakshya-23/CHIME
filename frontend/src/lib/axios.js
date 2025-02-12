import axios from 'axios'

export const axiosInstance = axios.create({             //export const === module.export={}
    baseURL: import.meta.env.VITE_BACKEND_URL+"/api",
    withCredentials:true,                               //allows backend cookies to come to frontend(cross-origin) because both are running on different Localhost
})
