import React, { useState, useEffect } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { helpTypesMap } from "../../../data/helpTypesMap.ts";
import { useSearchParams } from "react-router-dom";
import { urgencyTranslations } from "../../../data/urgencyMap.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../hooks/useAuth.ts";
import {genderTranslations} from "../../../data/genderTranslations.ts";
import BackArrow from '../../../assets/images/back_arrow_mini.svg?react';

interface FiltersProps {
    onApplyFilters: (filteredAnnouncements: any[]) => void;
    onCloseSidebar: () => void;
    onOpenMap: () => void;
}

const Filters: React.FC<FiltersProps> = ({ onCloseSidebar, onOpenMap }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [isUkraineSelected, setIsUkraineSelected] = useState<boolean>(false);
    const [ageFrom, setAgeFrom] = useState('');
    const [ageTo, setAgeTo] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    const { role } = useAuth();

    const categories = role === "victim"
        ? ['Психологічна', 'Гуманітарна', 'Інформаційна', 'Матеріальна']
        : ['Психологічна', 'Гуманітарна', 'Інформаційна'];

    // sync filters with url
    useEffect(() => {
        const types = searchParams.getAll('type');
        const urgency = searchParams.get('isUrgent');
        const gender = searchParams.get('gender');
        const ukraine = searchParams.get('ukraine');
        const ageTo = searchParams.get('maxAge');
        const ageFrom = searchParams.get('minAge');

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

        if (gender) {
            const selectedGenderFromUrl = Object.keys(genderTranslations).find(key => genderTranslations[key] === gender) || null;
            setSelectedGender(selectedGenderFromUrl);
        }

        if (ageFrom) {
            setSelectedUrgency(ageFrom);
        }

        if (ageTo) {
            setSelectedUrgency(ageTo);
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

    const selectGender = (gender: string) => {
        setSelectedGender(prev => (prev === gender ? null : gender));
    };

    const toggleUkraineSelection = () => {
        setIsUkraineSelected(prev => !prev);
    };

    // clear filters
    const clearSelections = async () => {
        setSelectedCategories([]);
        setSelectedUrgency(null);
        setSelectedGender(null);
        setIsUkraineSelected(false);
        setAgeFrom('');
        setAgeTo('');
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

        const newSearchParams = new URLSearchParams(searchParams);

        newSearchParams.delete('type');  // Сначала очищаем текущие фильтры по категориям
        translatedCategories.forEach(category => newSearchParams.append('type', category));

        if (selectedUrgency) {
            newSearchParams.set('isUrgent', urgencyTranslations[selectedUrgency]);
        } else {
            newSearchParams.delete('isUrgent');
        }

        if (selectedGender) {
            newSearchParams.set('gender', genderTranslations[selectedGender]);
        } else {
            newSearchParams.delete('gender');
        }

        if (ageTo) {
            newSearchParams.set('maxAge', ageTo);
        } else {
            newSearchParams.delete('maxAge');
        }

        if (ageFrom) {
            newSearchParams.set('minAge', ageFrom);
        } else {
            newSearchParams.delete('minAge');
        }

        // Добавляем фильтр по всей Украине
        if (isUkraineSelected) {
            newSearchParams.set('ukraine', 'true');
        } else {
            newSearchParams.delete('ukraine');
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
                <button onClick={onCloseSidebar} className="mb-[2vh] xl:hidden sm:flex md:flex">
                    <BackArrow/>
                </button>
                <h2 className="xl:text-relative-h4 sm:text-relative-h1 font-kharkiv mb-4 sm:mr-[30%] md:mr-[30%] xl:mr-0 xl:ml-[10%] sm:ml-0 text-center">{t('filtration')}</h2>
            </div>

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
                <button onClick={onOpenMap}
                        className="w-full block text-center py-2 font-montserratRegular rounded-full underline">
                    {t('change')}
                </button>
            </div>

            {role === "volunteer"
                ?
                <>
                    {/* Emergency */}
                    <div className="mb-4">
                        <h3 className="text-lg font-montserratRegular mb-4">{t('urgency')}</h3>
                        <div className="space-y-2">
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
                </>
                :
                <>
                    {/* Age */}
                    <div className="mb-4">
                        <h3 className="text-lg font-montserratRegular mb-2">{t('age')}</h3>
                        <div className="border border-dark-blue items-center rounded-full">
                            <div className="flex gap-2 items-center justify-center py-1">
                                <p className="text-pl font-montserratRegular">{t('from')}</p>
                                <input
                                    type="text"
                                    className="w-1/3 px-1 rounded"
                                    value={ageFrom}
                                    onChange={(e) => handleNumericInput(e.target.value, setAgeFrom)}
                                />
                                <p className="text-pl font-montserratRegular">{t('to')}</p>
                                <input
                                    type="text"
                                    className="w-1/3 px-1 rounded"
                                    value={ageTo}
                                    onChange={(e) => handleNumericInput(e.target.value, setAgeTo)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <h3 className="text-lg font-montserratRegular mb-4">{t('gender')}</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => selectGender('Чоловіча')}
                                className={`w-full py-1 font-montserratRegular border border-dark-blue rounded-full
                                   ${selectedGender === 'Чоловіча' ? 'bg-dark-blue text-white' : ''}`}
                            >
                                {t('male')}
                            </button>

                            <button
                                onClick={() => selectGender('Жіноча')}
                                className={`w-full py-1 font-montserratRegular border border-dark-blue rounded-full
                                ${selectedGender === 'Жіноча' ? 'bg-dark-blue text-white' : ''}`}
                            >
                                {t('female')}
                            </button>
                        </div>
                    </div>

                </>
            }


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
