import React from "react";
import ReactStars from "react-rating-stars-component";

interface ReviewProps {
    comment: string;
    name: string;
    date: string;
    rating: number;
    avatar: string;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const Review: React.FC<ReviewProps> = ({ comment, name, date, rating, avatar }) => {
    return (
        <div className="relative p-12 rounded-lg border border-gray-200 bg-white max-w-5xl max-h-72 md:max-w-none md:max-h-none">
            <div className="absolute -top-2 left-6 transform -translate-y-1/2">
                <img src={avatar} alt={`${name} avatar`} className="w-20 h-20 rounded-full" />
            </div>
            <p className="mt-4 font-montserratRegular sm:text-xs xl:text-xs-ps md:text-xs-ps text-sm mb-4 select-none">{comment}</p>
            <div className="text-perfect-yellow mb-4 select-none">
                <ReactStars
                    count={5}
                    value={rating}
                    size={24}
                    isHalf={true}
                    edit={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
            </div>
            <div className="flex justify-between w-full">
                <p className="font-montserratMedium text-sm select-none">{name}</p>
                <p className="font-montserratRegular text-sm text-gray-500 select-none">{formatDate(date)}</p>
            </div>
        </div>
    );
};

export default Review;
