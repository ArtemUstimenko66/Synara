import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import VectorHomePage from '../assets/images/VectorHomePage.svg?react';

interface WrapperProps {
    children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="relative min-h-screen min-w-full flex flex-col">
            {isHomePage && (
                <div className="absolute top-0 left-0 right-0 w-full h-full z-0 overflow-hidden">
                    <VectorHomePage className="w-full h-auto sm:hidden xl:block md:block"/>
                    <div className="xl:hidden sm:hidden absolute h-[27vw] md:flex md:bg-dark-blue w-full overflow-hidden"/>
                </div>
            )}
            <div className="flex-1 md:mx-12 xl:mx-28 py-8 relative z-10">
                {children}
            </div>
        </div>
    );
}

export default Wrapper;