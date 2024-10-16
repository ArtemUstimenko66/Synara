import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '../../main-page/assets/searchIcon.svg?react';
import {useTranslation} from "react-i18next";

const SearchPetitions: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [, setSearchParams] = useSearchParams();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setSearchParams({ query: searchTerm });
			setSearchTerm('');
			if (inputRef.current) {
				inputRef.current.blur();
			}
		}
	};
	const {t} = useTranslation();

	return (
		<div className="flex items-center w-full bg-blue-100 rounded-full p-2 h-[85%]">
			<div className="pr-4 ">
				<SearchIcon />
			</div>
			<input
				type="text"
				value={searchTerm}
				onChange={handleInputChange}
				onKeyPress={handleKeyPress}
				placeholder={t('search_petition')}
				className="w-full bg-transparent text-almost-black text-montserratMedium placeholder-black focus:outline-none"
				ref={inputRef}
			/>
		</div>
	);
};

export default SearchPetitions;
