import api from "../../main-api/api.ts";
export const getProfile = async () => {
    try {
        const response = await api.get('/auth/profile', {
            withCredentials: true
        });
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
