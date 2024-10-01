import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import MainIllustration from '../assets/images/MainIllustration.svg?react'
import MobileMainIllustration from '../assets/images/MobileMainImage.svg?react';
import {useMediaQuery} from "react-responsive";

interface WrapperProps {
    children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/home';
    const isSmallScreen = useMediaQuery({ query: '(max-width: 670px)' });

    return (
        <div className="relative min-h-screen min-w-full flex flex-col">
            {isHomePage && (
                <div className="absolute top-0 left-0 right-0 w-full h-full z-0 overflow-hidden">
                    {isSmallScreen ?
                        <MobileMainIllustration className="w-full h-auto xl:block md:block"/>
                        :
                        <MainIllustration className="w-full h-auto sm:hidden xl:block md:block"/>
                    }

                    <div className="xl:hidden sm:hidden absolute h-[28vw] md:h-[30vh] -mt-3 md:flex md:bg-dark-blue w-full overflow-hidden"/>
                </div>
            )}
            <div className="flex-1 md:mx-12 xl:mx-28 py-8 relative z-10">
                {children}
            </div>
        </div>
    );
}

export default Wrapper;