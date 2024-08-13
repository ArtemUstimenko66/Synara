import React from 'react';

interface DonationCardProps {
    title: string;
    description: string;
    goal: number;
    raised: number;
    percentage: number;
}

const DonationCard: React.FC<DonationCardProps> = ({ title, description, goal, raised, percentage }) => {
    return (
        <div className="w-4/12 border-4 border-dark-blue rounded-3xl p-8 flex flex-col justify-between">
            <div className="mt-4">
                <h3 className="text-h3 font-kharkiv">{title}</h3>
                <p className="text-1 font-montserratRegular text-almost-black mt-2">
                    {description}
                </p>
            </div>
            <div className="mt-8">
                <p className="text-body font-montserratMedium mt-4">Ціль: {goal.toLocaleString()}</p>
                <p className="text-1 font-montserratRegular">Зібрано: {raised.toLocaleString()}</p>
                <div className="w-full bg-almost-white h-11 border-2 border-dark-blue rounded-3xl mt-12 mb-8">
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
