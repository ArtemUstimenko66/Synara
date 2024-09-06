import api from "../../main-api/api.ts";
import AnnouncementData from "../interfaces/AnnouncementData.tsx";

export const getAnnouncements = async () => {
    try {
        const response = await api.get('/announcements', { withCredentials: true });
        const formattedData = response.data.map((announcement: any) => ({
            ...announcement,
            datePosted: new Date(announcement.datePosted),
        }));
        //console.log("announcements ->", formattedData);
        return formattedData;
    } catch (error: any) {
        console.error('Error receiving the announcements:', error);
        throw error;
    }
};

export const createAnnouncement = async (data: AnnouncementData) => {
    try {
        const response = await api.post('/announcements', {
            datePosted: data.datePosted,
            description: data.description,
            typeHelp: data.typeHelp,
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


export const uploadDocument = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

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