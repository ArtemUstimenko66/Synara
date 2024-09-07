import React from 'react';
import SearchIcon from '../assets/searchIcon.svg?react';

const SearchComponent: React.FC = () => {
    return (
        <div className="flex items-center w-full bg-blue-100 rounded-full p-2">
            {/* Search Icon */}
            <div className="pr-3">
                <SearchIcon />
            </div>
            {/* Input Field */}
            <input
                type="text"
                placeholder="Пошук оголошення"
                className="w-full bg-transparent text-almost-black text-montserratMedium placeholder-gray-500 focus:outline-none"
            />
        </div>
    );
};

export default SearchComponent;
