import React, { useState } from 'react';
import { Button } from "../../../ui/Button.tsx";
import ModalInfo from "./ModalInfo.tsx";
import {getHelpToKey, getHelpTypeInUkrainian} from "../../../data/helpTypesMap.ts";
import {useTranslation} from "react-i18next";

interface AnnouncementProps {
    userName: string;
    avatar: string;
    datePosted: Date;
    description: string;
    typeHelp: string;
    viewsCount: number;
    respondedCount: number;
    urgency: string;
    isUkraine: boolean;
    address: string;
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
                                                       urgency,
                                                       images
                                                   }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formattedDate = typeof datePosted === 'string' ? new Date(datePosted) : datePosted;

    const currentDate = new Date();
    const postedDate = new Date(datePosted);
    const diffTime = postedDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const {t} = useTranslation();

    const isDateInFuture = diffTime > 0;  // !!! TODO: what to do when announcement expires?

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
                    <h4 className="text-relative-h5 xl:text-h5 font-montserratMedium">{userName}</h4>
                    <span className="text-relative-h5 font-montserratMedium">
                        {formattedDate.toLocaleDateString('uk-UA')}
                    </span>
                </div>
            </div>

            {/* Category Badge */}
            <div className="flex justify-end w-full items-end">
                {/* Показываем блок только если дата в будущем и если срочность истинна */}
                {isDateInFuture && urgency && diffDays <= 5 && (
                    <div
                        className="text-blue-500 font-montserratMedium px-[10%] font-medium border-2 border-dark-blue rounded-full text-relative-h5 mr-4">
                        {diffDays} {diffDays === 1 ? t('day_announcement') : diffDays <= 4 ? t('day_announcement_v_2') : t('day_announcement_v_3')}
                    </div>
                )}
                <span
                    className="bg-blue-500 w-7/12 text-white text-relative-h5 px-4 pr-5 pl-10 py-1 font-montserratRegular font-normal tracking-wide rounded-l-full">
                     {t(getHelpToKey(typeHelp))}
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
                    {t('more_details')}
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
