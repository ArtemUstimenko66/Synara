import api from "../../main-api/api.ts";
export const sendResetEmail = async (email: string): Promise<string> => {
    try {
        const response = await api.post('/reset/send-email-reset-password', { email });
        return 'Лист для зміни пароля надіслано. Перевірте свою пошту.';
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Не вдалося надіслати запит на зміну пароля. Будь ласка, спробуйте ще раз.');
        }
    }
};

export const resetPassword = async (email: string, password: string): Promise<string> => {
    try {
        const response = await api.post('/reset/reset-password', { email, password });
        return 'Пароль успішно змінений.';
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Не вдалося змінити пароль. Будь ласка, спробуйте ще раз.');
        }
    }
};