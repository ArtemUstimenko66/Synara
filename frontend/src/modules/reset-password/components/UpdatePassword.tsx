import React, { useState } from 'react';
import { Button } from "../../../ui/Button.tsx";
import {sendResetEmail} from "../api/resetPasswordService.ts";
import {useTranslation} from "react-i18next";


type UpdatePasswordInfoProps = {
    onNextStep: (data: { email: string }) => void;
};
const UpdatePassword: React.FC<UpdatePasswordInfoProps> = ({ onNextStep }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        setError(null);
        setSuccessMessage(null);

        try {
            const message = await sendResetEmail(email);
            setSuccessMessage(message);
            localStorage.setItem('userEmail', email);
            onNextStep({ email });
        } catch (error: any) {
            console.error('Error in request to change password:', error);
            setError(error.message);
        }
    };

    const {t} = useTranslation();

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full space-x-4 mb-4">
                <div className="w-full mb-4">
                    <h1 className="uppercase font-kharkiv xl:text-relative-h2 sm:text-relative-xlh1 mb-relative-ssm mt-relative-ssm">{t('password_recovery')}</h1>
                    <h2 className="font-kharkiv xl:text-relative-h3 sm:text-relative-h1 mb-relative-ssm mt-relative-ssm">{t('fill_field')}</h2>
                    <label className="font-montserratRegular mb-2">{t('email')}</label>
                    <input
                        type="email"
                        name="email"
                        placeholder={t('email_address')}
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </div>
            </div>
            <Button
                isFilled={true}
                onClick={handleSubmit}
                className="w-full uppercase bg-perfect-yellow text-almost-black py-3 rounded-full mb-5 hover:bg-perfect-yellow transition"
            >
                {t('continue')}
            </Button>
        </div>
    );
};

export default UpdatePassword;
