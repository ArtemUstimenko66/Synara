import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import MainHeader from '../../modules/main-page/components/ui/MainHeader.tsx';
import Footer from '../../components/Footer.tsx';
import { Button } from '../../ui/Button.tsx';
import DownArrowIcon from '../../modules/main-page/assets/Down_Arrow_Main.svg?react';
import SearchGathering from '../../modules/gathering/ui/SearchGathering.tsx';
import GatheringCard from '../../modules/gathering/ui/GatheringCard.tsx';
import Wrapper from '../../ui/Wrapper.tsx';
import {SideBarGatherings} from "../../modules/gathering/components/SideBarGatherings.tsx";
import {fetchGatherings} from "../../modules/gathering/api/gatheringPageService.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import ModalForbidden from "../../modules/gathering/components/ui/ModalForbidden.tsx";



const calculatePercentage = (goal: number, raised: number) => {
	return (raised / goal) * 100;
};

const GatheringPage: React.FC = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [gatherings, setGatherings] = useState<any[]>([]);
	const [offset, setOffset] = useState(0);
	const [, setFilteredGatherings] = useState<any[]>([]);
	const limit = 12;
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
	const [hasMore, setHasMore] = useState(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



	const { unp, birthDate , isAuthenticated} = useAuth(); // получение данных из хука
	const [showForbiddenModal, setShowForbiddenModal] = useState(false); // состояние для показа модального окна
	const navigate = useNavigate(); // навигация


	const handleCreateGathering = () => {
		if(isAuthenticated){
			if (!birthDate) return false;
			if (!unp || Number(birthDate) < 18) {
				console.log("setShowForbiddenModal")
				setShowForbiddenModal(true);
			} else {
				navigate('/add-gathering');
			}
		}else{
			navigate('/login');
		}

	};


	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const fetchFilteredGatherings = async () => {

		const query = searchParams.get('query') || '';
		const types = searchParams.getAll('typeEnding');
		const moneyTo = parseFloat(searchParams.get('moneyTo') || 'NaN');
		const moneyFrom = parseFloat(searchParams.get('moneyFrom') || 'NaN');
		const urgencyParam = searchParams.get('isUrgent');
		const urgency = urgencyParam === 'true' ? true : urgencyParam === 'false' ? false : undefined;

		setOffset(0);

		try {
			const data = await fetchGatherings(query, types, limit, 0, moneyFrom, moneyTo, sortOrder, urgency);
			setGatherings(data);
			setOffset(limit);

			setHasMore(data.length >= limit);
		} catch (error) {
			console.error('Error fetching gatherings:', error);
		}
	};


	useEffect(() => {
		fetchFilteredGatherings();
	}, [searchParams, sortOrder]);


	const handleSort = (order: 'ASC' | 'DESC') => {
		setSortOrder(order);
		setSearchParams(prev => {
			const newParams = new URLSearchParams(prev);
			newParams.set('sortOrder', order);
			return newParams;
		});
		toggleDropdown();
	};

	const loadMoreGatherings = async () => {
		const query = searchParams.get('query') || '';
		const types = searchParams.getAll('typeEnding');
		const moneyTo = parseFloat(searchParams.get('moneyTo') || 'NaN');
		const moneyFrom = parseFloat(searchParams.get('moneyFrom') || 'NaN');
		const urgencyParam = searchParams.get('isUrgent');
		const urgency = urgencyParam === 'true' ? true : urgencyParam === 'false' ? false : undefined;

		try {
			const data = await fetchGatherings(query, types, limit, offset, moneyFrom, moneyTo, sortOrder, urgency);
			setGatherings(prev => [...prev, ...data]);
			setOffset(prev => prev + limit);

			setHasMore(data.length >= limit);
		} catch (error) {
			console.error('Error loading more gatherings:', error);
		}
	};

	const handleApplyFilters = (filtered: any[]) => {
		setFilteredGatherings(filtered);
	};

	return (
		<>
			<Wrapper>
				<MainHeader />

				<div className="w-full max-w-[80vw] mx-auto mt-[9vh]">

					<div className="w-full mb-8 space-y-4">
						{/* Верхняя строка с кнопкой "Створити збір" и полем поиска */}
						<div
							className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
							{/* Кнопка "Створити збір" (1/3 ширины) */}
							<div className="w-3/12">

									<Button hasBlue={true} className="px-4 text-relative-h5 w-full" onClick={handleCreateGathering}>
                                    <span className="text-montserratMedium uppercase text-relative-h5">
                                        Створити збір
                                    </span>
									</Button>

							</div>

							{/* Поле поиска (2/3 ширины) */}
							<div className="w-9/12 h-[50px] ml-[1vw] flex justify-center">
								<SearchGathering/>
							</div>
						</div>

						{/* Нижняя строка с фильтрами и сортировкой */}
						<div className="w-full flex justify-between items-center">
							{/* Кнопка "Фільтрувати" (прижата к левой части) */}
							<div className="w-2/12">
								<Button hasBlue={true} className="px-4 text-relative-h5 w-full"
										onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
									<span className="text-montserratMedium text-relative-h5">Фільтрувати</span>
								</Button>
							</div>

							{/* Кнопка сортировки (прижата к правой части) */}
							<div className="w-2/12 flex justify-end">
								<div className="relative w-full">
									<Button
										hasBlue={true}
										className={` z-11 px-4 w-full text-relative-h5 flex items-center justify-center space-x-3 transition-all duration-0 ${isDropdownOpen ? 'rounded-b-none rounded-t-3xl' : 'rounded-3xl'}`}
										onClick={toggleDropdown}
									>
										<span className="text-montserratMedium text-relative-h5">Сортувати за</span>
										<DownArrowIcon
											className={`h-3 w-3 mt-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
										/>
									</Button>

									{isDropdownOpen && (
										<div
											className="w-full bg-white border-2 border-blue-500 rounded-b-3xl absolute left-0 top-full z-10 -mt-1">
											<Button onClick={() => handleSort('ASC')}
													className={`cursor-pointer py-2 px-2 border-b-2 border-blue-500 ${sortOrder === 'DESC' ? 'text-blue-500' : 'text-black'}`}>
												Сортувати за зростанням
											</Button>
											<Button onClick={() => handleSort('DESC')}
													className={`cursor-pointer py-2 px-10 ${sortOrder === 'ASC' ? 'text-blue-500' : 'text-black'}`}>
												Сортувати за спаданням
											</Button>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>


					<div className="flex flex-col md:flex-row">
						<div className="w-full flex justify-between">
							<div className="w-full mt-4 ml-4 flex flex-wrap justify-start">
								{gatherings.length > 0 ? (
									gatherings.map((gathering, index) => (
										<Link to={`/gathering/${gathering.id}`} key={index}
											  className="w-full md:w-[48%] xl:w-[32%] mr-[1vw] p-2 mt-4">
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
								) : (
									<div className="flex items-center justify-center my-[20%] w-full text-gray-500">
										<div className="text-center font-montserratMedium">
											Наразі немає зборів за обраними фільтрами
										</div>
									</div>
								)}
							</div>
						</div>

					</div>


					{hasMore && (
						<div className="flex justify-center mt-6">
							<button
								onClick={loadMoreGatherings}
								className="bg-perfect-yellow text-black hover:bg-yellow-600 px-6 py-2 font-montserratRegular rounded-3xl"
							>
								ПОКАЗАТИ ЩЕ
							</button>
						</div>
					)}
				</div>
				<SideBarGatherings
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
					onApplyFilters={handleApplyFilters}
				/>
				<Footer/>
			</Wrapper>
			{showForbiddenModal && <ModalForbidden onClose={() => setShowForbiddenModal(false)} />}
		</>
	);
};

export default GatheringPage;
