import React, { useEffect, useRef, useState } from 'react';
import { Button } from "../../../ui/Button";
import { User } from "../interfaces/User";
import { registerUser, sendEmailConfirmation } from "../api/api";
import { prepareUserDataForBackend } from "../helpers/utils/userDataPreparation";

interface EmailConfirmProps {
    userData: User;
    onNextStep: () => void;
    setUserData: (data: Partial<User>) => void;
}

const EmailConfirm: React.FC<EmailConfirmProps> = ({ userData, onNextStep }) => {
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const registrationDoneRef = useRef<boolean>(false);
    const effectExecuted = useRef<boolean>(false); // Дополнительный флаг для отслеживания выполнения эффекта

    useEffect(() => {

        if (!effectExecuted.current && userData.email) {
            effectExecuted.current = true;

            const handleRegister = async () => {
                if (!registrationDoneRef.current) {
                    try {
                        const preparedData = prepareUserDataForBackend(userData);
                        console.log("Registering user with data:", preparedData);

                        const data = await registerUser(preparedData);
                        console.log("Registration successful:", data);

                        console.log("Email confirmation sent successfully");
                        registrationDoneRef.current = true;
                    } catch (error) {
                        console.error("Registration or email confirmation failed:", error);
                    }
                }
            };

            handleRegister();
        }
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
            <Button
                hasBlue={true}
                className="w-full text-almost-black py-4 rounded-full mb-8 text-relative-pxl"
                onClick={onNextStep}
                disabled={emailSent}
            >
                ПРОЙТИ ДВОФАКТОРНУ АУТЕНТИФІКАЦІЮ
            </Button>
        </div>
    );
};

export default EmailConfirm;
