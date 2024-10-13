import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";

import GoogleLoginButton from "../../registration/components/ui/GoogleLoginButton.tsx";
import { Button } from "../../../ui/Button";
import { Eye, EyeOff } from 'react-feather';
import TwitterLoginButton from "../../registration/components/ui/TwitterLoginButton.tsx";
import VectorWhite from '../../../assets/images/VectorWhite.svg?react';
import Cookies from 'js-cookie';
import {login} from "../api/loginService.ts";
import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../../hooks/AuthContext.tsx";

const LoginMain: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({
        terms: false,
    });
    const [errors, setErrors] = useState<{ email: string; password: string }>({ email: '', password: '' });
    const [generalError, setGeneralError] = useState<string>('');

    const navigate = useNavigate();
    const { loginContext } = useAuthContext();
    useEffect(() => {
        const savedEmail = Cookies.get('email');
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const validate = () => {
        let valid = true;
        let errors = { email: '', password: '' };

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.email = t('incorrect_format_email');
            valid = false;
        }

        if (password.length < 6) {
            errors.password = t('password_must_be_longer_than_6');
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleLogin = async () => {
        console.log('handleLogin')
        if (validate()) {
            try {
                await login(email, password);
                //const { accessToken } = response;
                await loginContext();
                if (selectedOptions.terms) {
                    Cookies.set('email', email, { expires: 7 });
                } else {
                    Cookies.remove('email');
                }

                navigate('/main');
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    console.error('401 : Неправильний email або пароль.');
                    setGeneralError(t('incorrect_email_password'));
                } else {
                    console.error('Login failed', error);
                }
            }
        }
    };

    const toggleOption = (option: string) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [option]: !prevState[option],
        }));
    };

    const { t } = useTranslation();

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full space-x-4 mb-4 xl:mt-10 sm:mt-2">
                <div className="w-full xl:mb-4 mb-2">
                    <label className="font-montserratRegular xl:mb-2 mb-0">{t('email')}</label>
                    <input
                        type="email"
                        name="email"
                        placeholder={t('email_address')}
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
            </div>
            <div className="w-full mb-6 relative">
                <label className="font-montserratRegular mb-2">{t('password')}</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder={t('your_password')}
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue xl:pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute top-1/2 xl:right-3 sm:right-1 transform -translate-y-1/2 text-gray-400"
                    style={{ marginTop: '0.8rem', marginRight: '1rem' }}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between w-full mb-6">
                <div className="w-1/2 xl:mb-4">
                    <label className="font-montserratRegular">
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedOptions.terms}
                            onChange={() => toggleOption('terms')}
                        />
                        <span
                            className={`w-5 h-5 mr-2 inline-block rounded-full border-2 relative ${
                                selectedOptions.terms ? 'bg-blue-500 border-blue-500' : 'border-light-blue'
                            }`}
                        >
                            {selectedOptions.terms && (
                                <span
                                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                                    <VectorWhite />
                                </span>
                            )}
                        </span>
                        {t('remember_me')}
                    </label>
                </div>
                <Link to="/reset-password"
                      className="text-almost-black text-sm sm:sm:items-center font-montserratRegular font-bold underline">{t('forgot_password')}</Link>
            </div>
            {generalError && <p className="text-red-500 text-center mb-5">{generalError}</p>}
            <Button
                isFilled={true}
                className="w-full bg-perfect-yellow text-almost-black py-3 rounded-full mb-5 xl:mt-0 sm:mt-5 hover:bg-perfect-yellow transition"
                onClick={handleLogin}
            >
                {t('log_inUPPER')}
            </Button>

            <div className="flex items-center justify-center w-full xl:mb-10 sm:mb-5 xl:mt-5 sm:mt-1 text-gray-500">
                <span className="mx-4">{t('or_log_in_via')}</span>
            </div>

            <div className="flex w-full justify-between mb-5">
                <GoogleLoginButton />
                <TwitterLoginButton />
            </div>

            <div className="flex w-full justify-center xl:mt-6 sm:mt-1">
                <p className="text-sm font-montserratRegular">{t('do_not_have_an_account_yet')} <Link to="/registration"
                                                                                                      className="text-almost-black font-bold underline">{t('to_register')}</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginMain;
