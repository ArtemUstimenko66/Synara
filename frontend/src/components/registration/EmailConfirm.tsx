import React from 'react';
type EmailConfirmMainInfoProps = {
    onNextStep: () => void;
};
const EmailConfirm: React.FC<EmailConfirmMainInfoProps> = ({ onNextStep }) =>{
    return (
        <div className="flex flex-col items-start pr-8 pb-8 w-full">
            <h2 className="text-relative-h4 font-kharkiv mb-4">Ми надіслали вам електронний лист для підтвердження</h2>

            <h3 className="text-h5 font-kharkiv mb-4">Будь ласка, перевірте свою пошту та перейдіть за посиланням у листі, щоб завершити реєстрацію.</h3>
            <button
                className="w-full bg-perfect-yellow text-almost-black py-4 rounded-full mb-6 hover:bg-perfect-yellow transition"
                onClick={onNextStep}
            >
                НАДІСЛАТИ ЛИСТ ЩЕ РАЗ
            </button>
        </div>
    );
};

export default EmailConfirm;
