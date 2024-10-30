import api from "../../main-api/api.ts";
import AnnouncementData from "../interfaces/AnnouncementData.tsx";

export const getFilteredAnnouncements = async (
    query: string,
    categories: string[],
    limit = 12,
    offset = 0,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    urgency?: boolean
) => {
    const queryParams = new URLSearchParams();

    if (query) {
        queryParams.append('query', query);
    }

    categories.forEach(category => {
        if (category) {
            queryParams.append('type', category);
        }
    });

    if (urgency !== undefined) {
        queryParams.append('isUrgent', urgency.toString());
    }

    queryParams.append('limit', limit.toString());
    queryParams.append('offset', offset.toString());
    queryParams.append('sortOrder', sortOrder);

    const decodedQueryParams = decodeURIComponent(queryParams.toString());

    try {
        const response = await api.get(`/announcements/?${decodedQueryParams}`, {
            withCredentials: true,
        });

        //console.log('query->:', `/announcements/?${decodedQueryParams}`);
        //console.log('Filtered and searched announcements fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch filtered announcements:', error);
        throw error;
    }
};


export const createAnnouncement = async (data: AnnouncementData) => {
    try {
        const response = await api.post('/announcements', {
            date_posted: data.datePosted || '',
            description: data.description,
            type_help: data.typeHelp,

            title: data.title,
            details: data.details,
            currentLocation: data.currentLocation,

            viewsCount: 0,
            responsesCount: 0
        }, { withCredentials: true });
       // console.log('Announcement created successfully:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error creating announcement:', error);
        throw error;
    }
};


export const uploadDocument = async (file: File, announcementId: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('announcementId', announcementId);

    try {
        const response = await api.post('/files/upload', formData, {
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


export const searchMap = async (city: string) => {
    try {
        const response = await api.get(`/users/coordinates-by-city`, {
            withCredentials: true,
            params: {
                city: city,
            },
        });
        //console.log("Get city", `/users/coordinates-by-city`);
        //console.log('Response data:', response.data);
        //console.log('City:', city);

        const mappedMarkers = response.data.map((item: { victimId: number, address: string, coordinates: { lat: number, lng: number } }) => ({
            id: item.victimId,
            name: item.address,
            position: {
                lat: item.coordinates.lat,
                lng: item.coordinates.lng
            }
        }));

        return mappedMarkers;
    } catch (error) {
        console.error("Failed to get city data:", error);
        throw error;
    }
};


export const searchUsersByRadius = async (
    radius: number,
    city: string
) => {
    try {
        //console.log("city -> ", city);
       // console.log("radius -> ", radius);

        const encodedCity = encodeURIComponent(city);

        const response = await api.get(
            `/users/users-by-radius?radius=${radius}&city=${encodedCity}`,
            {
                withCredentials: true,
            }
        );

       // console.log('Response data:', response.data);

        return response.data;
    } catch (error) {
        console.error("Failed to get users by radius:", error);
        throw error;
    }
};

export const fetchAnnouncementDetails = async (id: number) => {
    try {
        const response = await api.get(`/announcements/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении деталей обьявления:", error);
        throw error;
    }
};


export const addAnnouncementToFavorites = async (id: number) => {
    try {
        const response = await api.patch(`/announcements/${id}/favorite`, {}, {
            withCredentials: true,
        });

        if (response.status === 200) {
           // console.log('Объявление успешно добавлена в избранное');
            return true;
        } else {
            console.error("Не удалось добавить объявление в избранное");
            return false;
        }
    } catch (error) {
        console.error("Ошибка при добавлении в избранное:", error);
        throw error;
    }
};

export const getFilteredVolunteers = async (
    query: string,
    categories: string[],
    limit = 12,
    offset = 0,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
   // urgency?: boolean,
    genderParam: string,
    ageFrom: number,
    ageTo: number
) => {
    const queryParams = new URLSearchParams();

    if (query) {
        queryParams.append('query', query);
    }

    categories.forEach(category => {
        if (category) {
            queryParams.append('supports', category);
        }
    });

    // if (urgency !== undefined) {
    //     queryParams.append('isUrgent', urgency.toString());
    // }

    queryParams.append('limit', limit.toString());
    queryParams.append('offset', offset.toString());
    queryParams.append('sortOrder', sortOrder);

    if (genderParam) {
        queryParams.append('gender', genderParam);
    }

    if (ageFrom && ageFrom !== 0) {
        queryParams.append('minAge', ageFrom.toString());
    }

    if (ageTo && ageTo !== 0) {
        queryParams.append('maxAge', ageTo.toString());
    }

    const decodedQueryParams = decodeURIComponent(queryParams.toString());

    try {
        const response = await api.get(`/users/volunteer/?${decodedQueryParams}`, {
            withCredentials: true,
        });

        //console.log('query->:', `/users/volunteer/?${decodedQueryParams}`);
       // console.log('Filtered and searched volunteers fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch filtered volunteers:', error);
        throw error;
    }
};


export const incrementViews = async (id: number) => {
    try {
       // console.log('Increment', `http://localhost:8080/api/announcements/${id}/increment-views`);
        await api.patch(`/announcements/${id}/increment-views`,{},{
            withCredentials: true,
        });
    } catch (error) {
        console.error("Ошибка при увеличении количества просмотров:", error);
        throw error;
    }
};


export const incrementResponses = async (id: number) => {
    try {
        await api.patch(`/announcements/${id}/increment-responses`,{},{
            withCredentials: true,
        });
    } catch (error) {
        console.error("Ошибка при увеличении количества ответов:", error);
        throw error;
    }
};

export const doneAnnouncement = async (id: number) => {
    try {
        const response = await api.patch(`/announcements/${id}/complete`, {}, {
            withCredentials: true,
        });

        if (response.status === 200) {
           // console.log('Объявление завершенно');
            return true;
        } else {
            console.error("Не удалось добавить объявление в завершенные");
            return false;
        }
    } catch (error) {
        console.error("Ошибка при добавлении в завершенные:", error);
        throw error;
    }
};

export const cancelAnnouncement = async (id: number) => {
    try {
        const response = await api.delete(`/announcements/${id}`);

        if (response.status === 200) {
            //console.log('Объявление завершенно');
            return true;
        } else {
            console.error("Не удалось добавить объявление в завершенные");
            return false;
        }
    } catch (error) {
        console.error("Ошибка при добавлении в завершенные:", error);
        throw error;
    }
};

export const respondAnnouncement = async (userId: number, announcementId: number) => {
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
        await incrementResponses(announcementId);
        return response.data.id;
    } catch (error) {
        console.error('Error creating chat:', error);
        throw error;
    }
};


export const submitSynaraFeedback = async (feedbackData: any) => {
    try {
        const response = await api.post('/synara-comments', feedbackData, { withCredentials: true });
        //console.log('Feedback Synara submitted:', feedbackData);
        return response;
    } catch (error) {
        console.error('Failed to submit Synara feedback:', error);
        throw error;
    }
};