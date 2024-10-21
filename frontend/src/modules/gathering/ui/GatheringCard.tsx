import React from 'react';
import { useTranslation } from "react-i18next";

interface DonationCardProps {
	id: string;
	title: string;
	description: string;
	goal: number;
	raised: number;
	percentage: number;
}

const GatheringCard: React.FC<DonationCardProps> = ({ title, description, goal, raised, percentage }) => {
	const { t } = useTranslation();

	return (
		<div className={`w-full xl:h-[55vh] sm:h-[55vh] border-4 border-dark-blue rounded-3xl p-8 flex flex-col justify-between`}>
			<div className="xl:mt-0 md:mt-4 sm:mt-0">
				<h3 className={`xl:text-h4 md:text-relative-h3xl sm:text-relative-h1 font-kharkiv`}>{title}</h3>
				<p className="xl:text-xs-ps md:text-relative-pxl sm:text-relative-h2 font-montserratRegular text-almost-black mt-4">
					{description}
				</p>
			</div>
			<div className="mt-4">
				<p className="xl:text-pxl md:text-relative-h3 font-montserratMedium mt-4">{t('goal')}: {goal.toLocaleString()}</p>
				<p className="xl:text-pxl md:text-relative-h4 font-montserratRegular">{t('collected')}: {raised.toLocaleString()}</p>
				<div className="w-full bg-almost-white h-11 border-2 border-dark-blue rounded-3xl mt-6 xl:mt-3">
					<div
						className="bg-dark-blue h-10 rounded-3xl flex items-center justify-center"
						style={{ width: `${Math.floor(percentage)}%` }}
					>
            <span
				className={`font-montserratMedium ${percentage === 0 ? 'text-blue-500 sm:ml-[10vw] xl:ml-[5vw]' : 'text-white'}`}
			>
              {`${Math.floor(percentage)}%`}
            </span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GatheringCard;
