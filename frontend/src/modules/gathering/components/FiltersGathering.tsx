import React, { useState, useEffect } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { useSearchParams } from "react-router-dom";
import { urgencyTranslations } from "../../../data/urgencyMap.ts";
import {useTranslation} from "react-i18next";
import BackArrow from '../../../assets/images/back_arrow_mini.svg?react';

import {termsEndingsMap} from "../../../data/termsEndingsMap.ts";

interface FiltersProps {
    onApplyFilters: (filteredAnnouncements: any[]) => void;
    onCloseSidebar: () => void;
}

const FiltersGathering: React.FC<FiltersProps> = ({ onCloseSidebar }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
    const [moneyFrom, setMoneyFrom] = useState('');
    const [moneyTo, setMoneyTo] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    const categories = ['Завершуються цього тижня', 'Завершуються цього місяця', 'Безстрокові'];


    // sync filters with url
    useEffect(() => {
        const types = searchParams.getAll('typeEnding');
        const urgency = searchParams.get('isUrgent');
        const moneyTo = searchParams.get('moneyTo');
        const moneyFrom = searchParams.get('moneyFrom');

        if (types.length) {
            const selectedCategoriesFromUrl = types
                .map(type => Object.keys(termsEndingsMap).find(key => termsEndingsMap[key] === type) || '')
                .filter(Boolean) as string[];
            setSelectedCategories(selectedCategoriesFromUrl);
        }

        if (urgency) {
            const selectedUrgencyFromUrl = Object.keys(urgencyTranslations).find(key => urgencyTranslations[key] === urgency) || null;
            setSelectedUrgency(selectedUrgencyFromUrl);
        }


        if (moneyFrom) {
            setSelectedUrgency(moneyFrom);
        }

        if (moneyTo) {
            setSelectedUrgency(moneyTo);
        }
    }, [searchParams]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const selectUrgency = (urgency: string) => {
        setSelectedUrgency(prev => (prev === urgency ? null : urgency));
    };


    // clear filters
    const clearSelections = async () => {
        setSelectedCategories([]);
        setSelectedUrgency(null);

        setMoneyFrom('');
        setMoneyTo('');
        setSearchParams({});

        try {
            onCloseSidebar();
        } catch (error) {
            console.error('Error receiving the gatherings:', error);
        }
    };

    // apply filters
    const applyFilters = async () => {
        const translatedCategories = selectedCategories.map(category => termsEndingsMap[category]);

        // Создаем копию существующих searchParams
        const newSearchParams = new URLSearchParams(searchParams);

        // Добавляем категории
        newSearchParams.delete('typeEnding');  // Сначала очищаем текущие фильтры по категориям
        translatedCategories.forEach(category => newSearchParams.append('typeEnding', category));

        // Добавляем срочность (urgency)
        if (selectedUrgency) {
            newSearchParams.set('isUrgent', urgencyTranslations[selectedUrgency]);
        } else {
            // Удаляем параметр isUrgent, если не выбран
            newSearchParams.delete('isUrgent');
        }

        if (moneyTo) {
            newSearchParams.set('moneyTo', moneyTo);
        } else {
            newSearchParams.delete('moneyTo');
        }

        if (moneyFrom) {
            newSearchParams.set('moneyFrom', moneyFrom);
        } else {
            newSearchParams.delete('moneyFrom');
        }

        setSearchParams(newSearchParams);

        onCloseSidebar();
    };

    const {t} = useTranslation();

    const handleNumericInput = (value: string, setter: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: any): void; }) => {
        if (/^\d*$/.test(value)) {
            setter(value);
        }
    };

    return (
        <div className="p-4 w-full mx-4 rounded-lg">
            <div className="flex justify-between items-center">
                <button onClick={ onCloseSidebar} className="mb-[2vh] xl:hidden sm:flex md:flex">
                    <BackArrow />
                </button>
                <h2 className="xl:text-relative-h4 sm:text-relative-h1 font-kharkiv mb-4 sm:mr-[30%] md:mr-[30%] xl:mr-0 xl:ml-[10%] sm:ml-0 text-center">{t('filtration')}</h2>
            </div>
            {/* Quantity of many gathered */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-2">{t('gathered_money')}</h3>
                <div className="border border-dark-blue items-center rounded-full">
                    <div className="flex gap-2 items-center justify-center py-1">
                        <p className="text-pl font-montserratRegular">{t('from')}</p>
                        <input
                            type="text"
                            className="w-1/3 px-1 rounded"
                            value={moneyFrom}
                            onChange={(e) => handleNumericInput(e.target.value, setMoneyFrom)}
                        />
                        <p className="text-pl font-montserratRegular">{t('to')}</p>
                        <input
                            type="text"
                            className="w-1/3 px-1 rounded"
                            value={moneyTo}
                            onChange={(e) => handleNumericInput(e.target.value, setMoneyTo)}
                        />
                    </div>
                </div>
            </div>

            {/* Date of ending */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">{t('ending_date')}</h3>
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


            {/* Emergency */}
            <div className="mb-4">
                <h3 className="text-lg font-montserratRegular mb-4">{t('priority')}</h3>
                <div className="space-y-2">
                    <button
                        onClick={() => selectUrgency('Терміново')}
                        className={`w-full py-1 font-montserratRegular border border-dark-blue rounded-full
                                ${selectedUrgency === 'Терміново' ? 'bg-dark-blue text-white' : ''}`}
                    >
                        {t('urgently')}
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

export default FiltersGathering;
