import React, { useState } from 'react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import Footer from "../../components/Footer.tsx";
import { Button } from "../../ui/Button.tsx";
import SearchPetitions from "./SearchPetitions.tsx";
import DownArrowIcon from '../../modules/main-page/assets/Down_Arrow_Main.svg?react';
import Calendar from '../../assets/images/Calendar.svg?react';
import AvtorPetitions from '../../assets/images/AvtorPetitions.svg?react';
import SMS from '../../assets/images/SMS.svg?react';
import Telegram from '../../assets/images/Telegram.svg?react';
import Instagram from '../../assets/images/Instagram.svg?react';
import Twitter from '../../assets/images/Twitter.svg?react';
import Facebook from '../../assets/images/Facebook.svg?react';
import Heart from '../../assets/images/Heart.svg?react';
import {useNavigate} from "react-router-dom";

const Petitions: React.FC = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedPetition, ] = useState(null);
//setSelectedPetition
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// const handlePetitionClick = (petition: React.SetStateAction<null>) => {
	// 	setSelectedPetition(petition);
	// };


	const navigate = useNavigate(); // Initialize the navigate function

	const handleGoHome = () => {
		navigate('/createpetitions'); // Redirect to the /main route
	};
	const petitions = [
		{
			id: '№22/232764-en',
			date: '23 вересня 2024',
			title: 'Без теми',
			description: 'Створення державного символу — «Прапор Надії»...',
			fullText: 'Проблеми, пов\'язані із забезпеченням воєнної безпеки нашої\n' +
				'держави, були актуальними з перших днів незалежності України. За\n' +
				'нинішньої воєнно-політичної обстановки у світі, коли багато країн не\n' +
				'виключає можливості використання збройних сил задля реалізації\n' +
				'своїх національних інтересів, та з появою нових загроз, пов\'язаних з\n' +
				'діяльністю міжнародних терористичних угруповань, саме оборонна сфера\n' +
				'стає однією з найважливіших складових забезпечення необхідних умов\n' +
				'життєдіяльності і розвитку суспільства.\n' +
				'Однією з вихідних категорій, що застосовується для розкриття\n' +
				'сутності та змісту процесів забезпечення оборони нашої країни, і які\n' +
				'часто зустрічаються у нормативно-правових документах України, а\n' +
				'також в науковій літературі, є категорія „обороноздатність держави”.\n' +
				'Офіційне трактування цього терміна було сформульоване ще 1991 року\n' +
				'в Законі України „Про оборону України” (це трактування збереглося й\n' +
				'досі): „Обороноздатність держави – здатність держави до захисту у разі\n' +
				'збройної агресії або збройного конфлікту. Вона складається з матеріальних\n' +
				'і духовних елементів та є сукупністю воєнного, економічного, соціального\n' +
				'та морально-політичного потенціалу у сфері оборони та належних умов\n' +
				'для його реалізації” [9].\n' +
				'Це визначення відображало погляди ще радянських військових\n' +
				'теоретиків й було практично ідентичним до даного ще 1978 року в\n' +
				'Радянській воєнній енциклопедії - найбільш повному й авторитетному в\n' +
				'СРСР енциклопедичному виданні з воєнної проблематики [14, с. 668]. Це',
		},
		{
			id: '№22/230884-en',
			date: '23 липня 2024',
			title: 'Обмеження роботи онлайн казино',
			description: 'Забезпечити повне блокування роботи...',
			fullText: 'Проблеми, пов\'язані із забезпеченням воєнної безпеки нашої\n' +
				'держави, були актуальними з перших днів незалежності України. За\n' +
				'нинішньої воєнно-політичної обстановки у світі, коли багато країн не\n' +
				'виключає можливості використання збройних сил задля реалізації\n' +
				'своїх національних інтересів, та з появою нових загроз, пов\'язаних з\n' +
				'діяльністю міжнародних терористичних угруповань, саме оборонна сфера\n' +
				'стає однією з найважливіших складових забезпечення необхідних умов\n' +
				'життєдіяльності і розвитку суспільства.\n' +
				'Однією з вихідних категорій, що застосовується для розкриття\n' +
				'сутності та змісту процесів забезпечення оборони нашої країни, і які\n' +
				'часто зустрічаються у нормативно-правових документах України, а\n' +
				'також в науковій літературі, є категорія „обороноздатність держави”.\n' +
				'Офіційне трактування цього терміна було сформульоване ще 1991 року\n' +
				'в Законі України „Про оборону України” (це трактування збереглося й\n' +
				'досі): „Обороноздатність держави – здатність держави до захисту у разі\n' +
				'збройної агресії або збройного конфлікту. Вона складається з матеріальних\n' +
				'і духовних елементів та є сукупністю воєнного, економічного, соціального\n' +
				'та морально-політичного потенціалу у сфері оборони та належних умов\n' +
				'для його реалізації” [9].\n' +
				'Це визначення відображало погляди ще радянських військових\n' +
				'теоретиків й було практично ідентичним до даного ще 1978 року в\n' +
				'Радянській воєнній енциклопедії - найбільш повному й авторитетному в\n' +
				'СРСР енциклопедичному виданні з воєнної проблематики [14, с. 668]. Це',
		},
		// Add more petition objects as needed...
	];


	// @ts-ignore
	return (
		<>
			<Wrapper>
				<MainHeader />

				<div className="flex flex-col w-full items-center mt-20">
					{/* Top Section: Create Petition, Search, Filter, and Sort */}
					<div className="flex w-full items-center mb-8">
						{/* Left Side - Create Petition Button */}
						<Button onClick={handleGoHome} hasBlue={true} className="h-12 sm:w-[27%] md:w-[25%] xl:w-[25%] font-montserratMedium sm:text-xs md:text-xs xl:text-relative-h5">
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
						<div className="relative">
							<Button
								hasBlue={true}
								className={`px-4 -py-0.5 text-relative-h5 flex items-center justify-center transition-all duration-300 ${isDropdownOpen ? '' : ''}`}
								onClick={toggleDropdown}
							>
								Сортування за
								<DownArrowIcon
									className={`ml-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
								/>
							</Button>

							{/* Styled Dropdown Content */}
							{isDropdownOpen && (
								<div className="absolute right-0 mt-2 w-[100%] bg-white border border-gray-300 rounded-lg ">
									<ul className="divide-y divide-gray-200">
										<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">За датою створення</li>
										<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">За кількість підписів</li>
										<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">За дедлайном</li>
										<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">За статусом</li>
									</ul>
								</div>
							)}
						</div>
					</div>

					{/* Conditional Rendering: Show List or Detailed View */}
					{!selectedPetition ? (
						<>
							{/* Petition List Grid */}
							<div className="grid xl:grid-cols-3 sm:grid-cols-1 xl:px-0 md:px-0 sm:px-4 md:grid-cols-2 gap-6 w-full">
								{petitions.map((petition, index) => (
									<div key={index} className="bg-gray-half rounded-3xl p-6 flex flex-col justify-between">
										<h3 className="text-xl text-center font-montserratMedium font-bold mb-2">{petition.id}</h3>
										<h4 className="text-pl text-center font-montserratRegular mb-8">{petition.title}</h4>
										<div className="flex flex-row mb-4">
											<Calendar className="h-6 w-6 mr-2"/>
											<p className="font-montserratRegular mb-4">{petition.date}</p>
										</div>
										<p className="text-sm text-gray-700 mb-12">{petition.description}</p>

										{/* Flex container to center the button */}
										<div className="flex justify-center">
											<Button
												className="text-center px-4 py-2 bg-perfect-yellow font-montserratRegular rounded-3xl"
												// onClick={() => handlePetitionClick(petition)}
											>
												ДЕТАЛЬНІШЕ
											</Button>
										</div>
									</div>
								))}
							</div>

							{/* Load More Button */}
							<div className="mt-8">
								<Button className="text-center px-4 py-2 bg-perfect-yellow font-montserratRegular rounded-3xl">
									ПОКАЗАТИ ЩЕ
								</Button>
							</div>
						</>
					) : (
						<>
							<div className="flex items-start w-full ">
								{/*<h2 className="text-lg font-montserratMedium mt-1 mr-4">{selectedPetition.id}</h2>*/}
								{/*<h1 className="text-4xl font-kharkiv uppercase">{selectedPetition.title}</h1>*/}
							</div>
							{/* Detailed Petition View */}
							<div className="w-full flex justify-between mt-8">
								{/* Левая часть с основным контентом */}
								<div className="w-2/3 ">

									<div className="mb-6 ml-12">
										<p className="mb-2 flex items-center font-montserratRegular">
											<AvtorPetitions className="h-5 w-5  mr-6"/>
											АВТОР (ІНІЦІАТОР): Петренко Павло Вікторович
										</p>
										<p className="mb-2 font-montserratRegular flex items-center">
											<Calendar className="h-5 w-5 mr-6"/>
											{/*ДАТА ОПРИЛЮДНЕННЯ: {selectedPetition.date}*/}
										</p>
										<p className="mb-12 font-montserratRegular flex items-center">
											<SMS className="h-5 w-5  mr-6"/>
											ДАТА ВІДПОВІДІ: 29 ТРАВНЯ 2024
										</p>
										<h3 className="text-xl font-montserratMedium mb-12">ТЕКСТ ПЕТИЦІЇ</h3>
									</div>

									<p className="font-montserratRegular mb-6 leading-7 w-[90%]">
										{/*{selectedPetition.fullText}*/}
									</p>

								</div>

								{/* Правая боковая панель */}
								<div className="w-1/3 h-[10%] p-8 bg-gray-half rounded-3xl shadow-md">
									<div className="mb-6">
										<Button
											className="w-full py-1 border-2 border-green-600 text-green-600 font-semibold rounded-3xl cursor-default">
											ЗБІР ПІДПИСІВ ЗАВЕРШЕНО
										</Button>
									</div>

									<h3 className="text-lg  font-montserratRegular mb-4 uppercase">Поділіться
										петицією:</h3>
									<div className="flex justify-center">
										<Button className="p-2  text-white rounded-full">
											<Facebook className="h-6 w-6"/>
										</Button>
										<Button className="p-2  text-white rounded-full">
											<Instagram className="h-6 w-6"/>
										</Button>
										<Button className="p-2  text-white rounded-full">
											<Twitter className="h-6 w-6"/>
										</Button>
										<Button className="p-2  text-white rounded-full">
											<Telegram className="h-6 w-6"/>
										</Button>
									</div>
									<div className="mt-8 w-full">
										<Button className="flex items-center justify-center text-center w-full bg-perfect-yellow rounded-3xl font-montserratRegular">
											<Heart className="h-6 w-6 mr-2"/>В ОБРАНЕ
										</Button>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
				<Footer/>
			</Wrapper>
		</>
	);
};

export default Petitions;
