export default interface Message {
    id: number;
    content: string;
    chat: {
        id: number;
    }
    type: 'text' | 'image';
    timestamp: string;
    formattedTime: string;
    sender: {
        id: number;
    };
    recipientId: number;
    isRead: boolean;
    name: string;
    imageUrl: string;
}
