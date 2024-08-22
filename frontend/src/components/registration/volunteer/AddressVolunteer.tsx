import React, { useState, useRef } from 'react';

const regionsWithCities = {
    'Київська область': ['Київ', 'Біла Церква', 'Бровари'],
    'Львівська область': ['Львів', 'Дрогобич', 'Стрий'],
    'Одеська область': ['Одеса', 'Ізмаїл', 'Чорноморськ'],
    'Харківська область': ['Харків', 'Чугуїв', 'Ізюм'],
    'Дніпропетровська область': ['Дніпро', 'Кривий Ріг', 'Павлоград'],
    // Add more regions and cities as needed
};

type AddressVolunteerInfoProps = {
    onNextStep: () => void;
};

const AddressVolunteer: React.FC<AddressVolunteerInfoProps> = ({ onNextStep }) => {
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedHelp, setselectedHelp] = useState<string | null>(null);
    const handleHelpSelect = (gender: string) => {
        setselectedHelp(gender);
    };
    const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRegion(event.target.value);
        setSelectedCity(''); // Reset city when region changes
    };

    const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setUploadedDocument(event.target.files[0]);
        }
    };

    const handleAddDocumentClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="flex flex-col items-start pr-8 pb-8 w-full">
            <h2 className="text-relative-h4 font-kharkiv mb-4">Заповніть данні</h2>

            <div className="flex w-full space-x-4 mb-4">
                <div className="w-1/2 flex flex-col">
                    <label className="font-montserratRegular mb-2">Область</label>
                    <div className="relative">
                        <select
                            value={selectedRegion}
                            onChange={handleRegionChange}
                            className="w-full p-4 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue appearance-none bg-white"
                        >
                            <option value="" disabled >Область проживання</option>
                            {Object.keys(regionsWithCities).map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <svg
                                className="w-4 h-4 text-blue-500" // Custom color and size for arrow
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex flex-col">
                    <label className="font-montserratRegular mb-2">Місто</label>
                    <div className="relative">
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            disabled={!selectedRegion}
                            className="w-full p-4 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue appearance-none bg-white"
                        >
                            <option value="" disabled>Місто проживання</option>
                            {selectedRegion &&
                                regionsWithCities[selectedRegion].map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <svg
                                className="w-4 h-4 text-blue-500" // Custom color and size for arrow
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Номер телефону</label>
                <input
                    type="text"
                    placeholder="Ваш контактний номер телефону"
                    className="w-full p-4 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                />
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Яку допомогу ви можете надавати:</label>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handleHelpSelect('Психологічна')}
                        className={`py-2 px-4 rounded-full pl-20 pr-20   mt-4 border-2
                         text-center ${
                            selectedHelp === 'Психологічна' ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                        }`}>
                        Психологічна
                    </button>
                    <button onClick={() => handleHelpSelect('Гуманітарна')}
                            className={`py-2 px-4 rounded-full pl-20 pr-20 mt-4 border-2
                         text-center ${
                                selectedHelp === 'Гуманітарна' ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                            }`}>
                        Гуманітарна
                    </button>

                    <button onClick={() => handleHelpSelect('Інформаційна')}
                            className={`py-2 px-4 rounded-full pl-20 pr-20 mt-4 border-2
                         text-center ${
                                selectedHelp === 'Інформаційна' ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                            }`}>
                        Інформаційна
                    </button>
                    <button onClick={() => handleHelpSelect('Матеріальна')}
                            className={`py-2 px-4 rounded-full pl-20 pr-20 mt-4 border-2
                         text-center ${
                                selectedHelp === 'Матеріальна' ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                            }`}>
                        Матеріальна
                    </button>
                </div>
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Документи, підтверджуючі кваліфікацію</label>
                <br/>
                <button
                    className="w-52 mb-6 mt-2 p-2 text-center border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue text-blue-500 "
                    onClick={handleAddDocumentClick}
                >
                    {uploadedDocument ? uploadedDocument.name : 'ДОДАТИ ДОКУМЕНТ'}
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleDocumentUpload}
                />
            </div>

            <button
                className="w-full bg-perfect-yellow text-almost-black py-4 rounded-full mb-6 hover:bg-perfect-yellow transition"
                onClick={onNextStep}
            >
                ПРОДОВЖИТИ
            </button>
        </div>
    );
};

export default AddressVolunteer;
