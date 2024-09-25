import React, { useState, ChangeEvent } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { User } from "../interfaces/User.tsx";
import TwitterLoginButton from "./ui/TwitterLoginButton.tsx";
import GoogleLoginButton from "./ui/GoogleLoginButton.tsx";
import { Eye, EyeOff } from 'react-feather';
import {useTranslation} from "react-i18next";

type CompleteMainInfoProps = {
    userData: Partial<User>;
    setUserData: (data: any) => void;
    onNextStep: () => void;
};


const CompleteMainInfo: React.FC<CompleteMainInfoProps> = ({ userData, setUserData, onNextStep }) => {
    const [localData, setLocalData] = useState<Partial<User>>(userData || {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    const [errors, setErrors] = useState<Partial<User>>({});

    const validate = (): boolean => {
        const newErrors: Partial<User> = {};

        const namePattern = /^[A-ZА-ЯҐЄІЇ]/; // Pattern to match the first character as uppercase

        if (!localData.firstName?.trim()) {
            newErrors.firstName = t('name_is_required');
        } else if (!namePattern.test(localData.firstName)) {
            newErrors.firstName = t('name_must_start_from_upper_letter');
        }

        if (!localData.lastName?.trim()) {
            newErrors.lastName = t('surname_is_required');
        } else if (!namePattern.test(localData.lastName)) {
            newErrors.lastName = t('surname_must_start_from_upper_letter');
        }

        if (!localData.email?.trim()) {
            newErrors.email = t('email_is_required');
        } else if (!/\S+@\S+\.\S+/.test(localData.email)) {
            newErrors.email = t('invalid_email_format');
        }

        if (!localData.password?.trim()) {
            newErrors.password = t('password_is_required');
        } else if (localData.password.length < 6) {
            newErrors.password = t('password_must_contain_min_6');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate() && typeof setUserData === 'function') {
            // @ts-ignore
            setUserData(prev => ({ ...prev, ...localData }));
            onNextStep();
        } else {
            console.error("setUserData is not a function");
        }
    };

    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-start sm:pr-6 xl:pr-8 pb-8 w-full">
            <h2 className="xl:text-relative-h4 sm:text-xs-pxl font-kharkiv sm:mb-0 xl:mb-4">{t('fill_in_the_data')}</h2>

            <div className="flex w-full space-x-4 mb-4">
                <div className="xl:w-1/2 sm:w-full flex flex-col">
                    <label className="font-montserratRegular mb-2 sm:hidden xl:block">{t('name')}*</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder={t('your_name')}
                        className="w-full p-3 border-2 rounded-lg sm:hidden xl:block outline-none border-light-blue focus:border-dark-blue"
                        value={localData.firstName}
                        onChange={handleInputChange}
                    />
                    {errors.firstName && <p className="text-red-500 sm:hidden xl:block text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div className="xl:w-1/2 sm:w-full flex flex-col">
                    <label className="font-montserratRegular mb-2 sm:hidden xl:block">{t('surname')}*</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder={t('your_surname')}
                        className="w-full p-3 border-2 rounded-lg sm:hidden xl:block outline-none border-light-blue focus:border-dark-blue"
                        value={localData.lastName}
                        onChange={handleInputChange}
                    />
                    {errors.lastName && <p className="text-red-500 sm:hidden xl:block text-sm mt-1">{errors.lastName}</p>}
                </div>
            </div>
            <div className="xl:w-1/2 flex flex-col sm:block xl:hidden sm:mb-4 sm:w-full">
                <label className="font-montserratRegular mb-2">{t('your_name')}*</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder={t('your_name')}
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    value={localData.firstName}
                    onChange={handleInputChange}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>


            <div className="xl:w-1/2 flex flex-col sm:block xl:hidden sm:mb-4 sm:w-full">
                <label className="font-montserratRegular mb-2">{t('surname')}*</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder={t('your_surname')}
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    value={localData.lastName}
                    onChange={handleInputChange}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
            <div className="w-full mb-4 ">
                <label className="font-montserratRegular mb-2">{t('email')}*</label>
                <input
                    type="email"
                    name="email"
                    placeholder={t('email_address')}
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    value={localData.email}
                    onChange={handleInputChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="w-full mb-6 relative">
                <label className="font-montserratRegular mb-2">{t('password')}*</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder={t('your_password')}
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
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

            </div>


            <Button
                isFilled={true}
                className="w-full bg-perfect-yellow text-almost-black py-3 rounded-full mb-5 hover:bg-perfect-yellow transition"
                onClick={handleSubmit}
            >
                {t('continueUPPER')}
            </Button>

            <div className="flex items-center justify-center w-full mb-5 text-gray-500">
                <span className="mx-4">{t('or_sign_up_via')}</span>
            </div>

            <div className="flex w-full justify-between mb-7">
                <GoogleLoginButton/>
                <TwitterLoginButton/>
            </div>

            <div className="flex w-full justify-center">
                <p className="sm:text-xs-ps xl:text-relative-ps sm:ml-0 xl:ml-0 font-montserratRegular">
                    {t('already_have_an_account')} <a href="/login" className="text-almost-black font-bold underline">{t('log_in')}</a>
                </p>
            </div>
        </div>
    );
};

export default CompleteMainInfo;
