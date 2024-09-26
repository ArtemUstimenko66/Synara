import React, {useState, useEffect, useRef, useCallback} from 'react';

import ComponentFullInput from './ComponentFullInput';
import Wrapper from "../../../ui/Wrapper.tsx";
import MainHeaderFullChat from "./MainHeaderFullChat.tsx";
import { Button } from "../../../ui/Button.tsx";
import { ChatMiniComponent } from "./ui/ChatMiniComponent.tsx";

import { useAuth } from "../../../hooks/useAuth.ts";
import { useWebSocket } from "../../../hooks/WebSocketContext.tsx";

import { formatTime } from "../helpers/formatTime.ts";
import { formatDate } from "../helpers/formatDate.ts";
import {determineMessageType} from "../helpers/determineMessageType.ts";
import {
    archiveChat,
    blockChat,
    fetchChats,
    fetchMessages,
    handleSendFile,
    unarchiveChat,
    unblockChat
} from "../api/chatService.ts";

import {debounce} from "lodash";

import DownArrowIcon from '../assets/Down_Arrow.svg?react';
import PhoneIcon from '../assets/PhoneIcon.svg?react';
import CameraIcon from '../assets/CameraICon.svg?react';
import InfoIcon from '../assets/InfoIcon.svg?react';
import Message from "../interfaces/Message.tsx";
import Chat from "../interfaces/Chat.tsx";

import VectorZoom from '../assets/VectorZoom.svg?react';
import Input from '@mui/material/Input';

import ReadVector from '../assets/DoubleVector.svg?react';
import UnreadVector from '../assets/UnRead.svg?react';
import BellIcon from '../assets/Bell_Img.svg?react';
import LockImg from '../assets/Lock_Img.svg?react';
import ProfileImg from '../assets/ProfilePageImg.svg?react';


