import React from 'react';
import { Button } from "../../../ui/Button.tsx";
import HeartImg from '../../../assets/images/heart-svgrepo-com.svg?react';

const Announcement: React.FC = () => {
    return (
        <div className="w-1/3 bg-perfect-gray rounded-xl flex flex-col">
            {/* User Info Section */}
            <div className="flex items-center p-4 mb-2 mt-4 ml-4">
                {/* User Avatar */}
                <img
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full object-cover mr-3"
                />
                {/* User and Date */}
                <div>
                    <h4 className="text-relative-pl font-semibold text-montserratMedium">Ольга Коваленко</h4>
                    <span className="text-relative-h5 text-gray-500 text-montserratMedium">27.08.2024</span>
                </div>
            </div>

            {/* Category Badge */}
            <div className="flex justify-end w-full items-end ">
                <span className="bg-blue-500 w-3/6 text-white px-4 pr-5 py-1 text-montserratMedium rounded-l-full">Психологічна</span>
            </div>
            {/* Description Section */}
            <p className="text-relative-p mb-4 text-montserratMedium p-4 ml-4">
                Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...
            </p>

            {/* Action Button Section */}
            <div className="flex justify-center items-center text-montserratMedium ml-4 mb-4 p-4">
                <Button isFilled={true} className="uppercase px-4 py-2 rounded-full text-relative-p bg-perfect-yellow">Детальніше</Button>
            </div>
        </div>
    );
};

export default Announcement;
