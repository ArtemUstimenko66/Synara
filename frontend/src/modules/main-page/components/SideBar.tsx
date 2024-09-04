import React, { useState } from 'react';
import NavItem from "../../../ui/NavItem.tsx";
import LogoSynara from '../../../assets/images/logoSynara.svg?react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../ui/Button.tsx";
import { logout } from "../../profile/api/profileService.ts";
import Filters from "./Filters.tsx";
import ModalLogout from "./ModalLogout.tsx";


interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
    isFilters: boolean;
}

export const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose, isFilters }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navItems = [
        { text: "ПРОФІЛЬ", to: "/profile" },
        { text: "ЧАТ", to: "/chat" },
        { text: "ОГОЛОШЕННЯ", to: "/announcements" },
        { text: "ПЕТИЦІЇ", to: "/petitions" },
        { text: "СТАТИСТИКА", to: "/statistics" },
        { text: "НАЛАШТУВАННЯ", to: "/settings" }
    ];

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
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
                className={`fixed top-0 right-0 bg-white z-40 overflow-hidden transform transition-transform duration-500 ease-in-out 
                            ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-1/4 h-full shadow-lg border-2 border-l-dark-blue border-t-dark-blue border-b-dark-blue rounded-l-3xl flex flex-col`}
            >
                {isFilters ? (
                    <div className="flex flex-col flex-grow p-5">
                        <Filters />
                    </div>
                ) : (
                    <div className="flex flex-col mx-4 flex-grow">
                        {/* Logo */}
                        <div className="flex justify-center mt-6 mb-8">
                            <LogoSynara className="w-28 h-28" />
                        </div>

                        {/* Nav items */}
                        <nav className="flex flex-col mx-5 space-y-5 text-lg flex-grow">
                            {navItems.map((item, index) => (
                                <div key={item.to} className="flex flex-col">
                                    <NavItem text={item.text} to={item.to} />
                                    {index < navItems.length - 1 && (
                                        <div className="border-b border-gray-300 mt-5"></div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Buttons */}
                        <div className="flex flex-col space-y-5 mx-5 mb-6">
                            <Button hasBlue={true} onClick={() => setIsModalOpen(true)} className="w-full py-3 md:text-pxl">ВИЙТИ З АКАУНТУ</Button>
                            <Link to="/comments" className="w-full">
                                <Button isFilled={true} className="w-full text-black py-3 md:text-pxl">ЗАЛИШИТИ ВІДГУК</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for confirmation */}
            <ModalLogout
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); onClose(); }}
                onConfirm={handleLogout}
            />
        </>
    );
};
