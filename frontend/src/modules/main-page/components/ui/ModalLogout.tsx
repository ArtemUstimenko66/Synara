import React from 'react';
import {Button} from "../../../../ui/Button.tsx";
import {useTranslation} from "react-i18next";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const {t} = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark background */}
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            {/* Modal content */}
            <div className="bg-white rounded-3xl justify-center border-2 border-dark-blue p-8 shadow-lg z-60 relative w-[30%] h-[27%]">
                <h2 className="text-relative-h4 font-kharkiv mb-4 text-center">{t('logout')}</h2>
                <p className="w-[70%] mx-auto text-center text-relative-p font-montserratRegular mb-6">{t('are_you_sure_logout')}</p>
                <div className="flex justify-center space-x-4">
                    <Button hasBlue={true} className="bg-dark-blue uppercase text-white py-2 px-4 w-1/5" onClick={onConfirm}>{t('yes')}</Button>
                    <Button hasBlue={true} className="border uppercase text-blue-500 py-2 px-4 w-1/5" onClick={onClose}>{t('no')}</Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
