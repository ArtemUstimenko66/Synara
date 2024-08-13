import React, { useState, useEffect } from 'react';
import { Button } from "./Button";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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
            <div className="flex justify-between ml-20 mr-36 items-center px-8 py-8">

                {/* Section with logo */}
                <div className="text-xl font-bold mr-44">LOGO</div>

                {/* Header nav items */}
                <nav className="hidden xl:flex space-x-20 items-center">
                    <NavItem text="ГОЛОВНА" to="/home"/>
                    <NavItem text="ПРО НАС" to="/about"/>
                    <NavItem text="ЗБОРИ" to="/collections"/>
                    <NavItem text="КАРТИ" to="/maps"/>
                    <NavItem text="ЯК ЦЕ ПРАЦЮЄ" to="/how-it-works"/>
                </nav>

                {/* Authentication buttons */}
                <div className="hidden ml-auto xl:flex space-x-5">
                    <Link to="/login">
                        <Button>УВІЙТИ</Button>
                    </Link>
                    <Link to="/registration">
                        <Button isFilled={true}>РЕЄСТРАЦІЯ</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
