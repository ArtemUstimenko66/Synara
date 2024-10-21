import React, {useEffect, useState} from 'react';

import MiniStar from "../../modules/profile/assets/MiniStar.svg?react"
import Calendar from "../../modules/main-page/assets/Calendar.svg?react"
import PlaceMarker from "../../modules/profile/assets/Place.svg?react"
import Clock from "../../modules/profile/assets/Clock.svg?react"
import VectorOfficial from "../../modules/profile/assets/VectorOfficial.svg?react"
import Wrapper from "../../ui/Wrapper.tsx";
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import {Button} from "../../ui/Button.tsx";
import Footer from "../../components/Footer.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {
	fetchVolunteerDetails, getCommentsAboutUser,
	getUser, getUserCompletedAnnouncements, getUserGatherings, getUserPetitions, respondVolunteer
} from "../../modules/profile/api/profileService.ts";
import {Player} from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../assets/animations/logoLoading.json";
import {getDayOfWeekInUkrainian} from "../../data/dayOfWeekMap.ts";
import {getHelpTypeInUkrainianEngToUkr} from "../../data/helpTypesMap.ts";
import MainContent from "../../modules/profile/components/MainContent.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import {useTranslation} from "react-i18next";


const formatTime = (time: string): string => {
	if (!time) return '00:00';
	return time.length <= 2 ? `${time}:00` : time;
};

interface VolunteerDetails {
	id: number;
	region: string;
	city: string;
	supports: string[];
	userId: number;
	volunteer_identification_number: number;
	rating: string;
	startWorkingDay: string;
	endWorkingDay: string;
	startTime: string;
	endTime: string;
	description: string;
	support_description: string;
	user: {
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
	};
}


const formatDate = (dateString: string) => {
	if (!dateString) return '00.00.0000';
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
};


