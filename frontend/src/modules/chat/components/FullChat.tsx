import React, { useState } from 'react';
import MainHeader from "../../main-page/components/ui/MainHeader.tsx";
import Wrapper from "../../../ui/Wrapper.tsx";
import { Button } from "../../../ui/Button.tsx";
import DownArrowIcon from '../assets/down_arrow.svg?react';

import PhoneIcon from '../assets/PhoneIcon.svg?react';
import CameraIcon from '../assets/CameraICon.svg?react';
import InfoIcon from '../assets/InfoIcon.svg?react';
import ComponentFullInput from "./ComponentFullInput.tsx";
import {ChatMiniComponent} from "./ui/ChatMiniComponent.tsx";

// Mock data for chat list
const chatList = [
    { id: 1, name: 'Ольга Коваленко', message: 'Lorem Ipsum - это текст-"рыба"', time: '19:27', imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg', messages: ['Привіт, як справи?'], category: 'active' },
    { id: 5, name: 'Ирина Коваленко', message: 'Lorem Ipsum - это текст-"рыба"', time: '19:27', imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg', messages: ['Привіт, як справи?'], category: 'active' },
    { id: 6, name: 'Настя Коваленко', message: 'Lorem Ipsum - это текст-"рыба"', time: '19:27', imageUrl: 'https://randomuser.me/api/portraits/women/13.jpg', messages: ['Привіт, як справи?'], category: 'active' },
    { id: 7, name: 'Юля Коваленко', message: 'Lorem Ipsum - это текст-"рыба"', time: '19:27', imageUrl: 'https://randomuser.me/api/portraits/women/14.jpg', messages: ['Привіт, як справи?'], category: 'active' },
    { id: 2, name: 'Ольга Коваленко', message: 'Lorem Ipsum - это текст-"рыба"', time: '19:27', imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg', messages: ['Як твої справи?'], category: 'archived' },
    { id: 3, name: 'Дмитро Мельник', message: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати.', time: '10:05', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg', messages: ['Привіт, що робиш?'], category: 'blocked' },
    { id: 4, name: 'Марія Кравчук', message: 'Lorem Ipsum - это текст-"рыба"', time: 'Пн', imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg', messages: ['Привіт, як справи?'], category: 'active' },
];

const FullChat: React.FC = () => {
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filter, setFilter] = useState<'active' | 'archived' | 'blocked'>('active');

    const handleChatClick = (chatId: number) => {
        setSelectedChatId(chatId);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleFilterChange = (newFilter: 'active' | 'archived' | 'blocked') => {
        setFilter(newFilter);
        setDropdownOpen(false);
    };

    // Filter the chat list based on the selected filter
    const filteredChatList = chatList.filter(chat => chat.category === filter);

    const selectedChat = chatList.find(chat => chat.id === selectedChatId);
    const filterOptions = [
        { key: 'active', label: 'Активні чати' },
        { key: 'archived', label: 'Архівовані чати' },
        { key: 'blocked', label: 'Заблоковані чати' },
    ];

    const getAvailableFilters = (currentFilter: string) => {
        return filterOptions.filter((option) => option.key !== currentFilter);
    };
    return (
        <Wrapper>
            <div className="min-h-screen bg-almost-white flex">

                {/* Header */}
                <MainHeader />

                {/* Left Chat List Panel */}
                <div className="w-1/3 bg-white mt-16 relative">
                    <div className="p-4">
                        <div className="flex justify-center items-center mb-4 relative">
                            <div className="flex flex-wrap justify-center items-center relative">
                                <Button
                                    isFilled={true}
                                    className={`bg-perfect-yellow  text-black w-60 text-center py-2 px-4 transition-all duration-0 ${
                                        dropdownOpen ? 'rounded-b-none rounded-t-3xl' : 'rounded-3xl'
                                    } mb-8`}
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

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div
                                        className="absolute mt-[9.8vh] w-60 bg-perfect-yellow rounded-b-2xl text-black shadow-lg z-10">
                                        <ul>
                                            {getAvailableFilters(filter).map((option) => (
                                                <div key={option.key}
                                                     className="flex space-x-2 items-center px-2 mb-1 justify-between">
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

                        </div>
                        <hr className="border-t border-gray-200 mb-4"/>
                        {/* Chat List */}
                        <ul className="space-y-4">
                            {filteredChatList.map((chat, index) => (
                                <li key={chat.id}>
                                    <ChatMiniComponent
                                        message={chat}
                                        showDivider={index !== filteredChatList.length - 1}
                                        onChatClick={() => handleChatClick(chat.id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/*Right Chat Detail Panel*/}
                <div className="w-2/3 flex flex-col p-8 mt-12">
                    {selectedChat ? (
                        <div className="text-left w-full h-full flex flex-col">
                            {/* Header with contact information */}
                            <div className="flex items-center mb-4">
                                <img
                                    src={selectedChat.imageUrl}
                                    alt={selectedChat.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <h3 className="text-lg font-semibold">{selectedChat.name}</h3>
                                <div className="ml-auto flex space-x-4">
                                    {/* Icons for call, video call, and settings */}
                                    <Button className="bg-transparent p-2">
                                        <PhoneIcon className="h-6 w-6"/>
                                    </Button>
                                    <Button className="bg-transparent p-2">
                                        <CameraIcon className="h-6 w-6"/>
                                    </Button>
                                    <Button className="bg-transparent p-2">
                                        <InfoIcon className="h-6 w-6"/>
                                    </Button>
                                </div>
                            </div>

                            {/* Chat messages */}
                            <div className="chat-messages space-y-3 flex-1 overflow-y-auto">
                                {selectedChat.messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`max-w-md p-3 rounded-xl ${
                                            index % 2 === 0 ? 'bg-blue-100 text-left self-start' : 'bg-yellow-100 text-right self-end'
                                        }`}
                                    >
                                        {message}
                                    </div>
                                ))}

                                {/* Example with an image message */}
                                <div className="max-w-md self-end">
                                    <img
                                        src="https://via.placeholder.com/300"  // Замените на фактический URL изображения
                                        alt="Attached"
                                        className="rounded-lg shadow-md"
                                    />
                                    <p className="text-gray-500 text-xs mt-1 text-right">11:55</p>
                                </div>
                            </div>

                            {/* Input for sending a message */}
                            <div className="mt-4 mb-8 items-center">
                                <ComponentFullInput/>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-60 h-52 bg-dark-blue rounded-3xl mb-4"></div>
                            <h3 className="text-lg font-montserratMedium font-semibold">Почніть з того, на чому зупинилися</h3>
                            <p className="text-gray-500 font-montserratMedium">Виберіть розмову і починайте спілкуватися.</p>
                        </div>

                    )}
                </div>


            </div>
        </Wrapper>
    );
};

export default FullChat;
