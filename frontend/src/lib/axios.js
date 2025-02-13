import axios from 'axios'

export const axiosInstance = axios.create({             //export const === module.export={}
    baseURL: import.meta.env.VITE_BACKEND_URL+"/api",
    withCredentials:true,                               //allows backend cookies to come to frontend(cross-origin) because both are running on different Localhost
    timeout: 10000,
})


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Axios Error:', error);
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
);