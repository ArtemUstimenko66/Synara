import React from 'react';
import {Button} from "../../../ui/Button.tsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark background */}
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            {/* Modal content */}
            <div className="bg-white rounded-3xl justify-center border-2 border-dark-blue p-8 shadow-lg z-60 relative w-[30%] h-[27%]">
                <h2 className="text-relative-h4 font-kharkiv mb-4 text-center">Вихід з акаунту</h2>
                <p className="w-[70%] mx-auto text-center text-relative-p font-montserratRegular mb-6">Ви впевнені, що хочете вийти зі свого акаунту?</p>
                <div className="flex justify-center space-x-4">
                    <Button hasBlue={true} className="bg-dark-blue uppercase text-white py-2 px-4 w-1/5" onClick={onConfirm}>Так</Button>
                    <Button hasBlue={true} className="border uppercase text-blue-500 py-2 px-4 w-1/5" onClick={onClose}>Ні</Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
