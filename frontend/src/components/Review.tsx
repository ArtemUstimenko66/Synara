import React from 'react';
import AvatarComent from '../assets/images/AvatarComent.svg?react';

interface ReviewProps {
    comment: string;
    name: string;
    date: string;
}

const Review: React.FC<ReviewProps> = ({ comment, name, date }) => {
    return (
        <div className="relative p-12 max-h-64 rounded-lg border border-gray-200 bg-white">
            <div className="absolute -top-2 left-6 transform -translate-y-1/2">
                <AvatarComent className="w-20 h-20 rounded-full" />
            </div>
            <p className="mt-4 font-montserratRegular text-sm mb-4">{comment}</p>
            <div className="text-perfect-yellow mb-4">
                <span>⭐⭐⭐⭐⭐</span>
            </div>
            <div className="flex justify-between w-full">
                <p className="font-montserratMedium text-sm">{name}</p>
                <p className="font-montserratRegular text-sm text-gray-500">{date}</p>
            </div>
        </div>
    );
};

export default Review;
