import React from "react";
import ReactStars from "react-rating-stars-component";

interface ReviewProps {
	comment: string;
	name: string;
	date: string;
	avatar: string;
}

const ReviewProfile: React.FC<ReviewProps> = ({ comment, name, date, avatar }) => {

	return (
		<div className="mb-12 relative p-12 rounded-3xl bg-gray-100">
			<div className="absolute -top-2 left-6 transform -translate-y-1/2">
				<img src={avatar} alt={`${name} avatar`} className="w-20 h-20 rounded-full" />
			</div>
			<p className="mt-4 font-montserratRegular sm:text-xs xl:text-pd md:text-xs-ps text-sm mb-4 select-none">
				{comment}
			</p>
			<div className="text-perfect-yellow mb-4 select-none">
				<ReactStars
					count={5}
					value={4}
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
				<p className="font-montserratRegular select-none">{name}</p>
				<p className="font-montserratRegular text-sm select-none">{date}</p>
			</div>
		</div>
	);
};

export default ReviewProfile;
