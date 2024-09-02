import React from "react";
import {Link, useNavigate} from "react-router-dom";
import LogoSynara from '../../../assets/images/logoSynara.svg?react';

import MenuIcon from '../assets/menu.svg?react';
import NotificationIcon from '../assets/notification.svg?react';

import {Button} from "../../../ui/Button.tsx";
import NavItem from "../../../ui/NavItem.tsx";
import {logout} from "../../profile/api/profileService.ts";

const MainHeader: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    }

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
                    <MenuIcon className="h-6 w-6"/>
                </button>
                <button>
                    <NotificationIcon className="h-6 w-6"/>
                </button>
                {/*<Link to="/home">*/}
                {/*    <Button isFilled={true} className="px-4" onClick={handleLogout}>ВИХІД</Button>*/}
                {/*</Link>*/}
            </div>
        </header>
    );
};

export default MainHeader;