const VolunteerProfilePage: React.FC = () => {

	const {id} = useParams();
	const {t} = useTranslation();

	const [activeSection, setActiveSection] = useState<string>('reviews');
	const [announcementsData, setAnnouncementsData] = useState([]);
	const [gatheringsData, setGatheringsData] = useState([]);
	const [petitionsData, setPetitionsData] = useState([]);
	const [commentsData, setCommentsData] = useState([]);
	const navigate = useNavigate();


	const { userId, isAuthenticated } = useAuth();

	useEffect(() => {
		const fetchData = async () => {
			if (isAuthenticated && userId) {
				try {
					const data = await getUser(userId);
					console.log(`getUser(${userId}): `, data);
				} catch (error) {
					console.log('Error fetching user data:', error);
				}
			}
		};

		fetchData();
	}, [isAuthenticated, userId]);

	const [details, setDetails] = useState<VolunteerDetails | null>(null);

	useEffect(() => {
		const fetchVolunteerData = async () => {
			const data = await fetchVolunteerDetails(Number(id));
			setDetails(data);
			if (id) {
				try {
					const announcements = await getUserCompletedAnnouncements(Number(data.id));
					setAnnouncementsData(announcements);

					const petitions = await getUserPetitions(Number(id));
					setPetitionsData(petitions);

					const gatherings = await getUserGatherings(Number(id));
					setGatheringsData(gatherings);

					const comments = await getCommentsAboutUser(Number(id));
					setCommentsData(comments);
				} catch (error) {
					console.error('Failed to fetch announcements or petitions:', error);
				}
			}
		};
		fetchVolunteerData();
	}, [id]);


	if (!details) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Player
					autoplay
					loop
					src={loadingAnimation}
					style={{ height: '200px', width: '200px' }}
				/>
			</div>
		);
	}

	const handleRespond = async () => {
		if (!details || !details.user) return;

		try {
			const chatId = await respondVolunteer(details.user.id);
			console.log('Chat created successfully:', chatId);
			navigate(`/chat/${chatId}`);
		} catch (error) {
			console.error('Failed to create chat:', error);
			navigate(`/chat`);
		}
	};


	return (
		<Wrapper>
			<MainHeader />
			<div className=" flex-col items-center mt-20">
				{/* Profile Card */}
				<div className="bg-gray-100 p-6 rounded-3xl  ">
					<div className="flex justify-between items-center">
						{/* Profile Info */}
						<div className="flex items-center space-x-4">
							<img src={details.user.avatarUrl || 'https://via.placeholder.com/150'} alt="Profile"
								 className="rounded-full w-16 h-16"/>
							<div>
								<h2 className="text-lg font-montserratRegular">{`${details.user.firstName} ${details.user.lastName}`}</h2>
								<p className="text-sm font-montserratRegular">{formatDate(details.user.birthDate)}</p>
							</div>
							<div className="flex items-center ">
								<MiniStar className="w-6 h-6"></MiniStar>
								<span className=" text-sm font-montserratRegular mr-12">{details.rating || 0}</span>
								<Calendar className="w-6 h-6 mr-1"/>
								<p className="text-sm font-montserratMedium">
									{details.startWorkingDay && details.endWorkingDay
										? `${getDayOfWeekInUkrainian(details.startWorkingDay)} - ${getDayOfWeekInUkrainian(details.endWorkingDay)}`
										: "Пн-Пт"}
								</p>
							</div>
							<div className="flex items-center">
								<Clock className="w-6 h-6 mr-2"/>
								<p className="text-sm font-montserratMedium mr-40">
									{details.startTime && details.endTime
										? `${formatTime(details.startTime)} - ${formatTime(details.endTime)}`
										: "09:00 - 18:00"}
								</p>
								<PlaceMarker className="w-6 h-6 mr-2"/>
								<p className="text-sm font-montserratRegular">
									{details.city && details.region
										? `${details.city}, ${details.region}`
										: "Київ, Київська областть"}
								</p>
							</div>

						</div>

						{/* Action Button */}
						<Button className="bg-perfect-yellow  px-6 py-2 rounded-3xl" onClick={handleRespond}>
							{t('contactUpper')}
						</Button>
					</div>

					{/* About Section */}
					<div className="mt-6 mx-6 grid grid-cols-2 ">
						<div className="bg-white p-4 px-12 rounded-3xl">
							<h3 className="font-montserratMedium mb-2">{t('about_yourself')}</h3>
							<p className="text-sm text-gray-700">
								{details.description}
							</p>
						</div>
						<div className="bg-white p-4 mx-6 rounded-3xl">
							<div className="flex">
								<h3 className="font-montserratMedium mb-1 mr-2">{t('type_of_help')}</h3>
								<VectorOfficial/>
							</div>

							<div className="">
								{details.supports
									.map((support, index) => (
										<span key={index}
											  className="text-sm border border-dark-blue font-montserratRegular px-4 py-0.5 mr-2 rounded-3xl">{getHelpTypeInUkrainianEngToUkr(support)}
										</span>
									))
								}
								<div className="text-sm flex mb-2 mt-[3vh]">
									<div className=" font-montserratMedium flex">{details.support_description}</div>
								</div>
							</div>
						</div>
					</div>


				</div>
				{/* Button Sections */}
				<div className=" space-x-3 mt-6">
					<button
						onClick={() => setActiveSection('reviews')}
						className="text-dark-blue border-dark-blue border-2 font-montserratMedium rounded-full px-6 py-1">{t('reviewsUPPER')}
					</button>
					<button
						onClick={() => setActiveSection('announcements')}
						className="text-dark-blue border-dark-blue border-2 font-montserratMedium rounded-full px-6 py-1">{t('announcementUPPER')}
					</button>
					<button
						onClick={() => setActiveSection('petitions')}
						className="text-dark-blue border-dark-blue border-2 font-montserratMedium rounded-full px-6 py-1">{t('petitionUPPER')}
					</button>
					<button
						onClick={() => setActiveSection('gatherings')}
						className="text-dark-blue border-dark-blue border-2 font-montserratMedium rounded-full px-6 py-1">{t('collectionsUPPER')}
					</button>
				</div>


					<MainContent
						activeSection={activeSection}
						reviews={commentsData}
						rating={`${details.rating}`}
						announcements={announcementsData}
						gatherings={gatheringsData}
						petitions={petitionsData}
						likedAnnouncements={announcementsData}
						completedAnnouncements={announcementsData}
						likedGatherings={gatheringsData}
						likedPetitions={petitionsData}
					/>

			</div>
			<Footer/>
		</Wrapper>
	);
};

export default VolunteerProfilePage;
