import React, { useState, useMemo, useRef } from 'react';
import SearchIcon from '../assets/searchIcon.svg?react';
import SuggestionsList from './SuggestionsList.tsx'; // Импортируем новый компонент

interface City {
    id: number;
    name: string;
    position: { lat: number; lng: number };
}

interface SearchComponentMapProps {
    onCitySelect: (city: City) => void;
}

const ukraineCities: City[] = [
    { id: 1, name: 'Київ', position: { lat: 50.4501, lng: 30.5234 } },
    { id: 2, name: 'Харків', position: { lat: 49.9935, lng: 36.2304 } },
    { id: 3, name: 'Одеса', position: { lat: 46.4825, lng: 30.7233 } },
    { id: 4, name: 'Львів', position: { lat: 49.8397, lng: 24.0297 } },
    { id: 5, name: 'Дніпро', position: { lat: 48.4647, lng: 35.0462 } },
    // Добавьте другие города Украины
];

const SearchComponentMap: React.FC<SearchComponentMapProps> = ({ onCitySelect }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null); // Реф на инпут

    // Мемоизированный поиск городов
    const filteredCities = useMemo(() => {
        return searchTerm.length > 0
            ? ukraineCities.filter((city) =>
                city.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            )
            : [];
    }, [searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setActiveSuggestionIndex(-1);
        setShowSuggestions(true); // Показываем подсказки при вводе текста
    };

    const handleCitySelect = (city: City) => {
        setSearchTerm(city.name);
        setActiveSuggestionIndex(-1);
        setShowSuggestions(false); // Скрываем подсказки после выбора
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
