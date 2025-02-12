import axios from 'axios'

export const axiosInstance = axios.create({             //export const === module.export={}
    baseURL:'http://localhost:8008/api',
    withCredentials:true,                               //allows backend cookies to come to frontend(cross-origin) because both are running on different Localhost
})
