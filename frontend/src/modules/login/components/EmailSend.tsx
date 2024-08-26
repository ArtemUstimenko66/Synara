import React, { useEffect } from 'react';
import { Button } from "../../../ui/Button";
import {sendEmailResetPassword} from "../api/api.ts";

type EmailSendProps = {
    onNextStep: () => void;
    email: string;
};

const EmailSend: React.FC<EmailSendProps> = ({ onNextStep, email }) => {
    useEffect(() => {
        const sendResetEmail = async () => {
            try {
                await sendEmailResetPassword(email);
                console.log('Email sent successfully');
            } catch (error) {
                console.error('Failed to send email:', error);
            }
        };

        sendResetEmail();
    }, [email]);

    const handleSubmit = () => {
        onNextStep();
    };

    return (
        <div className="flex flex-col w-full mt-24">
            <div className="flex w-full space-x-4 mb-4 mt-10">
                <div className="w-full mb-4">
                    <h1 className="uppercase text-center font-kharkiv text-relative-h3 mb-relative-ssm mt-relative-ssm">
                        Ми надіслали вам електронний лист для Відновлення пароля
                    </h1>
                    <h2 className="font-montserratRegular text-center text-relative-pl mb-relative-ssm mt-relative-ssm">
                        Ми надіслали лист на електронну адресу <b>{email}</b>
                    </h2>
                    <h2 className="font-montserratRegular text-center text-relative-pl mb-relative-ssm mt-relative-ssm">
                        Будь ласка, перевірте пошту та перейдіть за посиланням у листі, щоб оновити пароль
                    </h2>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <Button
                    isFilled={true}
                    onClick={handleSubmit}
                    className="uppercase bg-perfect-yellow w-1/2 text-almost-black py-3 rounded-full mb-5 hover:bg-perfect-yellow transition"
                >
                    Надіслати лист ще раз
                </Button>
            </div>
        </div>
    );
};

export default EmailSend;
