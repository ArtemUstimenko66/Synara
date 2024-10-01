import {blockChat, unblockChat} from "../api/chatService.ts";
import {DebouncedFunc} from "lodash";

export const handleBlockChat = async (
    chatId: number | null,
    isBlocked: boolean,
    loadChats: DebouncedFunc<(filter: "active" | "archived" | "blocked", username?: string | undefined) => Promise<void>>,
    toggleInfoMenu: () => void,
    filter: 'active' | 'archived' | 'blocked',
    username: string
)  => {
    if (chatId === null) return;
    try {
        isBlocked ? await unblockChat(chatId) : await blockChat(chatId);
        loadChats(filter, username);
        toggleInfoMenu();
    } catch (error) {
        console.error('Error updating chat block status:', error);
    }
};