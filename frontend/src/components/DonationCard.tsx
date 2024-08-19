import React from 'react';

interface DonationCardProps {
    title: string;
    description: string;
    goal: number;
    raised: number;
    percentage: number;
    className: string;
}

const DonationCard: React.FC<DonationCardProps> = ({ title, description, goal, raised, percentage, className }) => {
    return (
        <div className={`w-full xl:w-4/12 md:w-auto h-full border-4 border-dark-blue rounded-3xl p-8 flex flex-col justify-between ${className}`}>
            <div className="mt-4">
                <h3 className={`xl:text-h3 md:text-relative-h3xl font-kharkiv ${className}`}>{title}</h3>
                <p className="xl:text-pxl md:text-relative-h4 font-montserratRegular text-almost-black mt-2">
                    {description}
                </p>
            </div>
            <div className="mt-8">
                <p className="xl:text-pxl md:text-relative-h3 font-montserratMedium mt-4">Ціль: {goal.toLocaleString()}</p>
                <p className="xl:text-pxl md:text-relative-h4 font-montserratRegular">Зібрано: {raised.toLocaleString()}</p>
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


export default DonationCard;
