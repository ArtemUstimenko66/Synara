import React, { useState } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { Link } from "react-router-dom";

const Filters: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
    const [isUkraineSelected, setIsUkraineSelected] = useState<boolean>(false);

    const categories = ['Психологічна', 'Гуманітарна', 'Інформаційна', 'Матеріальна'];
    const urgencies = ['Терміново', 'Не терміново'];

    // Словари для перевода на английский
    const categoryTranslations: { [key: string]: string } = {
        'Психологічна': 'Psychological',
        'Гуманітарна': 'Humanitarian',
        'Інформаційна': 'Informational',
        'Матеріальна': 'Material',
    };

    const urgencyTranslations: { [key: string]: string } = {
        'Терміново': 'Urgent',
        'Не терміново': 'Not Urgent',
    };

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const selectUrgency = (urgency: string) => {
        setSelectedUrgency(urgency === selectedUrgency ? null : urgency);
    };

    const toggleUkraineSelection = () => {
        setIsUkraineSelected(!isUkraineSelected);
    };

    const clearSelections = () => {
        setSelectedCategories([]);
        setSelectedUrgency(null);
        setIsUkraineSelected(false);
    };

    const applyFilters = async () => {
        // Переводим выбранные фильтры на английский
        const translatedCategories = selectedCategories.map(category => categoryTranslations[category]);
        const translatedUrgency = selectedUrgency ? urgencyTranslations[selectedUrgency] : null;
        const location = isUkraineSelected ? 'All Ukraine' : null;

        // Формируем строку запроса
        const params = new URLSearchParams();

        if (translatedCategories.length > 0) {
            params.append('categories', translatedCategories.join(','));
        }

        if (translatedUrgency) {
            params.append('urgency', translatedUrgency);
        }

        if (location) {
            params.append('location', location);
        }

        // URL запроса на бэкенд
        const url = `/api/filters?${params.toString()}`;

        console.log('Отправка запроса с фильтрами:', url);

        // Отправляем GET-запрос на бэкенд
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Ошибка при отправке запроса');
            }

            const data = await response.json();
            console.log('Ответ сервера:', data);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="p-4 w-full mx-4 rounded-lg">
            <h2 className="text-relative-h4 font-kharkiv mb-4 text-center">Фільтрація</h2>

            {/* Категорія допомоги */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">Категорія допомоги</h3>
                <div className="space-y-2">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => toggleCategory(category)}
                            className={`w-full py-1 border font-montserratRegular border-blue-500 rounded-full ${
                                selectedCategories.includes(category) ? 'bg-dark-blue text-white' : ''
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Відстань пошуку */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">Відстань пошуку</h3>
                <button
                    onClick={toggleUkraineSelection}
                    className={`w-full py-1 font-montserratRegular border border-blue-500 rounded-full text-center mb-2 ${
                        isUkraineSelected ? 'bg-dark-blue text-white' : ''
                    }`}
                >
                    Вся Україна
                </button>
                <Link
                    to="/change-distance"
                    className="w-full block text-center py-2 font-montserratRegular rounded-full underline"
                >
                    Змінити
                </Link>
            </div>

            {/* Терміновість */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">Терміновість</h3>
                <div className="space-y-2">
                    {urgencies.map((urgency, index) => (
                        <button
                            key={index}
                            onClick={() => selectUrgency(urgency)}
                            className={`w-full py-1 font-montserratRegular border border-dark-blue rounded-full ${
                                selectedUrgency === urgency ? 'bg-dark-blue text-white' : ''
                            }`}
                        >
                            {urgency}
                        </button>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-5 mt-10">
                <Button
                    isFilled={true}
                    className="w-full uppercase text-black py-3 md:text-pxl"
                    onClick={applyFilters} // Применяем фильтры
                >
                    Застосувати
                </Button>
                <Button
                    hasBlue={true}
                    className="w-full uppercase py-3 md:text-pxl"
                    onClick={clearSelections}
                >
                    Очистити
                </Button>
            </div>
        </div>
    );
};

export default Filters;
