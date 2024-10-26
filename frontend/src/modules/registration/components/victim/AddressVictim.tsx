import React, { useState } from 'react';
import { Button } from "../../../../ui/Button.tsx";

import 'react-international-phone/style.css';
import {MuiPhone} from "../ui/MuiPhone.tsx";
import {regionsWithCities} from "../../../../data/Regions.ts";
import {useTranslation} from "react-i18next";

type AddressVictimInfoProps = {
    userData: any;
    setUserData: (data: any) => void;
    onNextStep: () => void;
};

const AddressVictim: React.FC<AddressVictimInfoProps> = ({ userData, setUserData, onNextStep }) => {
    const [selectedRegion, setSelectedRegion] = useState<string>(userData.region || '');
    const [selectedCity, setSelectedCity] = useState<string>(userData.city || '');
    const [regionOptions, setRegionOptions] = useState<string[]>([]);
    const [cityOptions, setCityOptions] = useState<string[]>([]);
    const [street, setStreet] = useState<string>(userData.street || '');
    const [house, setHouse] = useState<number | ''>(userData.house || '');
    const [apartment, setApartment] = useState<number | ''>(userData.apartment || '');
    const [phoneNumber, setPhone] = useState<string>(userData.phoneNumber || '');
    const {t} = useTranslation();
    const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = event.target.value;
        setSelectedRegion(userInput);

        if (userInput.length > 0) {
            const filteredRegions = Object.keys(regionsWithCities).filter(region =>
                region.toLowerCase().includes(userInput.toLowerCase())
            );
            setRegionOptions(filteredRegions);
        } else {
            setRegionOptions([]);
        }

        setSelectedCity('');
        setCityOptions([]);
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = event.target.value;
        setSelectedCity(userInput);

        if (userInput.length > 0 && selectedRegion) {
            // @ts-ignore
            const filteredCities = regionsWithCities[selectedRegion].filter(city =>
                city.toLowerCase().includes(userInput.toLowerCase())
            );
            setCityOptions(filteredCities);
        } else {
            setCityOptions([]);
        }
    };

    const handleRegionSelect = (region: string) => {
        setSelectedRegion(region);
        setRegionOptions([]);
        setSelectedCity('');
        setCityOptions([]);
    };

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
        setCityOptions([]);
    };

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const startsWithCapital = (str: string) => /^[А-ЯҐЄІЇA-Z]/.test(str);

    const handleSubmit = () => {
        const newErrors: { [key: string]: string } = {};

        if (!selectedRegion) {
            newErrors.region = t('select_region');
        }
        if (!selectedCity) {
            newErrors.city = t('select_city');
        }
        if (!street) {
            newErrors.street = t('enter_street');
        } else if (!startsWithCapital(street)) {
            newErrors.street = t('the_street_name_must_begin_with_a_capital_letter');
        }
        if (!house) {
            newErrors.house = t('enter_house_number');
        } else if (isNaN(house)) {
            newErrors.house = t('enter_valid_house_number');
        }
        if (!apartment && apartment !== 0) {
            newErrors.apartment = t('enter_valid_apartment_number');
        } else if (isNaN(apartment)) {
            newErrors.apartment = t('enter_correct_apartment_number');
        }
        if (phoneNumber.length <= 5) {
            newErrors.phoneNumber = t('enter_telephone_number');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setUserData((prev: any) => ({
                ...prev,
                region: selectedRegion,
                city: selectedCity,
                street,
                house,
                apartment,
                phoneNumber,
            }));
            onNextStep();
        }
    };


    return (
        <div className="flex flex-col items-start pr-8 pb-8 w-full">
            <h2 className="sm:text-xs-pxl xl:text-relative-h4 font-kharkiv mb-4">{t('fill_in_the_data')}</h2>

            <div className="flex xl:w-full sm:w-full space-x-4 mb-4">
                <div className="w-1/2 flex flex-col xl:block sm:hidden">
                    <label className="font-montserratRegular mb-2">{t('region')}*</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={selectedRegion}
                            onChange={handleRegionChange}
                            placeholder={t('region_of_living')}
                            className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        />
                        {errors.region && <p className="text-red-500 xl:block sm:hidden text-sm">{errors.region}</p>}
                        {regionOptions.length > 0 && (
                            <ul className="absolute w-full border-2 border-light-blue bg-white rounded-lg z-10 max-h-40 overflow-y-auto">
                                {regionOptions.map((region) => (
                                    <li
                                        key={region}
                                        onClick={() => handleRegionSelect(region)}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {region}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="w-1/2 flex flex-col xl:block sm:hidden">
                    <label className="font-montserratRegular mb-2">{t('city')}*</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={selectedCity}
                            onChange={handleCityChange}
                            placeholder={t('city_of_living')}
                            disabled={!selectedRegion}
                            className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        />
                        {errors.city && <p className="text-red-500 xl:block sm:hidden text-sm">{errors.city}</p>}
                        {cityOptions.length > 0 && (
                            <ul className="absolute w-full border-2 border-light-blue bg-white rounded-lg z-10 max-h-40 overflow-y-auto">
                                {cityOptions.map((city) => (
                                    <li
                                        key={city}
                                        onClick={() => handleCitySelect(city)}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>




            <div className="xl:w-full sm:w-full xl:hidden sm:block">
                <label className="font-montserratRegular mb-2">{t('region')}*</label>
                <div className="relative">
                    <input
                        type="text"
                        value={selectedRegion}
                        onChange={handleRegionChange}
                        placeholder={t('region_of_living')}
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    />
                    {errors.region && <p className="text-red-500 xl:hidden sm:block text-sm">{errors.region}</p>}
                    {regionOptions.length > 0 && (
                        <ul className="absolute w-full border-2 border-light-blue bg-white rounded-lg z-10 max-h-40 overflow-y-auto">
                            {regionOptions.map((region) => (
                                <li
                                    key={region}
                                    onClick={() => handleRegionSelect(region)}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {region}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="xl:w-full sm:w-full xl:hidden sm:block">
                <label className="font-montserratRegular mb-2">{t('city')}*</label>
                <div className="relative">
                    <input
                        type="text"
                        value={selectedCity}
                        onChange={handleCityChange}
                        placeholder={t('city_of_living')}
                        disabled={!selectedRegion}
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    />
                    {errors.city && <p className="text-red-500 xl:hidden sm:block text-sm">{errors.city}</p>}
                    {cityOptions.length > 0 && (
                        <ul className="absolute w-full border-2 border-light-blue bg-white rounded-lg z-10 max-h-40 overflow-y-auto">
                            {cityOptions.map((city) => (
                                <li
                                    key={city}
                                    onClick={() => handleCitySelect(city)}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {city}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="w-full xl:mb-6 sm:mb-2">
                <label className="font-montserratRegular mb-2">{t('street')}</label>
                <input
                    type="text"
                    placeholder={t('street_name')}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                />
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
            </div>

            <div className="flex w-full space-x-4 mb-4">
                <div className="w-1/2 flex flex-col">
                    <div className="relative">
                        <label className="font-montserratRegular mb-2">{t('house')}</label>
                        <input
                            type="number"
                            placeholder={t('house_number')}
                            value={house === '' ? '' : house}
                            onChange={(e) => setHouse(Number(e.target.value))}
                            className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        />
                        {errors.house && <p className="text-red-500 text-sm">{errors.house}</p>}
                    </div>
                </div>

                <div className="w-1/2 flex flex-col">
                    <div className="relative">
                        <label className="font-montserratRegular mb-2">{t('apartment')}</label>
                        <input
                            type="number"
                            placeholder={t('apartment_number')}
                            value={apartment === '' ? '' : apartment}
                            onChange={(e) => setApartment(Number(e.target.value))}
                            className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        />
                        {errors.apartment && <p className="text-red-500 text-sm">{errors.apartment}</p>}
                    </div>
                </div>
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">{t('telephone_number')}*</label>
                <MuiPhone
                    value={phoneNumber}
                    onChange={(phone) => setPhone(phone)}
                    fullWidth
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>
            <Button
                className="w-full bg-perfect-yellow text-almost-black py-3 rounded-full mt-6 hover:bg-perfect-yellow transition"
                onClick={handleSubmit}
            >
                {t('continueUPPER')}
            </Button>
        </div>
    );
};

export default AddressVictim;
