import api from "./api.ts";
export const sendResetEmail = async (email: string): Promise<string> => {
    try {
        const response = await api.post('/reset/send-email-reset-password', { email });
        return 'Письмо для сброса пароля отправлено. Проверьте свою почту.';
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Не удалось отправить запрос на сброс пароля. Пожалуйста, попробуйте снова.');
        }
    }
};

export const resetPassword = async (email: string, password: string): Promise<string> => {
    try {
        const response = await api.post('/reset/reset-password', { email, password });
        return 'Пароль успешно сброшен.';
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Не удалось сбросить пароль. Пожалуйста, попробуйте снова.');
        }
    }
};