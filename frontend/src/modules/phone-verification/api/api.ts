import axios, { AxiosInstance } from 'axios';
import { authInterceptor } from "../helpers/interceptors/authInterceptor.tsx";

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // includes cookies
});

//authInterceptor(api);

export default api;