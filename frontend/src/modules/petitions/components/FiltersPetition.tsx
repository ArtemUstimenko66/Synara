import React, { useState, useEffect } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ukrainianPetitionTopics } from "../../../data/petitionTopicsList.ts";


interface FiltersProps {
    onApplyFilters: (filteredAnnouncements: any[]) => void;
    onCloseSidebar: () => void;
    onOpenMap: () => void;
}

const FiltersPetition: React.FC<FiltersProps> = ({ onCloseSidebar, onOpenMap }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [isUkraineSelected, setIsUkraineSelected] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const categories = ['Громадські ініціативи', 'Організаційні ініціативи', 'Офіційні'];

    // sync filters with url
    useEffect(() => {
        const types = searchParams.getAll('types');
        const topic = searchParams.get('topic');
        const ukraine = searchParams.get('ukraine');

        if (types.length) {
            setSelectedCategories(types);
        }

        if (topic) {
            setSelectedTopic(topic);
        }

        setIsUkraineSelected(ukraine === 'true');
    }, [searchParams]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const selectTopic = (topic: string) => {
        setSelectedTopic(topic);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const toggleUkraineSelection = () => {
        setIsUkraineSelected(prev => !prev);
    };

    // clear filters
    const clearSelections = async () => {
        setSelectedCategories([]);
        setSelectedTopic(null);
        setIsUkraineSelected(false);
        setSearchParams({});
        try {
            onCloseSidebar();
        } catch (error) {
            console.error('Error receiving the gatherings:', error);
        }
    };

    // apply filters
    const applyFilters = async () => {
        const newSearchParams = new URLSearchParams(searchParams);

        // Clear previous types and set new ones
        newSearchParams.delete('types');
        selectedCategories.forEach(category => newSearchParams.append('types', category));

        // Set topic if selected
        if (selectedTopic) {
            newSearchParams.set('topic', selectedTopic);
        } else {
            newSearchParams.delete('topic');
        }

        if (isUkraineSelected) {
            newSearchParams.set('ukraine', 'true');
        } else {
            newSearchParams.delete('ukraine');
        }

        setSearchParams(newSearchParams);
        onCloseSidebar();
    };

    const { t } = useTranslation();

    return (
        <div className="p-4 w-full mx-4 rounded-lg">
            <h2 className="text-relative-h4 font-kharkiv mb-4 text-center">{t('filtration')}</h2>

            {/* Topic petition dropdown */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">Тема петиції</h3>
                <Button className={`w-full py-1 border border-blue-500  ${isDropdownOpen? "rounded-t-2xl": "rounded-full"}`} onClick={toggleDropdown}>
                    {selectedTopic || "Оберіть тему"}
                </Button>
                {isDropdownOpen && (
                        <div className={`w-full bg-white border-b border-l border-r border-blue-500 ${isDropdownOpen? "rounded-b-2xl": "rounded-b-2xl"}`}>
                        {ukrainianPetitionTopics.map((topic, index) => (
                            <div
                                key={index}
                                onClick={() => selectTopic(topic)}
                                className="cursor-pointer py-2 px-4 rounded-2xl hover:bg-gray-100"
                            >
                                {topic}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Search distance */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">{t('distance_search')}</h3>
                <button
                    onClick={toggleUkraineSelection}
                    className={`w-full py-1 font-montserratRegular border border-blue-500
                        rounded-full text-center mb-2 ${isUkraineSelected ? 'bg-dark-blue text-white' : ''}`}
                >
                    {t('all_ukraine')}
                </button>
                <button onClick={onOpenMap} className="w-full block text-center py-2 font-montserratRegular rounded-full underline">
                    {t('change')}
                </button>
            </div>


            {/* Type petition */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">Тип петиції</h3>
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

            {/* Buttons apply / clear */}
            <div className="flex flex-col space-y-5 mt-10">
                <Button isFilled={true} className="w-full uppercase text-black py-3 md:text-pxl" onClick={applyFilters}>
                    {t('apply')}
                </Button>
                <Button hasBlue={true} className="w-full uppercase py-3 md:text-pxl" onClick={clearSelections}>
                    {t('clear')}
                </Button>
            </div>
        </div>
    );
};

export default FiltersPetition;
