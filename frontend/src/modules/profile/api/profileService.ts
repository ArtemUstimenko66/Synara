import api from "../../main-api/api.ts";

export const getProfile = async () => {
    try {
        const response = await api.get('/auth/profile', {
            withCredentials: true
        });
        console.log("/auth/profile");
        return response.data;
    } catch (error) {
        console.log('Failed to fetch profile', error);
        throw error;
    }
}

export const getUser = async ( id: number ) => {
    try {
        const response = await api.get(`/auth/user/${id}`, {
            withCredentials: true
        });
        console.log("/auth/user/${id}");
        return response.data;
    } catch (error) {
        console.log('Failed to fetch profile', error);
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

export const getFavoriteAnnouncements = async () => {
    try {
        const response = await api.get('/announcements/favorite', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch favorite announcements', error);
        throw error;
    }
}

export const getDoneAnnouncements = async () => {
    try {
        const response = await api.get('/announcements/completed', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch completed announcements', error);
        throw error;
    }
}

export const getFavoriteGatherings = async () => {
    try {
        const response = await api.get('/gatherings/favorites', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch favorite gatherings', error);
        throw error;
    }
}

export const getFavoritePetitions = async () => {
    try {
        const response = await api.get('/petitions/favorite', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch favorite petitions', error);
        throw error;
    }
}

export const fetchVolunteerDetails = async (id: number) => {
    try {
        const response = await api.get(`/users/volunteer/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении деталей обьявления:", error);
        throw error;
    }
};

export const respondVolunteer = async (userId: number) => {
    try {
        const response = await api.post(
            '/chats',
            {
                name: 'chat',
                isGroup: false,
                userIds: [userId],
            },
            {
                withCredentials: true,
            }
        );
        return response.data.id;
    } catch (error) {
        console.error('Error creating chat:', error);
        throw error;
    }
};