import api from "../../main-api/api.ts";

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout', {},  {
            withCredentials: true
        });
<<<<<<< HEAD
=======
        localStorage.removeItem('accessToken');
>>>>>>> 3eb4e66b808c7167a040fb88ea7bead719e59cd5
        console.log('Logout successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}