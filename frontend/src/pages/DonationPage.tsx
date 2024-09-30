import React, {useState} from 'react';
import MainHeader from "../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../components/Footer.tsx";


import {Button} from "../ui/Button.tsx";

import DownArrowIcon from '../modules/main-page/assets/Down_Arrow_Main.svg?react';
import SearchGathering from "../modules/donations/ui/SearchGathering.tsx";
import GatheringCard from "../modules/donations/ui/GatheringCard.tsx";
import Wrapper from "../ui/Wrapper.tsx";


const calculatePercentage = (goal: number, raised: number) => {
	return (raised / goal) * 100;
};

const goal1 = 100000;
const raised1 = 65000;
const percentage1 = calculatePercentage(goal1, raised1);

const goal2 = 72000;
const raised2 = 21600;
const percentage2 = calculatePercentage(goal2, raised2);

const goal3 = 378000;
const raised3 = 181440;
const percentage3 = calculatePercentage(goal3, raised3);

const donationCards = [
	{
		title: "Збір на авто для 36 бригади",
		description: "Допоможіть забезпечити 36 бригаду надійним транспортом для швидкого пересування, евакуації поранених та доставки боєприпасів.",
		goal: goal1,
		raised: raised1,
		percentage: percentage1
	},
	{
		title: "Зимовий одяг для ВПО",
		description: "Допоможіть внутрішньо переміщеним особам пережити зиму в теплі.Кожна ваша пожертва - це крок до комфорту та гідності.",
		goal: goal2,
		raised: raised2,
		percentage: percentage2
	},
	{
		title: "Протези для поранених",
		description: "Наші захисники заслуговують на найкраще. Допоможіть їм отримати сучасні протези та повернутися до активного життя.",
		goal: goal3,
		raised: raised3,
		percentage: percentage3
	},
	{
		title: "Збір на авто для 36 бригади",
		description: "Допоможіть забезпечити 36 бригаду надійним транспортом для швидкого пересування, евакуації поранених та доставки боєприпасів.",
		goal: goal1,
		raised: raised1,
		percentage: percentage1
	},
	{
		title: "Зимовий одяг для ВПО",
		description: "Допоможіть внутрішньо переміщеним особам пережити зиму в теплі.Кожна ваша пожертва - це крок до комфорту та гідності.",
		goal: goal2,
		raised: raised2,
		percentage: percentage2
	},
	{
		title: "Протези для поранених",
		description: "Наші захисники заслуговують на найкраще. Допоможіть їм отримати сучасні протези та повернутися до активного життя.",
		goal: goal3,
		raised: raised3,
		percentage: percentage3
	},
	{
		title: "Збір на авто для 36 бригади",
		description: "Допоможіть забезпечити 36 бригаду надійним транспортом для швидкого пересування, евакуації поранених та доставки боєприпасів.",
		goal: goal1,
		raised: raised1,
		percentage: percentage1
	},
	{
		title: "Зимовий одяг для ВПО",
		description: "Допоможіть внутрішньо переміщеним особам пережити зиму в теплі.Кожна ваша пожертва - це крок до комфорту та гідності.",
		goal: goal2,
		raised: raised2,
		percentage: percentage2
	},
	{
		title: "Протези для поранених",
		description: "Наші захисники заслуговують на найкраще. Допоможіть їм отримати сучасні протези та повернутися до активного життя.",
		goal: goal3,
		raised: raised3,
		percentage: percentage3
	},
	// Add more donation cards as needed
];

const DonationPage: React.FC = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<>
			<Wrapper>
			<MainHeader/>

			<div className="py-5 px-4 mt-24">
				<div className="w-full mb-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
					{/* Left Side - Filters Button */}
					<div className="ml-28 w-1/4 flex items-start justify-start">
						<Button
							hasBlue={true}
							className="px-4 text-relative-h5 w-full"
						>
							<span className="text-montserratMedium text-relative-h5">Фільтрувати</span>
						</Button>
					</div>

					{/* Center - Search Component */}
					<div className="mx-3 w-[280%] h-[50px] mt-4 md:mt-0 flex justify-center">
						<SearchGathering/>
					</div>

					{/* Right Side - Sort Button with Dropdown */}
					<div className="w-full flex justify-end">
						<div className="relative w-full">
							<Button
								hasBlue={true}
								className={`px-2 z-11 w-full md:w-auto text-relative-h5 flex items-center justify-center space-x-3 transition-all duration-0 ${isDropdownOpen ? 'rounded-b-none rounded-t-3xl' : 'rounded-3xl'}`}
								onClick={toggleDropdown}
							>
								<span className="text-montserratMedium text-relative-h5">Сотрувати за</span>
								<DownArrowIcon
									className={`h-3 w-3 mt-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
								/>
							</Button>

							{/* Dropdown content */}
							{/*{isDropdownOpen && (
				<div className="w-full bg-white border-2 border-blue-500 rounded-b-3xl absolute left-0 top-full z-10 -mt-1">
					<div className={`cursor-pointer py-2 px-4 border-b-2 border-blue-500 ${sortOrder === 'DESC' ? 'text-blue-500' : 'text-black'}`} onClick={() => handleSort('DESC')}>
						{t('firstly_new')}
					</div>
					<div className={`cursor-pointer py-2 px-4 ${sortOrder === 'ASC' ? 'text-blue-500' : 'text-black'}`} onClick={() => handleSort('ASC')}>
						{t('old_for_first')}
					</div>
				</div>
			)}*/}
						</div>
					</div>
				</div>

				{/* Responsive grid: 1 column on small screens, 2 on medium, and 3 on large */}
				<div className="w-[85%] ml-28 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{donationCards.map((donation, index) => (
						<GatheringCard
							className=""
							key={index}
							title={donation.title}
							description={donation.description}
							goal={donation.goal}
							raised={donation.raised}
							percentage={donation.percentage}
						/>
					))}
				</div>
				<div className="flex justify-center mt-6">
					<button
						className="bg-perfect-yellow text-black hover:bg-yellow-600 px-6 py-2 font-montserratRegular rounded-3xl">
						ПОКАЗАТИ ЩЕ
					</button>
				</div>
			</div>
			<Footer/>
			</Wrapper>
		</>
	);
};

export default DonationPage;
