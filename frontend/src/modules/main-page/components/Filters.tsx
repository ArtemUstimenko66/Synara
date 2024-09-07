import React, { useState } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { Link } from "react-router-dom";
import {helpTypesMap} from "../../../data/helpTypesMap.ts";
import {urgencyTranslations} from "../../../data/urgencyMap.ts";

const Filters: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
    const [isUkraineSelected, setIsUkraineSelected] = useState<boolean>(false);

    const categories = ['Психологічна', 'Гуманітарна', 'Інформаційна', 'Матеріальна'];
    const urgencies = ['Терміново', 'Не терміново'];

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
        const translatedCategories = selectedCategories.map(category => helpTypesMap[category]);
        const translatedUrgency = selectedUrgency ? urgencyTranslations[selectedUrgency] : null;
        const location = isUkraineSelected ? 'All Ukraine' : null;

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

        const url = `/api/filters?${params.toString()}`;

        console.log('Sending filters:', url);
    };

    return (
        <div className="p-4 w-full mx-4 rounded-lg">
            <h2 className="text-relative-h4 font-kharkiv mb-4 text-center">Фільтрація</h2>

            {/* Help type */}
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

            {/* Search distance */}
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

            {/* Emergency */}
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

            {/* Buttons apply / clear */}
            <div className="flex flex-col space-y-5 mt-10">
                <Button
                    isFilled={true}
                    className="w-full uppercase text-black py-3 md:text-pxl"
                    onClick={applyFilters}
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
