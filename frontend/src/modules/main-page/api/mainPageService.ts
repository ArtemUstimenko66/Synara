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
        const response = await api.get(`/announcements/filter?${decodedQueryParams}`, {
            withCredentials: true,
        });

        // const response = await api.get('/announcements', {
        //             params: {
        //                 limit,
        //                 offset
        //             },
        //             withCredentials: true
        //         });


        console.log('query->:', `/announcements/filter?${decodedQueryParams}`);
        console.log('Filtered and searched announcements fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch filtered announcements:', error);
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
