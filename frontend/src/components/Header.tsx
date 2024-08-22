import React, { useState, useEffect } from 'react';
import { Button } from "../ui/Button.tsx";
import NavItem from "../ui/NavItem.tsx";
import { Link } from "react-router-dom";
import { MobileMenu } from "./MobileMenu.tsx";
import MenuCloseIcon from '../assets/images/icon-close-menu.svg?react';
import MenuIcon from '../assets/images/icon-menu.svg?react';

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setIsVisible(currentScrollY < lastScrollY || currentScrollY === 0);
        setIsAtTop(currentScrollY === 0);
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header
            className={`w-full fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out 
            ${isVisible ? 'header-slide-in' : 'header-slide-out'} 
            ${isAtTop ? 'transition-background-color' : 'bg-white shadow-sm'}`}
        >
            <div className="flex justify-between items-center px-8 py-8 md:ml-10 md:mr-4 xl:ml-20 xl:mr-36">

                {/* Логотип */}
                <div className="text-xl font-bold xl:mr-44 md:mr-14">LOGO</div>

                {/* Элементы навигации для компьютера */}
                <nav className="flex-grow hidden md:hidden xl:flex xl:space-x-20 md:space-x-10 xl:mr-10 md:mr-5 items-center">
                    <NavItem text="ГОЛОВНА" to="/home" />
                    <NavItem text="ПРО НАС" to="/about" />
                    <NavItem text="ЗБОРИ" to="/collections" />
                    <NavItem text="КАРТИ" to="/maps" />
                    <NavItem text="ЯК ЦЕ ПРАЦЮЄ" to="/how-it-works" />
                </nav>

                {/* Кнопки для аутентификации */}
                <div className="hidden xl:flex space-x-5">
                    <Link to="/login">
                        <Button>УВІЙТИ</Button>
                    </Link>
                    <Link to="/registration">
                        <Button isFilled={true}>РЕЄСТРАЦІЯ</Button>
                    </Link>
                </div>

                {/* Мобильное меню */}
                <div className="flex md:flex xl:hidden ml-auto cursor-pointer z-30"
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <MenuCloseIcon /> : <MenuIcon />}
                </div>
                <MobileMenu isOpen={isMobileMenuOpen} />
            </div>
        </header>
    );
};

export default Header;
