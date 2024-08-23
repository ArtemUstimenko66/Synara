import React from 'react';
import { Button } from "../../ui/Button.tsx";

type EmailConfirmMainInfoProps = {
    onNextStep: () => void;
};

const EmailConfirm: React.FC<EmailConfirmMainInfoProps> = ({ onNextStep }) => {
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
                onClick={onNextStep}
            >
                НАДІСЛАТИ ЛИСТ ЩЕ РАЗ
            </Button>
            <Button
                hasBlue={true}
                className="w-full text-relative-pxl py-4 rounded-full"
                onClick={onNextStep}
            >
                ПРОЙТИ ДВОФАКТОРНУ АУТЕНТИФІКАЦІЮ
            </Button>
        </div>
    );
};

export default EmailConfirm;
