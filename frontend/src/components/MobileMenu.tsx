import React from 'react';
import NavItem from "../ui/NavItem.tsx";
import { Button } from "../ui/Button.tsx";
import { Link } from "react-router-dom";

export const MobileMenu = ({ isOpen = false }) => {
    return (
        <React.Fragment>
            <div className={`absolute top-0 left-0 right-0 bg-almost-black opacity-50 z-10 min-h-[150vh] ${isOpen ? 'flex' : 'hidden'}`} />
            <div className={`absolute right-0 top-0 w-1/2 bg-white z-20 justify-center min-h-[150vh] ${isOpen ? 'flex' : 'hidden'}`}>
                <nav className="my-20 mx-5 space-y-5 text-lg w-full">
                    <NavItem text="ГОЛОВНА" to="/home" />
                    <NavItem text="ПРО НАС" to="/about" />
                    <NavItem text="ЗБОРИ" to="/collections" />
                    <NavItem text="КАРТИ" to="/maps" />
                    <NavItem text="ЯК ЦЕ ПРАЦЮЄ" to="/how-it-works" />
                    <div className="flex flex-col space-y-5">
                        <Link to="/login" className="w-full">
                            <Button hasBorder={true} className="w-full md:text-almost-black md:border-almost-black md:text-pxl md:w-full">УВІЙТИ</Button>
                        </Link>
                        <Link to="/registration" className="w-full">
                            <Button isFilled={true} className="w-full md:text-pxl md:w-full">РЕЄСТРАЦІЯ</Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );
}
