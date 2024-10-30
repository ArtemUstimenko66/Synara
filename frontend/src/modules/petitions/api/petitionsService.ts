import api from "../../main-api/api.ts";

export const getFilteredPetitions = async (
    query: string,
    limit = 12,
    offset = 0,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    field: string,
    topic: string,
    types: string[],
    ukraine: boolean
) => {
    const queryParams = new URLSearchParams();

    if (query) {
        queryParams.append('query', query);
    }
    if (topic) {
        queryParams.append('topic', topic);
    }
    if (types.length) {
        types.forEach(type => queryParams.append('types', type));
    }
    if (ukraine) {
        queryParams.append('ukraine', 'true');
    }

    queryParams.append('limit', limit.toString());
    queryParams.append('offset', offset.toString());
    queryParams.append('sortOrder', sortOrder);
    queryParams.append('sortField', field);

    const decodedQueryParams = decodeURIComponent(queryParams.toString());

    try {
        const response = await api.get(`/petitions/?${decodedQueryParams}`, {
            withCredentials: true,
        });

        //console.log('query->:', `/petitions/?${decodedQueryParams}`);
        //console.log('Filtered and searched petitions fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch filtered petitions:', error);
        throw error;
    }
};



export const createPetition = async (petitionData: any) => {
    try {
        const response = await api.post('/petitions', petitionData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        //console.log('Петиция успешно отправлена:', response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке петиции:', error);
        throw error;
    }
};

export const fetchPetitionDetails = async (id: number) => {
    try {
        const response = await api.get(`/petitions/${id}`, {
            withCredentials: true,
        });
        //console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении деталей петиции:", error);
        throw error;
    }
};

export const addPetitionToFavorites = async (id: number) => {
    try {
        const response = await api.patch(`/petitions/${id}/favorite`, {}, {
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
