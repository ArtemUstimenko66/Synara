import React from 'react';
import ChatIcon from '../assets/chat_icon.svg?react';
import { Button } from "../../../ui/Button.tsx";

interface ChatButtonProps {
    onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
    return (
        <Button
            isFilled={true}
            className="fixed bottom-[8%] right-[9%] py-2 px-4 rounded-full"
            onClick={onClick} // Используем переданную функцию onClick
        >
            <div className="flex space-x-1">
                <ChatIcon className="h-6 w-6" />
                <p>ЧАТ</p>
            </div>
        </Button>
    );
};

export default ChatButton;
