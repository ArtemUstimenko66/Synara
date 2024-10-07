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
import {useParams} from "react-router-dom";
import {
	fetchVolunteerDetails,
	getUser
} from "../../modules/profile/api/profileService.ts";
import {Player} from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../assets/animations/logoLoading.json";
import {getDayOfWeekInUkrainian} from "../../data/dayOfWeekMap.ts";
import {getHelpTypeInUkrainianEngToUkr} from "../../data/helpTypesMap.ts";
import MainContent from "../../modules/profile/components/MainContent.tsx";
import {useAuth} from "../../hooks/useAuth.ts";


const formatTime = (time: string): string => {
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
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
};


const VolunteerProfilePage: React.FC = () => {

	const {id} = useParams();

	const [activeSection, setActiveSection] = useState<string>('reviews');
	const [, setReviewsData] = useState([]);
	const [announcementsData, setAnnouncementsData] = useState([]);
	const [gatheringsData, setGatheringsData] = useState([]);
	const [petitionsData, setPetitionsData] = useState([]);


	const { userId, isAuthenticated, isLoading } = useAuth();

	useEffect(() => {
		const fetchData = async () => {
			if (isAuthenticated && userId) {
				try {
					const data = await getUser(userId);
					console.log('getUser(userId): ', data);
					// @ts-ignore
					setReviewsData(reviews);
					setAnnouncementsData(data.announcements);
					setGatheringsData(data.gatherings);
					setPetitionsData(data.petitions);
				} catch (error) {
					console.log('Error fetching user data:', error);
				}
			}
		};

		fetchData();
	}, [isAuthenticated, userId]);

	const [details, setDetails] = useState<VolunteerDetails | null>(null);

	useEffect(() => {
		const loadDetails = async () => {
			if (id) {
				const data = await fetchVolunteerDetails(Number(id));
				console.log(data);
				setDetails(data);
			}
		};
		loadDetails();
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
	if (isLoading) {
		return <div>Loading...</div>;
	}

	const reviews = [
		{
			name: 'Ірина Шевченко',
			date: '20.06.2023',
			rating: 5,
			comment: 'Як волонтер, я знайшов тут багато можливостей допомогти людям, які цього потребують. Це чудова платформа для об\'єднання зусиль.Як волонтер, я знайшов тут багато можливостей допомогти людям, які цього потребують. Це чудова платформа для об\'єднання зусиль',
			avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
		},
		{
			name: 'Олександр Петренко',
			date: '15.07.2023',
			rating: 4,
			comment: 'Платформа дуже зручна у використанні! Знайшов багато корисної інформації, та зміг допомогти багатьом людям.',
			avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
		},
		{
			name: 'Марія Іваненко',
			date: '02.08.2023',
			rating: 5,
			comment: 'Неймовірна спільнота волонтерів! Відчуваю себе частиною чогось великого та важливого.',
			avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
		},
		{
			name: 'Дмитро Ковальчук',
			date: '10.09.2023',
			rating: 3,
			comment: 'Платформа гарна, але іноді є проблеми з функціоналом. Сподіваюсь на покращення в майбутньому.',
			avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
		},
		{
			name: 'Наталія Бойко',
			date: '22.07.2023',
			rating: 4,
			comment: 'Багато можливостей для допомоги іншим, але хотілось би більше ресурсів для новачків.',
			avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
		},
		{
			name: 'Андрій Мельник',
			date: '05.08.2023',
			rating: 5,
			comment: 'Ця платформа зробила волонтерську діяльність доступною для всіх, хто бажає допомогти.',
			avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
		},
	];
	return (
		<Wrapper>
			<MainHeader />
			<div className=" flex-col items-center mt-20">
				{/* Profile Card */}
				<div className="bg-gray-100 p-6 rounded-3xl  ">
					<div className="flex justify-between items-center">
						{/* Profile Info */}
						<div className="flex items-center space-x-4">
							<img src={details.user.avatarUrl} alt="Profile"
								 className="rounded-full w-16 h-16"/>
							<div>
								<h2 className="text-lg font-montserratRegular">{`${details.user.firstName} ${details.user.lastName}`}</h2>
								<p className="text-sm font-montserratRegular">{formatDate(details.user.birthDate)}</p>
							</div>
							<div className="flex items-center ">
								<MiniStar className="w-6 h-6"></MiniStar>
								<span className=" text-sm font-montserratRegular mr-12">{details.rating}</span>
								<Calendar className="w-6 h-6 mr-1"/>
								<p className="text-sm font-montserratMedium">{getDayOfWeekInUkrainian(details.startWorkingDay)} - {getDayOfWeekInUkrainian(details.endWorkingDay)}</p>
							</div>
							<div className="flex items-center ">
								<Clock className="w-6 h-6 mr-2"/>
								<p className="text-sm font-montserratMedium mr-40">{formatTime(details.startTime)} - {formatTime(details.endTime)}</p>
								<PlaceMarker className="w-6 h-6 mr-2"/>
								<p className="text-sm font-montserratRegular ">{details.city}, {details.region}</p>
							</div>
						</div>

						{/* Action Button */}
						<Button className="bg-perfect-yellow  px-6 py-2 rounded-3xl">
							ЗВЕРНУТИСЬ
						</Button>
					</div>

					{/* About Section */}
					<div className="mt-6 mx-6 grid grid-cols-2 ">
						<div className="bg-white p-4 px-12 rounded-3xl">
							<h3 className="font-montserratMedium mb-2">Про себе</h3>
							<p className="text-sm text-gray-700">
								{details.description}
							</p>
						</div>
						<div className="bg-white p-4 mx-6 rounded-3xl">
							<div className="flex">
								<h3 className="font-montserratMedium mb-1 mr-2">Тип допомоги</h3>
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
								<div className="text-sm flex mb-2 mt-2">
									<div className=" font-montserratMedium flex">Психологічна допомога:</div>
									Індивідуальні консультації
								</div>
								<div className="text-sm flex">
									<div className=" font-montserratMedium flex">Інформаційна допомога:</div>
									Пошук і надання інформації про доступні ресурси
								</div>
							</div>
						</div>
					</div>


				</div>
				{/* Button Sections */}
				<div className=" space-x-3 mt-6">
					<button
						onClick={() => setActiveSection('reviews')}
						className="text-dark-blue border-dark-blue border-2 font-montserratMedium rounded-full px-6 py-1">ВІДГУКИ
					</button>
					<button
						onClick={() => setActiveSection('announcements')}
						className="text-dark-blue border-dark-blue border-2 font-montserratMedium rounded-full px-6 py-1">ОГОЛОШЕННЯ
					</button>
					<button
						onClick={() => setActiveSection('petitions')}
						className="text-dark-blue border-dark-blue border-2 font-montserratMedium rounded-full px-6 py-1">ПЕТИЦІЇ
					</button>
					<button
						onClick={() => setActiveSection('gatherings')}
						className="text-dark-blue border-dark-blue border-2 font-montserratMedium rounded-full px-6 py-1">ЗБОРИ
					</button>
				</div>


					<MainContent
						activeSection={activeSection}
						reviews={reviews}
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
