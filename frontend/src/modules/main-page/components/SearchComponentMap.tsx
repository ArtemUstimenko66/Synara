import React, { useState, useMemo, useRef } from 'react';
import SearchIcon from '../assets/searchIcon.svg?react';
import SuggestionsList from './SuggestionsList.tsx';
import {citiesWithCoordinates} from "../../../data/citiesWithCoordinates.ts"; // Импортируем новый компонент

interface City {
    id: number;
    name: string;
    position: { lat: number; lng: number };
}

interface SearchComponentMapProps {
    onCitySelect: (city: City) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}



const SearchComponentMap: React.FC<SearchComponentMapProps> = ({ onCitySelect, searchTerm, setSearchTerm }) => {
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null); // Реф на инпут

    const filteredCities = useMemo(() => {
        return searchTerm.length > 0
            ? citiesWithCoordinates.filter((city) =>
                city.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            )
            : [];
    }, [searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setActiveSuggestionIndex(-1);
        setShowSuggestions(true);
    };

    const handleCitySelect = (city: City) => {
        setSearchTerm(city.name);
        setActiveSuggestionIndex(-1);
        setShowSuggestions(false);
        onCitySelect(city);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            setActiveSuggestionIndex((prevIndex) =>
                Math.min(prevIndex + 1, filteredCities.length - 1)
            );
        } else if (event.key === 'ArrowUp') {
            setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (event.key === 'Enter' && activeSuggestionIndex >= 0) {
            handleCitySelect(filteredCities[activeSuggestionIndex]);
        }
    };

    return (
        <div className="relative flex flex-col w-[95%] bg-blue-100 rounded-2xl p-1">
            <div className="flex items-center h-8 bg-blue-100 rounded-full ">
                <SearchIcon className="w-8 h-8 mr-4" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    placeholder="Введіть місто"
                    className="w-full bg-transparent text-almost-black placeholder-gray-500 focus:outline-none"
                />
            </div>

            {/* Компонент для отображения подсказок */}
            {showSuggestions && filteredCities.length > 0 && (
                <SuggestionsList
                    cities={filteredCities}
                    onSelectCity={handleCitySelect}
                    activeSuggestionIndex={activeSuggestionIndex}
                    inputRef={inputRef}
                />
            )}
        </div>
    );
};

export default SearchComponentMap;
