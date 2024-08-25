import React, { useEffect, useRef, useState } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { User } from "../interfaces/User.tsx";
import { registerUser, sendEmailConfirmation } from "../api/api.ts";
import { prepareUserDataForBackend } from "../helpers/utils/userDataPreparation.ts";

interface EmailConfirmProps {
    userData: User;
    setUserData: (data: Partial<User>) => void;
}

const EmailConfirm: React.FC<EmailConfirmProps> = ({ userData }) => {
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const registrationDoneRef = useRef<boolean>(false); // Используем useRef для хранения состояния регистрации

    useEffect(() => {
        const handleRegister = async () => {
            if (!registrationDoneRef.current) {
                try {
                    const preparedData = prepareUserDataForBackend(userData);
                    console.log("Registering user with data:", preparedData);

                    const data = await registerUser(preparedData);
                    console.log("Registration successful:", data);

                    await sendEmailConfirmation(userData.email);
                    console.log("Email confirmation sent successfully");
                    setEmailSent(true);
                    registrationDoneRef.current = true;
                } catch (error) {
                    console.error("Registration or email confirmation failed:", error);
                }
            }
        };

        handleRegister();
    }, [userData]);

    const handleResend = async () => {
        try {
            await sendEmailConfirmation(userData.email);
            console.log("Success resending email confirmation.");
            setEmailSent(true);
        } catch (error) {
            console.error("Error resending email confirmation:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 w-full">
            <h2 className="text-relative-h3 uppercase font-kharkiv mb-8 text-center">
                Ми надіслали вам електронний лист для підтвердження
            </h2>
            <h3 className="text-h5 whitespace-pre-line font-montserratRegular mb-8 text-center">
                Будь ласка, перевірте свою пошту та перейдіть за посиланням у листі, щоб завершити реєстрацію.
            </h3>
            <Button
                className="w-full bg-perfect-yellow text-almost-black py-4 rounded-full mb-8 text-relative-pxl"
                onClick={handleResend}
                disabled={emailSent}
            >
                НАДІСЛАТИ ЛИСТ ЩЕ РАЗ
            </Button>
        </div>
    );
};

export default EmailConfirm;
