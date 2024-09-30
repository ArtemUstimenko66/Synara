import { DebouncedFunc } from "lodash";
import {archiveChat, unarchiveChat} from "../api/chatService.ts";


export const handleArchiveChat  = async (
    chatId: number | null,
    isArchived: boolean,
    loadChats: DebouncedFunc<(filter: "active" | "archived" | "blocked", username?: string | undefined) => Promise<void>>,
    toggleInfoMenu: () => void,
    filter: 'active' | 'archived' | 'blocked',
    username: string
) => {
    if (chatId === null) return;
    try {
        isArchived ? await unarchiveChat(chatId) : await archiveChat(chatId);
        loadChats(filter, username);
        toggleInfoMenu();
    } catch (error) {
        console.error('Error updating chat archive status:', error);
    }
};