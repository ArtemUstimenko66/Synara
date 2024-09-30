import React, { useState } from 'react';
import { Button } from "../../../../ui/Button.tsx";

import 'react-international-phone/style.css';
import {MuiPhone} from "../ui/MuiPhone.tsx";
import {regionsWithCities} from "../../../../data/Regions.ts";

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
            newErrors.region = 'Будь ласка, виберіть область';
        }
        if (!selectedCity) {
            newErrors.city = 'Будь ласка, виберіть місто';
        }
        if (!street) {
            newErrors.street = 'Будь ласка, введіть назву вулиці';
        } else if (!startsWithCapital(street)) {
            newErrors.street = 'Назва вулиці має починатися з великої літери';
        }
        if (!house) {
            newErrors.house = 'Будь ласка, введіть номер будинку';
        } else if (isNaN(house)) {
            newErrors.house = 'Будинок повинен бути числом';
        }
        if (!apartment && apartment !== 0) {
            newErrors.apartment = 'Будь ласка, введіть номер квартири';
        } else if (isNaN(apartment)) {
            newErrors.apartment = 'Квартира повинна бути числом';
        }
        if (phoneNumber.length <= 5) {
            newErrors.phoneNumber = 'Будь ласка, введіть номер телефону';
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
            <h2 className="sm:text-xs-pxl xl:text-relative-h4 font-kharkiv mb-4">Заповніть данні</h2>

            <div className="flex xl:w-full sm:w-full space-x-4 mb-4">
                <div className="w-1/2 flex flex-col xl:block sm:hidden">
                    <label className="font-montserratRegular mb-2">Область*</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={selectedRegion}
                            onChange={handleRegionChange}
                            placeholder="Область проживання"
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
                    <label className="font-montserratRegular mb-2">Місто*</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={selectedCity}
                            onChange={handleCityChange}
                            placeholder="Місто проживання"
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
                <label className="font-montserratRegular mb-2">Область*</label>
                <div className="relative">
                    <input
                        type="text"
                        value={selectedRegion}
                        onChange={handleRegionChange}
                        placeholder="Область проживання"
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
                <label className="font-montserratRegular mb-2">Місто*</label>
                <div className="relative">
                    <input
                        type="text"
                        value={selectedCity}
                        onChange={handleCityChange}
                        placeholder="Місто проживання"
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
                <label className="font-montserratRegular mb-2">Вулиця</label>
                <input
                    type="text"
                    placeholder="Назва вулиці"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                />
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
            </div>

            <div className="flex w-full space-x-4 mb-4">
                <div className="w-1/2 flex flex-col">
                    <div className="relative">
                        <label className="font-montserratRegular mb-2">Будинок</label>
                        <input
                            type="number"
                            placeholder="Номер будинку"
                            value={house === '' ? '' : house}
                            onChange={(e) => setHouse(Number(e.target.value))}
                            className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        />
                        {errors.house && <p className="text-red-500 text-sm">{errors.house}</p>}
                    </div>
                </div>

                <div className="w-1/2 flex flex-col">
                    <div className="relative">
                        <label className="font-montserratRegular mb-2">Квартира</label>
                        <input
                            type="number"
                            placeholder="Номер квартири"
                            value={apartment === '' ? '' : apartment}
                            onChange={(e) => setApartment(Number(e.target.value))}
                            className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        />
                        {errors.apartment && <p className="text-red-500 text-sm">{errors.apartment}</p>}
                    </div>
                </div>
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Номер телефону*</label>
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
                ПРОДОВЖИТИ
            </Button>
        </div>
    );
};

export default AddressVictim;
