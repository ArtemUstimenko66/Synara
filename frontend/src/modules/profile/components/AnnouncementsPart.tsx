import { Button } from "../../../ui/Button.tsx";
import AnnouncementCard from "./ui/AnnouncementCard.tsx";

interface Announcement {
	id: string;
	date_posted: Date;
	description: string;
	type_help: string;
	is_urgent: boolean;
}

interface AnnouncementsPartProps {
	requests: Announcement[];
	selectedRequestSection: string;
	handleRequestSectionClick: (section: string) => void;
}

const AnnouncementsPart: React.FC<AnnouncementsPartProps> = ({ requests, selectedRequestSection, handleRequestSectionClick }) => {
	return (
		<>
			<h1 className="text-h2 font-kharkiv">Мої заяви</h1>
			<div className="flex items-center mb-6">
				<Button
					className={`mr-4 ${selectedRequestSection === 'All' ? 'active' : ''}`}
					onClick={() => handleRequestSectionClick('All')}
				>
					Всі 7
				</Button>
				<Button
					className={`mr-4 ${selectedRequestSection === 'Active' ? 'active' : ''}`}
					onClick={() => handleRequestSectionClick('Active')}
				>
					Активні 3
				</Button>
				<Button
					className={`mr-4 ${selectedRequestSection === 'Completed' ? 'active' : ''}`}
					onClick={() => handleRequestSectionClick('Completed')}
				>
					Завершені 4
				</Button>
			</div>
			<div className="grid grid-cols-2 gap-6">
				{requests.map((announcement) => (
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
		</>
	);
};

export default AnnouncementsPart;
