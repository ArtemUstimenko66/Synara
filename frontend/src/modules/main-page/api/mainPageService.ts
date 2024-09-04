import api from "../../main-api/api.ts";

export const getAnnouncements = async () => {
    try {
        const response = await api.get('/announcements', { withCredentials: true });
        return response.data;
    } catch (error: any) {
        console.error('Ошибка при получении объявлений:', error);
        throw error;
    }
};
