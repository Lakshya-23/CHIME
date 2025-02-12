import axios from 'axios'

export const axiosInstance = axios.create({             //export const === module.export={}
    baseURL: process.env.REACT_BASE_URL,
    withCredentials:true,                               //allows backend cookies to come to frontend(cross-origin) because both are running on different Localhost
})
