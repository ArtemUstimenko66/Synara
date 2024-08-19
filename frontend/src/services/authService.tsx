import api from "./api";
import { RegisterPayload } from "../interfaces/AuthInterface.tsx";

export const login = async (email: string, password: string)  => {
    try {
        const response = await api.post('/auth/login', {email, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log('Login error', error); // maybe we need to change expectation here later
        throw error;
    }
}

export const register = async (payload: RegisterPayload)  => {
    try {
        const response = await api.post('/auth/register', payload);
        const data = response.data;

        const phoneNumber = data.phoneNumber;
        if(phoneNumber) {
            localStorage.setItem('phoneNumber', phoneNumber);
        }
        return data;
    } catch (error) {
        console.log('Register error', error);
        throw error;
    }
}

export const getProfile = async () => {
    try {
        const response = await api.get('/auth/profile', {
           withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch profile', error.response || error);
        throw error;
    }
}

export const refreshToken = async () => {
    try {
        const response = await api.post('/auth/refresh', {}, {
            withCredentials: true,
        });
        console.log('Token refreshed successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout', {},  {
            withCredentials: true
        });
        console.log('Logout successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

