import Chat from "../interfaces/Chat.tsx";
import Message from "../interfaces/Message.tsx";

export const handleChatClick = (
    chatId: number,
    setSelectedChatId: React.Dispatch<React.SetStateAction<number | null>>,
    setSkip: React.Dispatch<React.SetStateAction<number>>,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
    setChatList: React.Dispatch<React.SetStateAction<Chat[]>>
) => {
    const savedChatId = localStorage.getItem('selectedChatId');
    const parsedChatId = savedChatId ? parseInt(savedChatId, 10) : null;
    const newChatId = (parsedChatId === chatId) ? null : chatId;

    setSelectedChatId(newChatId);

    if (newChatId !== null) {
        localStorage.setItem('selectedChatId', newChatId.toString());
    } else {
        localStorage.removeItem('selectedChatId');
    }

    setSkip(0);
    setMessages([]);
    setHasMore(true);
    setChatList(prevChatList =>
        prevChatList.map(chat =>
            chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
        )
    );
};