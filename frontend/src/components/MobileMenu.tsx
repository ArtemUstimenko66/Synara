import React from 'react';
import NavItem from "../ui/NavItem.tsx";
import { Button } from "../ui/Button.tsx";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {useTranslation} from "react-i18next";

export const MobileMenu = ({ isOpen = false }) => {
    const { t } = useTranslation();
    const navItems = [
        { text: t('main'), to: "/home" },
        { text: t('about_us'), to: "/about" },
        { text: t('collection'), to: "/collections" },
        { text: t('maps'), to: "/maps" },
        { text: t('how_it_worksLOWER'), to: "/how-it-works" }
    ];

    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <div
            className={`fixed top-16 left-0 right-0 bg-white z-20 overflow-hidden transform transition-all ${isSmallScreen ? 'duration-700 ease-in-out' : 'hidden'} ${isOpen ? 'h-[calc(100vh-4rem)]' : 'h-0'}`}
        >
            <nav className="h-full flex flex-col my-10 sm:mx-5 md:mx-20 space-y-5 text-lg box-border w-[90%]">
                {navItems.map((item, index) => (
                    <NavItem key={item.to} text={item.text} to={item.to} isLast={index === navItems.length - 1} />
                ))}
                <div className="flex flex-col space-y-5 md:mr-14 sm:mr-0 mt-auto">
                    <Link to="/login" className="w-full mt-8">
                        <Button hasBlue={true} className="w-full md:text-pxl">{t('log_inUPPER')}</Button>
                    </Link>
                    <Link to="/registration" className="w-full">
                        <Button isFilled={true} className="w-full text-black md:text-pxl">{t('registrationUPPER')}</Button>
                    </Link>
                </div>
            </nav>
        </div>
    );
};
