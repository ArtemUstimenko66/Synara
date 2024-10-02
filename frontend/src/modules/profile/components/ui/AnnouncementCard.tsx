import React from 'react';

import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import {getHelpToKey} from "../../../../data/helpTypesMap.ts";
import { Button } from '../../../../ui/Button.tsx';

interface AnnouncementProps {
	id: string;
	datePosted: Date;
	description: string;
	typeHelp: string;
	is_urgent: string;
}

const AnnouncementCard: React.FC<AnnouncementProps> = ({
													   id,
													   datePosted,
													   description,
													   typeHelp,
													   is_urgent,
												   }) => {

	const currentDate = new Date();
	const postedDate = new Date(datePosted);
	const diffTime = postedDate.getTime() - currentDate.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const { t } = useTranslation();
	const navigate = useNavigate();

	const isDateInFuture = diffTime > 0;

	const handleDetailsClick = () => {
		navigate(`/main/announcement/${id}`);
	};

	return (
		<div className="bg-perfect-gray w-full rounded-3xl flex flex-col h-full">
			<div className="flex justify-end w-full mt-[3vh] items-end">
				{isDateInFuture && is_urgent && diffDays <= 5 && (
					<div
						className="text-blue-500 font-montserratMedium px-[10%] font-medium border-2 border-dark-blue rounded-full text-relative-h5 mr-4">
						{diffDays} {diffDays === 1 ? t('day_announcement') : diffDays <= 4 ? t('day_announcement_v_2') : t('day_announcement_v_3')}
					</div>
				)}
				<span
					className="bg-blue-500 w-7/12 text-white text-relative-h5 px-4 pr-5 pl-10 py-1 font-montserratRegular font-normal tracking-wide rounded-l-full">
                     {t(getHelpToKey(typeHelp))}
                </span>
			</div>

			<p className="text-relative-p mb-4 font-montserratMedium p-4 ml-4">
				{description}
			</p>

			<div className="flex justify-center items-center font-montserratMedium ml-4 mb-4 p-4">
				<Button
					isFilled={true}
					onClick={handleDetailsClick}
					className="uppercase px-4 py-2 rounded-full text-relative-p bg-perfect-yellow"
				>
					{t('more_details')}
				</Button>
			</div>
		</div>
	);
};

export default AnnouncementCard;
