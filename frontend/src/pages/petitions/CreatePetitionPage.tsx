import React, { ChangeEvent, useState } from 'react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import VectorWhite from '../../assets/images/VectorWhite.svg?react';
import { ukrainianPetitionTopics } from "../../data/petitionTopicsList.ts";
import {createPetition} from "../../modules/petitions/api/petitionsService.ts";
import {useNavigate} from "react-router-dom";

import {Player} from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../assets/animations/logoLoading.json";
import {useTranslation} from "react-i18next";
import {ukrainianPetitionTypes} from "../../data/petitionTypesList.ts";


const CreatePetitionPage: React.FC = () => {
	const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({
		terms: false,
	});
	const [inputValue, setInputValue] = useState<string>('');
	const [inputValueType, setInputValueType] = useState<string>('');
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [isFocusedType, setIsFocusedType] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		petitionNumber: '',
		petitionTitle: '',
		petitionAuthor: '',
		petitionTopic: '',
		petitionType: '',
		petitionText: '',
		petitionLink: '',
		petitionDate: '',
		responseDate: '',
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const {t} = useTranslation();

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.petitionNumber) {
			newErrors.petitionNumber = t('number_of_petition_required');
		}
		if (!formData.petitionTitle) {
			newErrors.petitionTitle = t('name_of_petition_required');
		}
		if (!formData.petitionAuthor) {
			newErrors.petitionAuthor = t('author_of_petition_required');
		}
		if (!formData.petitionTopic) {
			newErrors.petitionTopic = t('topic_of_petition_required');
		}
		if (!formData.petitionType) {
			newErrors.petitionType = t('type_of_petition_required');
		}
		if (!formData.petitionDate) {
			newErrors.petitionDate = t('date_of_petition_required');
		}
		if (!formData.petitionText) {
			newErrors.petitionText = t('text_of_petition_required');
		}
		if (!formData.petitionLink) {
			newErrors.petitionLink = t('link_of_petition_required');
		}
		if (selectedOptions.terms && !formData.responseDate) {
			newErrors.responseDate = t('date_of_respond_required');
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			setLoading(true);

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
					topic: formData.petitionTopic,
					type: formData.petitionType,
					petitionNumber: formData.petitionNumber,
					petitionAuthor: formData.petitionAuthor,
					text: formData.petitionText,
					link: formData.petitionLink,
					creationDate: formattedPetitionDate,
					hasResponse: selectedOptions.terms,
					responseDate: formattedResponseDate || null,
					isCompleted: false,
				};

				console.log("requestData -> ", requestData);
				await createPetition(requestData);
				navigate("/petitions");
			} catch (error) {
				console.error('Ошибка при отправке петиции:', error);
			} finally {
				setLoading(false);
			}
		}
	};

	if (loading) {
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

	const filteredTypes = ukrainianPetitionTypes.filter(type =>
		type.toLowerCase().includes(inputValue.toLowerCase())
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
					<h1 className="text-center text-3xl font-normal font-kharkiv mb-6">{t('fill_dataUPPER')}</h1>
					<form className="xl:mx-32 sm:mx-0" onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-number">
								{t('petition_number')}*
							</label>
							<input
								id="petitionNumber"
								type="text"
								placeholder={t('number')}
								value={formData.petitionNumber}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-dark-blue rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
							{errors.petitionNumber && <p className="text-red-500">{errors.petitionNumber}</p>}
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-title">
								{t('name_petition')}*
							</label>
							<input
								id="petitionTitle"
								type="text"
								placeholder={t('name_petition_hint')}
								value={formData.petitionTitle}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-dark-blue rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
							{errors.petitionTitle && <p className="text-red-500">{errors.petitionTitle}</p>}
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-author">
								{t('petition_author')}*
							</label>
							<input
								id="petitionAuthor"
								type="text"
								placeholder={t('author')}
								value={formData.petitionAuthor}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-dark-blue rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
							{errors.petitionAuthor && <p className="text-red-500">{errors.petitionAuthor}</p>}
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-type">
								{t('petition_type')}*
							</label>
							<div className="relative">
								<input
									type="text"
									value={inputValueType}
									onChange={(e) => setInputValueType(e.target.value)}
									onFocus={() => setIsFocusedType(true)}
									placeholder={t('type')}
									className="w-full p-3 border rounded-lg outline-none border-dark-blue focus:border-dark-blue"
								/>
								{isFocusedType && filteredTypes.length > 0 && (
									<ul className="absolute w-full border border-dark-blue bg-white rounded-lg z-10 max-h-40 overflow-y-auto">
										{filteredTypes.map((type) => (
											<li
												key={type}
												onClick={() => {
													setFormData((prevData) => ({
														...prevData,
														petitionType: type,
													}));
													setInputValueType(type);
													setIsFocusedType(false);
												}}

												className="p-2 cursor-pointer hover:bg-gray-100"
											>
												{type}
											</li>
										))}
									</ul>
								)}
							</div>
							{errors.petitionType && <p className="text-red-500">{errors.petitionType}</p>}
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-type">
								{t('petition_topic')}*
							</label>
							<div className="relative">
								<input
									type="text"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onFocus={() => setIsFocused(true)}
									placeholder={t('topic')}
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
														petitionTopic: topic,
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
							{errors.petitionTopic && <p className="text-red-500">{errors.petitionTopic}</p>}
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-date">
								{t('date_of_promulgation')}*
							</label>
							<input
								id="petitionDate"
								type="text"
								placeholder={t('date_petition')}
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
									{t('petition_with_answer')}*
									{selectedOptions.terms ? (
										<input
											id="responseDate"
											type="text"
											placeholder={t('date_of_answer')}
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
								{t('text_petition')}*
							</label>
							<textarea
								id="petitionText"
								placeholder={t('text_petition')}
								value={formData.petitionText}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-dark-blue rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							></textarea>
							{errors.petitionText && <p className="text-red-500">{errors.petitionText}</p>}
						</div>

						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-link">
								{t('link_to_petition')}*
							</label>
							<input
								id="petitionLink"
								type="text"
								placeholder={t('link')}
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
								{t('createUPPER')}
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
