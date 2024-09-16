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
}

interface SideBarChatProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SideBarChat: React.FC<SideBarChatProps> = ({ isOpen, onClose }) => {
    const messages: Message[] = [
        { id: 1, name: "Ольга Коваленко", message: "Lorem Ipsum - это текст-'рыба'", time: "19:27", imageUrl: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: 2, name: "Дмитро Мельник", message: "Lorem Ipsum - это текст-'рыба', часто используемый в печати", time: "10:05", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 3, name: "Марія Кравчук", message: "Lorem Ipsum - это текст-'рыба'", time: "пн", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
        { id: 4, name: "Ольга Костенко", message: "Lorem Ipsum - это текст-'рыба', часто используемый в печати и веб-дизайне", time: "20.08.2024", imageUrl: "https://randomuser.me/api/portraits/women/3.jpg" },
        { id: 5, name: "Тарас Левченко", message: "Lorem Ipsum - это текст-'рыба', часто используемый", time: "15.08.2024", imageUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 6, name: "Ірина Савченко", message: "Новый текст сообщения", time: "14:35", imageUrl: "https://randomuser.me/api/portraits/women/4.jpg" },
        { id: 7, name: "Максим Дубов", message: "Сообщение о чем-то важном", time: "11:30", imageUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
    ];
    const [isChatListOpen, setIsChatListOpen] = useState(false);

    const toggleChatListOpen = () => {
        setIsChatListOpen(!isChatListOpen);
        console.log(isChatListOpen);
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filter, setFilter] = useState<'active' | 'archived' | 'blocked'>('active');
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


    const filterOptions = [
        { key: 'active', label: 'Активні чати' },
        { key: 'archived', label: 'Архівовані чати' },
        { key: 'blocked', label: 'Заблоковані чати' },
    ];

    const getAvailableFilters = (currentFilter: string) => {
        return filterOptions.filter((option) => option.key !== currentFilter);
    };
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={onClose}
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 bg-white z-50 overflow-hidden transform transition-transform duration-500 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'} xl:w-1/4 md:w-2/3 h-full shadow-lg border-2 border-l-dark-blue 
                    border-t-dark-blue border-b-dark-blue rounded-l-3xl flex flex-col p-6`}
            >
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
                    <CloseIcon
                        className="absolute top-0 right-0 m-2 cursor-pointer h-6 w-6"
                        onClick={onClose}
                    />
                </div>

                {/* Проверка на наличие сообщений */}
                {messages.length > 0 ? (
                    <>
                        <hr className="border-t border-gray-300 mb-2"/>
                        <div className="flex flex-col space-y-4 overflow-y-auto flex-grow">
                            {messages.map((msg, index) => (
                                <ChatMiniComponent
                                    key={msg.id}
                                    message={msg}
                                    showDivider={index < messages.length - 1}
                                    onChatClick={() => toggleChatListOpen()} // Передаем функцию для открытия чата
                                />
                            ))}
                            <hr className="border-t border-gray-300"/>
                        </div>
                        {/* Ссылка внизу */}
                        <div className="mt-4 flex justify-center">
                            <a href="/chat" className="text-blue-500 xl:text-sm md:text-xs-pxl font-montserratMedium underline">
                                Переглянути все в папці "Вхідні"
                            </a>
                        </div>

                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center flex-grow mx-5">
                        <div className="bg-dark-blue w-[70%] h-[30%] rounded-3xl mb-4"></div>
                        <p className="text-center font-montserratMedium font-medium text-lg mb-2">У вас поки немає
                            чатів</p>
                        <p className="text-center font-montserratMedium font-normal text-sm">
                            У вас поки немає чатів. Почніть розмову з іншими користувачами, щоб надати або отримати
                            допомогу
                        </p>
                    </div>
                )}
                <ChatMessagesList isOpen={isChatListOpen} onClose={toggleChatList}/>

            </div>
        </>
    );
};
