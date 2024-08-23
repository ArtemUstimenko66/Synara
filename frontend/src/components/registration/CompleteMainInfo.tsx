import React, { ChangeEvent } from 'react';
import GoogleImg from '../../assets/images/google.svg';
import TwitterImg from '../../assets/images/twitter_x.svg';
import BankIdImg from '../../assets/images/bank_id.png';
import DiiaImg from '../../assets/images/diia.png';
import {Button} from "../../ui/Button.tsx";


type CompleteMainInfoProps = {
    onNextStep: () => void;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setPassword: (password: string) => void;
};

const CompleteMainInfo: React.FC<CompleteMainInfoProps> = ({
                                                               onNextStep,
                                                               setUsername,
                                                               setEmail,
                                                               setPhoneNumber,
                                                               setPassword
                                                           }) => {

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className="flex flex-col items-start pr-8 pb-8 w-full">
            <h2 className="text-relative-h4 font-kharkiv mb-4">Заповніть данні</h2>

            <div className="flex w-full space-x-4 mb-4">
                <div className="w-1/2 flex flex-col">
                    <label className="font-montserratRegular mb-2">Ім'я*</label>
                    <input
                        type="text"
                        placeholder="Ваше ім'я"
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="w-1/2 flex flex-col">
                    <label className="font-montserratRegular mb-2">Прізвище*</label>
                    <input
                        type="text"
                        placeholder="Ваше прізвище"
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        onChange={handlePhoneNumberChange}
                    />
                </div>
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Пошта*</label>
                <input
                    type="email"
                    placeholder="Адреса електронної пошти"
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    onChange={handleEmailChange}
                />
            </div>

            <div className="w-full mb-6">
                <label className="font-montserratRegular mb-2">Пароль*</label>
                <input
                    type="password"
                    placeholder="Ваш пароль"
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    onChange={handlePasswordChange}
                />
            </div>

            <Button isFilled={true}
                className="w-full bg-perfect-yellow text-almost-black py-3 rounded-full mb-5 hover:bg-perfect-yellow transition"
                onClick={onNextStep}
            >
                ПРОДОВЖИТИ
            </Button>

            <div className="flex items-center justify-center w-full mb-5 text-gray-500">
                <span className="mx-4">Або зареєструйтесь за допомогою</span>
            </div>

            <div className="flex w-full justify-between mb-7">
                <button
                    className="w-1/2 bg-gray-200 py-3 rounded-xl flex items-center justify-center mr-2 hover:bg-gray-300 transition">
                    <img src={`${GoogleImg}`} alt="Google" className="w-6 h-6 mr-2"/>
                </button>
                <button
                    className="w-1/2 bg-gray-200 py-3 rounded-xl flex items-center justify-center ml-2 hover:bg-gray-300 transition">
                    <img src={`${BankIdImg}`} alt="Bank ID" className="w-20 h-6 mr-2"/>
                </button>
            </div>

            <div className="flex w-full justify-between mb-7">
                <button
                    className="w-1/2 bg-almost-black text-white py-3 rounded-xl flex items-center justify-center mr-2 hover:bg-gray-700 transition">
                    <img src={`${DiiaImg}`} alt="Diia" className="w-9 h-5 mr-2"/>
                </button>
                <button
                    className="w-1/2 bg-almost-black text-white py-3 rounded-xl flex items-center justify-center ml-2 hover:bg-gray-700 transition">
                    <img src={`${TwitterImg}`} alt="Twitter X" className="w-6 h-6 mr-2"/>
                </button>
            </div>

            <div className="flex w-full justify-center">
                <p className="text-relative-ps font-montserratRegular">
                    У вас вже є аккаунт? <a href="/login" className="text-almost-black font-bold underline">Увійти</a>
                </p>
            </div>
        </div>
    );
};

export default CompleteMainInfo;
