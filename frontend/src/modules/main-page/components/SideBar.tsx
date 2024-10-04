import React, { useState } from 'react';
import NavItem from "../../../ui/NavItem.tsx";
import LogoSynara from '../../../assets/images/logoSynara.svg?react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../ui/Button.tsx";
import { logout } from "../../profile/api/profileService.ts";
import Filters from "./Filters.tsx";
import ModalLogout from "./ui/ModalLogout.tsx";
import { navItems } from "../../../data/navItemsSideBar.ts";
import MenuCloseIcon from '../../../assets/images/icon-close-menu.svg?react';
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "react-responsive";

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
    isFilters: boolean;
    onApplyFilters: (filteredAnnouncements: any[]) => void;
    onOpenMap: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose, isFilters, onApplyFilters,onOpenMap }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {t}= useTranslation();

    // logout
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

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
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full xl:w-1/4 h-full  xl:border-2 xl:border-l-dark-blue 
                    xl:border-t-dark-blue xl:border-b-dark-blue xl:rounded-l-3xl flex flex-col`}
            >
                {isFilters ? (
                    // Filters
                    <div className="flex flex-col flex-grow p-5">
                        <Filters
                            onApplyFilters={onApplyFilters}
                            onCloseSidebar={onClose}
                            onOpenMap={onOpenMap}
                        />
                    </div>
                ) : (
                    // Sidebar
                    <div className="flex flex-col mx-4 flex-grow">
                        {/* Logo */}
                        <div className="flex w-[90%] justify-between items-center ml-[5%]  xl:mb-8 sm:mb-0">
                            <LogoSynara className="w-28 h-auto my-[3vh]"/>
                            <MenuCloseIcon className="h-auto w-auto cursor-pointer" onClick={onClose}/>
                        </div>


                        {/* Nav items */}
                        <nav className="flex flex-col w-[90%] mx-5 space-y-3 text-lg flex-grow">
                            {navItems.slice(0, isSmallScreen ? navItems.length : 7).map((item, index) => (
                                <div key={`${item.to}-${index}`} className="flex flex-col">
                                    <NavItem text={item.text} to={item.to} />
                                    {index < navItems.length - 1  && (
                                        <div className="xl:border-b xl:border-gray-300 xl:mt-5 sm:mt-0"></div>
                                    )}
                                </div>
                            ))}



                        </nav>

                        {/* Buttons */}
                        <div className="flex flex-col xl:space-y-5 sm:space-y-2 mx-5 mb-6">
                            <Button hasBlue={true} onClick={() => setIsModalOpen(true)}
                                    className="w-full xl:py-3 sm:py-2 md:text-pxl">{t('logoutUPPER')}</Button>
                            <Link to="/comments" className="w-full">
                                <Button isFilled={true} className="w-full text-black xl:py-3 sm:py-2 md:text-pxl">{t('leave_feedback')}</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for logout confirmation */}
            <ModalLogout
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    onClose();
                }}
                onConfirm={handleLogout}
            />
        </>
    );
};