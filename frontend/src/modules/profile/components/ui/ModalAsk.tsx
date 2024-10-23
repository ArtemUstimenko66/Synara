import React from 'react';
import { Button } from "../../../../ui/Button.tsx";
import { useTranslation } from "react-i18next";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ModalAsk: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark background */}
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            {/* Modal content */}
            <div className="bg-white rounded-3xl justify-center border-2 border-dark-blue p-8 shadow-lg z-60 relative xl:w-[30%] md:w-[70%] sm:w-[95%] h-auto">
                <h2 className="xl:text-relative-h4 md:text-relative-h2 sm:text-relative-h1 font-kharkiv mb-4 text-center">{title}</h2>
                <p className="w-[70%] mx-auto text-center text-relative-p font-montserratRegular mb-6">{message}</p>
                <div className="flex justify-center space-x-4">
                    <Button hasBlue={true} className="bg-dark-blue uppercase text-white xl:py-2 sm:py-1 xl:px-4 sm:px-2 w-1/5" onClick={onConfirm}>{t('yes')}</Button>
                    <Button hasBlue={true} className="border uppercase text-blue-500 xl:py-2 sm:py-1 xl:px-4 sm:px-2 w-1/5" onClick={onClose}>{t('no')}</Button>
                </div>
            </div>
        </div>
    );
};

export default ModalAsk;
