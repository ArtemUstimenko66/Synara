import React, {useState, useEffect, useRef, useCallback} from 'react';

import ComponentFullInput from './ComponentFullInput';
import Wrapper from "../../../ui/Wrapper.tsx";

import { Button } from "../../../ui/Button.tsx";
import { ChatMiniComponent } from "./ui/ChatMiniComponent.tsx";
import { useAuth } from "../../../hooks/useAuth.ts";
import { useWebSocket } from "../../../hooks/WebSocketContext.tsx";
import { formatTime } from "../helpers/formatTime.ts";
import { formatDate } from "../helpers/formatDate.ts";
import {determineMessageType} from "../helpers/determineMessageType.ts";

import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../../assets/animations/logoLoading.json';
import {
    fetchChats,
    fetchMessages,
    handleSendFile,
    addLinkToChat,
    getLink,
    deleteLink
} from "../api/chatService.ts";

import { createRoot } from "react-dom/client";


import Swal from 'sweetalert2'

import {debounce} from "lodash";

import StartContinue from '../assets/StarctContinue.svg?react';
import DownArrowIcon from '../assets/down_arrow.svg?react';
import PhoneIcon from '../assets/PhoneIcon.svg?react';
import CameraIcon from '../assets/CameraIcon.svg?react';
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
import CommentImg from '../assets/commentImg.svg?react';
import {handleChatClick} from "../handlers/handleChatClick.ts";
import {handleBlockChat} from "../handlers/handleBlockChat.ts";
import {handleScroll} from "../handlers/handleScroll.ts";
import {handleArchiveChat} from "../handlers/handleArchiveChat.ts";
import {useMediaQuery} from "react-responsive";
import MainHeader from "../../main-page/components/ui/MainHeader.tsx";
import {Link, useParams} from "react-router-dom";
import {FeedbackModal} from "./ui/FeedbackModal.tsx";
import CallVolunteer from "./CallVolunteer.tsx";
import CallVictim from "./CallVictim.tsx";
import LazyLoadGif from "../../../components/LazyLoadGif.tsx";



