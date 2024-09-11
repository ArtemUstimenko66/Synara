import React from 'react';
import ReactDOM from 'react-dom';

interface City {
    id: number;
    name: string;
}

interface SuggestionsListProps {
    cities: City[];
    onSelectCity: (city: City) => void;
    activeSuggestionIndex: number;
    inputRef: React.RefObject<HTMLInputElement>;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
                                                             cities,
                                                             onSelectCity,
                                                             activeSuggestionIndex,
                                                             inputRef
                                                         }) => {
    if (!inputRef.current) return null;

    // Определяем позицию инпута для отображения подсказок рядом с ним
    const { bottom, left, width } = inputRef.current.getBoundingClientRect();

    return ReactDOM.createPortal(
        <ul
            className="bg-white rounded-lg shadow-lg max-h-40 overflow-y-auto absolute z-50"
            style={{ top: bottom + window.scrollY, left: left + window.scrollX, width }}
        >
            {cities.map((city, index) => (
                <li
                    key={city.id}
                    onClick={() => onSelectCity(city)}
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${
                        index === activeSuggestionIndex ? 'bg-gray-200' : ''
                    }`}
                >
                    {city.name}
                </li>
            ))}
        </ul>,
        document.body // рендерим список в body с помощью портала
    );
};

export default SuggestionsList;
