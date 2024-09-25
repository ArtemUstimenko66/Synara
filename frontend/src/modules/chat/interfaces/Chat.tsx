export default interface Chat {
    id: number;
    name: string;
    message: string;
    time: string;
    imageUrl: string;
    isArchived: boolean;
    isBlocked: boolean;
    unreadCount: number;
}
