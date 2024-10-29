import api from "../../../modules/main-api/api.ts";

export const updateVolunteer = async (id: number, moderator_answer:string) => {
    try {
        //block-announcement
        const response = await api.patch(
            `/users/volunteer/${id}`,
            {
                moderator_answer: moderator_answer
            },
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error("Ошибка при получении сборов:", error);
        throw error;
    }
}

export const blockAnnouncement = async (id: number) => {
    try {
        //block-announcement
        const response = await api.post(
            `/announcements/block-announcement/${id}`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error("Ошибка при получении сборов:", error);
        throw error;
    }
}

export const blockPetition = async (id: number) => {
    try {
        const response = await api.post(
            `/petitions/block-petition/${id}`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error("Ошибка при получении сборов:", error);
        throw error;
    }
}

export const blockGathering = async (id: number) => {
    try {
        const response = await api.post(
            `/gatherings/block-gathering/${id}`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error("Ошибка при получении сборов:", error);
        throw error;
    }
}

export const blockUser = async (id: number) => {
    //block-announcement
    try {
        const response = await api.post(
            `/users/block-user/${id}`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error("Ошибка при получении сборов:", error);
        throw error;
    }
}

export const getOneVolunteer = async (id: number) => {
    //block-announcement
    try {
        const response = await api.get(
            `/users/user/${id}`,
            {
                withCredentials: true,
            }
        );
        console.log("query -> ", `/users/user/${id}`, response.data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении сборов:", error);
        throw error;
    }
}

export const getAllCommentAboutUser = async (limit: any) => {
    try{
        const params = new URLSearchParams();

        if(!isNaN(+limit)){
            params.append('limit', Number(limit).toString());
        }

        const response = await api.get(
            `/comments?${params.toString()}`,
            {
                withCredentials: true,
            }
        );
        console.log("query -> ", `/comments?${params.toString()}`, response.data);
        return response.data;
    }
    catch (error) {
        console.error("Ошибка при получении сборов:", error);
        throw error;
    }
}

export const getAllSynaraComment = async (limit: any) => {
    try{
        const params = new URLSearchParams();

        if(!isNaN(+limit)){
            params.append('limit', Number(limit).toString());
        }

        const response = await api.get(
            `/synara-comments?${params.toString()}`,
            {
                withCredentials: true,
            }
        );
        console.log("query -> ", `/synara-comments?${params.toString()}`, response.data);
        return response.data;
    }
    catch (error) {
        console.error("Ошибка при получении сборов:", error);
        throw error;
    }
}

export const fetchGatheringsWithoutParams = async (limit: any,
) => {
    try {
        const params = new URLSearchParams();
        if(!isNaN(+limit)){
            params.append('limit', Number(limit).toString());
        }
        const response = await api.get(`/gatherings?${params.toString()}`);
        console.log("query -> ", `/gatherings?${params.toString()}`, response.data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении сборов:", error);
        throw error;
    }
};

export const deleteAnnouncement = async (id: number) => {
    try {
        const response = await api.delete(`/announcements/${id}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при уделении оголошення:", error);
        throw error;
    }
}

export const deleteComment = async (id: number) => {
    try {
        const response = await api.delete(`/comments/${id}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при уделении comment:", error);
        throw error;
    }
}

export const deleteSynaraComment = async (id: number) => {
    try {
        const response = await api.delete(`/synara-comments/${id}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при уделении synara-comment:", error);
        throw error;
    }
}

export const deleteGathering = async (id: number) => {
    try {
        const response = await api.delete(`/gatherings/${id}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при уделении збора:", error);
        throw error;
    }
}

export const deletePetition = async (id: number) => {
    try {
        const response = await api.delete(`/petitions/${id}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при уделении петиции:", error);
        throw error;
    }
}

export const deleteUser = async (id: number) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при уделении user:", error);
        throw error;
    }
}

export const getAnnouncements = async (
) => {

    try {
        const response = await api.get(`/announcements/`, {
            withCredentials: true,
        });

        console.log('query->:', `/announcements`);
        console.log('Filtered and searched announcements fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch filtered announcements:', error);
        throw error;
    }
};

export const getPetitions = async (
    limit: any,
) => {
    const queryParams = new URLSearchParams();
    if(!isNaN(+limit)){
        queryParams.append('limit', Number(limit).toString());
    }
    const decodedQueryParams = decodeURIComponent(queryParams.toString());

    try {
        const response = await api.get(`/petitions/?${decodedQueryParams}`, {
            withCredentials: true,
        });

        console.log('query->:', `/petitions/?${decodedQueryParams}`);
        console.log('Filtered and searched petitions fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch filtered petitions:', error);
        throw error;
    }
};

export const getUsers = async (limit : any, role = 'volunteer') => {
    const queryParams = new URLSearchParams();
    if(!isNaN(+limit)){
        queryParams.append('limit', Number(limit).toString());
    }
    queryParams.append('role', role);
    const decodedQueryParams = decodeURIComponent(queryParams.toString());

    try {
        const response = await api.get(`/users/?${decodedQueryParams}`, {
            withCredentials: true,
        });

        console.log('query->:', `/users/?${decodedQueryParams}`);
        console.log('Filtered and searched petitions fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch filtered petitions:', error);
        throw error;
    }
}

