import React, {useCallback, useEffect, useRef, useState} from 'react';
import CloseIcon from '../assets/close_icon.svg?react';
import DownArrowIcon from '../assets/down_arrow.svg?react';
import BurgerIcon from '../assets/BurgerIcon.svg?react';
import ReadVector from '../assets/DoubleVector.svg?react';
import UnreadVector from '../assets/UnRead.svg?react';
import {
    archiveChat,
    blockChat,
    fetchMessages,
    handleSendFile,
    unarchiveChat,
    unblockChat
} from "../api/chatService.ts";

import Chat from "../interfaces/Chat.tsx";
import {useWebSocket} from "../../../hooks/WebSocketContext.tsx";
import {useAuth} from "../../../hooks/useAuth.ts";
import {determineMessageType} from "../helpers/determineMessageType.ts";
import {formatTime} from "../helpers/formatTime.ts";
import {Button} from "../../../ui/Button.tsx";

import BellIcon from '../assets/Bell_Img.svg?react';
import LockImg from '../assets/Lock_Img.svg?react';
import ProfileImg from '../assets/ProfilePageImg.svg?react';
import CommentImg from '../assets/commentImg.svg?react';
import ComponentFullInput from "./ComponentFullInput.tsx";
import {debounce} from "lodash";
import {formatDate} from "../helpers/formatDate.ts";
import Message from "../interfaces/Message.tsx";
import {FeedbackModal} from "./ui/FeedbackModal.tsx";
import {Link} from "react-router-dom";
import {Player} from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../../assets/animations/logoLoading.json";

interface ChatMessagesListProps {
    isOpen: boolean;
    onClose: () => void;
    chatId: number | null;
    chatChoose?: Chat | null | undefined;
}


