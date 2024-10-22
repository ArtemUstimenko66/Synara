import React, { useState, useEffect } from 'react';
import { Button } from "../ui/Button.tsx";
import NavItem from "../ui/NavItem.tsx";
import { Link } from "react-router-dom";
import { MobileMenu } from "./MobileMenu.tsx";
import MenuCloseIcon from '../assets/images/icon-close-menu.svg?react';
import MenuIcon from '../assets/images/icon-menu.svg?react';
import LogoSynara from '../assets/images/logoSynara.svg?react';
import {useTranslation} from "react-i18next";

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useTranslation();

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
            className={`${className} w-full fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out 
            ${isVisible ? 'header-slide-in' : 'header-slide-out'} 
            ${isAtTop ? 'transition-background-color' : 'bg-white shadow-sm'}`}
        >
            <div className="flex justify-between items-center px-8 py-8 md:ml-10 md:mr-4 xl:ml-20 xl:mr-36">

                {/* Логотип */}
                <Link to="/home">
                    <LogoSynara className="text-xl font-bold xl:mr-44 md:mr-14" />
                </Link>

                {/* Элементы навигации для компьютера */}
                <nav className="flex-grow hidden md:hidden sm:hidden xl:flex xl:space-x-20 md:space-x-10 xl:mr-10 md:mr-5 items-center">
                    <NavItem text={t('mainUPPER')} to="/home" />
                    <NavItem text={t('about_usUPPER')} to="/about" />
                    <NavItem text={t('collectionsUPPER')} to="/gatherings" />
                    <NavItem text={t('mapUPPER')} to="/map-help" />
                    <NavItem text={t('how_it_worksUPPER')} to="/how-it-works" />
                </nav>

                {/* Кнопки для аутентификации */}
                <div className="hidden xl:flex space-x-5">
                    <Link to="/login">
                        <Button>{t('log_inUPPER')}</Button>
                    </Link>
                    <Link to="/registration">
                        <Button isFilled={true}>{t('registrationUPPER')}</Button>
                    </Link>
                </div>

                {/* Мобильное меню */}
                <div className="flex md:flex sm:flex xl:hidden ml-auto cursor-pointer z-30"
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <MenuCloseIcon /> : <MenuIcon />}
                </div>
            </div>

            {/* Мобильное меню */}
            <MobileMenu isOpen={isMobileMenuOpen} />
        </header>
    );
};

export default Header;
