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
                    className="xl:w-14 xl:h-14 md:w-20 md:h-20 rounded-full"
                />
                <div className="flex-grow">
                    <p className="font-montserratMedium xl:text-xs-pxl md:text-xs-pxl">{message.name}</p>
                    <p className="xl:text-xs md:text-xs-pl text-gray-500 mb-2">{message.message}</p>
                </div>
                <p className="xl:text-xs md:text-xs-pl text-gray-400 mb-6">{message.time}</p>
            </div>
            {showDivider && (
                <hr className="border-t border-gray-300 mt-1 xl:ml-16 md:ml-2" />
            )}
        </div>

    );
};
