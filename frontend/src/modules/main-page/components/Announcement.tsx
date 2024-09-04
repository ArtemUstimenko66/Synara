import React from 'react';
import { Button } from "../../../ui/Button.tsx";
import HeartImg from '../../../assets/images/heart-svgrepo-com.svg?react';

interface AnnouncementProps {
    name: string;
    avatar: string;
    date: Date;
    text: string;
    type: string;
}

const Announcement: React.FC<AnnouncementProps> = ({ name, avatar, date, text, type }) => {
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
                    <h4 className="text-relative-pl font-montserratMedium">{name}</h4>
                    <span className="text-relative-h5 font-montserratMedium">
                        {date.toLocaleDateString('uk-UA')}
                    </span>
                </div>
            </div>

            {/* Category Badge */}
            <div className="flex justify-end w-full items-end ">
                <span className="bg-blue-500 w-3/6 text-white px-4 pr-5 pl-10 py-1 font-montserratRegular font-normal tracking-wide rounded-l-full">{type}</span>
            </div>

            {/* Description Section */}
            <p className="text-relative-p mb-4 font-montserratMedium p-4 ml-4">
                {text}
            </p>

            {/* Action Button Section */}
            <div className="flex justify-center items-center font-montserratMedium ml-4 mb-4 p-4">
                <Button isFilled={true} className="uppercase px-4 py-2 rounded-full text-relative-p bg-perfect-yellow">Детальніше</Button>
                {/* Like Icon */}
                {/*<HeartImg className="w-8 h-8 ml-2" />*/}
            </div>
        </div>
    );
};

export default Announcement;
