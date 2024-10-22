import api from "../../main-api/api.ts";
import {User} from "../interfaces/User.tsx";

export const registerUser = async (userData: User) => {
    try {
        const response = await api.post('/auth/register', userData);
        const data = response.data;

        const phoneNumber = data.phoneNumber;
        if(phoneNumber) {
            localStorage.setItem('phoneNumber', phoneNumber);
        }
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

export const sendEmailConfirmation = async (email: string) => {
    try {
        const response = await api.post('/confirmation-email/send-confirmation-link', { email });
        return response.data;
    } catch (error) {
        console.error("Email confirmation failed:", error);
        throw error;
    }
};

export const uploadDocument = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to upload document:", error);
        throw error;
    }
};

export const checkUNP = async (date: string, ipn: string) => {
    try {
        const response = await api.post('/confirm-ipn/check', { date, ipn });
        return response.data;
    } catch (error) {
        console.error("Email confirmation failed:", error);
        throw error;
    }
};