const FullChat: React.FC = () => {
    const { loadedChatId } = useParams<{ loadedChatId: string }>();

    const [selectedChatId, setSelectedChatId] = useState<number | null>(loadedChatId ? Number(loadedChatId) : null);
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
    const { userId, role, email } = useAuth();


    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    const generateRoomName = () => `volunteer-${email?.split('@')[0]}-${Math.random() * 100}-${Date.now()}`;

    const handleClickPhone = () => {
        const container = document.createElement('div');
        // container.id = `volunteer-${email?.split('@')[0]}`;
        const root = createRoot(container);

        Swal.fire({
            html: container,
            showConfirmButton: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            willOpen: async() => {
                console.log(role);
                if (role == 'volunteer') {
                    const roomName = generateRoomName();
                    await addLinkToChat(selectedChatId, roomName);
                    root.render(
                        <CallVolunteer roomName={roomName} email={email}/>
                    )
                }
                else {
                    const roomName = await getLink(selectedChatId);
                    console.log("roomName:", roomName);
                    if(!roomName){
                        root.render(
                            "Волонтер ще не готовий до дзвінка"
                        )
                    }
                    else{
                        root.render(
                            <CallVictim roomName={roomName} email={email || ''}/>
                        )
                    }
                }
                // @ts-ignore
                Swal.getConfirmButton().addEventListener('click', async() => {
                    await deleteLink(selectedChatId);
                    root.unmount()
                });
            },
            willClose: async() => {
                // const root = createRoot(container);
                await deleteLink(selectedChatId);
                root.unmount();
            }
        });
    };


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
        if (loadedChatId) {
            // @ts-ignore
            setSelectedChatId(loadedChatId);
            localStorage.setItem('selectedChatId', loadedChatId.toString());
        }

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
    const onScroll = () => handleScroll(chatContainerRef, loading, hasMore, loadMessages);

    // add scroll event listener to the chat container
    useEffect(() => {
        const element = chatContainerRef.current;
        if (element) {
            element.addEventListener('scroll', onScroll);
            return () => element.removeEventListener('scroll', onScroll);
        }
    }, [onScroll]);

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

    if (loading) {
        <div className="flex justify-center items-center h-screen">
            <Player
                autoplay
                loop
                src={loadingAnimation}
                style={{height: '200px', width: '200px'}}
            />
        </div>
    }

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


    const handleBlockChatWrapper = (chatId: number | null, isBlocked: boolean) => {
        handleBlockChat(chatId, isBlocked, loadChats, toggleInfoMenu, filter, username);

        if (isSmallScreen) {
            setIsChatOpen(false);
        }
    };


// archive / unarchive chat
    const archiveChat = (chatId: number | null, isArchived: boolean) => {
        handleArchiveChat(chatId, isArchived, loadChats, toggleInfoMenu, filter, username);

        if (isSmallScreen) {
            setIsChatOpen(false);
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




    const isSmallScreen = useMediaQuery({ query: '(max-width: 1025px)' });

    const selectedChat = chatList.find((chat) => chat.id === selectedChatId);
    const [isChatOpen, setIsChatOpen] = useState(false);


    const onCloseChat = () => {
        setSelectedChatId(null);
        setIsChatOpen(false);
    };


    const handleChatClickWrapper = (chatId: number) => {
        handleChatClick(chatId, setSelectedChatId, setSkip, setMessages, setHasMore, setChatList);
        if (isSmallScreen) {
            setIsChatOpen(true);
        }
    };

    return (
        <Wrapper>
            <div className="h-[85vh]  z-11 fixed xl:w-10/12 sm:w-full xl:h-screen bg-almost-white xl:ml-[2%] ml-0 flex ">
                <MainHeader />

                <div
                    className={`${isSmallScreen ? 'w-full' : 'xl:w-1/3'} ${isSmallScreen && isChatOpen ? 'hidden' : ''}  md:w-[90vw] sm:w-full mt-[10vh] bg-white relative`}>

                    <div
                        className={`xl:w-full w-[90%] xl:ml-0 ml-[5%] mb-8 ${isSmallScreen ? 'flex flex-col space-y-4' : 'flex items-center '}`}>
                        <Button
                            isFilled={true}
                            className={`bg-perfect-yellow text-black w-full xl:w-[14vw] text-center py-2 px-5 transition-all duration-0 ${
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
                        {dropdownOpen && (
                            <div
                                className=" absolute sm:top-[2.5vh] md:top-[1.7vh] xl:top-[3.8vh] xl:w-[14vw] md:w-[81vw] sm:w-[90vw]  bg-perfect-yellow rounded-b-2xl text-black z-10">

                                <ul>
                                    {getAvailableFilters(filter).map((option) => (
                                        <div key={option.key}
                                             className="flex items-center px-2 mb-1 justify-between">
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

                        <div className={`relative flex sm:ml-0 md:ml-0 xl:ml-5 items-center ${isSmallScreen ? 'w-full' : 'flex-grow'}`}>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                                className="w-full font-montserratMedium rounded"
                            />
                            <VectorZoom className="cursor-pointer h-5 w-5 absolute right-2"/>
                        </div>
                    </div>


                    {/* Список чатов */}
                    <div
                        className="flex-1 sm:mx-5 md:mx-0 xl:mx-0 overflow-y-auto"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        <ul className="space-y-1">
                            {filteredChatList.map((chat, index) => (
                                <li key={index}>
                                    <ChatMiniComponent
                                        message={{
                                            id: chat.id,
                                            message: chat.message,
                                            type: determineMessageType(chat.message),
                                            time: chat.time,
                                            name: chat.name,
                                            imageUrl: chat.imageUrl || 'https://via.placeholder.com/150',
                                        }}
                                        showDivider={index !== filteredChatList.length - 1}
                                        unreadCount={chat.unreadCount}
                                        onChatClick={() => handleChatClickWrapper(chat.id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                <div
                    className={`${isSmallScreen ? 'h-full' : 'h-full xl:w-2/3'} ${isSmallScreen && !isChatOpen ? 'hidden' : ''}  md:w-[90vw] sm:w-full flex flex-col xl:p-8 md:px-0 sm:p-0 sm:px-4 mt-[6vh]`}>
                    {selectedChat ? (
                        <div className="text-left w-full h-[83vh] flex space-y-2 flex-col">
                            <div className="flex items-center mb-4 w-full">
                                <button onClick={onCloseChat} className="sm:flex xl:hidden">
                                    <DownArrowIcon className="h-4 w-4 mr-5"/>
                                </button>
                                <img src={selectedChat.imageUrl || 'https://via.placeholder.com/150'} alt={selectedChat.name}
                                     className="xl:w-12 xl:h-12 md:w-20 md:h-20 rounded-full mr-4 font-montserratRegular hidden xl:flex"/>
                                <h3 className=" font-montserratMedium font-medium xl:text-xs-pxl ">{selectedChat.name}</h3>
                                <div className="ml-auto flex xl:space-x-2 space-x-1">
                                    <Button onClick={handleClickPhone}
                                            className="bg-transparent xl:p-2 px-0"><PhoneIcon
                                        className="h-6 w-6 sm:h-7 sm:w-7 pl-2"/></Button>
                                    <Button className="bg-transparent xl:p-2 px-0"><CameraIcon
                                        className="h-6 w-6  sm:h-7 sm:w-7 pl-2"/></Button>
                                    <div className="relative">
                                        <Button className="bg-transparent xl:p-2 px-0" onClick={toggleInfoMenu}>
                                            <InfoIcon className="h-6 w-6 sm:h-7 sm:w-7 pl-2"/>
                                        </Button>

                                        {/* Выпадающий список block/archive/profile */}
                                        {infoMenuOpen && (
                                            <div
                                                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10">
                                                <ul className="py-2">
                                                    <Link to={`/profile-volunteer/${selectedChat.memberId}`}>
                                                        <li className="flex items-start justify-start px-4 py-4 cursor-pointer hover:bg-gray-100">
                                                            <ProfileImg className="xl:h-6 xl:w-6 mr-3"/>
                                                            <span>Подивитися профіль</span>
                                                        </li>
                                                    </Link>
                                                    {role == "victim" ?
                                                        <>
                                                            <li
                                                                className="flex items-start justify-start px-4 py-4 cursor-pointer hover:bg-gray-100"
                                                                onClick={() => setIsFeedbackOpen(true)}
                                                            >
                                                                <CommentImg className="xl:h-5 xl:w-5 mt-1 mr-3"/>
                                                                <span>Залишити відгук</span>
                                                            </li>

                                                            <FeedbackModal isOpen={isFeedbackOpen}
                                                                           name={selectedChat.name}
                                                                           memberId={selectedChat.memberId}
                                                                           onClose={() => setIsFeedbackOpen(false)}/>
                                                        </>
                                                        :
                                                    <></>
                                                    }

                                                    <li className="flex items-start px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-500">
                                                        <Button
                                                            className="bg-transparent  justify-start flex xl:p-2 md:p-1 items-start"
                                                            onClick={() => {
                                                                if (selectedChatId !== null) {
                                                                    handleBlockChatWrapper(selectedChatId, selectedChat?.isBlocked);
                                                                }
                                                            }}
                                                        >
                                                            <LockImg className="xl:h-6 xl:w-6  mr-3 -ml-2"/>
                                                            <span>{selectedChat?.isBlocked ? 'Розблокувати' : 'Заблокувати'}</span>
                                                        </Button>
                                                    </li>
                                                    <li className="flex items-start px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-500">
                                                        <Button
                                                            className="bg-transparent flex xl:p-2 md:p-1 items-start"
                                                            onClick={() => {
                                                                if (selectedChatId !== null) {
                                                                    archiveChat(selectedChatId, selectedChat?.isArchived);
                                                                }
                                                            }}
                                                        >
                                                            <BellIcon className="xl:h-6 xl:w-6 mr-3 -ml-2"/>
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
                            <div className="flex-1 overflow-y-auto xl:h-[100vh] h-[90vh]"
                                 style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}} ref={chatContainerRef}
                                 onScroll={onScroll}>
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
                                                <div key={index}
                                                     className={`flex ${item.sender.id === userId ? 'justify-end' : 'justify-start'}`}>
                                                    <div
                                                        className={`p-3 rounded-xl ${item.type === 'text' ? (item.sender.id === userId ? 'bg-pale-yellow' : 'bg-baby-blue') : 'bg-transparent'} max-w-xs`}>

                                                        {/* message */}
                                                        <div
                                                            className={`flex ${item.type === 'text' ? 'flex-row' : 'flex-col'}`}>
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
                                                                    <img src={item.content} alt="Chat Image"
                                                                         className="w-full rounded-[5%]"/>
                                                                )}
                                                            </div>

                                                            {/* second column */}
                                                            {item.type === 'text' ? (
                                                                <div className="flex items-end justify-end ml-2">
                                                                    <span
                                                                        className="font-montserratRegular text-gray-500 text-xs">{item.formattedTime}</span>
                                                                    {item.sender.id === userId && (
                                                                        item.isRead ? (
                                                                            <ReadVector/>
                                                                        ) : (
                                                                            <UnreadVector/>
                                                                        )
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div className="flex flex-col items-end mt-2">
                                                                    <div className="flex items-center space-x-1">
                                                                        <span
                                                                            className="font-montserratRegular text-gray-500 text-xs">{item.formattedTime}</span>
                                                                        {item.sender.id === userId && (
                                                                            item.isRead ? (
                                                                                <ReadVector/>
                                                                            ) : (
                                                                                <UnreadVector/>
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
                                                onSendFile={handleSendFile} selectedChatId={selectedChatId}
                                                socket={socket}/>
                        </div>

                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            {isSmallScreen ? (
                                <StartContinue/>
                            ) : (
                                <LazyLoadGif
                                    gifSrc="/StartWihtContinue.gif"
                                    placeholderSrc={"../assets/StarctContinue.svg"}
                                    altText="How It Works GIF"
                                    placeholderClassName=""
                                    gifClassName=" sm:w-[30%] xl:w-[35%] h-auto md:w-relative-xlg"
                                />
                            )}
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