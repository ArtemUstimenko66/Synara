
import UserHelp from '../assets/UserHelp.svg?react';
import Clock from '../assets/Clock.svg?react';
import Place from '../assets/Place.svg?react';
import { Button } from '../../../ui/Button';

// @ts-ignore
const HelpCard = ({ user, date, status, days, category, description, location, time, joined, total }) => {

	return (
		<div className="bg-gray-half rounded-3xl  max-w-xs">
			{/* Верхняя часть карточки - пользователь и дата */}
			<div className="flex items-center mt-4 mb-2 px-4">
				<img src={user.image} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
				<div>
					<h3 className="text-lg font-montserratRegular">{user.name}</h3>
					<p className="text-sm font-montserratRegular">{date}</p>
				</div>
			</div>
			<div className="flex justify-end">
			{/* Статус категории */}
				<div className="bg-blue-500 text-white font-montserratRegular px-4 py-1 rounded-l-full text-xs-px w-1/2 tracking-wide mb-4">
					{category}
				</div>
			</div>
			{/* Описание задания */}
			<div className="px-4">
				<h4 className="font-montserratMedium mb-2">Для волонтерів</h4>
				<p className="font-montserratRegular text-sm mb-4">{description}</p>

				{/* Информация о месте и времени */}
				<div className="mb-4 font-montserratRegular text-pd">
					<div className="flex items-center mb-2">
						<Place className="h-5 w-5 mr-1"/>
						<p>Місце: {location}</p>
					</div>
					<div className="flex items-center mb-2">
						<Clock className="h-5 w-5 mr-1"/>
						<p>Час: {time}</p>
					</div>
					<div className="flex items-center">
						<UserHelp className="h-5 w-5 mr-1"/>
						<p>{joined} / {total} вже доєднались</p>
					</div>
				</div>
			</div>
			{/* Кнопка */}
			<div className="flex justify-center">
				<Button className="uppercase px-4 py-2 rounded-full text-almost-black font-normal font-montserratMedium bg-perfect-yellow mb-2">
					Детальніше
				</Button>
			</div>
		</div>
	);
};

export default HelpCard;
