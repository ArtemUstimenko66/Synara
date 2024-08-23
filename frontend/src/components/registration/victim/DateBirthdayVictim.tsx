import React, { useState } from 'react';
import VectorWhite from '../../../assets/images/VectorWhite.svg?react';
import { Button } from "../../../ui/Button.tsx";

type DateVictimInfoProps = {
    onNextStep: () => void;
    selectedRole: string | null; // Add this line
};

const DateBirthdayVictim: React.FC<DateVictimInfoProps> = ({ onNextStep, selectedRole }) => { // Add selectedRole
    const [selectedGender, setSelectedGender] = useState<string | null>(null);

    const handleGenderSelect = (gender: string) => {
        setSelectedGender(gender);
    };
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({
        terms: false,
        personalData: false,
        updates: false,
    });
    const toggleOption = (option: string) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [option]: !prevState[option],
        }));
    };
    return (
        <div className="flex flex-col items-start pr-8 pb-8 w-full">
            <h2 className="text-relative-h4 font-kharkiv mb-4">Заповніть данні</h2>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Дата народження*</label>
                <input
                    type="text"
                    placeholder="ДД / ММ / РРРР"
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                />
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Ваша стать:</label>
                <div className="flex w-full space-x-2">
                    <button
                        onClick={() => handleGenderSelect('Жінка')}
                        className={`flex-1 py-2 px-4 rounded-full border-2 ${
                            selectedGender === 'Жінка' ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                        }`}
                    >
                        Жінка
                    </button>
                    <button
                        onClick={() => handleGenderSelect('Чоловік')}
                        className={`flex-1 py-2 px-4 rounded-full border-2 ${
                            selectedGender === 'Чоловік' ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                        }`}
                    >
                        Чоловік
                    </button>
                    <button
                        onClick={() => handleGenderSelect('Інше')}
                        className={`flex-1 py-2 px-4 rounded-full border-2 ${
                            selectedGender === 'Інше' ? 'bg-dark-blue border-dark-blue text-white' : 'border-light-blue'
                        }`}
                    >
                        Інше
                    </button>
                </div>
            </div>
            <div className={`flex w-full space-x-2 ${selectedRole !== 'volunteer' ? 'flex-col' : ''}`}>
                {selectedRole === 'volunteer' && (
                    <div className="w-1/2 mb-4">
                        <label
                            className="font-montserratRegular whitespace-pre-line mb-2">{`Номер волонтерського\n посвідчення`}</label>
                        <input
                            type="text"
                            placeholder="**********"
                            className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        />
                    </div>
                )}
                <div className={`${selectedRole === 'volunteer' ? 'w-1/2 mt-6' : 'w-full'} mb-4`}>
                    <label className="font-montserratRegular mb-2">РНОКПП</label>
                    <input
                        type="text"
                        placeholder="**********"
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    />
                </div>
            </div>
            <div className="w-full mb-4">
                <label className="font-montserratRegular ">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedOptions.terms}
                        onChange={() => toggleOption('terms')}
                    />
                    <span
                        className={`w-5 h-5 mr-2  inline-block rounded-full border-2 relative ${
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
                    Я погоджуюся з <a href="#" className="underline font-bold">Правилами користування</a> та <a href="#"
                                                                                                                className="underline font-bold">Політикою</a>
                    <p className="underline font-bold ml-6">конфіденційності</p>
                </label>
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular ">
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
                    Я даю згоду на обробку моїх персональних даних
                </label>
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
                    Я хочу отримувати оновлення та спеціальні пропозиції
                </label>
            </div>

            <Button
                className="w-full bg-perfect-yellow text-almost-black py-4 rounded-full mb-6 hover:bg-perfect-yellow transition"
                onClick={onNextStep}
            >
                ПРОДОВЖИТИ
            </Button>

        </div>
    );
};

export default DateBirthdayVictim;
