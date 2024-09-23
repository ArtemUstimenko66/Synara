import React from 'react';

interface Message {
    id: number;
    name: string;
    message: string;
    time: string;
    imageUrl: string;
    type: string;
}

interface MessageItemProps {
    message: Message;
    showDivider: boolean;
    unreadCount: number;
}

const isImageUrl = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/.test(url);
};

export const ChatMiniComponent: React.FC<MessageItemProps & { onChatClick: () => void }> = ({ message, showDivider, onChatClick , unreadCount}) => {
    const { message: messageContent} = message;

    const isImageMessage = isImageUrl(messageContent);
    const isStickerMessage = messageContent.includes('sticker');

    const truncatedMessage = isImageMessage ? '' : messageContent.length > 20 ? `${messageContent.substring(0, 20)}...` : messageContent;

    return (
        <div onClick={onChatClick} className="p-2 cursor-pointer">
            <div className="flex items-center space-x-4">
                <img src={message.imageUrl} alt={message.name} className="xl:w-14 xl:h-14 md:w-20 md:h-20 rounded-full" />

                <div className="flex-grow">
                    <p className="font-montserratMedium text-relative-ps">{message.name}</p>

                    {isStickerMessage ? (
                        <div className="flex items-center space-x-2">
                            <img src={messageContent} alt="Sticker" className="w-7 h-7 object-cover rounded-md" />
                            <span className="text-gray-500 text-ps">Наліпка</span>
                        </div>
                    ) : isImageMessage ? (
                        <div className="flex items-center space-x-2">
                            <img src={messageContent} alt="Message" className="w-7 h-7 object-cover rounded-md" />
                            <span className="text-gray-500 text-ps">Фото</span>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-ps mb-2">{truncatedMessage}</p>
                    )}
                </div>


                <p className="text-gray-500 text-ps mb-6">{message.time}</p>

                {/* Показ количества непрочитанных сообщений */}
                {unreadCount > 0 && (
                    <div className="bg-perfect-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {unreadCount}
                    </div>
                )}
            </div>

            {showDivider && <hr className="border-t border-gray-300 mt-5 xl:ml-16 md:ml-2" />}
        </div>
    );
};
