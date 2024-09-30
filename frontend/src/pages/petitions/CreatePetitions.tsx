import React from 'react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";

const CreatePetitions: React.FC = () => {
	return (
		<>
			<MainHeader />
			<div className="flex justify-center items-center w-full mt-24">
				<div className="w-full bg-white shadow-md rounded-lg p-8">
					<h1 className="text-center text-3xl font-normal font-kharkiv mb-6">ЗАПОВНІТЬ ДАНІ</h1>
					<form className=" mx-32">
						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-number">
								Номер петиції*
							</label>
							<input
								id="petition-number"
								type="text"
								placeholder="Номер"
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
						</div>
						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-title">
								Назва петиції*
							</label>
							<input
								id="petition-title"
								type="text"
								placeholder="Назва"
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
						</div>
						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-author">
								Автор петиції*
							</label>
							<input
								id="petition-author"
								type="text"
								placeholder="Автор"
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
						</div>
						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-date">
								Дата оприлюднення*
							</label>
							<input
								id="petition-date"
								type="text"
								placeholder="Дата петиції - ДД / ММ / РРРР"
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
						</div>
						<div className="mb-4">
							<label className="block font-montserratMedium mb-2">
								Петиція з відповіддю*
							</label>
							<div className="flex items-center">
								<input
									type="radio"
									name="response"
									className="form-radio h-4 w-4 text-blue-500"
								/>
								<span className="ml-2">Петиція з відповіддю</span>
							</div>
						</div>
						<div className="mb-4">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-text">
								Текст петиції*
							</label>
							<textarea
								id="petition-text"
								placeholder="Ваш текст"
								className="resize-none w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-1 focus:ring-gray-300"
								rows={4}
							></textarea>
						</div>
						<div className="mb-6">
							<label className="block font-montserratMedium mb-2" htmlFor="petition-link">
								Посилання на петицію*
							</label>
							<input
								id="petition-link"
								type="text"
								placeholder="Посилання"
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
							/>
						</div>
						<div className="text-center">
							<button
								type="submit"
								className="w-full bg-perfect-yellow text-almost-black font-montserratRegular py-2 rounded-3xl hover:bg-orange-400 transition duration-200"
							>
								СТВОРИТИ
							</button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default CreatePetitions;
