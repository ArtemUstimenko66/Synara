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
	fetchVolunteerDetails,
	getCommentsAboutUser,
	getUser,
	getUserCompletedAnnouncements,
	getUserGatherings,
	getUserPetitions,
	getVolunteerQualification,
	respondVolunteer
} from "../../modules/profile/api/profileService.ts";
import {Player} from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../assets/animations/logoLoading.json";
import {getDayOfWeekInUkrainian} from "../../data/dayOfWeekMap.ts";
import {getHelpTypeInUkrainianEngToUkr} from "../../data/helpTypesMap.ts";
import MainContent from "../../modules/profile/components/MainContent.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";


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
	moderator_answer: string;
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
	const [hasQualification, setHasQualification] = useState([]);
	const navigate = useNavigate();
	const [isDetailsVisible, setIsDetailsVisible] = useState(false);

	const { userId, isAuthenticated } = useAuth();

	useEffect(() => {
		const fetchData = async () => {
			if (isAuthenticated && userId) {
				try {
					const data = await getUser(userId);
					console.log('getUser(userId): ', data);
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

					const comments = await getCommentsAboutUser(Number(data.id));
					setCommentsData(comments);
				} catch (error) {
					console.error('Failed to fetch announcements or petitions:', error);
				}
			}
			const qualification = await getVolunteerQualification(Number(id));
			setHasQualification(qualification);
			//console.log('Qualification: ', qualification);
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
	const toggleDetailsVisibility = () => {
		setIsDetailsVisible((prev) => !prev);
	};

	return (
		<Wrapper>
			<Helmet>
				<title>{t('helmet_volunteer_profile')}</title>
				<meta name="description" content="Перегляньте та редагуйте інформацію про волонтера на платформі Synara. Долучайтеся до ініціатив та отримуйте підтримку." />
				<meta name="keywords" content="профіль волонтера, Synara, волонтерство, ініціативи, користувач" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://synara.help/profile-volunteer" />
			</Helmet>

			<MainHeader />
			<div className=" flex-col items-center mt-20">
				{/* Profile Card */}
				<div className="bg-gray-100 sm:mx-[5vw] xl:mx-0 md:mx-0 p-6 rounded-3xl  ">
					<div className="flex justify-between items-center">
						{/* Profile Info */}
						<div
							className="flex  xl:flex-row md:flex-row sm:flex-col md:items-center sm:items-start xl:items-center space-x-4">

							<img src={details.user.avatarUrl || 'https://via.placeholder.com/150'} alt="Profile"
								 className="rounded-full w-16 h-16 xl:block md:block sm:hidden"/>

							<div className="xl:block md:block sm:hidden">
								<h2 className="text-lg font-montserratRegular">{`${details.user.firstName} ${details.user.lastName}`}</h2>
								<p className="text-sm font-montserratRegular">{formatDate(details.user.birthDate)}</p>
							</div>
							<div className="xl:hidden md:hidden sm:flex flex-row">
								<img src={details.user.avatarUrl || 'https://via.placeholder.com/150'} alt="Profile"
									 className="rounded-full w-16 h-16 xl:hidden md:hidden sm:flex"/>
								<div className="flex-col flex ml-2">
									<h2 className="text-lg font-montserratRegular">{`${details.user.firstName} ${details.user.lastName}`}</h2>
									<p className="text-sm font-montserratRegular">{formatDate(details.user.birthDate)}</p>

								</div>
							</div>
							<div className="flex xl:mt-0 sm:mt-[2vh] xl:flex-row md:flex-row sm:flex-col items-center ">
								<div className=" items-center flex flex-nowrap">
									<MiniStar className="w-6 h-6 mr-2"></MiniStar>
									<span className=" text-sm font-montserratRegular xl:mt-1 mr-12">{details.rating || 0}</span>
								</div>
								<div className="flex md:flex-nowrap sm:flex-wrap xl:flex md:flex sm:hidden xl:flex-nowrap">
									<Calendar className="w-6 h-6 md:mr-1 sm:mr-3 xl:mr-1"/>
									<p className="text-sm font-montserratMedium">
										{details.startWorkingDay && details.endWorkingDay
											? `${getDayOfWeekInUkrainian(details.startWorkingDay)} - ${getDayOfWeekInUkrainian(details.endWorkingDay)}`
											: "Пн-Пт"}
									</p>
								</div>
							</div>
							<div className="flex xl:mt-0 sm:mt-[2vh] xl:flex-row md:flex-row sm:flex-col md:items-center sm:items-start xl:items-center">
								<div className="items-center flex-nowrap xl:hidden md:hidden sm:flex">
									<img width="24" height="24"
										 src="https://img.icons8.com/fluency-systems-filled/50/228BE6/calendar.png"
										 alt="calendar" className="mr-2"/>
									<p className="text-sm font-montserratMedium md:mr-0 sm:mr-2 xl:mr-0">
										{details.startWorkingDay && details.endWorkingDay
											? `${getDayOfWeekInUkrainian(details.startWorkingDay)} - ${getDayOfWeekInUkrainian(details.endWorkingDay)}`
											: "Пн-Пт"}
									</p>
									<Clock className="w-6 h-6 mr-2 xl:ml-0 sm:ml-[2vw] "/>
									<p className="text-sm font-montserratMedium md:mr-40 sm:mr-0 xl:mr-40">
										{details.startTime && details.endTime
											? `${formatTime(details.startTime)} - ${formatTime(details.endTime)}`
											: "09:00 - 18:00"}
									</p>
								</div>
								<div className="xl:mt-0 sm:mt-[2vh] flex flex-nowrap">
									<PlaceMarker className="w-6 h-6 mr-2"/>
									<p className="xl:text-sm md:text-sm sm:text-xs-pl font-montserratRegular">
										{details.city && details.region
											? `${details.city}, ${details.region}`
											: "Київ, Київська областть"}
									</p>
								</div>
							</div>

						</div>

						{/* Action Button */}


						<Button className="xl:block md:block sm:hidden bg-perfect-yellow  px-6 py-2 rounded-3xl"
								onClick={handleRespond}>
							{t('contactUpper')}
						</Button>

					</div>


					{/* About Section */}
					<div className="mt-6 md:mx-6 sm:mx-2 xl:mx-6 grid md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-2 ">
						<div className="bg-white p-4 px-12 rounded-3xl">
							<h3 className="font-montserratMedium mb-2">{t('about_yourself')}</h3>
							<p className="text-sm text-gray-700">
								{details.description}
							</p>
						</div>
						<div className="bg-white p-4 md:mx-6 sm:mx-0 xl:mt-0 md:mt-0 sm:mt-2 xl:mx-6 rounded-3xl">
							<div className="flex">
								<h3 className="font-montserratMedium mb-1 mr-2">{t('type_of_help')}</h3>
								{hasQualification
									?
									<div
										onClick={toggleDetailsVisibility}> {/* Оборачиваем VectorOfficial в div и добавляем обработчик клика */}
										<VectorOfficial/>
									</div>
									:
									<></>
								}
								{isDetailsVisible && (
									<div className=" absolute right-[25vw] bg-almost-white border border-dark-blue px-4 py-2 rounded-xl mt-2">
										<p>{details.moderator_answer}</p>
									</div>
								)}
							</div>

							<div className="">
								{details.supports && details.supports.length > 0
									? details.supports.map((support, index) => (
										<span key={index}
											  className="text-sm border border-dark-blue font-montserratRegular px-4 py-0.5 mr-2 rounded-3xl">
											{getHelpTypeInUkrainianEngToUkr(support)}
										  </span>
									))
									: <p className="font-montserratRegular text-sm">Данные отсутствуют</p>
								}

								<div className="mt-5">
									{details.support_description.split(',').map((support, index) => {
										const [type, description] = support.split(':');
										return (
											<div key={index} className="font-montserratRegular text-sm mb-2">
												<span className="font-montserratRegular font-bold">{type}:</span> {description.trim()}
											</div>
										);
									})}
								</div>

							</div>
						</div>
					</div>
					<div className="xl:hidden md:hidden sm:flex mt-2  xl:mt-0 sm:mt-[2vh]  justify-center items-center">
						<Button className=" bg-perfect-yellow  px-6 py-2 rounded-3xl" onClick={handleRespond}>
							{t('contactUpper')}
						</Button>
					</div>

				</div>

				{/* Button Sections */}
				<div className="md:space-x-3 sm:space-x-2 xl:space-y-0 md:space-y-0 sm:space-y-1 xl:space-x-3 mt-6 xl:ml-0 sm:ml-[3vw] ">
					<button
						onClick={() => setActiveSection('reviews')}
						className={`${activeSection=="reviews" ? "text-almost-white bg-dark-blue" : "text-dark-blue bg-almost-white" } border-dark-blue xl:ml-0 md:ml-0 sm:ml-2 border-2 font-montserratMedium rounded-full px-6 py-1`}>{t('reviewsUPPER')}
					</button>
					<button
						onClick={() => setActiveSection('announcements')}
						className={`${activeSection=="announcements" ? "text-almost-white bg-dark-blue" : "text-dark-blue bg-almost-white" } border-dark-blue border-2 font-montserratMedium rounded-full px-6 py-1`}>{t('announcementUPPER')}
					</button>
					<button
						onClick={() => setActiveSection('petitions')}
						className={`${activeSection=="petitions" ? "text-almost-white bg-dark-blue" : "text-dark-blue bg-almost-white" } border-dark-blue border-2 font-montserratMedium rounded-full px-6 py-1`}>{t('petitionUPPER')}
					</button>
					<button
						onClick={() => setActiveSection('gatherings')}
						className={`${activeSection=="gatherings" ? "text-almost-white bg-dark-blue" : "text-dark-blue bg-almost-white" } border-dark-blue border-2 font-montserratMedium rounded-full px-6 py-1`}>{t('collectionsUPPER')}
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
