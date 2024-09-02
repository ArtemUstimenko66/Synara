import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from "../../../../ui/Button.tsx";
import { User } from "../../interfaces/User.tsx";
import { MuiPhone } from "../ui/MuiPhone.tsx";
import DeleteImg from '../../../../assets/images/DeleteImg.svg?react';

const regionsWithCities = {
    'Київська область': ['Київ', 'Біла Церква', 'Бровари'],
    'Львівська область': ['Львів', 'Дрогобич', 'Стрий'],
    'Одеська область': ['Одеса', 'Ізмаїл', 'Чорноморськ'],
    'Харківська область': ['Харків', 'Чугуїв', 'Ізюм'],
    'Дніпропетровська область': ['Дніпро', 'Кривий Ріг', 'Павлоград'],
};

type AddressVolunteerInfoProps = {
    userData: any;
    setUserData: (data: any) => void;
    onNextStep: () => void;
};

const AddressVolunteer: React.FC<AddressVolunteerInfoProps> = ({ onNextStep, setUserData }) => {
    const [localData, setLocalData] = useState<Partial<User>>({
        region: '',
        city: '',
        phoneNumber: '',
        helpTypes: [],
        documents: []
    });

    const [selectedRegion, setSelectedRegion] = useState<string>(localData.region || '');
    const [selectedCity, setSelectedCity] = useState<string>(localData.city || '');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [regionOptions, setRegionOptions] = useState<string[]>([]);
    const [cityOptions, setCityOptions] = useState<string[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLocalData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

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

    const handleHelpSelect = (helpType: string) => {
        setLocalData(prevData => {
            const updatedHelpTypes = prevData.helpTypes as string[];
            const isSelected = updatedHelpTypes.includes(helpType);

            if (isSelected) {
                return {
                    ...prevData,
                    helpTypes: updatedHelpTypes.filter(type => type !== helpType),
                };
            } else {
                return {
                    ...prevData,
                    helpTypes: [...updatedHelpTypes, helpType],
                };
            }
        });
    };

    // Обработчик для удаления файла
    const handleRemoveDocument = (fileName: string) => {
        setLocalData(prevData => ({
            ...prevData,
            documents: prevData.documents?.filter(file => file.name !== fileName),
        }));
    };

// Обработчик загрузки файлов
    const handleDocumentUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newDocuments = Array.from(event.target.files);
            setLocalData(prevData => ({
                ...prevData,
                documents: [...(prevData.documents || []), ...newDocuments],
            }));
        }
    };

// Обработчик клика по кнопке добавления документа
    const handleAddDocumentClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};

        if (!selectedRegion) {
            newErrors.region = 'Будь ласка, виберіть область';
        }
        if (!selectedCity) {
            newErrors.city = 'Будь ласка, виберіть місто';
        }
        if (localData.phoneNumber.length <= 5) {
            newErrors.phoneNumber = 'Будь ласка, введіть номер телефону';
        }
        if (!localData.helpTypes || localData.helpTypes.length === 0) {
            newErrors.helpTypes = 'Будь ласка, виберіть хоча б один тип допомоги';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = () => {
        if(validateFields()) {
            setUserData(prev => ({
                ...prev,
                region: selectedRegion,
                city: selectedCity,
                phoneNumber: localData.phoneNumber,
                helpTypes: localData.helpTypes,
                documents: localData.documents
            }));
            onNextStep();
        }
    };

    return (
        <div className="flex flex-col items-start xl:pr-8 xl:pb-8 w-full">
            <h2 className="sm:text-xs-pxl xl:text-relative-h4 font-kharkiv mb-4">Заповніть данні</h2>

            <div className="flex w-full space-x-4 mb-4">
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
            <div className="sm:w-full flex flex-col xl:hidden sm:block">
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

            <div className="sm:w-full flex flex-col xl:hidden sm:block">
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
            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-8">Номер телефону*</label>
                <MuiPhone
                    value={localData.phoneNumber || ''}
                    onChange={(phone) => setLocalData(prevData => ({...prevData, phoneNumber: phone}))}
                    fullWidth
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Яку допомогу ви можете надавати:*</label>
                <div className="flex flex-wrap gap-1">
                    {['Психологічна', 'Гуманітарна', 'Інформаційна', 'Матеріальна'].map(helpType => (
                        <button
                            key={helpType}
                            onClick={() => handleHelpSelect(helpType)}
                            className={`py-2 px-4 rounded-full sm:pl-7 sm:pr-7 xl:pl-20 xl:pr-20 mt-1 border-2 text-center ${
                                (localData.helpTypes as string[]).includes(helpType) ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                            }`}
                        >
                            {helpType}
                        </button>
                    ))}
                </div>
                {errors.helpTypes && <p className="text-red-500 text-sm">{errors.helpTypes}</p>}
            </div>

            {(localData.helpTypes.includes('Психологічна') || localData.helpTypes.includes('Інформаційна')) && (
                <div className="w-full mb-4">
                    <div className="flex flex-col">
                        <label className="xl:text-xs-pl sm:text-pd font-montserratRegular">Документи, підтверджуючі кваліфікацію</label>
                        <button
                            className="w-52 mb-2 mt-2 p-2 uppercase text-center border-2 rounded-lg outline-none border-light-blue text-light-blue"
                            onClick={handleAddDocumentClick}
                        >
                            Додати документи
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="application/pdf,image/*"
                            className="hidden"
                            onChange={handleDocumentUpload}
                        />
                        <div>
                            {localData.documents?.map((doc, index) => (
                                <div key={index}
                                     className="flex items-center justify-between w-full mt-1 p-3 rounded-lg border-2 bg-baby-blue border-baby-blue">
                                    <p className="font-montserratRegular text-sm text-almost-black">{doc.name}</p>
                                    <DeleteImg className="cursor-pointer"
                                               onClick={() => handleRemoveDocument(doc.name)}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <Button
                className="w-full bg-perfect-yellow text-almost-black py-4 rounded-full mb-6 hover:bg-perfect-yellow transition"
                onClick={handleSubmit}
            >
                ПРОДОВЖИТИ
            </Button>
        </div>
    );
};

export default AddressVolunteer;
