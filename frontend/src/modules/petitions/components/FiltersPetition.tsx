import React, { useState, useEffect } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {PetitionTopic} from "../../../data/petitionTopicsList.ts";
import BackArrow from '../../../assets/images/back_arrow_mini.svg?react';

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
    const { t } = useTranslation();

    const categories = [
        { key: 'community_initiatives', value: 'Громадські ініціативи' },
        { key: 'organizational_initiatives', value: 'Організаційні ініціативи' },
        { key: 'official', value: 'Офіційні' },
    ];


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

    const selectTopic = (topic: PetitionTopic) => {
        setSelectedTopic(topic);
        setIsDropdownOpen(false);
    };

    // Текст выбранной темы


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

        newSearchParams.delete('types');
        selectedCategories.forEach(category => newSearchParams.append('types', category));

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




    return (
        <div className="p-4 w-full mx-4 rounded-lg">
            <div className="flex justify-between items-center">
                <button onClick={onCloseSidebar} className="mb-[2vh] xl:hidden sm:flex md:flex">
                    <BackArrow/>
                </button>
                <h2 className="xl:text-relative-h4 sm:text-relative-h1 font-kharkiv mb-4 sm:mr-[30%] md:mr-[30%] xl:mr-0 xl:ml-[10%] sm:ml-0 text-center">{t('filtration')}</h2>
            </div>

            {/* Topic petition dropdown */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">{t('petition_topic')}</h3>
                <Button
                    className={`w-full py-1 border border-blue-500 ${isDropdownOpen ? "rounded-t-2xl" : "rounded-full"}`}
                    onClick={toggleDropdown}>
                    {selectedTopic != null ? t(`petition_topics.${selectedTopic}`) : t('choose_topic')}

                </Button>
                {isDropdownOpen && (
                    <div
                        className={`w-full bg-white border-b border-l border-r border-blue-500 ${isDropdownOpen ? "rounded-b-2xl" : "rounded-b-2xl"}`}>
                        {Object.values(PetitionTopic).map((topicKey) => (
                            <div
                                key={topicKey}
                                onClick={() => selectTopic(topicKey)}
                                className="cursor-pointer py-2 px-4 rounded-2xl hover:bg-gray-100"
                            >
                                {t(`petition_topics.${topicKey}`)}
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
                <button onClick={onOpenMap}
                        className="w-full block text-center py-2 font-montserratRegular rounded-full underline">
                    {t('change')}
                </button>
            </div>


            {/* Type petition */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">{t('type_of_petition')}</h3>
                <div className="space-y-2">
                    <div className="space-y-2">
                        {categories.map(({key, value}) => (
                            <button
                                key={key}
                                onClick={() => toggleCategory(value)}
                                className={`w-full py-1 border font-montserratRegular border-blue-500 rounded-full
                ${selectedCategories.includes(value) ? 'bg-dark-blue text-white' : ''}`}
                            >
                                {t(`${key}`)}
                            </button>
                        ))}
                    </div>

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
