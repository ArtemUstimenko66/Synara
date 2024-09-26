import React from 'react';

interface ButtonProps {
    children?: React.ReactNode; // Используйте ReactNode для дочерних элементов
    hasBorder?: boolean;
    hasBlue?: boolean;
    isFilled?: boolean;
    className?: string;
    onClick?: () => void; // Опционально, если нет обработки клика
}

export const Button: React.FC<ButtonProps> = ({
                                                  children = null,
                                                  hasBorder = false,
                                                  hasBlue = false,
                                                  isFilled = false,
                                                  className = '',
                                                  onClick = () => {},
                                              }) => {
    const borderStyles = 'border-2 px-6 border-almost-white rounded-full text-almost-white md:text-text-relative-pxl';
    const blueStyles = 'border-2 px-6 border-dark-blue rounded-full text-dark-blue md:text-text-relative-pxl';
    const filledStyles = 'bg-perfect-yellow rounded-full py-2 xl:text-base xl:px-6 md:px-4 md:text-text-relative-pxl';

    return (
        <button
            className={`text-almost-black xl:text-pl px-5 py-2 ${hasBorder && borderStyles} ${hasBlue && blueStyles} ${isFilled && filledStyles} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
