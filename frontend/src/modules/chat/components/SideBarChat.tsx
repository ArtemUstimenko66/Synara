import React, { useState, useEffect, useCallback } from 'react';
import CloseIcon from '../assets/close_icon.svg?react';
import DownArrowIcon from '../assets/Down_Arrow.svg?react';
import NoChats from '../assets/NoChats.svg?react';
import { Button } from "../../../ui/Button.tsx";
import { ChatMiniComponent } from './ui/ChatMiniComponent.tsx';
import { ChatMessagesList } from "./ChatMessagesList.tsx";
import { fetchChats } from "../api/chatService.ts";
import { debounce } from 'lodash';
import { determineMessageType } from "../helpers/determineMessageType.ts";
import Chat from "../interfaces/Chat.tsx";
import {useTranslation} from "react-i18next";
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../../assets/animations/logoLoading.json';

interface SideBarChatProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SideBarChat: React.FC<SideBarChatProps> = ({ isOpen, onClose }) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [isChatListOpen, setIsChatListOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'active' | 'archived' | 'blocked'>('active');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const {t} = useTranslation();


    useEffect(() => {
        setSelectedChat(null);
        setSelectedChatId(null);
        const savedFilter = localStorage.getItem('chatFilter') as 'active' | 'archived' | 'blocked' | null;
        if (savedFilter) {
            setFilter(savedFilter);
        }
        fetchChatData(filter);
        console.log( "fetchChatData", fetchChatData(filter))
        console.log( "isOpen", isOpen)
    }, []);

    const fetchChatData = useCallback(debounce(async (filter: 'active' | 'archived' | 'blocked') => {
        localStorage.setItem('chatFilter', filter);
        try {
            setLoading(true);
            const chats = await fetchChats(filter);
            setChats(chats);
        } catch (error) {
            setError('Ошибка при загрузке чатов');
        } finally {
            setLoading(false);
        }
    }, 300), []);



    useEffect(() => {
        if (isOpen) {
            fetchChatData(filter);
            //console.log( "!!!!!!!!!!!!!!!!! ",fetchChatData(filter))
        } else {
            // Сбрасываем состояния при закрытии
            setIsChatListOpen(false);
            setSelectedChat(null);
            setSelectedChatId(null);
        }
    }, [isOpen, filter, fetchChatData]);


    const toggleChatListOpen = () => {
        setIsChatListOpen(!isChatListOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleFilterChange = (newFilter: 'active' | 'archived' | 'blocked') => {
        setFilter(newFilter);
        setDropdownOpen(false);
        setSelectedChat(null);
    };

    const filterOptions = [
        { key: 'active', label: 'Активні чати' },
        { key: 'archived', label: 'Архівовані чати' },
        { key: 'blocked', label: 'Заблоковані чати' },
    ];

    const getAvailableFilters = (currentFilter: string) => {
        return filterOptions.filter(option => option.key !== currentFilter);
    };

    const handleChatClick = (chat: Chat, chatId: number) => {
        setSelectedChat(chat);
        setSelectedChatId(chatId);
        toggleChatListOpen();
        setIsChatListOpen(true);
    };

    useEffect(() => {
        if (!isChatListOpen) {
            fetchChatData(filter);
        }
    }, [isChatListOpen, filter, fetchChatData]);


    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>}

            <div
                className={`fixed top-0 right-0 bg-white z-50  transform transition-transform duration-500 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'} xl:w-1/4 md:w-2/3 h-full shadow-lg border-2 border-l-dark-blue
                border-t-dark-blue border-b-dark-blue rounded-l-3xl flex flex-col p-6`}
            >
                <div className="flex justify-center items-center mb-4 ">
                    <div className="flex flex-wrap justify-center items-center  ">
                        <Button
                            isFilled={true}
                            className={`bg-perfect-yellow text-black w-60 text-center py-2 px-4 transition-all duration-0 ${
                                dropdownOpen ? 'rounded-b-none rounded-t-3xl' : 'rounded-3xl'
                            } mb-8`}
                            onClick={toggleDropdown}
                        >
                            <div className="flex space-x-2 items-center justify-between">
                                <p className="font-montserratMedium">
                                    {filterOptions.find(option => option.key === filter)?.label}
                                </p>
                                <DownArrowIcon
                                    className={`h-4 w-4 transform transition-transform duration-300 ${
                                        dropdownOpen ? 'rotate-90' : '-rotate-90'
                                    }`}
                                />
                            </div>
                        </Button>

                        {dropdownOpen && (
                            <div className="absolute mt-[9.8vh] w-60 bg-perfect-yellow rounded-b-2xl text-black shadow-lg z-50">
                                <ul>
                                    {getAvailableFilters(filter).map(option => (
                                        <div key={option.key} className="flex space-x-2 items-center px-2 mb-1 justify-between">
                                            <li
                                                className="px-4 py-2 font-montserratMedium cursor-pointer"
                                                onClick={() => handleFilterChange(option.key as 'active' | 'archived' | 'blocked')}
                                            >
                                                {option.label}
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <CloseIcon
                        className="absolute top-0 right-0 m-2 cursor-pointer h-6 w-6"
                        onClick={onClose}
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <Player
                            autoplay
                            loop
                            src={loadingAnimation}
                            style={{height: '200px', width: '200px'}}
                        />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <p className="font-montserratMedium text-red-500">{error}</p>
                    </div>
                ) : chats.length > 0 ? (
                    <>
                        <hr className="border-t border-gray-300 mb-2" />
                        <div className="flex flex-col space-y-4 overflow-y-auto flex-grow" style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}>
                            {chats.map((chat, index) => (
                                <ChatMiniComponent
                                    key={chat.id}
                                    message={{
                                        id: chat.id,
                                        message: chat.message,
                                        type: determineMessageType(chat.message),
                                        time: chat.time,
                                        name: chat.name,
                                        imageUrl: chat.imageUrl || 'https://via.placeholder.com/150',
                                    }}
                                    showDivider={index < chats.length - 1}
                                    onChatClick={() => handleChatClick(chat, chat.id)}
                                    unreadCount={chat.unreadCount}
                                />
                            ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                            <a href="/chat" className="text-blue-500 xl:text-sm md:text-xs-pxl font-montserratMedium underline">
                                {t('review_all_in_folder_income')}
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center flex-grow mx-5">
                        <NoChats />
                        <p className="text-center font-montserratMedium font-medium text-lg mb-2">{t('you_have_not_chats')}</p>
                        <p className="text-center font-montserratMedium font-normal text-sm">
                            {t('you_have_not_chats_start_speaking_for_helping')}                        </p>
                    </div>
                )}

                {selectedChatId !== null && (
                    <ChatMessagesList isOpen={isChatListOpen} onClose={toggleChatListOpen}  chatId={selectedChatId} chatChoose={selectedChat} />
                )}
            </div>
        </>
    );
};
