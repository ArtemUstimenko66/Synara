import React, { useState, ChangeEvent } from 'react';
import BankIdImg from '../../../assets/images/bank_id.png';
import DiiaImg from '../../../assets/images/diia.png';
import { Button } from "../../../ui/Button.tsx";
import { User } from "../interfaces/User.tsx";
import TwitterLoginButton from "./TwitterLoginButton.tsx";
import GoogleLoginButton from "./GoogleLoginButton.tsx";
import { Eye, EyeOff } from 'react-feather'; // Используйте иконки для глаза

type CompleteMainInfoProps = {
    setUserData: (data: Partial<User>) => void;
    onNextStep: () => void;
};

const CompleteMainInfo: React.FC<CompleteMainInfoProps> = ({ setUserData, onNextStep }) => {
    const [localData, setLocalData] = useState<Partial<User>>({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState<boolean>(false); // Состояние для видимости пароля

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (typeof setUserData === 'function') {
            setUserData(prev => ({ ...prev, ...localData }));
            onNextStep();
        } else {
            console.error("setUserData is not a function");
        }
    };

    return (
        <div className="flex flex-col items-start pr-8 pb-8 w-full">
            <h2 className="text-relative-h4 font-kharkiv mb-4">Заповніть данні</h2>

            <div className="flex w-full space-x-4 mb-4">
                <div className="w-1/2 flex flex-col">
                    <label className="font-montserratRegular mb-2">Ім'я*</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Ваше ім'я"
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        value={localData.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="w-1/2 flex flex-col">
                    <label className="font-montserratRegular mb-2">Прізвище*</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Ваше прізвище"
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        value={localData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Пошта*</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Адреса електронної пошти"
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    value={localData.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="w-full mb-6 relative">
                <label className="font-montserratRegular mb-2">Пароль*</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Ваш пароль"
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue pr-10"
                    value={localData.password}
                    onChange={handleInputChange}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                    style={{marginTop: '0.8rem', marginRight: '1rem'}}
                >
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
            </div>


            <Button
                isFilled={true}
                className="w-full bg-perfect-yellow text-almost-black py-3 rounded-full mb-5 hover:bg-perfect-yellow transition"
                onClick={handleSubmit}
            >
                ПРОДОВЖИТИ
            </Button>

            <div className="flex items-center justify-center w-full mb-5 text-gray-500">
                <span className="mx-4">Або зареєструйтесь за допомогою</span>
            </div>

            <div className="flex w-full justify-between mb-7">
                <GoogleLoginButton/>
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
                <TwitterLoginButton/>
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
