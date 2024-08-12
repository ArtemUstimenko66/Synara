import React, { useState, ReactNode } from 'react';

interface NavItemProps {
    text?: string;
    children?: ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ text = "", children }) => {
    const [selected, setSelected] = useState<string>("");

    return (
        <div className='relative'>
            <div className="flex space-x-2 cursor-pointer items-center">
                <span
                    className="text-medium-gray Montserrat hover:text-almost-black"
                    onClick={() => children && setSelected(text !== selected ? text : "")}
                >
                    {text}
                </span>
            </div>
            {selected && children}
        </div>
    );
}

export default NavItem;
