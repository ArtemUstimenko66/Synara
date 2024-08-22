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
        <Link to={to} className='relative flex flex-col items-start'>
            <span
                className={`text-medium-gray xl:text-pl md:text-pxl Montserrat cursor-pointer hover:text-almost-black}`}
            >
                {text}
            </span>
            <div className="xl:mt-0 md:mt-3 md:w-[90%] md:border-b xl:border-0 md:border-gray-300"></div>
            {isActive && (
                <span className="xl:absolute xl:bottom-[-8px] xl:left-0 xl:w-full xl:h-1 xl:bg-yellow-500 xl:rounded-full xl:transition-all xl:duration-300 xl:ease-in-out"></span>
            )}
        </Link>
    );
}

export default NavItem;
