import React, { useState, ChangeEvent } from 'react';
import VectorWhite from '../../../assets/images/VectorWhite.svg?react';
import { Button } from "../../../ui/Button";

import {useTranslation} from "react-i18next";

type DateBirthdayProps = {
    onNextStep: () => void;
    selectedRole: string | null;
    setUserData: (data: any) => void;
};

const DateBirthday: React.FC<DateBirthdayProps> = ({ onNextStep, selectedRole, setUserData }) => {
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [volunteerId, setVolunteerId] = useState<number | ''>('');
    const [unp, setUnp] = useState<number | ''>('');
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({
        terms: false,
        personalData: false,
        updates: false,
    });

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);

        if (value.length >= 2 && value.length <= 4) {
            value = value.replace(/(\d{2})(\d+)/, '$1 / $2');
        } else if (value.length > 4) {
            value = value.replace(/(\d{2})(\d{2})(\d+)/, '$1 / $2 / $3');
        }

        setDateOfBirth(value);
    };
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};

        if (!dateOfBirth || !/^\d{2} \/ \d{2} \/ \d{4}$/.test(dateOfBirth)) {
            newErrors.dateOfBirth = t('enter_valid_data');
        } else {
            const [day, month, year] = dateOfBirth.split(" / ").map(Number);
            const currentYear = new Date().getFullYear();

            if (month < 1 || month > 12) {
                newErrors.dateOfBirth = t('enter_valid_month');
            } else {
                const daysInMonth = new Date(year, month, 0).getDate();
                if (day < 1 || day > daysInMonth) {
                    newErrors.dateOfBirth = `${t('enter_valid_date1')} ${daysInMonth} ${t('enter_valid_date2')}`;
                }
                if (year < 1900 || year > currentYear) {
                    newErrors.dateOfBirth = `${t('enter_valid_year')} ${currentYear}`;
                }
            }
        }

        // Validate gender selection
        if (!selectedGender) {
            newErrors.gender = t('choose_gender');
        }

        // Validate UNP
        if (!unp) {
            newErrors.unp = t('enter_valid_itn');
        } else if (isNaN(Number(unp))) {
            newErrors.unp = t('itn_is_a_number');
        }

        // Validate agreement to terms and personal data processing
        if (!selectedOptions.terms) {
            newErrors.terms = t('you_must_agree_to_the_terms_of_use');
        }
        if (!selectedOptions.personalData) {
            newErrors.personalData = t('you_must_consent_to_the_processing_of_personal_data');
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if(validateFields())
        {
            const [day, month, year] = dateOfBirth.split(' / ').map(part => parseInt(part, 10));

            if (year && month && day) {
                const formattedDate = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

                const localData = {
                    dateOfBirth: formattedDate,
                    gender: selectedGender,
                    volunteerId,
                    unp,
                };

                console.log("Updated User Data: ", localData);

                if (typeof setUserData === 'function') {
                    // @ts-ignore
                    setUserData(prev => ({...prev, ...localData}));
                    onNextStep();
                } else {
                    console.error("setUserData is not a function");
                }
            } else {
                console.error("Invalid date format");
            }
        }
    };

    const toggleOption = (option: string) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [option]: !prevState[option],
        }));
    };

    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-start pr-8 pb-8 w-full">
            <h2 className="sm:text-xs-pxl xl:text-relative-h4 font-kharkiv mb-4">{t('fill_in_the_data')}</h2>

            <div className="sm:w-full xl:w-full mb-4">
                <label className="font-montserratRegular mb-2">{t('birthday')}*</label>
                <input
                    type="text"
                    placeholder={t('date_format')}
                    value={dateOfBirth}
                    onChange={handleDateChange}
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">{t('your_gender')}:</label>
                <div className="flex w-full space-x-2">
                    <button
                        onClick={() => setSelectedGender('Жінка')}
                        className={`flex-1 py-2 px-4 rounded-full border-2 ${
                            selectedGender === 'Жінка' ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                        }`}
                    >
                        {t('woman')}
                    </button>
                    <button
                        onClick={() => setSelectedGender('Чоловік')}
                        className={`flex-1 py-2 px-4 rounded-full border-2 ${
                            selectedGender === 'Чоловік' ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                        }`}
                    >
                        {t('man')}
                    </button>
                    <button
                        onClick={() => setSelectedGender('Інше')}
                        className={`flex-1 py-2 px-4 rounded-full border-2 ${
                            selectedGender === 'Інше' ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                        }`}
                    >
                        {t('other_gender')}
                    </button>
                </div>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            <div className={`sm:flex-none xl:flex w-full sm:space-x-0 xl:space-x-2 ${selectedRole !== 'volunteer' ? 'flex-col' : ''}`}>
                {selectedRole === 'volunteer' && (
                    <div className="sm:w-full xl:w-1/2 sm:mb-0 xl:mb-4">
                        <label
                            className="xl:block sm:hidden font-montserratRegular whitespace-pre-line mb-0">{t('number_vipn1')}</label>
                        <label
                            className="xl:hidden sm:block font-montserratRegular whitespace-pre-line sm:mb-2">{t('number_vipn2')}</label>
                        <input
                            type="text"
                            name="volunteerId"
                            placeholder="**********"
                            className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                            value={volunteerId === '' ? '' : volunteerId}
                            onChange={(e) => setVolunteerId(e.target.value === '' ? '' : Number(e.target.value))}
                        />
                    </div>
                )}
                <div
                    className={`${selectedRole === 'volunteer' ? 'sm:w-full xl:w-1/2 sm:mt-2 xl:mt-6' : 'w-full'} mb-4`}>
                    <label className="font-montserratRegular mb-2">{t('itn')}</label>
                    <input
                        type="text"
                        name="unp"
                        placeholder="**********"
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        value={unp === '' ? '' : unp}
                        onChange={(e) => setUnp(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    {errors.unp && <p className="text-red-500 text-sm">{errors.unp}</p>}
                </div>
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedOptions.terms}
                        onChange={() => toggleOption('terms')}
                    />
                    <span
                        className={`w-5 h-5 mr-2 inline-block rounded-full border-2 relative ${
                            selectedOptions.terms ? 'bg-blue-500 border-blue-500' : 'border-light-blue'
                        }`}
                    >
                        {selectedOptions.terms && (
                            <span
                                className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                                <VectorWhite/>
                            </span>
                        )}
                    </span>
                    {t('i_agree_with')} <a href="#" className="underline font-bold">{t('terms_of_use2')}</a> {t('and')} <a href="#"
                                                                                                                           className="underline font-bold">{t('politics')}</a>
                    <p className="underline sm:hidden xl:block font-bold ml-6">{t('privacy')}</p>
                    <p className="underline sm:block xl:hidden font-bold">{t('privacy')}</p>
                </label>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedOptions.personalData}
                        onChange={() => toggleOption('personalData')}
                    />
                    <span
                        className={`w-5 h-5 mr-2 inline-block rounded-full border-2 relative ${
                            selectedOptions.personalData ? 'bg-blue-500 border-blue-500' : 'border-light-blue'
                        }`}
                    >
                        {selectedOptions.personalData && (
                            <span
                                className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                                <VectorWhite/>
                            </span>
                        )}
                    </span>
                    {t('i_consent_to_the_processing_of_my_personal_data')}
                </label>
                {errors.personalData && <p className="text-red-500 text-sm">{errors.personalData}</p>}
            </div>

            <div className="w-full mb-6">
                <label className="font-montserratRegular">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedOptions.updates}
                        onChange={() => toggleOption('updates')}
                    />
                    <span
                        className={`w-5 h-5 mr-2 inline-block rounded-full border-2 relative ${
                            selectedOptions.updates ? 'bg-blue-500 border-blue-500' : 'border-light-blue'
                        }`}
                    >
                        {selectedOptions.updates && (
                            <span
                                className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                                <VectorWhite/>
                            </span>
                        )}
                    </span>
                    {t('i_want_get_updates_about_new_opportunities')}
                </label>
            </div>

            <Button
                className="w-full bg-perfect-yellow text-almost-black py-4 rounded-full mb-6 hover:bg-perfect-yellow transition"
                onClick={handleSubmit}
            >
                {t('continueUPPER')}
            </Button>
        </div>
    );
};

export default DateBirthday;
