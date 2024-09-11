import React from 'react';

interface Message {
    id: number;
    name: string;
    message: string;
    time: string;
    imageUrl: string;
}

interface MessageItemProps {
    message: Message;
    showDivider: boolean;
}

export const ChatMiniComponent: React.FC<MessageItemProps & { onChatClick: () => void }> = ({ message, showDivider, onChatClick }) => {

    return (
        <div onClick={onChatClick}>
            <div className="flex items-center space-x-4">
                <img
                    src={message.imageUrl}
                    alt={message.name}
                    className="w-14 h-14 rounded-full"
                />
                <div className="flex-grow">
                    <p className="font-montserratMedium text-xs-pxl">{message.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{message.message}</p>
                </div>
                <p className="text-xs text-gray-400 mb-6">{message.time}</p>
            </div>
            {showDivider && (
                <hr className="border-t border-gray-300 mt-1 ml-16" />
            )}
        </div>

    );
};
