import React from "react";
import Calendar from '../assets/Calendar.svg?react';
import HelpingHand from '../assets/Helping_Hand.svg?react';
import Clock from '../assets/Clock.svg?react';
import Star from '../assets/Star.svg?react';
import {Button} from "../../../ui/Button.tsx";
import {getHelpTypeInUkrainianEngToUkr} from "../../../data/helpTypesMap.ts";
import {getDayOfWeekInUkrainian} from "../../../data/dayOfWeekMap.ts";
import {useNavigate} from "react-router-dom";

const formatTime = (time: string): string => {
    return time.length <= 2 ? `${time}:00` : time;
};

type VolunteerCardProps = {
    key: number;
    id: number;
    name: string;
    rating: number;
    supports: string[];
    description: string;
    startWorkingDay: string;
    endWorkingDay: string;
    startTime: string;
    endTime: string;
    avatar: string;
};

const VolunteerCard: React.FC<VolunteerCardProps> = ({ id, name, rating, supports, description, startWorkingDay, endWorkingDay, startTime, endTime, avatar }) => {

    const navigate = useNavigate();
    const handleNavigateToProfile = ()=> {
        navigate(`/profile-volunteer/${id}`)
    }
    return (
        <div className="bg-perfect-gray w-full rounded-3xl flex flex-col h-full">
            <div className="flex items-center justify-between xl:px-10 sm:px-5 py-4 mb-2 mt-4">
                <div className="flex items-center">
                    {/* Аватар */}
                    <img
                        src={avatar}
                        alt="User Avatar"
                        className="xl:w-16 xl:h-16 sm:w-12 sm:h-12 rounded-full object-cover mr-3"
                    />
                    <h3 className="xl:text-pxl sm:text-relative-h4 font-montserratMedium">{name}</h3>
                </div>
                {/* Рейтинг */}
                <div className="flex items-center ">
                    <Star/>
                    <span className="ml-2 text-pl font-montserratMedium">{rating}</span>
                </div>
            </div>

            {/* Тип помощи */}
            <div className="flex justify-start items-center px-10 mb-4">
                <div className="flex items-center">
                    <HelpingHand className="h-8 w-8"/>
                    <p className="text-pl font-montserratMedium ml-2">
                        {supports ? supports
                            .map((typeSupport, index) => {
                                const translatedType = getHelpTypeInUkrainianEngToUkr(typeSupport);
                                return index === 0 ? translatedType : translatedType.toLowerCase();
                            })
                            .join(', ') : null}
                    </p>
                </div>
            </div>

            {/* Описание */}
            <div className="flex items-center justify-between mb-4 px-10">
                <p className="xl:text-pd md:text-relative-pxl font-light font-montserratMedium whitespace-pre-line">{description}</p>
            </div>

            {/* Дни и часы работы */}
            <div className="flex xl:text-pl sm: text-relative-pxl font-montserratMedium justify-center items-center font-medium mb-4">
                <div className="flex items-center mr-8">
                    <Calendar className="xl:h-8 xl:w-8 sm:h-7 sm:w-7"/>
                    <span className="xl:ml-5 sm:ml-2">
                      {getDayOfWeekInUkrainian(startWorkingDay)} - {getDayOfWeekInUkrainian(endWorkingDay)}
                    </span>
                </div>
                <div className="flex items-center">
                    <Clock className="xl:h-8 xl:w-8 sm:h-7 sm:w-7"/>
                    <span className="xl:ml-5 sm:ml-2">{formatTime(startTime)} - {formatTime(endTime)}</span>
                </div>
            </div>

            {/* Кнопка */}
            <div className="flex justify-center items-center font-montserratMedium ml-4 mb-4 p-4">
                <Button
                    isFilled={true}
                    className="uppercase px-4 py-2 rounded-full xl:text-relative-p sm:text-relative-pxl bg-perfect-yellow"
                    onClick={handleNavigateToProfile}
                >
                    ПЕРЕГЛЯНУТИ ПРОФІЛЬ
                </Button>
            </div>
        </div>
    );
};

export default VolunteerCard;
