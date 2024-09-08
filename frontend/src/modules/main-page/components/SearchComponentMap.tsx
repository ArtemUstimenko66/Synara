import React from 'react';

import SearchIcon from '../assets/searchIcon.svg?react';

const SearchComponentMap: React.FC = () => {
    return (
        <div className="flex items-center w-[95%] h-10 bg-blue-100 rounded-full p-2">
            <div className="pr-2">
                <SearchIcon className="w-7 h-7" />
            </div>
            <input
                type="text"
                placeholder="Введіть місто"
                className="w-full bg-transparent text-almost-black text-montserratMedium placeholder-gray-500 focus:outline-none"
            />
        </div>
    );
};

export default SearchComponentMap;
