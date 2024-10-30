import api from "../../main-api/api.ts";

export const fetchGatherings = async (
    query: string,
    types: string[],
    limit: number,
    offset: number,
    moneyFrom: number,
    moneyTo: number,
    sortOrder: 'ASC' | 'DESC',
    urgency?: boolean
) => {
    try {
        const params = new URLSearchParams();
        params.append('query', query);
        params.append('typeEnding', types.join(','));
        params.append('limit', limit.toString());
        params.append('offset', offset.toString());
        params.append('sortOrder', sortOrder);

        if (urgency !== undefined) {
            params.append('isUrgent', urgency.toString());
        }

        if (moneyFrom && moneyFrom !== 0) {
            params.append('moneyFrom', moneyFrom.toString());
        }

        if (moneyTo && moneyTo !== 0) {
            params.append('moneyTo', moneyTo.toString());
        }

       // console.log("query -> ", `/gatherings?${params.toString()}`);
        const response = await api.get(`/gatherings?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении сборов:", error);
        throw error;
    }
};


export const uploadDocumentGathering = async (file: File, gatheringId: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('gatheringId', gatheringId);

    try {
        const response = await api.post('/files/upload-gathering-file', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
       // console.log('Document uploaded successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to upload document:", error);
        throw error;
    }
};


export const fetchGatheringDetails = async (id: number) => {
    try {
        const response = await api.get(`/gatherings/${id}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении деталей сбора:", error);
        throw error;
    }
};


export const createGathering = async (data: {
    collected: number;
    startGathering: string;
    numberOfCard: string;
    name: string;
    description: string;
    detail: string;
    whoNeedHelp: string;
    whereMoneyWillUsed: string;
    goal: string;
    endGathering: string;
}) => {
    try {
        const response = await api.post('/gatherings/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании сбора:', error);
        throw error;
    }
};


export const addGatheringToFavorites = async (id: number) => {
    try {
        const response = await api.patch(`/gatherings/${id}/favorite`, {}, {
            withCredentials: true,
        });

        if (response.status === 200) {
           // console.log('Петиция успешно добавлена в избранное');
            return true;
        } else {
            console.error("Не удалось добавить петицию в избранное");
            return false;
        }
    } catch (error) {
        console.error("Ошибка при добавлении в избранное:", error);
        throw error;
    }
};
