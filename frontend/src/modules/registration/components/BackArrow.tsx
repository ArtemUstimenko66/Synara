import React from 'react';
import BackArrow from '../../../assets/images/Back.svg?react';
import BackArrowMini from '../../../assets/images/back_arrow_mini.svg?react';
import { useMediaQuery } from "react-responsive";

const BackArrowComponent: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });

    return (
        <div className="ml-2 mt-10 cursor-pointer" onClick={onClick}>
            {isSmallScreen ? (<BackArrowMini />) : (<BackArrow />)}
        </div>
    );
};

export default BackArrowComponent;
