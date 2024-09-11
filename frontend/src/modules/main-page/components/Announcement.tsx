import React, { useState } from 'react';
import { Button } from "../../../ui/Button.tsx";
import ModalInfo from "./ModalInfo.tsx";
import {getHelpTypeInUkrainian} from "../../../data/helpTypesMap.ts";

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
    const formattedDate = typeof datePosted === 'string' ? new Date(datePosted) : datePosted;

    const currentDate = new Date();
    const postedDate = new Date(datePosted);
    const diffTime = Math.abs(postedDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    return (
        <div className="bg-perfect-gray w-full rounded-3xl flex flex-col h-full">

            {/* User Info Section */}
            <div className="flex items-center p-4 mb-2 mt-4 ml-4">
                {/* Avatar */}
                <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full object-cover mr-3"
                />
                {/* User and Date */}
                <div>
                    <h4 className="text-relative-pl font-montserratMedium">{userName}</h4>
                    <span className="text-relative-h5 font-montserratMedium">
                        {formattedDate.toLocaleDateString('uk-UA')}
                    </span>
                </div>
            </div>

            {/* Category Badge */}
            <div className="flex justify-end w-full items-end ">
                {diffDays <= 5 && (
                    <div className="text-blue-500 font-montserratMedium px-6 font-medium border-2 border-dark-blue rounded-full text-relative-ps  mr-4">
                        {diffDays} {diffDays === 1 ? 'день' : diffDays <= 4 ? 'дні' : 'днів'}
                    </div>
                )}
                <span
                    className="bg-blue-500 w-3/6 text-white px-4 pr-5 pl-10 py-1 font-montserratRegular font-normal tracking-wide rounded-l-full">
                    {getHelpTypeInUkrainian(typeHelp)}
                </span>
            </div>

            {/* Description Section */}
            <p className="text-relative-p mb-4 font-montserratMedium p-4 ml-4">
                {description}
            </p>

            {/* Details Button */}
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
                        typeHelp: getHelpTypeInUkrainian(typeHelp),
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