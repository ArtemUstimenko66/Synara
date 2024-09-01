import React from 'react';
import {Button} from "../../../ui/Button.tsx";
import HeartImg from '../../../assets/images/heart-svgrepo-com.svg?react';

const Announcement: React.FC = () => {
    return (
        <div className="h-[25vh] mx-auto bg-baby-blue rounded-lg flex justify-between items-start">
            {/* Left Side - User Info and Description */}
            <div className="flex p-4">
                {/* User Avatar */}
                <img
                    src="https://randomuser.me/api/portraits/women/2.jpg" // Replace with the path to your avatar image
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full object-cover"
                />
                {/* User Info and Description */}
                <div className="ml-4">
                    {/* Name */}
                    <h4 className="text-relative-h4 font-semibold">Ім'я Прізвище</h4>
                    {/* Date */}
                    <span className="text-relative-h5  text-gray-500 block">27.08.2024</span>
                    {/* Description */}
                    <p className="text-relative-p text-gray-600 mt-2 w-11/12">
                        Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.
                    </p>
                </div>
            </div>

            {/* Right Side - Tags and Actions */}
            <div className="flex flex-col justify-between py-4 items-end h-full">
                {/* Category Badge */}
                <span className="bg-blue-500 text-white px-4 py-1 rounded-l-full pl-10 pr-20 text-relative-p mb-3">Психологічна</span>
                {/* Action Buttons in One Row */}
                <div className="flex items-center p-4 ">
                    {/* Respond Button */}
                    <Button isFilled={true} className="uppercase px-4 py-1 mr-2 rounded-full text-relative-p mr-8">Відгукнутись</Button>
                    {/* Like Icon */}
                    <HeartImg  className="w-8 h-8"/>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
