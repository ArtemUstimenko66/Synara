import React from 'react';
import { Button } from "./Button";
import NavItem from "./NavItem";

const Header: React.FC = () => {
    return (
        <header className="w-full fixed top-0 left-0 z-50">
            <div className="flex justify-between ml-20 mr-36 items-center px-8 py-8">

                {/* Section with logo */}
                <div className="text-xl font-bold mr-44">LOGO</div>

                {/* Header nav items */}
                <nav className="hidden xl:flex space-x-20 items-center">
                    <NavItem text="ГОЛОВНА" />
                    <NavItem text="ПРО НАС" />
                    <NavItem text="ЗБОРИ" />
                    <NavItem text="КАРТИ" />
                    <NavItem text="ЯК ЦЕ ПРАЦЮЄ" />
                </nav>

                {/* Authentication buttons */}
                <div className="hidden ml-auto xl:flex space-x-5">
                    <Button>УВІЙТИ</Button>
                    <Button isFilled={true}>РЕЄСТРАЦІЯ</Button>
                </div>
            </div>
        </header>
    );
};

export default Header;