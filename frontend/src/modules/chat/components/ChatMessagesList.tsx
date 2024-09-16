import React, { useState } from 'react';
import CloseIcon from '../assets/close_icon.svg?react';
import DownArrowIcon from '../assets/down_arrow.svg?react';
import BurgerIcon from '../assets/BurgerIcon.svg?react';
import DoubleVector from '../assets/DoubleVector.svg?react';
import ChatComponentInput from "./ui/ChatComponentInput.tsx";

interface Message {
    id: number;
    name: string;
    message: string;
    time: string;
    date: string;
    imageUrl?: string;
    isSentByMe?: boolean;
}

const messages: Message[] = [
    {
        id: 1,
        name: 'Olha Kovalenko',
        message: 'Lorem Ipsum є псевдо-латинський текст використовується у веб-дизайні',
        time: '10:05',
        date: '2024-09-11',
    },
    {
        id: 2,
        name: 'Me',
        message: 'Це слова і букви були змінені додаванням або видаленням',
        time: '11:15',
        date: '2024-09-12',
        isSentByMe: true,
    },
    {
        id: 3,
        name: 'Olha Kovalenko',
        message: 'У той час як Lorem Ipsum все ще нагадує класичну латину',
        time: '11:22',
        date: '2024-09-12',
    },
    {
        id: 4,
        name: 'Olha Kovalenko',
        message: 'Як текст Цицерона не містить літери K, W, або Z чужі латина, ці та інші часто вставляються випадково імітувати типографський',
        time: '11:24',
        date: '2024-09-12',
    },
    {
        id: 5,
        name: 'Me',
        message: 'У професійному контексті це часто',
        time: '11:30',
        date: '2024-09-12',
        isSentByMe: true,
    },
    {
        id: 6,
        name: 'Me',
        message: '',
        time: '11:55',
        date: '2024-09-13',
        imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
        isSentByMe: true,
    }
];

const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Вчера';
    } else {
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        });
    }
};

export const ChatMessagesList: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const newMsg = {
            id: messages.length + 1,
            name: 'Me',
            message: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: new Date().toISOString().split('T')[0],
            isSentByMe: true,
        };
        messages.push(newMsg);
        setNewMessage('');
    };

    let lastDate = '';

    return (
        <>
            <div
                className={`fixed top-0 right-0 bg-white z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full h-full shadow-lg`}>
                {/* Chat Header */}
                <div className="flex justify-between items-center mt-4 p-3">
                    <div className="flex items-center space-x-2">
                        <button onClick={onClose}>
                            <DownArrowIcon className="mr-5" />
                        </button>
                        <p className="font-montserratRegular font-semibold text-base">Ольга Коваленко</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button>
                            <BurgerIcon className="w-4 h-4 mr-4" />
                        </button>
                        <button onClick={onClose}>
                            <CloseIcon className="w-7 h-7 mr-4" />
                        </button>
                    </div>
                </div>

                {/* Chat Content */}
                <div className="p-3 flex-grow overflow-auto font-montserratMedium h-[85%] chat-content"
                     style={{
                         scrollbarWidth: 'none',
                         msOverflowStyle: 'none',
                     }}>
                    {messages.map((msg) => {
                        const showDateLabel = msg.date !== lastDate;
                        lastDate = msg.date;

                        return (
                            <React.Fragment key={msg.id}>

                                {/* date in message flow */}
                                {showDateLabel && (
                                    <div className="text-center text-gray-500 text-xs my-2">
                                        {formatDateLabel(msg.date)}
                                    </div>
                                )}

                                <div className={`mb-12 flex ${msg.isSentByMe ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`p-2 rounded-lg max-w-xs text-sm ${msg.imageUrl ? '' : msg.isSentByMe ? 'bg-pale-yellow' : 'bg-baby-blue'}`}>
                                        {msg.message && <p>{msg.message}</p>}
                                        {msg.imageUrl && (
                                            <img
                                                src={msg.imageUrl}
                                                alt="Sent"
                                                className="w-48 h-auto mt-2 rounded-lg"
                                            />
                                        )}
                                        <div className="flex items-center justify-end mt-1">
                                            <p className="text-gray-500 text-xs mr-1">{msg.time}</p>
                                            {msg.isSentByMe && (
                                                <DoubleVector className="text-xs text-gray-400"/>
                                            )}
                                        </div>


                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="flex items-center">
                    <ChatComponentInput />
                </div>

            </div>
        </>
    );
};
