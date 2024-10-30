import React, {useEffect, useState} from 'react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import Footer from "../../components/Footer.tsx";
import { Button } from "../../ui/Button.tsx";
import SearchPetitions from "../../modules/petitions/components/SearchPetitions.tsx";
import DownArrowIcon from '../../modules/main-page/assets/Down_Arrow_Main.svg?react';

import {useNavigate, useSearchParams} from "react-router-dom";
import PetitionCard from "../../modules/petitions/components/PetitionCard.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import {getFilteredPetitions} from "../../modules/petitions/api/petitionsService.ts";
import {useTranslation} from "react-i18next";
import {SideBarPetitions} from "../../modules/petitions/components/SideBarPetitions.tsx";
import {Map} from "../../modules/main-page/components/Map.tsx";
import {Player} from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../assets/animations/logoLoading.json";
import NothingFound from "../../assets/images/NothingFound.png";
import {Helmet} from "react-helmet-async";

const PetitionPage: React.FC = () => {

	const navigate = useNavigate();

	const handleGoCreatePetions = () => {
		navigate('/add-petition');
	};

	const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' >('ASC');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const [petitions, setPetitions] = useState<any[]>([]);
	const [filteredPetitions, setFilteredPetitions] = useState<any[] | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	const limit = 12;
	const { role, isLoading } = useAuth();
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const {t} = useTranslation();

	const [isMapMenuOpen, setIsMapMenuOpen] = useState(false);

	// get petitions by search/filters

	// Получение петиций при изменении параметров поиска
	useEffect(() => {
		const fetchPetitions = async () => {
			if (isLoading || !role) return; // Проверка на загрузку

			const query = searchParams.get('query') || '';
			const currentSortOrder = (searchParams.get('sortOrder') as 'ASC' | 'DESC') || 'ASC';
			const field = searchParams.get('sortField') || 'deadline';
			const topic = searchParams.get('topic') || '';
			const types = searchParams.getAll('types');
			const ukraine = searchParams.get('ukraine') === 'true';

			setOffset(0);
			setSortOrder(currentSortOrder);

			try {
				let data = await getFilteredPetitions(query, limit, 0, currentSortOrder, field, topic, types, ukraine);
				setPetitions(data);
				setOffset(limit);

				if (data.length < limit) {
					setHasMore(false);
				} else {
					setHasMore(true);
				}
			} catch (error) {
				console.error('Error fetching petitions:', error);
			}
		};

		fetchPetitions();
	}, [role, searchParams, sortOrder, isLoading]);

	// Показ анимации загрузки, если данные все еще загружаются
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Player
					autoplay
					loop
					src={loadingAnimation}
					style={{ height: '200px', width: '200px' }}
				/>
			</div>
		);
	}

	// sort
	const handleSort = (field: 'signatureCount' | 'creationDate' | 'deadline') => {
		setOffset(0);
		toggleDropdown();
		setSearchParams(prev => {
			const newParams = new URLSearchParams(prev);
			newParams.set('sortField', field);
			newParams.set('sortOrder', 'ASC');
			return newParams;
		});
		window.location.reload();
	};

	// pagination
	const loadMorePetitions = async () => {
		const query = searchParams.get('query') || '';
		const currentSortOrder = (searchParams.get('sortOrder') as 'ASC' | 'DESC') || 'ASC';
		const field = searchParams.get('sortField') || 'deadline';
		const topic = searchParams.get('topic') || '';
		const types = searchParams.getAll('types');
		const ukraine = searchParams.get('ukraine') === 'true';
		try {
			const data = await getFilteredPetitions(query, limit, 0, currentSortOrder, field, topic, types, ukraine);
			setPetitions(prev => [...prev, ...data]);
			setOffset(offset + limit);
			if (data.length < limit) {
				setHasMore(false);
			}
		} catch (error) {
			console.error('Error loading more announcements:', error);
		}
	};

	// apply filters
	const handleApplyFilters = (filtered: any[]) => {
		setFilteredPetitions(filtered);

		const topic = searchParams.get('topic') || '';
		const types = searchParams.getAll('types');
		const ukraine = searchParams.get('ukraine') === 'true';

		setSearchParams(prev => {
			const newParams = new URLSearchParams(prev);
			if (topic) newParams.set('topic', topic);
			if (types.length) {
				newParams.delete('types');
				types.forEach(type => newParams.append('types', type));
			}
			if (ukraine) {
				newParams.set('ukraine', 'true');
			} else {
				newParams.delete('ukraine');
			}

			return newParams;
		});

		console.log(filtered);
		window.location.reload();
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleOpenMap = () => {
		setIsMapMenuOpen(true);
		setIsMobileMenuOpen(false);
	};

	const backToFilters = () => {
		setIsMapMenuOpen(false);
		setIsMobileMenuOpen(true);
	};

	// filter by map
	const handleUsersByRadiusFound = () => {
		//setAnnouncements(users);
		//  setIsMapMenuOpen(false);
		setHasMore(false);
	};

	return (
		<>
			<Helmet>
				<title>{t('helmet_petitions')}</title>
				<meta name="description" content="Створіть та підпишіть петицію для підтримки важливих ініціатив. Долучайтеся до спільноти, щоб змінити світ на краще!" />
				<meta name="keywords" content="петиції, Synara, підтримка, ініціативи, волонтерство" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://synara.help/petitions" />
			</Helmet>

			<Wrapper>
				<MainHeader />

				<div className="flex flex-col w-full items-center mt-20">
					{/* Top Section: Create Petition, Search, Filter, and Sort */}
					<div className="flex  sm:flex-col md:flex-row xl:flex-row xl:w-full sm:w-[90%] items-center md:mb-0 sm:mb-0 xl:mb-2">
						{/* Left Side - Create Petition Button */}
						<Button onClick={handleGoCreatePetions} hasBlue={true}
								className="h-12 sm:w-full md:w-[25%] xl:w-[25%] font-montserratMedium sm:text-xs md:text-xs xl:text-relative-h5">
							{t('create_petitionUPPER')}
						</Button>

						{/* Center - Search Component */}
						<div className="xl:ml-4 md:ml-4 sm:ml-0 xl:mt-0 md:mt-0 sm:mt-2 w-full h-14">
							<SearchPetitions/>
						</div>
					</div>

					<div className="flex md:flex-row xl:flex-row sm:flex-col  xl:w-full sm:w-[90%] justify-between mb-8">
						{/* Left Side - Filter Button */}
						<Button hasBlue={true} className="px-4 -py-0.5 text-relative-h5 sm:mb-2 xl:mb-0 md:mb-0"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
							<span className="text-montserratMedium text-relative-h5 ">{t('filter')}</span>
						</Button>

						{/* Right Side - Sort Button */}
						<div className="relative w-full md:w-3/4 justify-end flex xl:w-auto">
							<Button
								hasBlue={true}
								className={`px-2 z-11 w-full md:w-auto xl:w-auto text-relative-h5 flex items-center justify-center space-x-3 transition-all duration-0 ${isDropdownOpen ? 'rounded-b-none rounded-t-3xl' : 'rounded-3xl'}`}
								onClick={toggleDropdown}
							>
								<span className="text-montserratMedium text-relative-h5">{t('sort_by')}</span>
								<DownArrowIcon
									className={`h-3 w-3 mt-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
								/>
							</Button>

							{isDropdownOpen && (
								<div
									className="w-full bg-white border-2 border-blue-500 rounded-b-3xl absolute left-0 top-full z-10 -mt-1">
									<div
										className="cursor-pointer text-center py-2 px-2 border-b-2 border-blue-500 text-black"
										onClick={() => handleSort('signatureCount')}
									>
										{t('by_amount_captions')}
									</div>
									<div
										className="cursor-pointer text-center py-2 px-2 border-b-2 border-blue-500 text-black"
										onClick={() => handleSort('creationDate')}
									>
										{t('by_created_date')}
									</div>
									<div
										className="cursor-pointer text-center py-2 px-2 text-black"
										onClick={() => handleSort('deadline')}
									>
										{t('by_deadline')}
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Petition List Grid */}
					<div
						className="grid xl:grid-cols-3 sm:grid-cols-1 xl:px-0 md:px-0 sm:px-4 md:grid-cols-2 gap-6 w-full">
						{(filteredPetitions || petitions).length > 0 ? (
							(filteredPetitions || petitions).map((petition, index) => (
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
						) : (
							<div className="flex items-center justify-center my-[10%] xl:ml-[30vw] w-full text-gray-500">
								<div
									className="text-center font-montserratMedium flex flex-col items-center justify-center">
									<img src={NothingFound} className="xl:w-[20vw] xl:h-auto sm:w-[50vw] md:w-[20vw] md:h-auto mb-4"/>
									{t('now_no_gathering_exist')}
								</div>
							</div>
						)}
					</div>


					{/* Load More Button */}
					{hasMore && (
						<div className="w-full flex justify-center mt-8">
							<Button isFilled={true} className="uppercase" onClick={loadMorePetitions}>
								{t('show_more')}
							</Button>
						</div>
					)}
				</div>
				<SideBarPetitions
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
					onApplyFilters={handleApplyFilters}
					onOpenMap={handleOpenMap}
				/>
				<Map
					isOpen={isMapMenuOpen}
					onClose={() => setIsMapMenuOpen(false)}
					onBackToFilters={backToFilters}
					onUsersByRadiusFound={handleUsersByRadiusFound}
				/>
				<Footer/>
			</Wrapper>

		</>
	);
};

export default PetitionPage;
