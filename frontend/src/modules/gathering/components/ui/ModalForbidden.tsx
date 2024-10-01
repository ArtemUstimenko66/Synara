import React from 'react';
import { Button } from '../../../../ui/Button.tsx';
import { Link } from 'react-router-dom';
import CloseIconModal from '../../assets/CloseIconModal.svg?react';

interface ModalProps {
    onClose: () => void;
}

const ModalForbidden: React.FC<ModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark background */}
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            {/* Modal content */}
            <div className="relative bg-white rounded-3xl border-2 border-dark-blue p-8 shadow-lg z-60 w-[30%] h-auto">
                {/* Close button */}
                <CloseIconModal
                    className="absolute top-4 right-4 h-5 w-5 cursor-pointer"
                    onClick={onClose}
                />

                <h2 className="text-relative-h4 font-kharkiv mb-4 text-center">
                    На жаль, ви не можете створити збір.
                </h2>
                <p className="w-[70%] mx-auto text-center text-relative-p font-montserratRegular mb-6">
                    Щоб пробовжити:
                </p>
                <p className="w-[70%] mx-auto text-center text-relative-p font-montserratRegular mb-6">
                    1. Вам повинно бути більше 18 років.
                </p>
                <p className="w-[70%] mx-auto text-center text-relative-p font-montserratRegular mb-6">
                    2. Ви повинні вказати РНОКПП в акаунті.
                </p>
                <div className="flex justify-center">
                    <Link to="/profile">
                        <Button hasBlue={true} className="uppercase py-2 px-4 w-auto">
                            Перейти в акаунт
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ModalForbidden;
