import React, { useState, useEffect } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { getAnnouncements, getFilteredAnnouncements } from "../api/mainPageService.ts";
import { helpTypesMap } from "../../../data/helpTypesMap.ts";
import { useSearchParams } from "react-router-dom";
import { urgencyTranslations } from "../../../data/urgencyMap.ts";

interface FiltersProps {
    onApplyFilters: (filteredAnnouncements: any[]) => void;
    onCloseSidebar: () => void;
    onOpenMap: () => void; // Add this prop
}

const Filters: React.FC<FiltersProps> = ({ onApplyFilters, onCloseSidebar,onOpenMap }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
    const [isUkraineSelected, setIsUkraineSelected] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const categories = ['Психологічна', 'Гуманітарна', 'Інформаційна', 'Матеріальна'];
    const urgencies = ['Терміново', 'Не терміново'];

    // sync filters with url
    useEffect(() => {
        const types = searchParams.getAll('type');
        const urgency = searchParams.get('urgency');
        const ukraine = searchParams.get('ukraine');

        if (types.length) {
            const selectedCategoriesFromUrl = types
                .map(type => Object.keys(helpTypesMap).find(key => helpTypesMap[key] === type) || '')
                .filter(Boolean) as string[];
            setSelectedCategories(selectedCategoriesFromUrl);
        }

        if (urgency) {
            const selectedUrgencyFromUrl = Object.keys(urgencyTranslations).find(key => urgencyTranslations[key] === urgency) || null;
            setSelectedUrgency(selectedUrgencyFromUrl);
        }

        setIsUkraineSelected(ukraine === 'true');
    }, [searchParams]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const selectUrgency = (urgency: string) => {
        setSelectedUrgency(prev => (prev === urgency ? null : urgency));
    };

    const toggleUkraineSelection = () => {
        setIsUkraineSelected(prev => !prev);
    };

    // clear filters
    const clearSelections = async () => {
        setSelectedCategories([]);
        setSelectedUrgency(null);
        setIsUkraineSelected(false);
        setSearchParams({}); // Clear all URL parameters

        try {
            const allAnnouncements = await getAnnouncements();
            onApplyFilters(allAnnouncements);
            onCloseSidebar();
        } catch (error) {
            console.error('Error receiving the announcements:', error);
        }
    };

    // apply filters
    const applyFilters = async () => {
        const translatedCategories = selectedCategories.map(category => helpTypesMap[category]);
        const queryParams = new URLSearchParams();

        translatedCategories.forEach(category => queryParams.append('type', category));
        if (selectedUrgency) {
            queryParams.append('urgency', urgencyTranslations[selectedUrgency]);
        }
        if (isUkraineSelected) {
            queryParams.append('ukraine', 'true');
        }

        setSearchParams(queryParams);

        try {
            const filteredAnnouncements = await getFilteredAnnouncements(translatedCategories);

            const filteredByUrgency = filteredAnnouncements.filter(announcement => {
                const currentDate = new Date();
                const postedDate = new Date(announcement.datePosted);
                const diffTime = Math.abs(postedDate.getTime() - currentDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (selectedUrgency === 'Терміново') {
                    return diffDays <= 5;
                } else if (selectedUrgency === 'Не терміново') {
                    return diffDays > 5;
                }
                return true;
            });

            onApplyFilters(filteredByUrgency);
            onCloseSidebar();
        } catch (error) {
            console.error('Failed to fetch filtered announcements:', error);
        }
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
                            className={`w-full py-1 border font-montserratRegular border-blue-500 rounded-full
                                ${selectedCategories.includes(category) ? 'bg-dark-blue text-white' : ''}`}
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
                    className={`w-full py-1 font-montserratRegular border border-blue-500
                        rounded-full text-center mb-2 ${isUkraineSelected ? 'bg-dark-blue text-white' : ''}`}
                >
                    Вся Україна
                </button>
                <button onClick={onOpenMap} className="w-full block text-center py-2 font-montserratRegular rounded-full underline">
                    Змінити
                </button>
            </div>

            {/* Emergency */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">Терміновість</h3>
                <div className="space-y-2">
                    {urgencies.map((urgency, index) => (
                        <button
                            key={index}
                            onClick={() => selectUrgency(urgency)}
                            className={`w-full py-1 font-montserratRegular border border-dark-blue rounded-full
                                ${selectedUrgency === urgency ? 'bg-dark-blue text-white' : ''}`}
                        >
                            {urgency}
                        </button>
                    ))}
                </div>
            </div>

            {/* Buttons apply / clear */}
            <div className="flex flex-col space-y-5 mt-10">
                <Button isFilled={true} className="w-full uppercase text-black py-3 md:text-pxl" onClick={applyFilters}>
                    Застосувати
                </Button>
                <Button hasBlue={true} className="w-full uppercase py-3 md:text-pxl" onClick={clearSelections}>
                    Очистити
                </Button>
            </div>
        </div>
    );
};

export default Filters;
