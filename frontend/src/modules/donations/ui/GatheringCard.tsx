import React from 'react';
import {useTranslation} from "react-i18next";

interface DonationCardProps {
	title: string;
	description: string;
	goal: number;
	raised: number;
	percentage: number;
	className: string;
}

const GatheringCard: React.FC<DonationCardProps> = ({ title, description, goal, raised, percentage, className }) => {
	const { t } = useTranslation();

	return (
		<div className={`w-full xl:w-[90%] sm:h-[110vw] md:w-auto xl:h-[100%] md:h-[54vw] border-4 border-dark-blue rounded-3xl p-8 flex flex-col justify-between ${className}`}>
			<div className="xl:mt-4 md:mt-4 sm:mt-0">
				<h3 className={`xl:text-h4 md:text-relative-h3xl sm:text-relative-h1 font-kharkiv ${className}`}>{title}</h3>
				<p className="xl:text-xs-ps md:text-relative-pxl font-montserratRegular text-almost-black mt-4">
					{description}
				</p>
			</div>
			<div className="mt-6 ">
				<p className="xl:text-pxl md:text-relative-h3 font-montserratMedium mt-4">{t('goal')}: {goal.toLocaleString()}</p>
				<p className="xl:text-pxl md:text-relative-h4 font-montserratRegular">{t('collected')}: {raised.toLocaleString()}</p>
				<div className="w-full bg-almost-white h-11 border-2 border-dark-blue rounded-3xl mt-6 xl:mt-12">
					<div
						className="bg-dark-blue h-10 rounded-3xl flex items-center justify-center"
						style={{ width: `${Math.floor(percentage)}%` }}
					>
                        <span className="text-white font-montserratMedium">
                            {`${Math.floor(percentage)}%`}
                        </span>
					</div>
				</div>
			</div>
		</div>
	);
};


export default GatheringCard;