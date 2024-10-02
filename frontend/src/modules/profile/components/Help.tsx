import { Button } from "../../../ui/Button.tsx";
import AnnouncementCard from "./ui/AnnouncementCard.tsx";
import HelpCard from "./ui/HelpCard.tsx";

interface HelpProps {
	announcement: Announcement[];
	selectedRequestSection: string;
	handleRequestSectionClick: (section: string) => void;
}

interface Announcement {
	id: string;
	date_posted: Date;
	description: string;
	type_help: string;
	is_urgent: boolean;
}


const Help: React.FC<HelpProps> = ({ announcement, selectedRequestSection }) => {
	return (
		<>
			<h1 className="text-h2 font-kharkiv">Моя допомога</h1>
			<div className="flex justify-between h-10 mb-8">
				<h2 className="uppercase font-montserratMedium txt-lg mb-6">Оголошення</h2>
				<Button
					className={`border-dark-blue border-2 text-dark-blue rounded-3xl font-montserratMedium ${selectedRequestSection === "Cancelled" ? 'border-2 border-dark-blue bg-dark-blue text-white rounded-3xl font-montserratMedium px-8 py-0.5' : ''}`}
				>
					Дивитись всі
				</Button>
			</div>
			<div className="grid grid-cols-3 grid-rows-2 gap-3">
				{announcement.map((announcement) => (
					<AnnouncementCard
						key={announcement.id}
						id={announcement.id}
						datePosted={announcement.date_posted}
						description={announcement.description}
						typeHelp={announcement.type_help}
						is_urgent={announcement.is_urgent ? 'Термінова' : 'Звичайна'}
					/>
				))}
			</div>
			<div className="text-center mt-8">
				<button
					className="bg-perfect-yellow text-black py-2 px-6 font-montserratRegular text-xs-pxl rounded-full hover:bg-orange-400 transition">
					Показати ще
				</button>
			</div>
			<h3 className="my-4 text-lg font-montserratMedium uppercase">Пропозиції</h3>
			{/* Тут будет отображаться список предложений */}
			<div className="grid grid-cols-3 gap-6">
				{/* Пример карточки предложения */}
				<HelpCard
					user={{
						name: "Ольга Коваленко",
						image: "https://randomuser.me/api/portraits/women/17.jpg"
					}}
					date="27.08.2024"
					category="Гуманітарна"
					description="Ми шукаємо волонтерів для участі у роздачі продуктів харчування та води для переселенців у Київській області."
					location="Київ, гуманітарний центр"
					time="Щодня з 10:00 до 16:00"
					joined={3}
					total={10}
					status={undefined}
					days={undefined}
				/>
			</div>
		</>
	);
};

export default Help;
