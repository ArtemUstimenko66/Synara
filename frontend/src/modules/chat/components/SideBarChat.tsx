import React, { useState } from 'react';
import CloseIcon from '../assets/close_icon.svg?react';
import DownArrowIcon from '../assets/Down_Arrow.svg?react';
import { Button } from "../../../ui/Button.tsx";
import { ChatMiniComponent } from './ui/ChatMiniComponent.tsx';
import {ChatMessagesList} from "./ChatMessagesList.tsx";

interface Message {
    id: number;
    name: string;
    message: string;
    time: string;
    imageUrl: string;
    category: 'active' | 'archived' | 'blocked';
}

interface SideBarChatProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SideBarChat: React.FC<SideBarChatProps> = ({ isOpen, onClose }) => {
    const messages: Message[] = [
        // Категория 'active'
        { id: 1, name: "Ольга Коваленко", message: "Lorem Ipsum - это текст-'рыба'", time: "19:27", imageUrl: "https://randomuser.me/api/portraits/women/1.jpg", category: 'active' },
        { id: 2, name: "Дмитро Мельник", message: "Lorem Ipsum - это текст-'рыба', часто используемый в печати", time: "10:05", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg", category: 'active' },
        { id: 4, name: "Ольга Костенко", message: "Lorem Ipsum - это текст-'рыба', часто используемый в печати и веб-дизайне", time: "20.08.2024", imageUrl: "https://randomuser.me/api/portraits/women/3.jpg", category: 'active' },
        { id: 7, name: "Максим Дубов", message: "Сообщение о чем-то важном", time: "11:30", imageUrl: "https://randomuser.me/api/portraits/men/3.jpg", category: 'active' },
        { id: 9, name: "Володимир Бойко", message: "Не забудь про встречу завтра", time: "пт", imageUrl: "https://randomuser.me/api/portraits/men/4.jpg", category: 'active' },
        { id: 13, name: "Ігор Петренко", message: "Документы готовы, могу отправить", time: "ср", imageUrl: "https://randomuser.me/api/portraits/men/6.jpg", category: 'active' },

        // Добавляем еще 7 сообщений для категории 'active'
        { id: 16, name: "Анна Гусева", message: "Привет! Как твои дела?", time: "09:00", imageUrl: "https://randomuser.me/api/portraits/women/9.jpg", category: 'active' },
        { id: 17, name: "Петро Іванов", message: "У нас важная встреча сегодня", time: "15:00", imageUrl: "https://randomuser.me/api/portraits/men/8.jpg", category: 'active' },
        { id: 18, name: "Марина Левчук", message: "Когда мы встретимся?", time: "17:30", imageUrl: "https://randomuser.me/api/portraits/women/10.jpg", category: 'active' },
        { id: 19, name: "Юрій Поляков", message: "У меня вопросы по проекту", time: "12:15", imageUrl: "https://randomuser.me/api/portraits/men/9.jpg", category: 'active' },
        { id: 20, name: "Ірина Григоренко", message: "Помоги с задачей", time: "08:30", imageUrl: "https://randomuser.me/api/portraits/women/11.jpg", category: 'active' },
        { id: 21, name: "Сергій Ткаченко", message: "Где ты был вчера?", time: "13:45", imageUrl: "https://randomuser.me/api/portraits/men/10.jpg", category: 'active' },
        { id: 22, name: "Олена Михайленко", message: "Как дела с отчетом?", time: "16:00", imageUrl: "https://randomuser.me/api/portraits/women/12.jpg", category: 'active' },

        // Категория 'archived'
        { id: 3, name: "Марія Кравчук", message: "Lorem Ipsum - это текст-'рыба'", time: "пн", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg", category: 'archived' },
        { id: 5, name: "Тарас Левченко", message: "Lorem Ipsum - это текст-'рыба', часто используемый", time: "15.08.2024", imageUrl: "https://randomuser.me/api/portraits/men/2.jpg", category: 'archived' },
        { id: 10, name: "Катерина Литвиненко", message: "У меня для тебя сюрприз!", time: "чт", imageUrl: "https://randomuser.me/api/portraits/women/6.jpg", category: 'archived' },
        { id: 12, name: "Людмила Ткаченко", message: "Давай встретимся на следующей неделе", time: "вт", imageUrl: "https://randomuser.me/api/portraits/women/7.jpg", category: 'archived' },
        { id: 15, name: "Богдан Журавель", message: "Нужен совет по проекту", time: "09:15", imageUrl: "https://randomuser.me/api/portraits/men/7.jpg", category: 'archived' },

        // Добавляем еще 7 сообщений для категории 'archived'
        { id: 23, name: "Наталія Коваленко", message: "Сохрани это на будущее", time: "14:20", imageUrl: "https://randomuser.me/api/portraits/women/13.jpg", category: 'archived' },
        { id: 24, name: "Василь Петров", message: "Обсудим завтра", time: "11:00", imageUrl: "https://randomuser.me/api/portraits/men/11.jpg", category: 'archived' },
        { id: 25, name: "Софія Литвинова", message: "Как ты провел выходные?", time: "19:30", imageUrl: "https://randomuser.me/api/portraits/women/14.jpg", category: 'archived' },
        { id: 26, name: "Олексій Кравченко", message: "Нужно встретиться для обсуждения", time: "08:15", imageUrl: "https://randomuser.me/api/portraits/men/12.jpg", category: 'archived' },
        { id: 27, name: "Юлія Хоменко", message: "Не забудь про встречу", time: "16:00", imageUrl: "https://randomuser.me/api/portraits/women/15.jpg", category: 'archived' },
        { id: 28, name: "Микола Зайцев", message: "Что нового у тебя?", time: "13:30", imageUrl: "https://randomuser.me/api/portraits/men/13.jpg", category: 'archived' },
        { id: 29, name: "Оксана Назаренко", message: "Вижу, что работа кипит", time: "10:00", imageUrl: "https://randomuser.me/api/portraits/women/16.jpg", category: 'archived' },

        // Категория 'blocked'
        { id: 6, name: "Ірина Савченко", message: "Новый текст сообщения", time: "14:35", imageUrl: "https://randomuser.me/api/portraits/women/4.jpg", category: 'blocked' },
        { id: 8, name: "Світлана Гончарова", message: "Привет! Как твои дела?", time: "08:45", imageUrl: "https://randomuser.me/api/portraits/women/5.jpg", category: 'blocked' },
        { id: 11, name: "Олександр Ковальчук", message: "Звони, как только сможешь", time: "13:00", imageUrl: "https://randomuser.me/api/portraits/men/5.jpg", category: 'blocked' },
        { id: 14, name: "Олена Сидоренко", message: "Спасибо за помощь!", time: "вчера", imageUrl: "https://randomuser.me/api/portraits/women/8.jpg", category: 'blocked' },

        // Добавляем еще 8 сообщений для категории 'blocked'
        { id: 30, name: "Олена Яценко", message: "Не могу найти документ", time: "09:30", imageUrl: "https://randomuser.me/api/portraits/women/17.jpg", category: 'blocked' },
        { id: 31, name: "Максим Корниенко", message: "Когда ты вернешься?", time: "11:15", imageUrl: "https://randomuser.me/api/portraits/men/14.jpg", category: 'blocked' },
        { id: 32, name: "Анастасія Гончарова", message: "Вам нужно срочно отписаться", time: "15:00", imageUrl: "https://randomuser.me/api/portraits/women/18.jpg", category: 'blocked' },
        { id: 33, name: "Роман Шевченко", message: "Я вас не слышу", time: "12:30", imageUrl: "https://randomuser.me/api/portraits/men/15.jpg", category: 'blocked' },
        { id: 34, name: "Світлана Романенко", message: "Проверьте вашу почту", time: "16:45", imageUrl: "https://randomuser.me/api/portraits/women/19.jpg", category: 'blocked' },
        { id: 35, name: "Ігор Левченко", message: "Не могу найти контакт", time: "14:00", imageUrl: "https://randomuser.me/api/portraits/men/16.jpg", category: 'blocked' },
        { id: 36, name: "Тетяна Григоренко", message: "Нужна помощь", time: "08:00", imageUrl: "https://randomuser.me/api/portraits/women/20.jpg", category: 'blocked' },
        { id: 37, name: "Віктор Бондаренко", message: "Забыла пароль", time: "10:45", imageUrl: "https://randomuser.me/api/portraits/men/17.jpg", category: 'blocked' },
    ];

    const filterOptions = [
        { key: 'active', label: 'Активні чати' },
        { key: 'archived', label: 'Архівовані чати' },
        { key: 'blocked', label: 'Заблоковані чати' },
    ];

    const [isChatListOpen, setIsChatListOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filter, setFilter] = useState<'active' | 'archived' | 'blocked'>('active');

    const toggleChatListOpen = () => {
        setIsChatListOpen(!isChatListOpen);
        console.log(isChatListOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleFilterChange = (newFilter: 'active' | 'archived' | 'blocked') => {
        setFilter(newFilter);
        setDropdownOpen(false);
    };

    const toggleChatList = () => {
        setIsChatListOpen(!isChatListOpen);
    };

    const filteredChatList = messages.filter(chat => chat.category === filter);

    const getAvailableFilters = (currentFilter: string) => {
        return filterOptions.filter((option) => option.key !== currentFilter);
    };

    return (
        <>
            {/* Dark side */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={onClose}
                ></div>
            )}
            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 bg-white z-50 overflow-hidden transform transition-transform duration-500 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-1/4 h-full shadow-lg border-2 border-l-dark-blue 
                border-t-dark-blue border-b-dark-blue rounded-l-3xl flex flex-col p-6`}
            >
                {/* Button of filtration & exit */}
                <div className="flex justify-center  mt-[5%] items-center mb-4 relative h-[7%]">
                    <div className="flex flex-wrap justify-center items-center relative w-full">
                        <Button
                            isFilled={true}
                            className={`bg-perfect-yellow text-black w-60 text-center py-2 px-4 transition-all duration-0 ${
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
                            <div className="absolute mt-[9.8vh] w-60 bg-perfect-yellow rounded-b-2xl text-black shadow-lg z-10">
                                <ul>
                                    {getAvailableFilters(filter).map((option) => (
                                        <div
                                            key={option.key}
                                            className="flex space-x-2 items-center px-2 mb-1 justify-between"
                                        >
                                            <li
                                                className="px-4 py-2 font-montserratMedium cursor-pointer"
                                                onClick={() =>
                                                    handleFilterChange(
                                                        option.key as 'active' | 'archived' | 'blocked'
                                                    )
                                                }
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

                {/* Chats */}
                {messages.length > 0 ? (
                    <>
                        <hr className="border-t border-gray-300 mb-2"/>
                        <div
                            className="flex flex-col h-[110%]  space-y-4 overflow-y-auto flex-grow no-scrollbar"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            {filteredChatList.map((msg, index) => (
                                <ChatMiniComponent
                                    key={msg.id}
                                    message={msg}
                                    showDivider={index < messages.length - 1}
                                    onChatClick={() => toggleChatListOpen()}
                                />
                            ))}

                        </div>
                        <hr className="border-t border-gray-300"/>
                        <div className="h-[20%] flex justify-center items-center">
                            <a
                                href="/chat"
                                className="text-blue-500 text-sm font-montserratMedium underline"
                            >
                                Переглянути все в папці "Вхідні"
                            </a>
                        </div>
                    </>
                ) : (
                    // if there is no chats
                    <div className="flex flex-col items-center justify-center flex-grow mx-5">
                        <div className="bg-dark-blue w-[70%] h-[30%] rounded-3xl mb-4"></div>
                        <p className="text-center font-montserratMedium font-medium text-lg mb-2">
                            У вас поки немає чатів
                        </p>
                        <p className="text-center font-montserratMedium font-normal text-sm">
                            У вас поки немає чатів. Почніть розмову з іншими користувачами, щоб
                            надати або отримати допомогу
                        </p>
                    </div>
                )}
                <ChatMessagesList isOpen={isChatListOpen} onClose={toggleChatList} />
            </div>
        </>
    );
};