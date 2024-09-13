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
    // Категория 'active'
    { id: 1, name: "Ольга Коваленко", message: "Lorem Ipsum - это текст-'рыба'", time: "19:27", imageUrl: "https://randomuser.me/api/portraits/women/1.jpg", messages: ['Привіт, як справи?'], category: 'active' },
    { id: 2, name: "Дмитро Мельник", message: "Lorem Ipsum - это текст-'рыба', часто используемый в печати", time: "10:05", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg", messages: ['Привіт, як справи?'], category: 'active' },
    { id: 4, name: "Ольга Костенко", message: "Lorem Ipsum - это текст-'рыба', часто используемый в печати и веб-дизайне", time: "20.08.2024", imageUrl: "https://randomuser.me/api/portraits/women/3.jpg", messages: ['Привіт, як справи?'], category: 'active' },
    { id: 7, name: "Максим Дубов", message: "Сообщение о чем-то важном", time: "11:30", imageUrl: "https://randomuser.me/api/portraits/men/3.jpg", messages: ['Привіт, як справи?'], category: 'active' },
    { id: 9, name: "Володимир Бойко", message: "Не забудь про встречу завтра", time: "пт", imageUrl: "https://randomuser.me/api/portraits/men/4.jpg", messages: ['Привіт, як справи?'], category: 'active' },
    { id: 13, name: "Ігор Петренко", message: "Документы готовы, могу отправить", time: "ср", imageUrl: "https://randomuser.me/api/portraits/men/6.jpg", messages: ['Привіт, як справи?'], category: 'active' },

    // Добавляем еще 7 сообщений для категории 'active'
    { id: 16, name: "Анна Гусева", message: "Привет! Как твои дела?", time: "09:00", imageUrl: "https://randomuser.me/api/portraits/women/9.jpg", messages: ['Привіт, як справи?'], category: 'active' },
    { id: 17, name: "Петро Іванов", message: "У нас важная встреча сегодня", time: "15:00", imageUrl: "https://randomuser.me/api/portraits/men/8.jpg", messages: ['Привіт, як справи?'], category: 'active' },
    { id: 18, name: "Марина Левчук", message: "Когда мы встретимся?", time: "17:30", imageUrl: "https://randomuser.me/api/portraits/women/10.jpg", messages: ['Привіт, як справи?'], category: 'active' },
    { id: 19, name: "Юрій Поляков", message: "У меня вопросы по проекту", time: "12:15", imageUrl: "https://randomuser.me/api/portraits/men/9.jpg", messages: ['Привіт, як справи?'], category: 'active' },
    { id: 20, name: "Ірина Григоренко", message: "Помоги с задачей", time: "08:30", imageUrl: "https://randomuser.me/api/portraits/women/11.jpg", messages: ['Привіт, як справи?'], category: 'active' },
    { id: 21, name: "Сергій Ткаченко", message: "Где ты был вчера?", time: "13:45", imageUrl: "https://randomuser.me/api/portraits/men/10.jpg", messages: ['Привіт, як справи?'], category: 'active' },
    { id: 22, name: "Олена Михайленко", message: "Как дела с отчетом?", time: "16:00", imageUrl: "https://randomuser.me/api/portraits/women/12.jpg", messages: ['Привіт, як справи?'], category: 'active' },

    // Категория 'archived'
    { id: 3, name: "Марія Кравчук", message: "Lorem Ipsum - это текст-'рыба'", time: "пн", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },
    { id: 5, name: "Тарас Левченко", message: "Lorem Ipsum - это текст-'рыба', часто используемый", time: "15.08.2024", imageUrl: "https://randomuser.me/api/portraits/men/2.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },
    { id: 10, name: "Катерина Литвиненко", message: "У меня для тебя сюрприз!", time: "чт", imageUrl: "https://randomuser.me/api/portraits/women/6.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },
    { id: 12, name: "Людмила Ткаченко", message: "Давай встретимся на следующей неделе", time: "вт", imageUrl: "https://randomuser.me/api/portraits/women/7.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },
    { id: 15, name: "Богдан Журавель", message: "Нужен совет по проекту", time: "09:15", imageUrl: "https://randomuser.me/api/portraits/men/7.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },

    // Добавляем еще 7 сообщений для категории 'archived'
    { id: 23, name: "Наталія Коваленко", message: "Сохрани это на будущее", time: "14:20", imageUrl: "https://randomuser.me/api/portraits/women/13.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },
    { id: 24, name: "Василь Петров", message: "Обсудим завтра", time: "11:00", imageUrl: "https://randomuser.me/api/portraits/men/11.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },
    { id: 25, name: "Софія Литвинова", message: "Как ты провел выходные?", time: "19:30", imageUrl: "https://randomuser.me/api/portraits/women/14.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },
    { id: 26, name: "Олексій Кравченко", message: "Нужно встретиться для обсуждения", time: "08:15", imageUrl: "https://randomuser.me/api/portraits/men/12.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },
    { id: 27, name: "Юлія Хоменко", message: "Не забудь про встречу", time: "16:00", imageUrl: "https://randomuser.me/api/portraits/women/15.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },
    { id: 28, name: "Микола Зайцев", message: "Что нового у тебя?", time: "13:30", imageUrl: "https://randomuser.me/api/portraits/men/13.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },
    { id: 29, name: "Оксана Назаренко", message: "Вижу, что работа кипит", time: "10:00", imageUrl: "https://randomuser.me/api/portraits/women/16.jpg", messages: ['Привіт, що робиш?'], category: 'archived' },

    // Категория 'blocked'
    { id: 6, name: "Ірина Савченко", message: "Новый текст сообщения", time: "14:35", imageUrl: "https://randomuser.me/api/portraits/women/4.jpg", messages: ['Привіт, що робиш?'], category: 'blocked' },
    { id: 8, name: "Світлана Гончарова", message: "Привет! Как твои дела?", time: "08:45", imageUrl: "https://randomuser.me/api/portraits/women/5.jpg", messages: ['Привіт, що робиш?'], category: 'blocked' },
    { id: 11, name: "Олександр Ковальчук", message: "Звони, как только сможешь", time: "13:00", imageUrl: "https://randomuser.me/api/portraits/men/5.jpg", messages: ['Привіт, що робиш?'], category: 'blocked' },
    { id: 14, name: "Олена Сидоренко", message: "Спасибо за помощь!", time: "вчера", imageUrl: "https://randomuser.me/api/portraits/women/8.jpg", messages: ['Привіт, що робиш?'], category: 'blocked' },

    // Добавляем еще 8 сообщений для категории 'blocked'
    { id: 30, name: "Олена Яценко", message: "Не могу найти документ", time: "09:30", imageUrl: "https://randomuser.me/api/portraits/women/17.jpg", messages: ['Привіт, як справи?'], category: 'blocked' },
    { id: 31, name: "Максим Корниенко", message: "Когда ты вернешься?", time: "11:15", imageUrl: "https://randomuser.me/api/portraits/men/14.jpg", messages: ['Привіт, як справи?'], category: 'blocked' },
    { id: 32, name: "Анастасія Гончарова", message: "Вам нужно срочно отписаться", time: "15:00", imageUrl: "https://randomuser.me/api/portraits/women/18.jpg", messages: ['Привіт, як справи?'], category: 'blocked' },
    { id: 33, name: "Роман Шевченко", message: "Я вас не слышу", time: "12:30", imageUrl: "https://randomuser.me/api/portraits/men/15.jpg", messages: ['Привіт, як справи?'], category: 'blocked' },
    { id: 34, name: "Світлана Романенко", message: "Проверьте вашу почту", time: "16:45", imageUrl: "https://randomuser.me/api/portraits/women/19.jpg", messages: ['Привіт, як справи?'], category: 'blocked' },
    { id: 35, name: "Ігор Левченко", message: "Не могу найти контакт", time: "14:00", imageUrl: "https://randomuser.me/api/portraits/men/16.jpg", messages: ['Привіт, як справи?'], category: 'blocked' },
    { id: 36, name: "Тетяна Григоренко", message: "Нужна помощь", time: "08:00", imageUrl: "https://randomuser.me/api/portraits/women/20.jpg", messages: ['Привіт, як справи?'], category: 'blocked' },
    { id: 37, name: "Віктор Бондаренко", message: "Забыла пароль", time: "10:45", imageUrl: "https://randomuser.me/api/portraits/men/17.jpg", messages: ['Привіт, як справи?'], category: 'blocked' },
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
                        <div className="h-[calc(90vh-200px)] overflow-y-auto" style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}>
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
                                            index % 2 === 0 ? 'bg-baby-blue text-left self-start' : 'bg-pale-yellow text-right self-end'
                                        }`}
                                    >
                                        {message}
                                    </div>
                                ))}

                                {/* Example with an image message */}
                                <div className="max-w-md self-end">
                                    <img
                                        src="https://via.placeholder.com/300"
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
