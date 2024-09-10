import React from 'react';
import CloseIcon from '../assets/close_icon.svg?react';
import DownArrowIcon from '../assets/down_arrow.svg?react';
import {Button} from "../../../ui/Button.tsx";

interface SideBarChatProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SideBarChat: React.FC<SideBarChatProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Темная сторона для затемнения фона */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={onClose}
                ></div>
            )}

            {/* Сайдбар */}
            <div
                className={`fixed top-0 right-0 bg-white z-50 overflow-hidden transform transition-transform duration-500 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-1/4 h-full shadow-lg border-2 border-l-dark-blue 
                    border-t-dark-blue border-b-dark-blue rounded-l-3xl flex flex-col p-6`}
            >
                {/* Верхняя панель с кнопкой закрытия */}
                <div className="flex justify-center items-center mb-4 relative">
                    {/* Кнопка "Активні чати" */}
                    <Button isFilled={true} className="text-black py-2 px-4 rounded-full">
                        <div className="flex space-x-2 items-center">
                            <p className="font-montserratMedium">Активні чати</p>
                            <DownArrowIcon className="h-4 w-4"/>
                        </div>
                    </Button>

                    {/* Кнопка закрытия */}
                    <CloseIcon
                        className="absolute top-0 right-0 m-2 cursor-pointer h-6 w-6"
                        onClick={onClose}
                    />
                </div>

                {/* Контент чата */}
                <div className="flex flex-col items-center justify-center flex-grow mx-5">
                    {/* Иконка или изображение */}
                    <div className="bg-dark-blue w-[70%] h-[30%] rounded-3xl mb-4"></div>

                    {/* Заголовок */}
                    <p className="text-center font-montserratMedium font-medium text-lg mb-2">У вас поки немає чатів</p>

                    {/* Описание */}
                    <p className="text-center font-montserratMedium font-normal text-sm ">
                        У вас поки немає чатів. Почніть розмову з іншими користувачами, щоб надати або отримати допомогу
                    </p>
                </div>
            </div>
        </>
    );
};
