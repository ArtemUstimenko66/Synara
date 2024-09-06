import React, { useState } from 'react';
import { Button } from "../../../ui/Button.tsx";
import ModalInfo from "./ModalInfo.tsx";
import HeartImg from '../../../assets/images/heart-svgrepo-com.svg?react';

interface AnnouncementProps {
    userName: string;
    avatar: string;
    datePosted: Date;
    description: string;
    typeHelp: string;
    viewsCount: number;
    respondedCount: number;
    images: string[];
}

const Announcement: React.FC<AnnouncementProps> = ({
                                                       userName,
                                                       avatar,
                                                       datePosted,
                                                       description,
                                                       typeHelp,
                                                       viewsCount,
                                                       respondedCount,
                                                       images
                                                   }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const helpTypesMap: { [key: string]: string } = {
        humanitarian: 'Гуманітарна',
        informational: 'Інформаційна',
        psychological: 'Психологічна',
        material: 'Матеріальна',
    };

    return (
        <div className="bg-perfect-gray rounded-3xl flex flex-col h-full">
            {/* User Info Section */}
            <div className="flex items-center p-4 mb-2 mt-4 ml-4">
                {/* User Avatar */}
                <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full object-cover mr-3"
                />
                {/* User and Date */}
                <div>
                    <h4 className="text-relative-pl font-montserratMedium">{userName}</h4>
                    <span className="text-relative-h5 font-montserratMedium">
                        {datePosted.toLocaleDateString('uk-UA')}
                    </span>
                </div>
            </div>

            {/* Category Badge */}
            <div className="flex justify-end w-full items-end ">
                <span className="bg-blue-500 w-3/6 text-white px-4 pr-5 pl-10 py-1 font-montserratRegular font-normal tracking-wide rounded-l-full">
                    {helpTypesMap[typeHelp] || typeHelp} {/* Преобразование типа помощи */}
                </span>
            </div>

            {/* Description Section */}
            <p className="text-relative-p mb-4 font-montserratMedium p-4 ml-4">
                {description}
            </p>

            {/* Action Button Section */}
            <div className="flex justify-center items-center font-montserratMedium ml-4 mb-4 p-4">
                <Button
                    isFilled={true}
                    onClick={() => setIsModalOpen(true)}
                    className="uppercase px-4 py-2 rounded-full text-relative-p bg-perfect-yellow"
                >
                    Детальніше
                </Button>
            </div>

            {isModalOpen && (
                <ModalInfo
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    announcement={{
                        userName,
                        avatar,
                        description,
                        typeHelp: helpTypesMap[typeHelp] || typeHelp,
                        viewsCount,
                        respondedCount,
                        images
                    }}
                />
            )}
        </div>
    );
};

export default Announcement;
