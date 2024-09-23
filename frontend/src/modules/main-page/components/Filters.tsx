import React, { useState, useEffect } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { helpTypesMap } from "../../../data/helpTypesMap.ts";
import { useSearchParams } from "react-router-dom";
import { urgencyTranslations } from "../../../data/urgencyMap.ts";
import {useTranslation} from "react-i18next";

interface FiltersProps {
    onApplyFilters: (filteredAnnouncements: any[]) => void;
    onCloseSidebar: () => void;
    onOpenMap: () => void; // Add this prop
}

const Filters: React.FC<FiltersProps> = ({ onCloseSidebar, onOpenMap }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
    const [isUkraineSelected, setIsUkraineSelected] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const categories = ['Психологічна', 'Гуманітарна', 'Інформаційна', 'Матеріальна'];

    // sync filters with url
    useEffect(() => {
        const types = searchParams.getAll('type');
        const urgency = searchParams.get('isUrgent');
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
            onCloseSidebar();
        } catch (error) {
            console.error('Error receiving the announcements:', error);
        }
    };

    // apply filters
    const applyFilters = async () => {
        const translatedCategories = selectedCategories.map(category => helpTypesMap[category]);

        // Создаем копию существующих searchParams
        const newSearchParams = new URLSearchParams(searchParams);

        // Добавляем категории
        newSearchParams.delete('type');  // Сначала очищаем текущие фильтры по категориям
        translatedCategories.forEach(category => newSearchParams.append('type', category));

        // Добавляем срочность (urgency)
        if (selectedUrgency) {
            newSearchParams.set('isUrgent', urgencyTranslations[selectedUrgency]);
        } else {
            // Удаляем параметр isUrgent, если не выбран
            newSearchParams.delete('isUrgent');
        }

        // Добавляем фильтр по всей Украине
        if (isUkraineSelected) {
            newSearchParams.set('ukraine', 'true');
        } else {
            newSearchParams.delete('ukraine');
        }

        // Обновляем параметры URL, сохраняя другие параметры
        setSearchParams(newSearchParams);

        // Закрываем сайдбар после применения фильтров
        onCloseSidebar();
    };

    const {t} = useTranslation();

    return (
        <div className="p-4 w-full mx-4 rounded-lg">
            <h2 className="text-relative-h4 font-kharkiv mb-4 text-center">{t('filtration')}</h2>

            {/* Help type */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">{t('category_of_help')}</h3>
                <div className="space-y-2">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => toggleCategory(category)}
                            className={`w-full py-1 border font-montserratRegular border-blue-500 rounded-full
                                ${selectedCategories.includes(category) ? 'bg-dark-blue text-white' : ''}`}
                        >
                            {t(`categories${index + 1}`)}
                        </button>
                    ))}

                </div>
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

            {/* Emergency */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">{t('urgency')}</h3>
                <div className="space-y-2">
                    {/*{urgencies.map((urgency, index) => (*/}
                    {/*    <button*/}
                    {/*        key={index}*/}
                    {/*        onClick={() => selectUrgency(urgency)}*/}
                    {/*        className={`w-full py-1 font-montserratRegular border border-dark-blue rounded-full*/}
                    {/*            ${selectedUrgency === urgency ? 'bg-dark-blue text-white' : ''}`}*/}
                    {/*    >*/}
                    {/*        {urgency}*/}
                    {/*    </button>*/}
                    {/*))}*/}
                    <button
                        onClick={() => selectUrgency('Терміново')}
                        className={`w-full py-1 font-montserratRegular border border-dark-blue rounded-full
                                ${selectedUrgency === 'Терміново' ? 'bg-dark-blue text-white' : ''}`}
                    >
                        {t('urgently')}
                    </button>

                    <button
                        onClick={() => selectUrgency('Не терміново')}
                        className={`w-full py-1 font-montserratRegular border border-dark-blue rounded-full
                                ${selectedUrgency === 'Не терміново' ? 'bg-dark-blue text-white' : ''}`}
                    >
                        {t('not_urgent')}
                    </button>
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

export default Filters;
