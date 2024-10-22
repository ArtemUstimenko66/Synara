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
}

const AnnouncementsPart: React.FC<AnnouncementsPartProps> = ({ requests}) => {
	return (
		<>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
