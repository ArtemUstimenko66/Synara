import api from "../../main-api/api.ts";
import AnnouncementData from "../interfaces/AnnouncementData.tsx";

export const getAnnouncements = async (limit = 12, offset = 0) => {
    try {
        const response = await api.get('/announcements', {
            params: {
                limit,
                offset
            },
            withCredentials: true
        });
        const formattedData = response.data.map((announcement: any) => ({
            ...announcement,
            datePosted: new Date(announcement.datePosted),
        }));
        return formattedData;
    } catch (error: any) {
        console.error('Error receiving the announcements:', error);
        throw error;
    }
};


export const getFilteredAnnouncements = async (categories: string[], limit = 12, offset = 0, sortOrder: 'ASC' | 'DESC' = 'ASC') => {
    const queryParams = new URLSearchParams();
    categories.forEach(category => {
        if (category) {
            queryParams.append('type', category);
        }
    });

    queryParams.append('sortOrder', sortOrder);  // Добавляем параметр сортировки

    try {
        const response = await api.get(`/announcements/filter?${queryParams.toString()}`, {
            params: {
                limit,
                offset
            },
            withCredentials: true
        });
        console.log('request filter:', `/announcements/filter?${queryParams.toString()}`);
        console.log('Filtered announcements fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch filtered announcements:', error);
        throw error;
    }
};



export const searchAnnouncements = async (query: string) => {
    try {
        const response = await api.get(`/announcements/search`, {
            params: { query },
            withCredentials: true,
        });
        console.log("Search results ->", response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error searching announcements:', error);
        throw error;
    }
};


export const createAnnouncement = async (data: AnnouncementData) => {
    try {
        const response = await api.post('/announcements', {
            date_posted: data.datePosted,
            description: data.description,
            type_help: data.typeHelp,
            viewsCount: 0,
            responsesCount: 0
        }, { withCredentials: true });

        console.log('Announcement created successfully:', response.data);
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
        console.log('Document uploaded successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to upload document:", error);
        throw error;
    }
};
