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
            <div className="flex items-center space-x-4 sm:space-x-2">
                {/* Адаптация изображения */}
                <img
                    src={message.imageUrl}
                    alt={message.name}
                    className="rounded-full xl:w-14 xl:h-14 md:w-12 md:h-12 sm:w-10 sm:h-10"
                />

                <div className="flex-grow">
                    {/* Имя пользователя */}
                    <p className="font-montserratMedium  sm:text-relative-h5 md:text-md xl:text-lg">
                        {message.name}
                    </p>

                    {/* Адаптация для стикеров и изображений */}
                    {isStickerMessage ? (
                        <div className="flex items-center space-x-2">
                            <img
                                src={messageContent}
                                alt="Sticker"
                                className="w-7 h-7 sm:w-5 sm:h-5 md:w-6 md:h-6 object-cover rounded-md"
                            />
                            <span className="text-gray-500 text-ps sm:text-xs md:text-sm">Наліпка</span>
                        </div>
                    ) : isImageMessage ? (
                        <div className="flex items-center space-x-2">
                            <img
                                src={messageContent}
                                alt="Message"
                                className="w-7 h-7 sm:w-5 sm:h-5 md:w-6 md:h-6 object-cover rounded-md"
                            />
                            <span className="text-gray-500 text-ps sm:text-sm md:text-sm">Фото</span>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-ps sm:text-xs md:text-sm mb-2">
                            {truncatedMessage}
                        </p>
                    )}
                </div>

                {/* Время сообщения */}
                <p className="text-gray-500 text-ps sm:text-xs md:text-sm mb-6">
                    {message.time}
                </p>

                {/* Непрочитанные сообщения */}
                {unreadCount > 0 && (
                    <div className="bg-perfect-yellow text-white rounded-full w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center text-xs">
                        {unreadCount}
                    </div>
                )}
            </div>

            {/* Разделительная линия */}
            {showDivider && <hr className="border-t border-gray-300 mt-5 xl:ml-16 md:ml-2 sm:ml-0" />}
        </div>
    );

};
