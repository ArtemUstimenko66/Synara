import React, { useEffect, useRef, useState } from 'react';
import { Button } from "../../../ui/Button.tsx";
import { User } from "../../registration/interfaces/User.tsx";
import {sendCodeToPhoneNumber, verifyCode} from "../api/phoneVerificationService.ts";

type UpdatePasswordInfoProps = {
    userData: User;
    setUserData: (data: Partial<User>) => void;
};

const UpdatePassword: React.FC<UpdatePasswordInfoProps> = ({ userData }) => {
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

    const handleVerifyCode = async () => {
        if (userData.phoneNumber && code) {
            try {
                const response = await verifyCode(userData.phoneNumber, code);
                if (response.success) {
                    setError(null);
                } else {
                    setError('Код неправильний. Будь ласка, спробуйте ще раз.');
                }
            } catch (error) {
                console.error("Error verify code: ", error);
                setError('Відбулася помилка під час перевірки коду. Будь ласка, спробуйте ще раз.');
            }
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full space-x-4 mb-4">
                <div className="w-full mb-4">
                    <h1 className="uppercase font-kharkiv text-relative-h2 mb-relative-ssm mt-relative-ssm">ДВОФАКТОРНА АУТЕНТИФІКАЦІЯ</h1>
                    <h2 className="font-kharkiv text-relative-h3 mb-relative-ssm mt-relative-ssm">Заповніть поле</h2>
                    <h3 className="text-relative-pl whitespace-pre-line font-montserratRegular mb-8 ">
                        Ми надіслали код підтвердження на номер телефону
                        <b> {userData.phoneNumber}</b>
                    </h3>
                    <label className="font-montserratRegular mb-2">Код</label>
                    <input
                        type="password"
                        name="code"
                        placeholder="*****"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>
            <Button
                isFilled={true}
                className="w-full uppercase py-3 rounded-full mb-5  "
                onClick={handleVerifyCode}
            >
                Перевірити код
            </Button>
            <div className="flex items-center justify-center w-full mb-5 text-almost-black">
                <span className="mx-4">Вам не прийшов код?</span>
            </div>
            <Button
                hasBlue={true}
                className="w-full uppercase py-3 rounded-full mb-5"
                onClick={handleResendCode}
            >
                Надіслати код ще раз
            </Button>
        </div>
    );
};

export default UpdatePassword;
