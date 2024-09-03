import React from 'react';
import NavItem from "../../../ui/NavItem.tsx";
import LogoSynara from '../../../assets/images/logoSynara.svg?react';

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void; // Добавляем функцию закрытия
}

export const SideBar: React.FC<SideBarProps> = ({ isOpen = false, onClose }) => {
    const navItems = [
        { text: "Головна", to: "/home" },
        { text: "Про нас", to: "/about" },
        { text: "Збори", to: "/collections" },
        { text: "Карти", to: "/maps" },
        { text: "Як це працює", to: "/how-it-works" }
    ];

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={onClose}
                ></div>
            )}

            {/* Сайдбар */}
            <div
                className={`fixed top-0 right-0 bg-white z-40 overflow-hidden transform transition-transform duration-500 ease-in-out 
                            ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-1/4 h-full shadow-lg border-2 border-l-dark-blue border-t-dark-blue border-b-dark-blue rounded-l-3xl`}
            >
                <div className="flex justify-center mt-6 mb-8">
                    <LogoSynara className="w-24 h-24" />
                </div>

                <nav className="flex flex-col mx-5 space-y-5 text-lg">
                    {navItems.map((item, index) => (
                        <NavItem key={item.to} text={item.text} to={item.to} isLast={index === navItems.length - 1} />
                    ))}
                </nav>
            </div>
        </>
    );
};
