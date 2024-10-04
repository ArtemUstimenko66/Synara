import React from 'react';
import Reviews from './Reviews';
import AnnouncementsPart from './AnnouncementsPart.tsx';
import GatheringCard from '../../gathering/ui/GatheringCard';
import { Link } from 'react-router-dom';
import PetitionCard from "../../petitions/components/PetitionCard.tsx";

interface MainContentProps {
	activeSection: string;
	reviews: any[];
	announcements: any[];
	gatherings: any[];
	petitions: any[];
	selectedRequestSection: string;
	handleRequestSectionClick: (section: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
													 activeSection,
													 reviews,
													 announcements,
													 gatherings,
													 petitions,
													 selectedRequestSection,
													 handleRequestSectionClick,
												 }) => {
	const calculatePercentage = (goal: number, raised: number) => {
		return (raised / goal) * 100;
	};

	return (
		<main className="w-[80%] bg-white p-8">
			{activeSection === 'reviews' && <Reviews reviews={reviews} />}
			{activeSection === 'announcements' && (
				<AnnouncementsPart
					requests={announcements}
					selectedRequestSection={selectedRequestSection}
					handleRequestSectionClick={handleRequestSectionClick}
				/>
			)}
			{activeSection === 'gatherings' && (
				<div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{gatherings.map((gathering, index) => (
						<Link to={`/gathering/${gathering.id}`} key={index} className="w-full p-2 mt-4">
							<GatheringCard
								id={gathering.id}
								title={gathering.name}
								description={gathering.description}
								goal={parseFloat(gathering.goal)}
								raised={parseFloat(gathering.collected)}
								percentage={calculatePercentage(
									parseFloat(gathering.goal),
									parseFloat(gathering.collected)
								)}
							/>
						</Link>
					))}
				</div>
			)}
			{activeSection === 'petitions' && (
				<div
					className="grid xl:grid-cols-3 sm:grid-cols-1 xl:px-0 md:px-0 sm:px-4 md:grid-cols-2 gap-6 w-full">
					{petitions.map((petition, index) => (
						<PetitionCard
							key={index}
							id={petition.id}
							petitionNumber={petition.petitionNumber}
							topic={petition.topic}
							creationDate={petition.creationDate}
							text={petition.text}
						/>
					))}
				</div>
			)}
			{/* {activeSection === 'help' && <Help requests={announcements} />} */}
		</main>
	);
};

export default MainContent;
