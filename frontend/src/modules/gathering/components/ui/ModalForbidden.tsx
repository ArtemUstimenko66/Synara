import React from 'react';
import { Button } from '../../../../ui/Button.tsx';
import { Link } from 'react-router-dom';
import CloseIconModal from '../../assets/CloseIconModal.svg?react';
import {useTranslation} from "react-i18next";

interface ModalProps {
    onClose: () => void;
}

const ModalForbidden: React.FC<ModalProps> = ({ onClose }) => {
    const {t} = useTranslation();
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark background */}
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            {/* Modal content */}
            <div className="relative bg-white rounded-3xl border-2 border-dark-blue p-8 shadow-lg z-60 xl:w-[30%] md:w-[70%] sm:w-[95%] h-auto">
                {/* Close button */}
                <CloseIconModal
                    className="absolute top-4 right-4 h-5 w-5 cursor-pointer"
                    onClick={onClose}
                />

                <h2 className="xl:text-relative-h4 md:text-relative-h2 sm:text-relative-h1 font-kharkiv mb-4 text-center">
                    {t(`sorry_cant_create_gathering`)}
                </h2>
                <p className="w-[70%] mx-auto text-center text-relative-p font-montserratRegular mb-6">
                    {t(`sorry_cant_create_gathering`)}
                </p>
                <p className="w-[70%] mx-auto text-center text-relative-p font-montserratRegular mb-6">
                    1. {t(`over_18`)}
                </p>
                <p className="w-[70%] mx-auto text-center text-relative-p font-montserratRegular mb-6">
                    2. {t(`write_itn`)}
                </p>
                <div className="flex justify-center">
                    <Link to="/profile">
                        <Button hasBlue={true} className="uppercase py-2 px-4 w-auto">
                            {t(`go_to_account`)}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ModalForbidden;
