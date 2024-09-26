import axios, { AxiosInstance } from 'axios';
//import {authInterceptor} from "./interceptors/authInterceptor.tsx";


const api: AxiosInstance = axios.create({
    baseURL: 'https://synara.help/api', // https
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // includes cookies
});

//authInterceptor(api);

export default api;