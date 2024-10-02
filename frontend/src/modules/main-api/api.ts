import axios, { AxiosInstance } from 'axios';
//import {authInterceptor} from "./interceptors/authInterceptor.tsx";


const api: AxiosInstance = axios.create({
    baseURL: 'https://synara.help/api',
    //baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // includes cookies
});

//authInterceptor(api);

export default api;