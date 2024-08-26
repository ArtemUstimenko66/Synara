import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const sendEmailResetPassword = async (email: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/profile/send-email-reset-password`, {
            email: email,
        });
        return response.data;
    } catch (error) {
        console.error('Error sending reset password email:', error);
        throw error;
    }
};

