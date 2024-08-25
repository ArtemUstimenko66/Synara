import api from "./api.tsx";

export const sendVerificationCode = async (phoneNumber: string) => {
    return api.post('/sms/send-code', { phoneNumber });
}

export const verifySmsCode = async (code: string) => {
    const phoneNumber = localStorage.getItem('phoneNumber');
    if (!phoneNumber) {
        throw new Error('Phone number is not available');
    }

    try {
        const response = await api.post('/sms/verify-code', { phoneNumber, code });
        localStorage.removeItem('phoneNumber'); // если верефикация прошла успешно, то удаляем телефон из localStorage
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Verification failed');
    }
};
