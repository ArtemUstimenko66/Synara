import { refreshToken } from "../../services/authService";

export const authInterceptor = (api: any) => {
    api.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;

            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    await refreshToken();

                    return api(originalRequest);
                } catch (err) {
                    console.error('Не удалось обновить токен:', err);

                    window.location.href = '/login';
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );
};
