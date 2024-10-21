import {Link, useNavigate} from 'react-router-dom';
import BackArrowComponent from "../../modules/registration/components/ui/BackArrow.tsx";
import  { useState } from "react";
import { Button } from "../../ui/Button.tsx";
import {resetPassword} from "../../modules/reset-password/api/resetPasswordService.ts";
import LogoSynara from '../../assets/images/logoRegistration.svg?react';
import {useTranslation} from "react-i18next";
const NewPasswordPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Для отображения успешного сообщения

    const handleBackArrowClick = () => {
        navigate('/login');
    };
    const {t} = useTranslation();

    const handleSubmit = async () => {
        if (!password || !confirmPassword) {
            setError(t('the_field_cannot_be_empty'));
            return;
        }

        if (password !== confirmPassword) {
            setError(t('password_are_not_equal'));
            return;
        }

        if (password.length < 6) {
            setError(t('password_need_be_longer_6'));
            return;
        }

        setError(null);

        try {
            const email = localStorage.getItem('userEmail');
            if (!email) {
                setError(t('invalid_email_repeat'));
                return;
            }

            const response = await resetPassword(email, password);
            setSuccessMessage(response);
            console.log(response);
            localStorage.removeItem('userEmail');
            navigate('/login');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-dark-blue min-h-screen h-screen flex ">
            <div className="w-2/6 p-8 xl:flex md:hidden sm:hidden items-left justify-left mt-10 ml-28">
                <Link to="/home">
                    <LogoSynara
                        className="text-almost-white font-montserratRegular font-bold text-relative-h4"></LogoSynara>
                </Link>
            </div>

            <div
                className="xl:w-5/6 md:w-full sm:w-full bg-almost-white min-h-screen xl:rounded-l-3xl h-full xl:px-relative-md flex flex-col xl:items-start xl:justify-start sm:items-center sm:justify-center">


                <div className="flex w-11/12 xl:hidden">
                    <div className="xl:mt-[20%]">
                        <BackArrowComponent onClick={handleBackArrowClick}/>
                    </div>
                    <div className="flex w-full justify-center ">
                        <LogoSynara className="xl:hidden md:flex sm:flex mt-relative-sm sm:w-24 sm:h-24"/>
                    </div>
                </div>
                <div className="flex h-full">
                    <div className="xl:flex sm:hidden">
                        <BackArrowComponent onClick={handleBackArrowClick}/>
                    </div>

                    <div className="max-w-2xl xl:ml-24 sm:mx-5 xl:mx-0 xl:mt-7 sm:mt-2 max-h-screen flex flex-col justify-start flex-grow">

                        <h1 className="uppercase font-kharkiv xl:text-relative-h2 sm:text-relative-xlh1 mb-relative-ssm mt-relative-ssm">
                            {t('creating_new_password')}
                        </h1>
                        <h2 className="font-kharkiv xl:text-relative-h3 sm:text-relative-xlh2 mb-relative-ssm mt-relative-ssm">
                            {t('fill_field')}
                        </h2>

                        <div className="flex flex-col w-full">
                            {/* Поле ввода пароля */}
                            <div className="w-full mb-6 relative">
                                <label className="font-montserratRegular mb-2">{t('password')}</label>
                                <input
                                    type={'text'}
                                    name="password"
                                    placeholder={t('create_new_password')}
                                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Поле подтверждения пароля */}
                            <div className="w-full mb-2 relative">
                                <label className="font-montserratRegular mb-2">{t('confirming_password')}</label>
                                <input
                                    type={'text'}
                                    name="confirmPassword"
                                    placeholder={t('repeat_new_password')}
                                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue pr-10"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            {/* Сообщение об ошибке */}
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            {/* Сообщение об успехе */}
                            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                            <Button
                                className="w-full bg-perfect-yellow text-almost-black py-3 rounded-full mt-6 hover:bg-perfect-yellow transition"
                                onClick={handleSubmit}
                            >
                                {t('continueUPPER')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPasswordPage;
