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

export const updateVolunteer = async (id: number,
                                      volunteerData:
                                          {
                                              volunteer_identification_number: any;
                                              region: any;
                                              city: any;
                                              supports: any;
                                              support_description: any;
                                              rating: any;
                                              startWorkingDay: any;
                                              endWorkingDay: any;
                                              startTime: string;
                                              endTime: string;
                                              description: any;
                                              is_show_my_profile: any;
                                              moderator_answer: string;
                                          }) => {
    try {
        const response = await api.patch(`/users/volunteer/${id}`, volunteerData,  {
            withCredentials: true
        });
        console.log('Update volunteer successful');
        return response.data;
    } catch (error) {
        console.error('Update volunteer error:', error);
        throw error;
    }
}

export const updateVictim = async (id: number, victimData: {
    region: any;
    city: any;
    street: any;
    houseNumber: any;
    flatNumber: any;
}) => {
    try {
        const response = await api.patch(`/users/victim/${id}`, victimData,  {
            withCredentials: true
        });
        console.log('Update victim successful');
        return response.data;
    } catch (error) {
        console.error('Update victim error:', error);
        throw error;
    }
}

export const updateUser = async (id: number, userData: { firstName: any; lastName: any; password: any; email: any; phoneNumber: any; birthDate: any; role: any; gender: any; UNP: any; }) => {
    try {
        const response = await api.patch(`/users/${id}`, userData,  {
            withCredentials: true
        });
        console.log('Update user successful');
        return response.data;
    } catch (error) {
        console.error('Update user error:', error);
        throw error;
    }
}

export const uploadAvatar = async ( userId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('announcementId', userId.toString());
    console.log('Upload ',userId, file)
    try {
        const response = await api.post(`/users/${userId}/avatar`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        //console.log('Document uploaded successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to upload document:", error);
        throw error;
    }
};

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

export const getUserCompletedAnnouncements = async (volunteerId: number) => {
    try {
        const response = await api.get(`/announcements/completed/${volunteerId}`, { withCredentials: true });
        console.log(`!!!!!!-> /announcements/completed/${volunteerId}`,response.data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении выполненных пользователем обьявлений:", error);
        throw error;
    }
};

export const getUserPetitions = async (volunteerId: number) => {
    try {
        const response = await api.get(`/petitions/user/${volunteerId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении петиций созданных пользователем:", error);
        throw error;
    }
};

export const getUserGatherings = async (volunteerId: number) => {
    try {
        const response = await api.get(`/gatherings/user/${volunteerId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении зборов созданных пользователем:", error);
        throw error;
    }
};

export const getCommentsAboutUser = async (volunteerId: number) => {
    try {
        const response = await api.get(`/comments/user/${volunteerId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении коментариев про пользователя:", error);
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

export const getVolunteerQualification = async (volunteerId: number) => {
    try {
        const response = await api.get(`/files/check-volunteer-documents/${volunteerId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении докуметнов пользователя:", error);
        throw error;
    }
};