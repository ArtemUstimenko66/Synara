import React from 'react';

const borderStyles= 'border-2 px-6 border-almost-white rounded-full text-almost-white';
const filledStyles = 'bg-perfect-yellow rounded-full py-2 px-6';

export const Button = ({
    children = '',
    hasBorder = false,
    isFilled = false,
    className = '',
}) => {
    return (
        <button className={`text-almost-black px-5 py-2 ${hasBorder && borderStyles} ${isFilled && filledStyles} ${className}`}>
            {children}
        </button>
    );
}