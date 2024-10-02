import ReviewProfile from "./ui/ReviewProfile.tsx";

interface Review {
	avatar: string;
	comment: string;
	name: string;
	date: string;
}


interface ReviewsProps {
	reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
	return (
		<>
			<h1 className="text-h2 font-kharkiv">Відгуки</h1>
			<div className="flex items-center mb-6">
				<span className="text-yellow-500 text-h2 mb-2 mr-2">★</span>
				<span className="text-2xl font-montserratMedium font-bold">4.7</span>
				<div className="h-8 border-l-2 border-gray-300 mx-4"></div>
				<span className="font-montserratRegular text-pxll font-semibold">35 Відгуків</span>
			</div>
			<div className="grid grid-cols-3 gap-6 mt-12">
				{reviews.map((review) => (
					<ReviewProfile
						key={review.name}
						avatar={review.avatar}
						comment={review.comment}
						name={review.name}
						date={review.date}
					/>
				))}
			</div>
			<div className="text-center mt-8">
				<button className="bg-perfect-yellow text-almost-black py-2 px-6 font-montserratRegular text-xs-pxl rounded-3xl hover:bg-orange-400 transition duration-300">
					Показати ще
				</button>
			</div>
		</>
	);
};

export default Reviews;
