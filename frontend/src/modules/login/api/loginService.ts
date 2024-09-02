import api from "../../main-api/api.ts";

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password }, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            console.error('401: Неправильний email або пароль.');
        } else {
            console.error('Login error', error);
        }
        throw error;
    }
};
