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
	likedAnnouncements: any[];
	completedAnnouncements: any[];
	likedGatherings: any[];
	likedPetitions: any[];
}

const MainContent: React.FC<MainContentProps> = ({
													 activeSection,
													 reviews,
													 announcements,
													 gatherings,
													 petitions,
													 likedAnnouncements,
													 completedAnnouncements,
													 likedGatherings,
													 likedPetitions,
												 }) => {
	const calculatePercentage = (goal: number, raised: number) => {
		return (raised / goal) * 100;
	};

	return (
		<main className="w-full bg-almost-white p-8">
			{activeSection === 'reviews' && <Reviews reviews={reviews}/>}

			{activeSection === 'announcements' && (
				<>
					<h1 className="text-h2 font-kharkiv">Мої заяви</h1>
					<h3 className="text-h5 font-kharkiv mb-[2vh]">Оголошення</h3>
					{announcements.length > 0 ?
						<AnnouncementsPart
							requests={announcements}
						/>
						:
						<div className="flex items-center justify-center my-[20%] w-full text-gray-500">
							<div className="text-center font-montserratMedium">
								Ви ще не створили жодного оголошення
							</div>
						</div>
					}
				</>
			)}
			{activeSection === 'gatherings' && (
				<>
				<h1 className="text-h2 font-kharkiv">Мої заяви</h1>
					<h3 className="text-h5 font-kharkiv mb-[2vh]">Збори</h3>
					<div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{gatherings.length > 0 ?
							(gatherings.map((gathering, index) => (
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
								))
							)
							:
							<div className="flex items-center justify-center my-[20%] w-full text-gray-500">
								<div className="text-center font-montserratMedium">
									Ви ще не створили жодного збору
								</div>
							</div>
						}
					</div>
				</>
			)}
			{activeSection === 'petitions' && (
				<>
					<h1 className="text-h2 font-kharkiv">Мої заяви</h1>
					<h3 className="text-h5 font-kharkiv mb-[2vh]">Петиції</h3>
					<div
						className="grid xl:grid-cols-3 sm:grid-cols-1 xl:px-0 md:px-0 sm:px-4 md:grid-cols-2 gap-6 w-full">
						{petitions.length > 0 ?
							(petitions.map((petition, index) => (
									<PetitionCard
										key={index}
										id={petition.id}
										petitionNumber={petition.petitionNumber}
										topic={petition.topic}
										creationDate={petition.creationDate}
										text={petition.text}
									/>
								))
							)
							:
							<div className="flex items-center justify-center my-[20%] w-full text-gray-500">
								<div className="text-center font-montserratMedium">
									Ви ще не створили жодної петиції
								</div>
							</div>
						}
					</div>
				</>
			)}

			{activeSection === 'likedPetitions' && (
				<>
					<h1 className="text-h2 font-kharkiv">Збережені</h1>
					<h3 className="text-h5 font-kharkiv mb-[2vh]">Петиції</h3>
					<div
						className="grid xl:grid-cols-3 sm:grid-cols-1 xl:px-0 md:px-0 sm:px-4 md:grid-cols-2 gap-6 w-full">
						{likedPetitions.length > 0 ?
							(likedPetitions.map((petition, index) => (
									<PetitionCard
										key={index}
										id={petition.id}
										petitionNumber={petition.petitionNumber}
										topic={petition.topic}
										creationDate={petition.creationDate}
										text={petition.text}
									/>
								))
							)
							:
							<div className="flex items-center justify-center my-[20%] w-full text-gray-500">
								<div className="text-center font-montserratMedium">
									Ви ще не зберегли жодної петиції
								</div>
							</div>
						}
					</div>
				</>
			)}

			{activeSection === 'likedGatherings' && (
				<>
					<h1 className="text-h2 font-kharkiv">Збережені</h1>
					<h3 className="text-h5 font-kharkiv mb-[2vh]">Збори</h3>
					<div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{likedGatherings.length > 0 ?
							(likedGatherings.map((gathering, index) => (
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
								))
							)
							:
							<div className="flex items-center justify-center my-[20%] w-full text-gray-500">
								<div className="text-center font-montserratMedium">
									Ви ще не зберегли жодного збору
								</div>
							</div>
						}
					</div>
				</>
			)}

			{activeSection === 'likedAnnouncements' && (
				<>
					<h1 className="text-h2 font-kharkiv">Збережені</h1>
					<h3 className="text-h5 font-kharkiv mb-[2vh]">Оголошення</h3>
					{likedAnnouncements.length > 0 ?
						<AnnouncementsPart
							requests={likedAnnouncements}
						/>
						:
						<div className="flex items-center justify-center my-[20%] w-full text-gray-500">
							<div className="text-center font-montserratMedium">
								Ви ще не зберегли жодного оголошення
							</div>
						</div>
					}
				</>
			)}

			{activeSection === 'doneAnnouncements' && (
				<>
					<h1 className="text-h2 font-kharkiv">Моя допомога</h1>
					<h3 className="text-h5 font-kharkiv mb-[2vh]">Оголошення</h3>
					{completedAnnouncements.length > 0 ?
						<AnnouncementsPart
							requests={completedAnnouncements}
						/>
						:
						<div className="flex items-center justify-center my-[20%] w-full text-gray-500">
							<div className="text-center font-montserratMedium">
								Ви ще не допомогли нікому за оголошенням
							</div>
						</div>
					}
				</>
			)}
		</main>
	);
};

export default MainContent;
