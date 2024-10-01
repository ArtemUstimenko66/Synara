import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '../../assets/searchIcon.svg?react';
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../../hooks/useAuth.ts";

const SearchComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [, setSearchParams] = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchParams({ query: searchTerm });
            setSearchTerm('');
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };
    const {t} = useTranslation();
    const { role } = useAuth();
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
                placeholder={role === "volunteer" ? t('search_announcement'): t('search_volunteer')}
                className="w-full bg-transparent text-almost-black text-montserratMedium placeholder-gray-500 focus:outline-none"
                ref={inputRef}
            />
        </div>
    );
};

export default SearchComponent;
