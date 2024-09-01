import React from "react";
import {Link} from "react-router-dom";
import LogoSynara from '../../../assets/images/logoSynara.svg?react';
import {Button} from "../../../ui/Button.tsx";
import NavItem from "../../../ui/NavItem.tsx";

const MainHeader: React.FC = () => {
    return (
        <header className="flex items-center justify-between p-4 ">
            <Link to="/main">
                <LogoSynara className="text-xl font-bold xl:mr-44 md:mr-14"/>
            </Link>
            <nav className="flex space-x-16">
                <NavItem text="ГОЛОВНА" to="/home"/>
                <NavItem text="ПРО НАС" to="/about"/>
                <NavItem text="ЗБОРИ" to="/collections"/>
                <NavItem text="КАРТИ" to="/maps"/>
                <NavItem text="ЯК ЦЕ ПРАЦЮЄ" to="/how-it-works"/>
            </nav>
            <div className="flex space-x-8">
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 text-almost-black"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 14.158V11a6 6 0 10-12 0v3.159c0 .524-.214 1.03-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                </button>
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 text-almost-black"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
                <Link to="/registration">
                    <Button isFilled={true} className="px-4">ВИХІД</Button>
                </Link>
            </div>
        </header>
    );
};

export default MainHeader;
