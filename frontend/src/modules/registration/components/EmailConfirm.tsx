import React, { useEffect, useRef, useState } from 'react';
import { Button } from "../../../ui/Button";
import { User } from "../interfaces/User";
import {registerUser, sendEmailConfirmation, uploadDocument} from "../api/registerService.ts";
import { prepareUserDataForBackend } from "../helpers/utils/userDataPreparation";

interface EmailConfirmProps {
    userData: User;
    onNextStep: () => void;
    setUserData: (data: any) => void;
}

const EmailConfirm: React.FC<EmailConfirmProps> = ({ userData, onNextStep }) => {
    const [, setEmailSent] = useState<boolean>(false);
    const registrationDoneRef = useRef<boolean>(false);
    const effectExecuted = useRef<boolean>(false);

    useEffect(() => {
        if (!effectExecuted.current && userData.email) {
            effectExecuted.current = true;

            const handleRegister = async () => {
                if (!registrationDoneRef.current) {
                    try {
                        const preparedData = prepareUserDataForBackend(userData);
                        console.log("Registering user with data:", preparedData);

                        // @ts-ignore
                        const data = await registerUser(preparedData);
                        console.log("Registration successful:", data);

                        await sendEmailConfirmation(userData.email);
                        console.log("Email confirmation sent successfully");

                        if (userData.documents) {
                            for (const file of userData.documents) {
                                await uploadDocument(file);
                                console.log("Document uploaded successfully");
                            }
                        }

                        registrationDoneRef.current = true;
                    } catch (error) {
                        console.error("Registration, email confirmation, or document upload failed:", error);
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
        <div className="flex flex-col items-center justify-center p-8 w-full h-full">
            <h2 className="xl:text-relative-h3 sm:text-relative-h1 uppercase font-kharkiv mb-8 text-center">
                Ми надіслали вам електронний лист для підтвердження
            </h2>
            <h3 className="xl:text-h5 md:text-relative-h3 sm:text-relative-h2 whitespace-pre-line font-montserratRegular mb-8 text-center">
                Будь ласка, перевірте свою пошту та перейдіть за посиланням у листі, щоб завершити реєстрацію.
            </h3>
            <Button
                className="w-full bg-perfect-yellow text-almost-black py-4 rounded-full mb-8 xl:text-relative-pl md:text-relative-h3 sm:text-relative-h2"
                onClick={handleResend}
            >
                НАДІСЛАТИ ЛИСТ ЩЕ РАЗ
            </Button>
            <Button
                hasBlue={true}
                className="w-full text-almost-black py-4 rounded-full mb-8 xl:text-relative-pl md:text-relative-h3 sm:text-relative-h2"
                onClick={onNextStep}
            >
                ПРОЙТИ ДВОФАКТОРНУ АУТЕНТИФІКАЦІЮ
            </Button>
        </div>

    );
};

export default EmailConfirm;
