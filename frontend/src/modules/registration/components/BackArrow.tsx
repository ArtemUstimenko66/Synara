import React from 'react';
import BackArrow from '../../../assets/images/Back.svg?react';

const BackArrowComponent: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <div className="ml-2 mt-10 cursor-pointer" onClick={onClick}>
        <BackArrow />
    </div>
);

export default BackArrowComponent;
