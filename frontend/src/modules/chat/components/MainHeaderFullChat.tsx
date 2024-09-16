import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import LogoSynara from '../../../assets/images/logoSynara.svg?react';

import MenuIcon from '../../main-page/assets/menu.svg?react';
import NotificationIcon from '../../main-page/assets/notification.svg?react';

import NavItem from "../../../ui/NavItem.tsx";
import { SideBar } from "../../main-page/components/SideBar.tsx";

const MainHeaderFullChat: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // logic for scrolling
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setIsVisible(currentScrollY < lastScrollY || currentScrollY === 0);
        setIsAtTop(currentScrollY === 0);
        setLastScrollY(currentScrollY);
    };

    // logic for scrolling
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <>
            <header
                className={`w-full fixed top-0 left-0 z-30 transition-transform duration-300 ease-in-out 
            ${isVisible ? 'header-slide-in' : 'header-slide-out'} 
            ${isAtTop ? 'transition-background-color' : 'bg-white shadow-sm'}`}
            >
                <div className="flex justify-between 0 pl-[5%] items-center px-8 py-8 md:ml-10 md:mr-4 xl:ml-20 xl:mr-36">

                    {/* Logo */}
                    <Link to="/main" className="xl:flex hidden">
                        <LogoSynara className="text-xl font-bold xl:mr-[10%] md:mr-14"/>
                    </Link>

                    {/* Nav items */}
                    <nav className="flex space-x-16 ">
                        <NavItem text="ГОЛОВНА" to="/main"/>
                        <NavItem text="ПРО НАС" to="/about"/>
                        <NavItem text="ЗБОРИ" to="/collections"/>
                        <NavItem text="КАРТИ" to="/maps"/>
                        <NavItem text="ЯК ЦЕ ПРАЦЮЄ" to="/how-it-works"/>
                    </nav>

                    {/* Buttons */}
                    <div className="flex space-x-8 ">
                        <div className="flex ml-auto cursor-pointer"
                             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {<MenuIcon className="h-6 w-6"/>}
                        </div>
                        <button className="xl:flex hidden">
                            <NotificationIcon className="xl:flex h-6 w-6"/>
                        </button>
                    </div>

                </div>
            </header>
            <SideBar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} isMap={false} isFilters={false}/>
        </>
    );
};

export default MainHeaderFullChat;
