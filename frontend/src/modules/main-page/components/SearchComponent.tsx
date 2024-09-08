import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '../assets/searchIcon.svg?react';

const SearchComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            setSearchParams({ query: searchTerm });
        }
    };

    return (
        <div className="flex items-center w-full bg-blue-100 rounded-full p-2">
            <div className="pr-3">
                <SearchIcon />
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Пошук оголошення"
                className="w-full bg-transparent text-almost-black text-montserratMedium placeholder-gray-500 focus:outline-none"
            />
        </div>
    );
};

export default SearchComponent;
