import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from "../../../../ui/Button.tsx";
import { User } from "../../interfaces/User.tsx";

const regionsWithCities = {
    'Київська область': ['Київ', 'Біла Церква', 'Бровари'],
    'Львівська область': ['Львів', 'Дрогобич', 'Стрий'],
    'Одеська область': ['Одеса', 'Ізмаїл', 'Чорноморськ'],
    'Харківська область': ['Харків', 'Чугуїв', 'Ізюм'],
    'Дніпропетровська область': ['Дніпро', 'Кривий Ріг', 'Павлоград'],
};

type AddressVolunteerInfoProps = {
    onNextStep: () => void;
    setUserData: (data: Partial<User>) => void;
};

const AddressVolunteer: React.FC<AddressVolunteerInfoProps> = ({ onNextStep, setUserData }) => {
    const [localData, setLocalData] = useState<Partial<User>>({
        region: '',
        city: '',
        phoneNumber: '',
        helpTypes: [],
        //document: ''
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLocalData(prevData => ({
            ...prevData,
            [name]: value,
        }));
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

    const handleDocumentUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setLocalData(prevData => ({
                ...prevData,
                document: event.target.files[0].name,
            }));
        }
    };

    const handleAddDocumentClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = () => {
        setUserData(prev => ({ ...prev, ...localData }));
        onNextStep();
    };

    return (
        <div className="flex flex-col items-start pr-8 pb-8 w-full">
            <h2 className="text-relative-h4 font-kharkiv mb-4">Заповніть данні</h2>

            <div className="flex w-full space-x-4 mb-4">
                <div className="w-1/2 flex flex-col">
                    <label className="font-montserratRegular mb-2">Область*</label>
                    <select
                        name="region"
                        value={localData.region}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue bg-white"
                    >
                        <option value="" disabled>Область проживання</option>
                        {Object.keys(regionsWithCities).map((region) => (
                            <option key={region} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-1/2 flex flex-col">
                    <label className="font-montserratRegular mb-2">Місто*</label>
                    <select
                        name="city"
                        value={localData.city}
                        onChange={handleInputChange}
                        disabled={!localData.region}
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue bg-white"
                    >
                        <option value="" disabled>Місто проживання</option>
                        {localData.region &&
                            regionsWithCities[localData.region].map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Номер телефону</label>
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Ваш контактний номер телефону"
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    value={localData.phoneNumber}
                    onChange={handleInputChange}
                />
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Яку допомогу ви можете надавати:*</label>
                <div className="flex flex-wrap gap-2">
                    {['Психологічна', 'Гуманітарна', 'Інформаційна', 'Матеріальна'].map(helpType => (
                        <button
                            key={helpType}
                            onClick={() => handleHelpSelect(helpType)}
                            className={`py-2 px-4 rounded-full pl-20 pr-20 mt-4 border-2 text-center ${
                                (localData.helpTypes as string[]).includes(helpType) ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                            }`}
                        >
                            {helpType}
                        </button>
                    ))}
                </div>
            </div>

            {(localData.helpTypes.includes('Психологічна') || localData.helpTypes.includes('Інформаційна')) && (
                <div className="w-full mb-4">
                    <label className="font-montserratRegular mb-2">Документи, підтверджуючі кваліфікацію</label>
                    <br />
                    <button
                        className="w-52 mb-6 mt-2 p-2 text-center border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue text-blue-500"
                        onClick={handleAddDocumentClick}
                    >
                        {localData.document || 'ДОДАТИ ДОКУМЕНТ'}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleDocumentUpload}
                    />
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
