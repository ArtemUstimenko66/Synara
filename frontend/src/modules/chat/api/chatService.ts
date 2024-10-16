import api from "../../main-api/api.ts";
import {formatMessageTime} from "../helpers/formatMessageTime.ts";
import {determineMessageType} from "../helpers/determineMessageType.ts";
import {formatTime} from "../helpers/formatTime.ts";

interface Message {
    content: string;
    senderId: number;
    chatId: number;
    type: 'text' | 'image';
}

const baseUrlCurrentPhones = "current-phones"

export const fetchChats = async (filter: 'active' | 'archived' | 'blocked', username?: string) => {
    try {
        let params: any = { archived: false, blocked: false };

        if (filter === 'archived') {
            params = { archived: true, blocked: false };
        } else if (filter === 'blocked') {
            params = { archived: false, blocked: true };
        }

        if (username && username.trim() !== '') {
            params.username = username.trim();
        }

        const response = await api.get('/chats', {
            withCredentials: true,
            params,
        });

        console.log("/chats", JSON.stringify(params));
        console.log('Response data:', response.data);

        return response.data.map((chat: any) => {
            const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;

            const memberUser = chat.members.length === 2
                ? chat.members[1]?.user
                : chat.members[0]?.user

            const firstMember = memberUser || {};
            return {
                id: chat.id,
                name: `${firstMember.firstName} ${firstMember.lastName}`,
                message: lastMessage ? lastMessage.content : 'Нет сообщений',
                time: lastMessage ? formatMessageTime(new Date(lastMessage.timestamp)) : '',
                imageUrl: firstMember.avatarUrl || 'default-avatar-url.jpg',
                isArchived: chat.isArchived,
                isBlocked: chat.isBlocked,
                unreadCount: chat.unreadCount || 0,
                memberId: firstMember.id
            };
        });
    } catch (error) {
        console.error("Failed to fetch chats:", error);
        throw new Error('Ошибка при загрузке чатов');
    }
};

export const fetchMessages = async (chatId: number, skip: number, take: number): Promise<Message[]> => {
    try {
        const response = await api.get(`/messages/${chatId}`, {
            withCredentials: true,
            params: { skip, take }
        });

        console.log(`/messages/${chatId}?skip=${skip}&take=${take}`);
        console.log('Response data:', response.data);

        const formattedMessages = response.data.map((message: { content: string, senderId: number, chatId: number, timestamp: string }) => ({
            ...message,
            type: determineMessageType(message.content),
            formattedTime: formatTime(message.timestamp),
        }));

        return formattedMessages.reverse();
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return [];
    }
};

export const handleSendFile = async (selectedFile: File, chatId: number | null, socket: any) => {
    if (selectedFile && chatId) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('chatId', chatId.toString());

        try {
            const response = await api.post('/files/upload', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('/files/upload', formData);
            console.log('Response data:', response.data);

            if (socket) {
                socket.emit('sendMessage', {
                    chatId,
                    content: response.data.file.fileUrl,
                    type: 'image',
                });
            }
        } catch (error) {
            console.error("Failed to send file:", error);
        }
    }
};

const baseUrl = '/chats';

export const blockChat = async (chatId: number) => {
    try {
        const response = await api.patch(`${baseUrl}/${chatId}/block`, {}, { withCredentials: true });
        console.log(`Block chat: ${baseUrl}/${chatId}/block`);
        return response;
    } catch (error) {
        console.error("Failed to block chat:", error);
        throw error;
    }
};

export const unblockChat = async (chatId: number) => {
    try {
        const response = await api.patch(`${baseUrl}/${chatId}/unblock`, {}, { withCredentials: true });
        console.log(`Unblock chat: ${baseUrl}/${chatId}/unblock`);
        return response;
    } catch (error) {
        console.error("Failed to unblock chat:", error);
        throw error;
    }
};

export const archiveChat = async (chatId: number) => {
    try {
        const response = await api.patch(`${baseUrl}/${chatId}/archive`, {}, { withCredentials: true });
        console.log(`Archive chat: ${baseUrl}/${chatId}/archive`);
        return response;
    } catch (error) {
        console.error("Failed to archive chat:", error);
        throw error;
    }
};

export const unarchiveChat = async (chatId: number) => {
    try {
        const response = await api.patch(`${baseUrl}/${chatId}/unarchive`, {}, { withCredentials: true });
        console.log(`Unarchive chat: ${baseUrl}/${chatId}/unarchive`);
        return response;
    } catch (error) {
        console.error("Failed to unarchive chat:", error);
        throw error;
    }
};


export const submitFeedback = async (feedbackData: any) => {
    try {
        const response = await api.post('https://synara.help/api/comments/', feedbackData, { withCredentials: true });
        console.log('Feedback submitted:', feedbackData);
        return response;
    } catch (error) {
        console.error('Failed to submit feedback:', error);
        throw error;
    }
};


export const addLinkToChat = async (chatId:number|null, link:string) => {
    try {
        const reponse = await api.post(`${baseUrlCurrentPhones}/addLink`, {
            chatId, link
        }, { withCredentials: true });
        return reponse.data;
    }
    catch(error){
        throw error;
    }
}

export const getLink = async (chatID: number | null) => {
    try{
        const reponse = await api.get(`${baseUrlCurrentPhones}/link/${chatID}`, { withCredentials: true });
        console.log(reponse.data.link);
        return reponse.data.link;
    }
    catch(error){
        return null;
    }
}

export const deleteLink = async (chatID: number | null)=> {
    try {
        const reponse = await api.delete(`${baseUrlCurrentPhones}/delete/${chatID}`, { withCredentials: true });
        return reponse;
    }
    catch(error){
        throw error;
    }
}