export const ChatMessagesList: React.FC<ChatMessagesListProps> = ({ isOpen, onClose, chatId, chatChoose }) => {
    const [, setChatList] = useState<Chat[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [, setFile] = useState<File | null>(null);
    const [formattedMessages, setFormattedMessages] = useState<any[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [previousChatId, setPreviousChatId] = useState<number | null>(null); // Для отслеживания изменений chatId

    const [infoMenuOpen, setInfoMenuOpen] = useState(false);
    const take = 50;

    const socket = useWebSocket();
    const { userId, role } = useAuth();

    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

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

    // Сброс skip при изменении чата
    useEffect(() => {
        if (chatId !== previousChatId) {
            setSkip(0);
            setPreviousChatId(chatId);
            setMessages([]);
            setHasMore(true);
            loadMessages();
        }
    }, [chatId, previousChatId]);

    useEffect(() => {
        setSkip(0);
        if (chatId === null) {
            onClose();
            setMessages([]);
            return;
        }
        loadMessages();

        // clear on demount
        return () => {
            setMessages([]);
            setSkip(0);
        };
    }, []);

    const loadMessages = useCallback(async () => {
      //  console.log('loading messages skip -> ', skip);
        if (!chatId || loading || !hasMore) return;

        setLoading(true);
        try {
            const localSkip = skip;
            const newMessages = await fetchMessages(chatId, localSkip, take);
            if (newMessages.length > 0) {
                const chatContainer = chatContainerRef.current;
                const previousScrollHeight = chatContainer?.scrollHeight || 0;

                // @ts-ignore
                setMessages(prevMessages => [...newMessages, ...prevMessages]);
                setSkip(prevSkip => {
                    const newSkip = prevSkip + take;
                  //  console.log('Updated skip ->', newSkip);
                    return newSkip;
                });

                setTimeout(() => {
                    if (chatContainer) {
                        chatContainer.scrollTop = chatContainer.scrollHeight - previousScrollHeight;
                    }
                }, 0);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        } finally {
            setLoading(false);
        }
    }, [chatId, skip, loading, hasMore, take]);



    useEffect(() => {
        if (chatId && !loading && hasMore) {
            loadMessages();
        }
    }, [skip]);

    const handleScroll = useCallback(
        debounce(() => {
            const element = chatContainerRef.current;
            if (element && element.scrollTop === 0 && !loading && hasMore) {
                loadMessages();
            }
        }, 300),
        [loading, hasMore, loadMessages]
    );

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (chatContainer) {
                chatContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    // load messages whenever a new chat is selected
    useEffect(() => {
        setSkip(0);
        if (chatId === null) {
            onClose();
            setSkip(0);
            setMessages([]);
            return;
        }

        // clear on demount
        return () => {
            setMessages([]);
            setSkip(0);
        };
    }, [chatId]);

    // autoscroll to the last message when writing a new one
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'instant'});
        }
    }, [formattedMessages]);

    // join chat and handle new messages when a chat is selected
    useEffect(() => {
        if (socket && chatId) {
            socket.emit('joinChat', chatId);

            socket.on('newMessage', (message: {
                chat: { id: number; };
                content: string;
                timestamp: string;
                chatId: any;
            }) => {
                if (message.chat.id === chatId) {

                    const messageType = determineMessageType(message.content);
                    const formattedMessage = {
                        ...message,
                        type: messageType,
                        formattedTime: formatTime(message.timestamp),
                    };
                    // @ts-ignore
                    setMessages((prevMessages) => [...prevMessages, formattedMessage]);
                } else {

                   // chatList.forEach(chat => {
                   //     console.log(`New messages ${chat.unreadCount} in chat ${chat.id}`);
                   // });

                    setChatList(prevChatList =>
                        prevChatList.map(chat =>
                            chat.id === message.chat.id
                                ? {...chat, unreadCount: chat.unreadCount + 1}
                                : chat
                        )
                    );
                    notifyUserAboutNewMessage(message.chatId);
                }
            });

            socket.on('messageRead', (updatedMessage: { id: number; }) => {
                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg.id === updatedMessage.id ? {...msg, isRead: true} : msg
                    )
                );
            });

            return () => {
                socket.emit('leaveChat', chatId);
                socket.off('newMessage');
                socket.off('messageRead');
            };
        }
    }, [socket, chatId]);

    // send message
    // @ts-ignore
    const handleSendMessage = (message) => {
        if (socket && message.trim()) {
            socket.emit('sendMessage', {
                chatId: chatId,
                content: message,
                type: 'text',
            });
        }
    };

    // send file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            // handleSendFile(event.target.files[0], chatId, socket);
        }
    };

    const toggleInfoMenu = () => {
        setInfoMenuOpen(!infoMenuOpen);
    };

    // block / unblock chat
    const handleBlockChat = async (chatId: number | null, isBlocked: boolean | undefined) => {
        if (chatId == null) return; // или обработка ошибки

        try {
            isBlocked ? await unblockChat(chatId) : await blockChat(chatId);
            //  loadChats(filter, username);
            toggleInfoMenu();
        } catch (error) {
            console.error('Error updating chat block status:', error);
        }
    };

    // archive / unarchive chat
    const handleArchiveChat = async (chatId: number | null, isArchived: boolean | undefined) => {
        if (chatId == null) return; // или обработка ошибки

        try {
            isArchived ? await unarchiveChat(chatId) : await archiveChat(chatId);
            //  loadChats(filter, username);
            toggleInfoMenu();
        } catch (error) {
            console.error('Error updating chat archive status:', error);
        }
    };

    useEffect(() => {
        if (chatId && messages.length > 0) {
            messages.forEach(message => {
                // Отмечаем как прочитанное только если сообщение еще не прочитано и отправлено не текущим пользователем
                if (!message.isRead && message.sender.id !== userId) {
                    markMessageAsRead(message.id);
                }
            });
        }
    }, [messages, chatId]);

    // func for read / delivered status
    const markMessageAsRead = (messageId: number) => {
        if (socket) {
            // Отправляем событие через WebSocket
            socket.emit('markAsRead', {messageId});
            //console.log(`Сообщение с id ${messageId} отправлено на отметку как прочитанное`);
        }
    };

    const notifyUserAboutNewMessage = (chatId: number) => {
        setChatList((prevChatList) => prevChatList.map(chat => {
            if (chat.id === chatId) {
                return {...chat, hasNewMessages: true};
            }
            return chat;
        }));
    };

    // group messages by date and load chat list when messages change
    useEffect(() => {
        // group messages by date
        if (messages.length > 0) {
            const groupedMessages = messages.reduce<any[]>((acc, message, index, arr) => {
                const currentDate = new Date(message.timestamp).toDateString();
                const prevDate = index > 0 ? new Date(arr[index - 1].timestamp).toDateString() : null;

                // add date separator
                if (currentDate !== prevDate) {
                    acc.push({type: 'date', date: formatDate(message.timestamp)});
                }
                acc.push(message);
                return acc;
            }, []);

            setFormattedMessages(groupedMessages);
        }

    }, [messages]);

    //console.log("chatId -> ", chatId);
    //console.log("selectedChat -> ", chatChoose);
    return (
        <>
            <div
                className={`fixed top-0 right-0 bg-almost-white z-50 transform rounded-l-3xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full h-full `}>
                {/* Chat Header */}
                <div className="flex justify-between items-center px-[1vw] py-[1vh] mt-[2vh]">
                    <div className="flex items-center space-x-2 ">
                        <button onClick={onClose}>
                            <DownArrowIcon className="h-4 w-4 mr-5"/>
                        </button>
                        <p className="font-montserratRegular font-semibold text-base">{chatChoose?.name || ""}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Button className="bg-transparent xl:p-2 md:p-1" onClick={toggleInfoMenu}>
                                <BurgerIcon className="h-4 w-4"/>
                            </Button>

                            {/* Выпадающий список */}
                            {infoMenuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10">
                                    <ul className="py-2">
                                        <Link to={`/profile-volunteer/${chatChoose?.memberId}`}>
                                            <li className="flex items-start justify-start px-4 py-4 cursor-pointer hover:bg-gray-100">
                                                <ProfileImg className="h-6 w-6 mr-3"/>
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
                                                               className="h-full rounded-xl"
                                                               name={chatChoose?.name}
                                                               memberId={chatChoose?.memberId}
                                                               onClose={() => setIsFeedbackOpen(false)}/>
                                            </>
                                            :
                                            <></>
                                        }
                                        <li className="flex items-start px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-500">
                                            <Button
                                                className="bg-transparent items-start justify-start flex xl:p-2 md:p-1 "
                                                onClick={() => {
                                                    if (chatId !== null) {
                                                        handleBlockChat(chatId, chatChoose?.isBlocked);
                                                        onClose();
                                                        setMessages([]);
                                                    }
                                                }}
                                            >
                                                <LockImg className="h-6 w-6 mr-3 -ml-2"/>
                                                <span>{chatChoose?.isBlocked ? 'Розблокувати' : 'Заблокувати'}</span>
                                            </Button>
                                        </li>
                                        <li className="flex items-start px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-500">
                                            <Button
                                                className="bg-transparent flex xl:p-2 md:p-1 items-start"
                                                onClick={() => {
                                                    if (chatId !== null) {
                                                        handleArchiveChat(chatId, chatChoose?.isArchived);
                                                        onClose();
                                                        setMessages([]);
                                                    }
                                                }}
                                            >
                                                <BellIcon className="h-6 w-6 mr-3 -ml-2"/>
                                                <span>{chatChoose?.isArchived ? 'Розархівувати' : 'Архівувати'}</span>
                                            </Button>
                                        </li>

                                    </ul>
                                </div>

                            )}
                        </div>
                        <button onClick={onClose}>
                            <CloseIcon className="w-6 h-6 mr-4"/>
                        </button>
                    </div>
                </div>

                {/* Chat Content */}
                <div className="p-3 flex-grow overflow-auto font-montserratMedium h-[82%] chat-content"
                     style={{
                         scrollbarWidth: 'none',
                         msOverflowStyle: 'none',
                     }}>
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
                </div>
                <div className="flex items-center">
                    <ComponentFullInput onSendMessage={handleSendMessage} onFileChange={handleFileChange}
                                        onSendFile={handleSendFile}
                                        selectedChatId={chatId}
                                        socket={socket}/>
                </div>

            </div>
        </>
    );
};
