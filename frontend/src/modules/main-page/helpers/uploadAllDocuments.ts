import {uploadDocument} from "../api/mainPageService.ts";

export const uploadAllDocuments = async (files: File[], announcementId: string): Promise<string[]> => {
    const uploadPromises = files.map(file => uploadDocument(file, announcementId));
    try {
        const responses = await Promise.all(uploadPromises);
        return responses.map(response => response.fileUrl);
    } catch (error) {
        console.error("Failed to upload some documents:", error);
        throw error;
    }
};