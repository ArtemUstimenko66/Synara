import React from 'react';
import AvatarComent from '../assets/images/AvatarComent.svg?react';

interface ReviewProps {
    comment: string;
    name: string;
    date: string;
}

const Review: React.FC<ReviewProps> = ({ comment, name, date }) => {
    return (
        <div className="flex flex-col items-center text-center px-8 py-4 shadow-lg rounded-lg">
            <AvatarComent className="w-20 h-20 rounded-full mb-4" />
            <p className="font-montserratRegular text-sm mb-4">{comment}</p>
            <div className="text-perfect-yellow mb-2">
                <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="font-montserratMedium text-sm">{name}</p>
            <p className="font-montserratRegular text-sm text-gray-500">{date}</p>
        </div>
    );
};

export default Review;
