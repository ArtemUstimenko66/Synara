import React from 'react';
import NavItem from "../ui/NavItem.tsx";
import { Button } from "../ui/Button.tsx";
import { Link } from "react-router-dom";
import LogoSynara from '../assets/images/logoSynara.svg?react';

export const MobileMenu = ({ isOpen = false }) => {
    const navItems = [
        { text: "Головна", to: "/home" },
        { text: "Про нас", to: "/about" },
        { text: "Збори", to: "/collections" },
        { text: "Карти", to: "/maps" },
        { text: "Як це працює", to: "/how-it-works" }
    ];

    return (
        <div
            className={`fixed top-16 left-0 right-0 bg-white z-20 overflow-hidden transform transition-all duration-700 ease-in-out ${isOpen ? 'h-[calc(100vh-4rem)]' : 'h-0'}`}
        >
            <nav className="h-full flex flex-col my-10 mx-5 space-y-5 text-lg box-border w-[90%]">
                {navItems.map((item, index) => (
                    <NavItem key={item.to} text={item.text} to={item.to} isLast={index === navItems.length - 1} />
                ))}
                <div className="flex flex-col space-y-5 mt-auto">
                    <Link to="/login" className="w-full mt-8">
                        <Button hasBlue={true} className="w-full md:text-pxl">УВІЙТИ</Button>
                    </Link>
                    <Link to="/registration" className="w-full">
                        <Button isFilled={true} className="w-full bg-yellow-500 text-black md:text-pxl">РЕЄСТРАЦІЯ</Button>
                    </Link>
                </div>
            </nav>
        </div>
    );
};
