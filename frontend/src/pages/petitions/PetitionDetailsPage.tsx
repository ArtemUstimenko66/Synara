import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Wrapper from "../../ui/Wrapper.tsx";
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import { Button } from "../../ui/Button.tsx";
import Footer from "../../components/Footer.tsx";
import Calendar from '../../modules/main-page/assets/Calendar.svg?react';
import AvtorPetitions from '../../modules/petitions/assets/AvtorPetitions.svg?react';
import SMS from '../../modules/petitions/assets/SMS.svg?react';
import Heart from '../../modules/gathering/assets/Heart.svg?react';
import FullHeart from '../../modules/gathering/assets/FullHeart.svg?react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import {addPetitionToFavorites, fetchPetitionDetails} from "../../modules/petitions/api/petitionsService.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchPetitions from "../../modules/petitions/components/SearchPetitions.tsx";
import {Player} from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../assets/animations/logoLoading.json";

interface GatheringDetails {
    id: number;
    creationDate: string;
    hasResponse: boolean;
    is_completed: boolean;
    is_favorite: boolean;
    link: string;
    petitionAuthor: string;
    petitionNumber: string;
    responseDate: string;
    text: string;
    title: string;
    topic: string;
}


const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'd MMMM yyyy', { locale: uk }); // Добавлен год
};

const GatheringDetailsPage = () => {
    const { id } = useParams();
    const [details, setDetails] = useState<GatheringDetails | null>(null);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const loadDetails = async () => {
            if (id) {
                const data = await fetchPetitionDetails(Number(id));
                console.log(data);
                setDetails(data);
                setIsFavorite(data.is_favorite);
            }
        };
        loadDetails();
    }, [id]);

    if (!details) {
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

    const handleGoCreatePetions = () => {
        navigate('/add-petition');
    };

    const handleAddToFavorites = async () => {
        const isSuccess = await addPetitionToFavorites(details.id);
        if (isSuccess) {
            setIsFavorite(true);
        }
    };


    return (
        <>
            <Wrapper>
                <MainHeader />
                <div className="mt-[9vh]">
                    <div className="flex w-full items-center mb-8">
                        {/* Left Side - Create Petition Button */}
                        <Button onClick={handleGoCreatePetions} hasBlue={true}
                                className="h-12 sm:w-[27%] md:w-[25%] xl:w-[25%] font-montserratMedium sm:text-xs md:text-xs xl:text-relative-h5">
                            СТВОРИТИ ПЕТИЦІЮ
                        </Button>

                        {/* Center - Search Component */}
                        <div className="ml-4 w-full h-14">
                            <SearchPetitions />
                        </div>
                    </div>

                    <div className="flex items-start w-full ">
                        <h2 className="text-lg ml-12 font-montserratMedium mt-1 ">№{details.petitionNumber}</h2>
                        <h1 className="text-4xl font-kharkiv uppercase text-center w-full">{details.title}</h1>
                    </div>
                    {/* Detailed Petition View */}
                    <div className="w-full flex justify-between mt-8">
                        {/* Левая часть с основным контентом */}
                        <div className="w-2/3 ">
                            <div className="mb-6 ml-12">
                                <p className="mb-2 flex items-center font-montserratRegular">
                                    <AvtorPetitions className="h-5 w-5  mr-6"/>
                                    АВТОР (ІНІЦІАТОР): {details.petitionAuthor}
                                </p>
                                <p className="mb-2 font-montserratRegular flex items-center">
                                    <Calendar className="h-5 w-5 mr-6" />
                                    ДАТА ОПРИЛЮДНЕННЯ: {formatDate(details.creationDate)}
                                </p>
                                {details.responseDate ?
                                    <p className="font-montserratRegular flex items-center">
                                        <SMS className="h-5 w-5  mr-6"/>
                                        ДАТА ВІДПОВІДІ: {formatDate(details.responseDate)}
                                    </p>
                                    :
                                    <></>
                                }

                                <h3 className="text-xl font-montserratMedium my-12">ТЕКСТ ПЕТИЦІЇ</h3>
                            </div>

                            <p className="font-montserratRegular ml-12 mb-6 leading-7 w-[90%]">
                                {details.text}
                            </p>
                        </div>

                        {/* Правая боковая панель */}
                        <div className="w-1/3 h-fit p-8 bg-gray-100 rounded-3xl ">
                            <div className="mb-6">
                                {details.is_completed ?
                                    <Button
                                        className="w-full py-1 border-2 border-green-600 text-green-600 font-semibold rounded-3xl cursor-default">
                                        ЗБІР ПІДПИСІВ ЗАВЕРШЕНО
                                    </Button>
                                    :
                                    <a href={details.link} target="_blank"
                                       rel="noopener noreferrer">
                                        <Button
                                            className="w-full py-1 border-2 uppercase border-dark-blue text-dark-blue font-semibold rounded-3xl cursor-default">
                                            Підписати
                                        </Button>
                                    </a>

                                }
                            </div>

                            <h3 className="text-lg font-montserratRegular mb-4 uppercase">Поділіться петицією:</h3>
                            <div className="mt-2 flex justify-center space-x-6">
                                <a href="#" aria-label="Facebook">
                                    <FontAwesomeIcon icon={['fab', 'facebook-f']} className="h-6 w-6"/>
                                </a>
                                <a href="#" aria-label="Instagram">
                                    <FontAwesomeIcon icon={['fab', 'instagram']} className="h-7 w-7"/>
                                </a>
                                <a href="#" aria-label="Twitter">
                                    <FontAwesomeIcon icon={['fab', 'twitter']} className="h-6 w-6"/>
                                </a>
                                <a href="#" aria-label="Telegram">
                                    <FontAwesomeIcon icon={['fab', 'telegram-plane']} className="h-6 w-6"/>
                                </a>
                            </div>
                            <div className="mt-8 w-full">
                                <Button
                                    onClick={handleAddToFavorites}
                                    className="flex items-center justify-center text-center w-full bg-perfect-yellow rounded-3xl font-montserratRegular"
                                >
                                    {isFavorite ? (
                                        <FullHeart className="h-5 w-5 mr-2"/>
                                    ) : (
                                        <Heart className="h-6 w-6 mr-2"/>
                                    )}
                                    В ОБРАНЕ
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </Wrapper>
        </>
    );
};

export default GatheringDetailsPage;
