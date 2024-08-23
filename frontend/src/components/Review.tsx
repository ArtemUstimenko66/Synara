import AvatarComent from '../assets/images/AvatarComent.png';
import ReactStars from "react-rating-stars-component";
import React from "react";

interface ReviewProps {
    comment: string;
    name: string;
    date: string;
}

const ratingChanged = (newRating: number) => {
    console.log(newRating);
};

const Review: React.FC<ReviewProps> = ({ comment, name, date }) => {
    return (
        <div className="relative p-12 rounded-lg border border-gray-200 bg-white max-w-5xl max-h-64 md:max-w-none md:max-h-none">
            <div className="absolute -top-2 left-6 transform -translate-y-1/2">
                <img src={AvatarComent} alt="Avatar" className="w-20 h-20 mt-12 rounded-full" />
            </div>
            <p className="mt-4 font-montserratRegular  sm:text-xs xl:text-xs-ps  md:text-xs-ps text-sm mb-4 select-none">{comment}</p>
            <div className="text-perfect-yellow mb-4 select-none">
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
            </div>
            <div className="flex justify-between w-full">
                <p className="font-montserratMedium text-sm select-none">{name}</p>
                <p className="font-montserratRegular text-sm text-gray-500 select-none">{date}</p>
            </div>
        </div>
    );
};

export default Review;
