import React from 'react';
import Calendar from '../../../modules/main-page/assets/Calendar.svg?react';
import { Button } from "../../../ui/Button.tsx";
import { useNavigate } from 'react-router-dom';

interface PetitionCardProps {
    id: string;
    petitionNumber: string;
    topic: string;
    creationDate: string;
    text: string;
}

const formatDateToUkrainian = (isoDate: string): string => {
    const date = new Date(isoDate);

    const months = [
        'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
        'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
    ];

    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
};

const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

const PetitionCard: React.FC<PetitionCardProps> = ({ id, petitionNumber, topic, creationDate, text }) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/petition/${id}`);
    };

    return (
        <div className="bg-gray-100 rounded-3xl p-6 flex flex-col justify-between">
            <h3 className="text-xl text-center font-montserratMedium font-bold mb-2">{petitionNumber}</h3>
            <h4 className="text-pl text-center font-montserratRegular mb-8">{topic}</h4>
            <div className="flex flex-row mb-4">
                <Calendar className="h-6 w-6 mr-2"/>
                <p className="font-montserratRegular mb-4">{formatDateToUkrainian(creationDate)}</p>
            </div>
            <p className="text-sm text-gray-700 mb-12">{truncateText(text, 300)}</p>

            <div className="flex justify-center">
                <Button className="text-center px-4 py-2 bg-perfect-yellow font-montserratRegular rounded-3xl"
                        onClick={handleDetailsClick}>
                    ДЕТАЛЬНІШЕ
                </Button>
            </div>
        </div>
    );
};

export default PetitionCard;