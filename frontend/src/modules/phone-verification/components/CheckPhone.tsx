import React, { useEffect, useRef, useState } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { User } from "../../registration/interfaces/User.tsx";
import {sendCodeToPhoneNumber, verifyCode} from "../api/phoneVerificationService.ts";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

type UpdatePasswordInfoProps = {
    userData: User;
    setUserData: (data: any) => void;
};

const CheckPhone: React.FC<UpdatePasswordInfoProps> = ({ userData }) => {
    const [code, setCode] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Состояние для ошибки
    const effectExecuted = useRef<boolean>(false); // Дополнительный флаг для отслеживания выполнения эффекта

    useEffect(() => {
        if (!effectExecuted.current && userData.phoneNumber) {
            effectExecuted.current = true;

            sendCodeToPhoneNumber(userData.phoneNumber);
        }
    }, [userData]);

    const handleResendCode = () => {
        setError(null);
        if (userData.phoneNumber) {
            sendCodeToPhoneNumber(userData.phoneNumber);
        }
    };

    const {t} = useTranslation();
    const navigate = useNavigate();
    const handleVerifyCode = async () => {
        if (userData.phoneNumber && code) {
            try {
                const response = await verifyCode(userData.phoneNumber, code);
                if (response.success) {
                    setError(null);
                    navigate("/home");
                } else {
                    setError(t('cod_invalid_try_again'));
                }
            } catch (error) {
                console.error("Error verify code: ", error);
                setError(t('error_with_checking_cod'));
            }
        }
    };

    return (
        <div className="flex flex-col w-11/12 justify-center">
            <div className="flex w-full space-x-4 mb-4 sm:mr-20 xl:mr-0">
                <div className="w-full mb-4">
                    <h1 className="uppercase font-kharkiv xl:text-relative-h2 sm:text-relative-xlh1 md:text-relative-h1 mb-relative-ssm xl:mt-relative-ssm">{t('two_factors_authUPPER')}</h1>
                    <h2 className="font-kharkiv xl:text-relative-h3 sm:text-relative-xlh2  md:text-relative-h3 mb-relative-ssm mt-relative-ssm">{t('fill_field')}</h2>
                    <h3 className="xl:text-relative-pl sm:text-relative-h2 md:text-relative-h3 whitespace-pre-line font-montserratRegular mb-8 ">
                        {t('cod_phone_sent')}
                        <b> {userData.phoneNumber}</b>
                    </h3>
                    <label className="font-montserratRegular xl:text-relative-pl md:text-relative-h3 sm:text-relative-h2 mb-2">{t('cod')}</label>
                    <input
                        type="password"
                        name="code"
                        placeholder="*****"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full p-3 xl:text-relative-pl md:text-relative-h3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>
            <Button
                isFilled={true}
                className="w-full xl:text-relative-pl sm:text-relative-h2 md:text-relative-h3 uppercase py-4 rounded-full mb-5  "
                onClick={handleVerifyCode}
            >
                Перевірити код
            </Button>
            <div className="flex items-center justify-center w-full mb-5 xl:text-relative-pl sm:text-relative-h2 md:text-relative-h3 text-almost-black">
                <span className="mx-4">{t('you_have_not_phone_cod')}</span>
            </div>
            <Button
                hasBlue={true}
                className="w-full uppercase xl:text-relative-pl sm:text-relative-h2 md:text-relative-h3 py-3 rounded-full mb-5"
                onClick={handleResendCode}
            >
                {t('resend_phone_cod')}
            </Button>
        </div>
    );
};

export default CheckPhone;