const FullChat: React.FC = () => {
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filter, setFilter] = useState<'active' | 'archived' | 'blocked'>('active');
    const [chatList, setChatList] = useState<Chat[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [, setFile] = useState<File | null>(null);
    const [formattedMessages, setFormattedMessages] = useState<any[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [username, setUsername] = useState<string>('');
    const [infoMenuOpen, setInfoMenuOpen] = useState(false);
    const take = 50;

    const socket = useWebSocket();
    const { userId } = useAuth();



    // debounced load chats function
    const loadChats = useCallback(debounce(async (filter: 'active' | 'archived' | 'blocked', username?: string) => {
        try {
            const chats = await fetchChats(filter, username);
            const updatedChats = chats.map((chat: any) => ({
                ...chat,
               // unreadCount: chat.messages.filter(message => !message.isRead && message.sender.id !== userId).length || 1,

            }));
            setChatList(updatedChats);
        } catch (error) {
            console.error('Error loading chats:', error);
        }
    }, 300), []);


    // useEffect for loading chats on filter change
    useEffect(() => {
        const savedChatId = localStorage.getItem('selectedChatId');
        if (savedChatId) {
            setSelectedChatId(Number(savedChatId));
        }

        const savedFilter = localStorage.getItem('chatFilter') as 'active' | 'archived' | 'blocked' | null;
        if (savedFilter) {
            setFilter(savedFilter);
        }
        loadChats(filter, username);


        // clean up function to cancel the debounced loadChats
        return () => {
            loadChats.cancel();
        };
    }, [filter, username, loadChats]);

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            loadChats(filter, username);
        }
    };

    // load messages whenever a new chat is selected
    useEffect(() => {
        loadMessages();

        // clear on demount
        return () => {
            setMessages([]);
            setSkip(0);
        };
    }, [selectedChatId]);

    // debounced scroll for pagination
    const handleScroll = useCallback(
        debounce(() => {
            const element = chatContainerRef.current;
            if (element && element.scrollTop === 0 && !loading && hasMore) {
                loadMessages();
            }
        }, 300),
        [loading, hasMore]
    );

    // add scroll event listener to the chat container
    useEffect(() => {
        const element = chatContainerRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
            return () => element.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    // func to load messages
    const loadMessages = useCallback(async () => {
        if (!selectedChatId || loading || !hasMore) return;

        setLoading(true);

        try {
            const newMessages = await fetchMessages(selectedChatId, skip, take);
            if (newMessages.length > 0) {
                const chatContainer = chatContainerRef.current;
                const previousScrollHeight = chatContainer?.scrollHeight || 0;

                // @ts-ignore
                setMessages(prevMessages => [...newMessages, ...prevMessages]);
                setSkip(prevSkip => prevSkip + take);

                setTimeout(() => {
                    if (chatContainer) {
                        chatContainer.scrollTop = chatContainer.scrollHeight - previousScrollHeight;
                    }
                }, 0);
            } else {
                setHasMore(false);
                setMessages([]);
                setMessages([]);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        } finally {
            setLoading(false);
        }
    }, [selectedChatId, skip, loading, hasMore]);

    // group messages by date and load chat list when messages change
    useEffect(() => {
        // group messages by date
        if (messages.length > 0) {
            const groupedMessages = messages.reduce<any[]>((acc, message, index, arr) => {
                const currentDate = new Date(message.timestamp).toDateString();
                const prevDate = index > 0 ? new Date(arr[index - 1].timestamp).toDateString() : null;

                // add date separator
                if (currentDate !== prevDate) {
                    acc.push({ type: 'date', date: formatDate(message.timestamp) });
                }
                acc.push(message);
                return acc;
            }, []);

            setFormattedMessages(groupedMessages);
        }

        // load chat list
        const loadChats = async () => {
            try {
                const chats = await fetchChats(filter);
                setChatList(chats);
            } catch (error) {
                console.error('Error loading chats:', error);
            }
        };
        loadChats();
    }, [messages]);

    // autoscroll to the last message when writing a new one
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
        }
    }, [formattedMessages]);

    // join chat and handle new messages when a chat is selected
    useEffect(() => {
        if (socket && selectedChatId) {
            socket.emit('joinChat', selectedChatId);

            // Обработка нового сообщения
            socket.on('newMessage', (message: { chat: { id: number; }; content: string; timestamp: string; chatId: any; }) => {
                if (message.chat.id === selectedChatId) {

                    const messageType = determineMessageType(message.content);
                    const formattedMessage = {
                        ...message,
                        type: messageType,
                        formattedTime: formatTime(message.timestamp),
                    };
                    // @ts-ignore
                    setMessages((prevMessages) => [...prevMessages, formattedMessage]);
                } else {

                    chatList.forEach(chat => {
                        console.log(`New messages ${chat.unreadCount} in chat ${chat.id}`);
                    });

                    setChatList(prevChatList =>
                        prevChatList.map(chat =>
                            chat.id === message.chat.id
                                ? { ...chat, unreadCount: chat.unreadCount + 1 }
                                : chat
                        )
                    );
                    notifyUserAboutNewMessage(message.chatId);
                }
            });


            // socket.on('newMessage', (message) => {
            //     const messageType = determineMessageType(message.content);
            //     const formattedMessage = {
            //         ...message,
            //         type: messageType,
            //         formattedTime: formatTime(message.timestamp),
            //     };
            //     setMessages((prevMessages) => [...prevMessages, formattedMessage]);
            // });


            // Обработка обновления статуса сообщения (прочитано)
            socket.on('messageRead', (updatedMessage: { id: number; }) => {
                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg.id === updatedMessage.id ? { ...msg, isRead: true } : msg
                    )
                );
            });

            return () => {
                socket.emit('leaveChat', selectedChatId);
                socket.off('newMessage');
                socket.off('messageRead');
            };
        }
    }, [socket, selectedChatId]);


    // on chat click
    const handleChatClick = (chatId: number) => {
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
                chat.id === chatId
                    ? { ...chat, unreadCount: 0 }
                    : chat
            )
        );
    };

    const selectedChat = chatList.find(chat => chat.id === selectedChatId);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleFilterChange = (newFilter: 'active' | 'archived' | 'blocked') => {
        setFilter(newFilter);
        localStorage.setItem('chatFilter', newFilter);
        setDropdownOpen(false);
    };

    const filterOptions = [
        { key: 'active', label: 'Активні чати' },
        { key: 'archived', label: 'Архівовані чати' },
        { key: 'blocked', label: 'Заблоковані чати' },
    ];

    const getAvailableFilters = (currentFilter: string) => {
        return filterOptions.filter(option => option.key !== currentFilter);
    };

    const filteredChatList = chatList.filter(chat => {
        if (filter === 'active') return !chat.isArchived && !chat.isBlocked;
        if (filter === 'archived') return chat.isArchived;
        if (filter === 'blocked') return chat.isBlocked;
        return false;
    });

    // send message
    // @ts-ignore
    const handleSendMessage = (message) => {
        if (socket && message.trim()) {
            socket.emit('sendMessage', {
                chatId: selectedChatId,
                content: message,
                type: 'text',
            });
        }
    };

    // send file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
           // handleSendFile(event.target.files[0], selectedChatId, socket);
        }
    };

    const toggleInfoMenu = () => {
        setInfoMenuOpen(!infoMenuOpen);
    };

    // block / unblock chat
    const handleBlockChat = async (chatId: number | null, isBlocked: boolean) => {
        if (chatId === null) return; // или обработка ошибки

        try {
            isBlocked ? await unblockChat(chatId) : await blockChat(chatId);
            loadChats(filter, username);
            toggleInfoMenu();
        } catch (error) {
            console.error('Error updating chat block status:', error);
        }
    };

    // archive / unarchive chat
    const handleArchiveChat = async (chatId: number | null, isArchived: boolean) => {
        if (chatId === null) return; // или обработка ошибки

        try {
            isArchived ? await unarchiveChat(chatId) : await archiveChat(chatId);
            loadChats(filter, username);
            toggleInfoMenu();
        } catch (error) {
            console.error('Error updating chat archive status:', error);
        }
    };

    // func for read / delivered status
    const markMessageAsRead = (messageId: number) => {
        if (socket) {
            // Отправляем событие через WebSocket
            socket.emit('markAsRead', { messageId });
            console.log(`Сообщение с id ${messageId} отправлено на отметку как прочитанное`);
        }
    };

    useEffect(() => {
        if (selectedChatId && messages.length > 0) {
            messages.forEach(message => {
                // Отмечаем как прочитанное только если сообщение еще не прочитано и отправлено не текущим пользователем
                if (!message.isRead && message.sender.id !== userId) {
                    markMessageAsRead(message.id);
                }
            });
        }
    }, [messages, selectedChatId]);

    const notifyUserAboutNewMessage = (chatId: number) => {
        setChatList((prevChatList) => prevChatList.map(chat => {
            if (chat.id === chatId) {
                return { ...chat, hasNewMessages: true };
            }
            return chat;
        }));
    };


    return (
        <Wrapper>
            <div className="h-screen bg-almost-white flex">
                <MainHeaderFullChat />
                <div className="xl:w-1/3 md:w-2/4 bg-white mt-[13vh] relative">
                    <div className="flex items-center space-x-4 mb-8">
                        <Button
                            isFilled={true}
                            className={`bg-perfect-yellow text-black w-60 text-center py-2 px-4 transition-all duration-0 ${
                                dropdownOpen ? 'rounded-b-none rounded-t-3xl' : 'rounded-3xl'
                            }`}
                            onClick={toggleDropdown}
                        >
                            <div className="flex space-x-2 items-center justify-between">
                                <p className="font-montserratMedium">
                                    {filterOptions.find((option) => option.key === filter)?.label}
                                </p>
                                <DownArrowIcon
                                    className={`h-4 w-4 transform transition-transform duration-300 ${
                                        dropdownOpen ? 'rotate-90' : '-rotate-90'
                                    }`}
                                />
                            </div>
                        </Button>

                        <div className="relative flex items-center">
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                                className="w-full mx-2 font-montserratMedium rounded"
                            />
                            <VectorZoom
                                className="cursor-pointer h-5 w-5"
                            />
                        </div>
                    </div>

                    {dropdownOpen && (
                        <div
                            className="absolute -mt-[3.3vh] w-60 bg-perfect-yellow rounded-b-2xl text-black shadow-lg z-10">
                            <ul>
                                {getAvailableFilters(filter).map((option) => (
                                    <div key={option.key}
                                         className="flex space-x-2 items-center px-2 mb-1 justify-between">
                                    <li
                                            className="px-4 py-2 font-montserratMedium cursor-pointer"
                                            onClick={() =>
                                                handleFilterChange(option.key as 'active' | 'archived' | 'blocked')
                                            }
                                        >
                                            {option.label}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Список чатов */}
                    <div
                        className="flex-1 overflow-y-auto"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        <ul className="space-y-1">
                            {filteredChatList.map((chat, index) => (
                                <li key={chat.id}>
                                    <ChatMiniComponent
                                        message={{
                                            id: chat.id,
                                            message: chat.message,
                                            type: determineMessageType(chat.message),
                                            time: chat.time,
                                            name: chat.name,
                                            imageUrl: chat.imageUrl,
                                        }}
                                        showDivider={index !== filteredChatList.length - 1}
                                        unreadCount={chat.unreadCount}
                                        onChatClick={() => handleChatClick(chat.id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="xl:w-2/3 md:w-2/3 flex flex-col p-8 mt-[9vh] h-[93vh]">
                    {selectedChat ? (
                        <div className="text-left w-full h-full flex flex-col">
                            <div className="flex items-center mb-4">
                                <img src={selectedChat.imageUrl} alt={selectedChat.name}
                                     className="xl:w-12 xl:h-12 md:w-20 md:h-20 rounded-full mr-4 font-montserratRegular"/>
                                <h3 className="xl:text-lg font-montserratMedium font-medium xl:text-xs-pxl ">{selectedChat.name}</h3>
                                <div className="ml-auto flex space-x-4">
                                    <Button className="bg-transparent xl:p-2 md:p-2"><PhoneIcon
                                        className="h-6 w-6"/></Button>
                                    <Button className="bg-transparent xl:p-2 md:p-1"><CameraIcon
                                        className="h-6 w-6"/></Button>
                                    <div className="relative">
                                        <Button className="bg-transparent xl:p-2 md:p-1" onClick={toggleInfoMenu}>
                                            <InfoIcon className="h-6 w-6"/>
                                        </Button>

                                        {/* Выпадающий список */}
                                        {infoMenuOpen && (
                                            <div
                                                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10">
                                                <ul className="py-2">
                                                    <li className="flex items-start justify-start px-4 py-4 cursor-pointer hover:bg-gray-100">
                                                        <ProfileImg className="h-6 w-6 mr-3"/>
                                                        <span>Подивитися профіль</span>
                                                    </li>
                                                    <li className="flex items-start px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-500">
                                                        <Button
                                                            className="bg-transparent items-start justify-start flex xl:p-2 md:p-1 items-start"
                                                            onClick={() => {
                                                                if (selectedChatId !== null) {
                                                                    handleBlockChat(selectedChatId, selectedChat?.isBlocked);
                                                                }
                                                            }}
                                                        >
                                                            <LockImg className="h-6 w-6 mr-3 -ml-2"/>
                                                            <span>{selectedChat?.isBlocked ? 'Розблокувати' : 'Заблокувати'}</span>
                                                        </Button>
                                                    </li>
                                                    <li className="flex items-start px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-500">
                                                        <Button
                                                            className="bg-transparent flex xl:p-2 md:p-1 items-start"
                                                            onClick={() => {
                                                                if (selectedChatId !== null) {
                                                                    handleArchiveChat(selectedChatId, selectedChat?.isArchived);
                                                                }
                                                            }}
                                                        >
                                                            <BellIcon className="h-6 w-6 mr-3 -ml-2"/>
                                                            <span>{selectedChat?.isArchived ? 'Розархівувати' : 'Архівувати'}</span>
                                                        </Button>
                                                    </li>

                                                </ul>
                                            </div>

                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Messages content */}
                            <div className="flex-1 overflow-y-auto"
                                 style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}} ref={chatContainerRef}
                                 onScroll={handleScroll}>
                                <ul className="space-y-1">
                                    {formattedMessages.length === 0 ? (
                                        <li className="text-center text-gray-500 font-montserratRegular">
                                            Немає сповіщень в чаті
                                        </li>
                                    ) : (
                                        formattedMessages.map((item, index) => (
                                            item.type === 'date' ? (
                                                <li key={index}
                                                    className="text-center text-gray-500 font-montserratRegular">{item.date}</li>
                                            ) : (
                                                <div key={index} className={`flex ${item.sender.id === userId ? 'justify-end' : 'justify-start'}`}>
                                                    <div
                                                        className={`p-3 rounded-xl ${item.type === 'text' ? (item.sender.id === userId ? 'bg-pale-yellow' : 'bg-baby-blue') : 'bg-transparent'} max-w-xs`}>

                                                        {/* message */}
                                                        <div className={`flex ${item.type === 'text' ? 'flex-row' : 'flex-col'}`}>
                                                            {/* first column */}
                                                            <div
                                                                className={`flex-1 ${item.type === 'text' ? 'flex items-center' : ''}`}
                                                                style={{
                                                                    overflowWrap: 'break-word',
                                                                    wordBreak: 'break-word',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                }}>
                                                                {item.type === 'text' ? (
                                                                    <p>{item.content}</p>
                                                                ) : (
                                                                    <img src={item.content} alt="Chat Image" className="w-full rounded-[5%]" />
                                                                )}
                                                            </div>

                                                            {/* second column */}
                                                            {item.type === 'text' ? (
                                                                <div className="flex items-end justify-end ml-2">
                                                                    <span className="font-montserratRegular text-gray-500 text-xs">{item.formattedTime}</span>
                                                                    {item.sender.id === userId && (
                                                                        item.isRead ? (
                                                                            <ReadVector />
                                                                        ) : (
                                                                            <UnreadVector />
                                                                        )
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div className="flex flex-col items-end mt-2">
                                                                    <div className="flex items-center space-x-1">
                                                                        <span className="font-montserratRegular text-gray-500 text-xs">{item.formattedTime}</span>
                                                                        {item.sender.id === userId && (
                                                                            item.isRead ? (
                                                                                <ReadVector />
                                                                            ) : (
                                                                                <UnreadVector />
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        ))
                                    )}
                                    <div ref={messagesEndRef}/>
                                </ul>
                            </div>

                            <ComponentFullInput onSendMessage={handleSendMessage} onFileChange={handleFileChange}
                                                onSendFile={handleSendFile} selectedChatId={selectedChatId} // Передаем selectedChatId
                                                socket={socket}/>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-60 h-52 bg-dark-blue rounded-3xl mb-4"></div>
                            <h3 className="text-lg font-montserratMedium font-semibold">Почніть з того, на чому
                                зупинилися</h3>
                            <p className="text-gray-500 font-montserratMedium">Виберіть розмову і починайте
                                спілкуватися.</p>
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default FullChat;