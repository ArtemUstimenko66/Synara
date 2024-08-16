import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
    text?: string;
    to: string;
}

const NavItem: React.FC<NavItemProps> = ({ text = "", to }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className='relative flex items-center'>
            <span
                className={`text-medium-gray Montserrat cursor-pointer hover:text-almost-black}`}
            >
                {text}
            </span>
            {isActive && (
                <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-yellow-500 rounded-full transition-all duration-300 ease-in-out"></span>
            )}
        </Link>
    );
}

export default NavItem;
