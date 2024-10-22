import ReviewProfile from "./ui/ReviewProfile.tsx";
import React from "react";
import MiniStar from "../assets/MiniStar.svg?react";
import {useTranslation} from "react-i18next";

interface Review {
	id: number;
	rating: number;
	avatar: string;
	description: string;
	dateCreated: string;
	author: {
		id: number;
		firstName: string;
		lastName: string;
		password: string;
		email: string;
		phoneNumber: string;
		birthDate: string;
		age: number;
		role: string;
		gender: string;
		UNP: string;
		avatarUrl: string;
		isPhoneVerified: boolean;
		isConfirmedEmail: boolean;
	}
}


interface ReviewsProps {
	reviews: Review[];
	rating: string;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, rating }) => {
	const {t} = useTranslation();

	return (
		<>
			<h1 className="text-h2 font-kharkiv">{t('responds')}</h1>
			<div className="flex items-center mb-[6vh]">
				<MiniStar className="w-6 h-6"></MiniStar>
				<span className="text-2xl font-montserratMedium font-bold ml-[1vw]">{rating}</span>
				<div className="h-8 border-l-2 border-gray-300 mx-4"></div>
				<span className="font-montserratRegular text-pxll font-semibold">{reviews.length} {t('reviews')}</span>
			</div>
			<div className="grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6 mt-12">
				{reviews.map((review) => (
					<ReviewProfile
						key={review.id}
						avatar={review.author.avatarUrl}
						rating={review.rating}
						comment={review.description}
						name={`${review.author.firstName} ${review.author.lastName}`}
						date={review.dateCreated}
					/>
				))}
			</div>
		</>
	);
};

export default Reviews;
