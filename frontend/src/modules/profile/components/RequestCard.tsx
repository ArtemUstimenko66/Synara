
import {Button} from "../../../ui/Button.tsx";

const calculateDaysLeft = (days: number): number => {
	const today = new Date();
	// Устанавливаем конечную дату, прибавляя нужное количество дней
	const targetDate = new Date();
	targetDate.setDate(today.getDate() + days);

	// Вычисляем разницу в днях между текущей и конечной датой
	const diffTime = targetDate.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return diffDays;
};
interface RequestCardProps {
	status: string | undefined;
	days: string | undefined;
	category: string;
	description: string;
}

const RequestCard: React.FC<RequestCardProps> = ({ status, days, category, description }) => {
	// Calculate the days left until the target date
	const daysLeft = calculateDaysLeft(Number(days));

	return (
		<div className="bg-gray-100 rounded-3xl flex flex-col justify-between h-full">
			<div className="flex justify-between items-center mb-4 mt-6">
				{/* Only show the days if they are within 5 days, and show 'Виконано' if status is 'Виконано' */}
				{status === 'Виконано' ? (
					<div
						className="text-almost-black text-pxl ml-6 font-montserratMedium  rounded-full">
						Виконано
					</div>
				) : (
					daysLeft <= 5 && (
						<div
							className="border-2 border-dark-blue text-dark-blue text-pxl font-montserratMedium px-8 rounded-full">
							{daysLeft} днів
						</div>
					)
				)}
				{/* Show status if it is not 'Активно' */}
				<div
					className="bg-blue-500 w-7/12 text-white text-xs-pxl px-4 pr-5 pl-10 py-1 font-montserratRegular tracking-wide rounded-l-full">
					{category}
				</div>
			</div>
			<div className="mb-4">

				<p className="text-relative-p mx-6 font-montserratMedium text-gray-700 leading-relaxed">
					{description}
				</p>
			</div>
			<div className="flex justify-center items-center font-montserratMedium ml-4 mb-4 p-4">
				<Button className="uppercase px-4 py-2 rounded-full text-relative-p bg-perfect-yellow">
					Детальніше
				</Button>
			</div>
		</div>
	);
};

export default RequestCard;
