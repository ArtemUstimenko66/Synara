import React from 'react';
import { Button } from "../../../ui/Button.tsx";

interface ModalInfoProps {
    isOpen: boolean;
    onClose: () => void;
    announcement: {
        userName: string;
        avatar: string;
        description: string;
        typeHelp: string;
        viewsCount: number;
        respondedCount: number;
        images: string[];
    };
}

const ModalInfo: React.FC<ModalInfoProps> = ({ isOpen, onClose, announcement }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark background */}
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            {/* Modal window */}
            <div className="bg-white rounded-3xl border-2 border-dark-blue p-8 shadow-lg z-60 relative w-[85%] h-[85%]">
                <div className="flex flex-col items-center justify-center">
                    {/* Avatar */}
                    <img
                        src={announcement.avatar}
                        alt={`Аватар ${announcement.userName}`}
                        className="rounded-full w-32 h-32 mb-4"
                    />

                    {/* Name */}
                    <h2 className="text-relative-h4 font-kharkiv mb-4 text-center">{announcement.userName}</h2>

                    <div className="flex flex-row w-full h-full">
                        {/* Description */}
                        <div className="w-[50%] text-left pr-8 ml-24">
                            <p className="text-relative-p font-montserratRegular mb-6">
                                {announcement.description}
                            </p>
                            <p className="font-montserratRegular font-semibold text-relative-p mb-6">
                                Тип допомоги: {announcement.typeHelp}
                            </p>
                            <p className="text-relative-p mb-6 font-semibold font-montserratRegular">
                                Кількість переглядів: {announcement.viewsCount}
                            </p>
                            <p className="text-relative-p font-semibold font-montserratRegular">
                                Кількість відгукнувшихся: {announcement.respondedCount}
                            </p>
                        </div>

                        {/* Vertical dash */}
                        <div className="border-l-2 border-gray-300 mx-4"></div>

                        {/* Images */}
                        <div className="w-[40%] h-64 flex items-center justify-center">
                            <div className="w-[50%] flex flex-col items-center">
                                {announcement.images.map((imageUrl, index) => (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-auto mb-4"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center space-x-4 mt-6">
                        <Button hasBlue={true} className="bg-dark-blue uppercase text-white py-2 px-4 w-100px">
                            Відгукнутись
                        </Button>
                        <Button hasBlue={true} className="border uppercase text-blue-500 py-2 px-4 w-100px"
                                onClick={onClose}>
                            Зберегти
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalInfo;