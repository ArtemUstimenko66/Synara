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

const PetitionPage: React.FC = () => {

	const navigate = useNavigate();

	const handleGoCreatePetions = () => {
		navigate('/add-petition');
	};

	const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' >('ASC');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	// const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const [petitions, setPetitions] = useState<any[]>([]);
	//const [filteredPetitions, setFilteredPetitions] = useState<any[] | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	const limit = 12;
	const { role, isLoading } = useAuth();
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const {t} = useTranslation();



	// get petitions by search/filters
	useEffect(() => {
		const fetchPetitions = async () => {
			if (isLoading || !role) return;
			const query = searchParams.get('query') || '';
			const currentSortOrder = (searchParams.get('sortOrder') as 'ASC' | 'DESC') || 'ASC';
			const urgencyParam = searchParams.get('isUrgent');
			const urgency = urgencyParam === 'true' ? true : urgencyParam === 'false' ? false : undefined;

			setOffset(0);
			setSortOrder(currentSortOrder);

			try {
				let data = await getFilteredPetitions(query, limit, 0, currentSortOrder, urgency);
				setPetitions(data);
				setOffset(limit);

				if (data.length < limit) {
					setHasMore(false);
				} else {
					setHasMore(true);
				}
			} catch (error) {
				console.error('Error fetching announcements:', error);
			}
		};

		fetchPetitions();
	}, [role, searchParams, sortOrder, isLoading]);


	// sort
	const handleSort = (order: 'ASC' | 'DESC') => {
		setSortOrder(order);
		setOffset(0);
		toggleDropdown();
		setSearchParams(prev => {
			const newParams = new URLSearchParams(prev);
			newParams.set('sortOrder', order);
			if (prev.has('isUrgent')) {
				newParams.set('isUrgent', prev.get('isUrgent')!);
			}
			return newParams;
		});
		window.location.reload();
	};

	// pagination
	const loadMorePetitions = async () => {
		const query = searchParams.get('query') || '';
		const urgencyParam = searchParams.get('isUrgent');
		const urgency = urgencyParam === 'true' ? true : (urgencyParam === 'false' ? false : undefined);
		try {
			const data = await getFilteredPetitions(query, limit, offset, sortOrder, urgency);
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
	// const handleApplyFilters = (filtered: any[]) => {
	// 	setFilteredAnnouncements(filtered);
	// 	window.location.reload();
	// };

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};


	return (
		<>
			<Wrapper>
				<MainHeader />

				<div className="flex flex-col w-full items-center mt-20">
					{/* Top Section: Create Petition, Search, Filter, and Sort */}
					<div className="flex w-full items-center mb-8">
						{/* Left Side - Create Petition Button */}
						<Button onClick={handleGoCreatePetions} hasBlue={true} className="h-12 sm:w-[27%] md:w-[25%] xl:w-[25%] font-montserratMedium sm:text-xs md:text-xs xl:text-relative-h5">
							СТВОРИТИ ПЕТИЦІЮ
						</Button>

						{/* Center - Search Component */}
						<div className="ml-4 w-full h-14">
							<SearchPetitions />
						</div>
					</div>

					<div className="flex w-full justify-between mb-8">
						{/* Left Side - Filter Button */}
						<Button hasBlue={true} className="px-4 -py-0.5 text-relative-h5">
							Фільтрування
						</Button>

						{/* Right Side - Sort Button */}
						{/*<div className="relative">*/}
						{/*	<Button*/}
						{/*		hasBlue={true}*/}
						{/*		className={`px-4 -py-0.5 text-relative-h5 flex items-center justify-center transition-all duration-300 ${isDropdownOpen ? '' : ''}`}*/}
						{/*		onClick={toggleDropdown}*/}
						{/*	>*/}
						{/*		Сортування за*/}
						{/*		<DownArrowIcon*/}
						{/*			className={`ml-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}*/}
						{/*		/>*/}
						{/*	</Button>*/}

						{/*	/!* Styled Dropdown Content *!/*/}
						{/*	{isDropdownOpen && (*/}
						{/*		<div*/}
						{/*			className="absolute right-0 mt-2 w-[100%] bg-white border border-gray-300 rounded-lg ">*/}
						{/*			<ul className="divide-y divide-gray-200">*/}
						{/*				<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">За датою створення*/}
						{/*				</li>*/}
						{/*				<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">За кількість*/}
						{/*					підписів*/}
						{/*				</li>*/}
						{/*				<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">За дедлайном</li>*/}
						{/*				<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">За статусом</li>*/}
						{/*			</ul>*/}
						{/*		</div>*/}
						{/*	)}*/}
						{/*</div>*/}
						<div className="relative w-full md:w-3/4 xl:w-auto">
							<Button
								hasBlue={true}
								className={`px-2 z-11 w-full md:w-auto xl:w-auto text-relative-h5 flex items-center justify-center space-x-3 transition-all duration-0 ${isDropdownOpen ? 'rounded-b-none rounded-t-3xl' : 'rounded-3xl'}`}
								onClick={toggleDropdown}
							>
                                            <span
												className="text-montserratMedium text-relative-h5">{t('sort_by')}</span>
								<DownArrowIcon
									className={`h-3 w-3 mt-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
								/>
							</Button>

							{isDropdownOpen && (
								<div
									className="w-full bg-white border-2 border-blue-500 rounded-b-3xl absolute left-0 top-full z-10 -mt-1">
									<div
										className={`cursor-pointer py-2 px-4 border-b-2 border-blue-500 ${sortOrder === 'DESC' ? 'text-blue-500' : 'text-black'}`}
										onClick={() => handleSort('DESC')}
									>
										{t('firstly_new')}
									</div>
									<div
										className={`cursor-pointer py-2 px-4 ${sortOrder === 'ASC' ? 'text-blue-500' : 'text-black'}`}
										onClick={() => handleSort('ASC')}
									>
										{t('old_for_first')}
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Petition List Grid */}
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

					{/* Load More Button */}
					{hasMore && (
						<div className="w-full flex justify-center mt-8">
							<Button isFilled={true} className="uppercase" onClick={loadMorePetitions}>
								{t('show_more')}
							</Button>
						</div>
					)}
				</div>
				<Footer/>
			</Wrapper>

		</>
	);
};

export default PetitionPage;
