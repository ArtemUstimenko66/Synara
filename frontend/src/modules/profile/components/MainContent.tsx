import React from 'react';
import Reviews from './Reviews';
import AnnouncementsPart from './AnnouncementsPart.tsx';
import GatheringCard from '../../gathering/ui/GatheringCard';
import { Link } from 'react-router-dom';
import PetitionCard from "../../petitions/components/PetitionCard.tsx";
import NothingFound from "../../../assets/images/NothingFound.png";
import {useTranslation} from "react-i18next";
import Settings from "./Settings.tsx";

interface MainContentProps {
	activeSection: string;
	reviews: any[];
	rating: string;
	announcements: any[];
	gatherings: any[];
	petitions: any[];
	likedAnnouncements: any[];
	completedAnnouncements: any[];
	likedGatherings: any[];
	likedPetitions: any[];
	userData?: any;
}

const MainContent: React.FC<MainContentProps> = ({
													 activeSection,
													 reviews,
													 rating,
													 announcements,
													 gatherings,
													 petitions,
													 likedAnnouncements,
													 completedAnnouncements,
													 likedGatherings,
													 likedPetitions,
													 userData
												 }) => {
	const calculatePercentage = (goal: number, raised: number) => {
		return (raised / goal) * 100;
	};
	const {t} = useTranslation();

	return (
		<main className="w-full bg-almost-white md:p-8 sm:p-3 xl:p-8">
			{activeSection === 'reviews' && <Reviews reviews={reviews} rating={rating}/>}

			{activeSection === 'announcements' && (
				<>

					<h1 className="text-h2 font-kharkiv">{t('my_statements')}</h1>
					<h3 className="text-h5 font-kharkiv mb-[2vh]">{t('advertisement')}</h3>
					{announcements.length > 0 ?
						<AnnouncementsPart
							requests={announcements}

						/>
						:

						<div className="flex items-center justify-center my-[10%]  w-full text-gray-500">
							<div
								className="text-center font-montserratMedium flex flex-col items-center justify-center">
								<img src={NothingFound}
									 className="xl:w-[20vw] xl:h-auto sm:w-[50vw] md:w-[20vw] md:h-auto mb-4"/>
								{t('you_have_not_created_any_announcement')}
							</div>
						</div>
					}
				</>
			)}

			{activeSection === 'gatherings' && (
				<>
					<h1 className="text-h2 font-kharkiv">{t('my_statements')}</h1>
					<h3 className="text-h5 font-kharkiv mb-[2vh]">{t('collection')}</h3>
					<div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
							<div className="flex items-center justify-center my-[10%] xl:ml-[30vw] w-full text-gray-500">
								<div
									className="text-center font-montserratMedium flex flex-col items-center justify-center">
									<img src={NothingFound}
										 className="xl:w-[20vw] xl:h-auto sm:w-[50vw] md:w-[20vw] md:h-auto mb-4"/>
									{t('you_have_not_created_any_gathering')}
								</div>
							</div>
						}
					</div>
				</>
			)}

			{
				activeSection === 'petitions' && (
					<>
						<h1 className="text-h2 font-kharkiv">{t('my_statements')}</h1>
						<h3 className="text-h5 font-kharkiv mb-[2vh]">{t('petitions')}</h3>
						<div
							className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:px-0 md:px-0 sm:px-4 gap-6 w-full">
							{petitions.length > 0 ?
								(petitions.map((petition, index) => (
										<PetitionCard
											key={index}
											id={petition.id}
											petitionNumber={petition.petitionNumber}
											topic={petition.topic}
											creationDate={petition.creationDate}
											responseDate={petition.responseDate}
											text={petition.text}
										/>
									))
								)
								:

								<div className="flex items-center justify-center my-[10%] xl:ml-[30vw] w-full text-gray-500">
									<div
										className="text-center font-montserratMedium flex flex-col items-center justify-center">
										<img src={NothingFound}
											 className="xl:w-[20vw] xl:h-auto sm:w-[50vw] md:w-[20vw] md:h-auto mb-4"/>
										{t('you_have_not_created_any_petition')}
									</div>
								</div>
							}
						</div>
					</>
				)}

			{
				activeSection === 'likedPetitions' && (
					<>
						<h1 className="text-h2 font-kharkiv">{t('saved')}</h1>
						<h3 className="text-h5 font-kharkiv mb-[2vh]">{t('petitions')}</h3>
						<div
							className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:px-0 md:px-0 sm:px-4 gap-6 w-full">
							{likedPetitions.length > 0 ?
								(likedPetitions.map((petition, index) => (
										<PetitionCard
											key={index}
											id={petition.id}
											petitionNumber={petition.petitionNumber}
											topic={petition.topic}
											creationDate={petition.creationDate}
											responseDate={petition.responseDate}
											text={petition.text}
										/>
									))
								)
								:
								<div className="flex items-center justify-center my-[10%] xl:ml-[30vw] w-full text-gray-500">
									<div
										className="text-center font-montserratMedium flex flex-col items-center justify-center">
										<img src={NothingFound}
											 className="xl:w-[20vw] xl:h-auto sm:w-[50vw] md:w-[20vw] md:h-auto mb-4"/>
										{t('you_have_not_saved_any_petition')}
									</div>
								</div>
							}
						</div>
					</>
				)}

			{
				activeSection === 'likedGatherings' && (
					<>
						<h1 className="text-h2 font-kharkiv">{t('saved')}</h1>
						<h3 className="text-h5 font-kharkiv mb-[2vh]">{t('collection')}</h3>
						<div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

								<div className="flex items-center justify-center my-[10%] xl:ml-[30vw] w-full text-gray-500">
									<div
										className="text-center font-montserratMedium flex flex-col items-center justify-center">
										<img src={NothingFound}
											 className="xl:w-[20vw] xl:h-auto sm:w-[50vw] md:w-[20vw] md:h-auto mb-4"/>
										{t('you_have_not_saved_any_gathering')}
									</div>
								</div>
							}
						</div>
					</>
				)}

			{
				activeSection === 'likedAnnouncements' && (
					<>
						<h1 className="text-h2 font-kharkiv">{t('saved')}</h1>
						<h3 className="text-h5 font-kharkiv mb-[2vh]">{t('advertisement')}</h3>
						{likedAnnouncements.length > 0 ?
							<AnnouncementsPart
								requests={likedAnnouncements}
							/>
							:


							<div className="flex items-center justify-center my-[10%] w-full text-gray-500">
								<div
									className="text-center font-montserratMedium flex flex-col items-center justify-center">
									<img src={NothingFound}
										 className="xl:w-[20vw] xl:h-auto sm:w-[50vw] md:w-[20vw] md:h-auto mb-4"/>
									{t('you_have_not_saved_any_announcement')}
								</div>
							</div>
						}
					</>
				)}

			{activeSection === 'doneAnnouncements' && (
				<>
					<h1 className="text-h2 font-kharkiv">{t('my_help')}</h1>
					<h3 className="text-h5 font-kharkiv mb-[2vh]">{t('advertisement')}</h3>
					{completedAnnouncements.length > 0 ?
						<AnnouncementsPart
							requests={completedAnnouncements}
						/>
						:

						<div className="flex items-center justify-center my-[10%] w-full text-gray-500">
							<div
								className="text-center font-montserratMedium flex flex-col items-center justify-center">
								<img src={NothingFound}
									 className="xl:w-[20vw] xl:h-auto sm:w-[50vw] md:w-[20vw] md:h-auto mb-4"/>
								{t('you_have_not_helped_any_person')}
							</div>
						</div>

					}
				</>
			)}

			{activeSection === 'settings' && (
				<>
					<h1 className="xl:text-h2 sm:text-h4 md:text-h2 font-kharkiv">{t('settings')}</h1>
					<h3 className="xl:text-h5 sm:text-xs-pxl md:text-h5 font-kharkiv mb-[2vh]">{t('shared')}</h3>
					<Settings userData={userData} />
				</>
			)}
		</main>
	);
};

export default MainContent;
