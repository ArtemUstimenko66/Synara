import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
    text?: string;
    to: string;
    isLast?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ text = "", to, isLast = false }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className='relative flex flex-col items-start'>
            <span
                className={`text-medium-gray xl:text-pl md:text-pxl Montserrat cursor-pointer hover:text-almost-black}`}
            >
                {text}
            </span>
            {!isLast && (
                <div className="xl:mt-0 md:mt-3 md:w-[90%] md:border-b sm:mt-3 sm:w-[100%] sm:border-b xl:border-0 md:border-baby-blue sm:border-baby-blue"></div>
            )}
            {isActive && (
                <span className="xl:absolute md:hidden xl:bottom-[-8px] xl:left-0 xl:w-full xl:h-1 xl:bg-yellow-500 xl:rounded-full xl:transition-all xl:duration-300 xl:ease-in-out"></span>
            )}
        </Link>
    );
}

export default NavItem;
