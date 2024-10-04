import React, { ChangeEvent, useState } from 'react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import VectorWhite from '../../assets/images/VectorWhite.svg?react';
import { ukrainianPetitionTopics } from "../../data/petitionTypesList.ts";
import {createPetition} from "../../modules/petitions/api/petitionsService.ts";

const CreatePetitionPage: React.FC = () => {
	const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({
		terms: false,
	});
	const [inputValue, setInputValue] = useState<string>('');
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		petitionNumber: '',
		petitionTitle: '',
		petitionAuthor: '',
		petitionType: '',
		petitionText: '',
		petitionLink: '',
		petitionDate: '',
		responseDate: '',
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.petitionNumber) {
			newErrors.petitionNumber = 'Номер петиції є обов\'язковим';
		}
		if (!formData.petitionTitle) {
			newErrors.petitionTitle = 'Назва петиції є обов\'язковою';
		}
		if (!formData.petitionAuthor) {
			newErrors.petitionAuthor = 'Автор петиції є обов\'язковим';
		}
		// if (!formData.petitionType) { // Validate petition type from formData
		// 	newErrors.petitionType = 'Тип петиції є обов\'язковим';
		// }
		if (!formData.petitionDate) {
			newErrors.petitionDate = 'Дата петиції є обов\'язковою';
		}
		if (!formData.petitionText) {
			newErrors.petitionText = 'Текст петиції є обов\'язковим';
		}
		if (!formData.petitionLink) {
			newErrors.petitionLink = 'Посилання на петицію є обов\'язковим';
		}
		if (selectedOptions.terms && !formData.responseDate) {
			newErrors.responseDate = 'Дата відповіді є обов\'язковою';
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			try {
				const [day, month, year] = formData.petitionDate.split('/');
				const formattedPetitionDate = new Date(Date.UTC(+year, +month - 1, +day, 12)).toISOString();

				let formattedResponseDate = null;
				if (formData.responseDate) {
					const [resDay, resMonth, resYear] = formData.responseDate.split('/');
					formattedResponseDate = new Date(Date.UTC(+resYear, +resMonth - 1, +resDay, 12)).toISOString();
				}

				const requestData = {
					title: formData.petitionTitle,
					topic: 'Митна політика',
					petitionNumber: formData.petitionNumber,
					petitionAuthor: formData.petitionAuthor,
					text: formData.petitionText,
					link: formData.petitionLink,
					creationDate: formattedPetitionDate,
					hasResponse: selectedOptions.terms,
					responseDate: formattedResponseDate || null,
					isCompleted: false,
				};

				const result = await createPetition(requestData);
				console.log('Петиция успешно отправлена:', result);
			} catch (error) {
				console.error('Ошибка при отправке петиции:', error);
			}
		}
	};


	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		setFormData({
			...formData,
			[id]: value,
		});
	};

	const handleDateChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
		let value = e.target.value.replace(/\D/g, '');
		if (value.length > 8) value = value.slice(0, 8);

		if (value.length >= 2 && value.length <= 4) {
			value = value.replace(/(\d{2})(\d+)/, '$1 / $2');
		} else if (value.length > 4) {
			value = value.replace(/(\d{2})(\d{2})(\d+)/, '$1 / $2 / $3');
		}

		setFormData(prevData => ({
			...prevData,
			[field]: value
		}));

		if (value.length === 10) {
			const formattedDate = `${value.slice(6, 10)}-${value.slice(0, 2)}-${value.slice(3, 5)}`;
			setFormData(prevData => ({
				...prevData,
				[field]: formattedDate
			}));
		}
	};

	const filteredTopics = ukrainianPetitionTopics.filter(topic =>
		topic.toLowerCase().includes(inputValue.toLowerCase())
	);

	const toggleOption = (option: string) => {
		setSelectedOptions(prevState => ({
			...prevState,
			[option]: !prevState[option],
		}));
	};

	return (
		<>
			<MainHeader />
			<div className="flex justify-center items-center w-full mt-24">
				<div className="w-full bg-white rounded-lg p-8">
					<h1 className="text-center text-3xl font-normal font-kharkiv mb-6">ЗАПОВНІТЬ ДАНІ</h1>
					<form className="mx-32" onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-number">
								Номер петиції*
							</label>
							<input
								id="petitionNumber"
								type="text"
								placeholder="Номер"
								value={formData.petitionNumber}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-dark-blue rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
							{errors.petitionNumber && <p className="text-red-500">{errors.petitionNumber}</p>}
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-title">
								Назва петиції*
							</label>
							<input
								id="petitionTitle"
								type="text"
								placeholder="Назва"
								value={formData.petitionTitle}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-dark-blue rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
							{errors.petitionTitle && <p className="text-red-500">{errors.petitionTitle}</p>}
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-author">
								Автор петиції*
							</label>
							<input
								id="petitionAuthor"
								type="text"
								placeholder="Автор"
								value={formData.petitionAuthor}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-dark-blue rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
							{errors.petitionAuthor && <p className="text-red-500">{errors.petitionAuthor}</p>}
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-type">
								Тип петиції*
							</label>
							<div className="relative">
								<input
									type="text"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onFocus={() => setIsFocused(true)}
									onBlur={() => setIsFocused(false)}
									placeholder="Тип"
									className="w-full p-3 border rounded-lg outline-none border-dark-blue focus:border-dark-blue"
								/>
								{isFocused && filteredTopics.length > 0 && (
									<ul className="absolute w-full border border-dark-blue bg-white rounded-lg z-10 max-h-40 overflow-y-auto">
										{filteredTopics.map((topic) => (
											<li
												key={topic}
												onClick={() => {
													setFormData((prevData) => ({
														...prevData,
														petitionType: topic,
													}));
													setInputValue(topic);
													setIsFocused(false);
												}}

												className="p-2 cursor-pointer hover:bg-gray-100"
											>
												{topic}
											</li>
										))}
									</ul>
								)}
							</div>
							{errors.petitionType && <p className="text-red-500">{errors.petitionType}</p>}
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-date">
								Дата оприлюднення*
							</label>
							<input
								id="petitionDate"
								type="text"
								placeholder="Дата петиції - ДД / ММ / РРРР"
								value={formData.petitionDate}
								onChange={(e) => handleDateChange(e, 'petitionDate')}
								className="w-full px-3 py-2 border border-dark-blue rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
							{errors.petitionDate && <p className="text-red-500">{errors.petitionDate}</p>}
						</div>

						<div className="mb-4">
							<div className="xl:mb-4">
								<label className="font-montserratRegular">
									<input
										type="checkbox"
										className="hidden"
										checked={selectedOptions.terms}
										onChange={() => toggleOption('terms')}
									/>
									<span
										className={`w-5 h-5 mr-2 inline-block rounded-full border-2 relative ${
											selectedOptions.terms ? 'bg-blue-500 border-blue-500' : 'border-light-blue'
										}`}
									>
										{selectedOptions.terms && (
											<span
												className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
											<VectorWhite/>
										  </span>
										)}
									</span>
									Петиція з відповіддю*
									{selectedOptions.terms ? (
										<input
											id="responseDate"
											type="text"
											placeholder="Дата відповіді - ДД / ММ / РРРР"
											value={formData.responseDate}
											onChange={(e) => handleDateChange(e, 'responseDate')}
											className="ml-6 w-full px-3 py-2 border border-dark-blue rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
										/>
									) : null}
									{errors.responseDate && <p className="text-red-500">{errors.responseDate}</p>}
								</label>
							</div>
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-text">
								Текст петиції*
							</label>
							<textarea
								id="petitionText"
								placeholder="Текст петиції"
								value={formData.petitionText}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-dark-blue rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							></textarea>
							{errors.petitionText && <p className="text-red-500">{errors.petitionText}</p>}
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-link">
								Посилання на петицію*
							</label>
							<input
								id="petitionLink"
								type="text"
								placeholder="Посилання"
								value={formData.petitionLink}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-dark-blue rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
							{errors.petitionLink && <p className="text-red-500">{errors.petitionLink}</p>}
						</div>

						<div className="text-center">
							<button
								type="submit"
								className="w-full bg-perfect-yellow  text-almost-black font-montserratRegular py-3 rounded-3xl hover:bg-orange-400 transition duration-200"
							>
								СТВОРИТИ
							</button>
						</div>
					</form>
				</div>
			</div>
			<Footer/>
		</>
	);
};

export default CreatePetitionPage;
