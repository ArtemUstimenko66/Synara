import { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
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
import {useTranslation} from "react-i18next";

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
    return format(new Date(dateString), 'd MMMM yyyy', { locale: uk });
};

const GatheringDetailsPage = () => {
    const { id } = useParams();
    const [details, setDetails] = useState<GatheringDetails | null>(null);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const {t} = useTranslation();

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
                    <div className="flex xl:flex-row md:flex-col sm:flex-col w-[95%] items-center mb-8 mx-[2vw]">
                        {/* Left Side - Create Petition Button */}
                        <Button onClick={handleGoCreatePetions} hasBlue={true}
                                className="h-12 sm:w-full  md:w-full  xl:w-[25%] font-montserratMedium sm:text-relative-h2 md:text-relative-h4 xl:text-relative-h5">
                            {t('create_petitionUPPER')}
                        </Button>

                        {/* Center - Search Component */}
                        <div className="xl:ml-4 sm:ml-0 xl:mt-0 sm:mt-4  w-full h-14">
                            <SearchPetitions />
                        </div>
                    </div>

                    <div className="flex xl:flex-row md:flex-col sm:flex-col xl:items-start sm:items-center w-full ">
                        <h2 className="xl:text-relative-ps sm:text-relative-h1 md:text-relative-h2  xl:ml-12 sm:ml-0 font-montserratMedium mt-1 ">№{details.petitionNumber}</h2>
                        <h1 className="xl:text-relative-h4 sm:text-relative-h1 md:text-relative-h2   font-kharkiv uppercase text-center w-full">{details.title}</h1>
                    </div>
                    {/* Detailed Petition View */}
                    <div className="w-full flex xl:flex-row md:flex-col sm:flex-col justify-between mt-8 sm:mx-[5vw]">
                        {/* Левая часть с основным контентом */}
                        <div className="xl:w-2/3 sm:w-full sm:order-2 xl:order-1 sm:mt-[2vh] xl:mt-0">
                            <div className="mb-6  sm:ml-0">
                                <p className="mb-2 flex items-center font-montserratRegular">
                                    <AvtorPetitions className="h-5 w-5  mr-6"/>
                                    {t('author_iniciator')}: {details.petitionAuthor}
                                </p>
                                <p className="mb-2 font-montserratRegular flex items-center">
                                    <Calendar className="h-5 w-5 mr-6"/>
                                    {t('date_publishUPPER')}: {formatDate(details.creationDate)}
                                </p>
                                {details.responseDate ?
                                    <p className="font-montserratRegular flex items-center">
                                        <SMS className="h-5 w-5  mr-6"/>
                                        {t('date_answerUPPER')}: {formatDate(details.responseDate)}
                                    </p>
                                    :
                                    <></>
                                }

                                <h3 className="text-xl font-montserratMedium my-12">{t('text_petitionUPPER')}</h3>
                            </div>

                            <p className="font-montserratRegular sm:ml-0 mb-6 leading-7 w-[90%]">
                                {details.text}
                            </p>

                            <div className="sm:flex md:flex xl:hidden mt-8 w-full">
                                <Link
                                    to="/petitions"
                                    className="px-8 py-2 flex items-center justify-center text-center w-[90%] uppercase bg-perfect-yellow rounded-3xl font-montserratRegular"
                                >

                                    {t('seeMorePetitions')}
                                </Link>
                            </div>
                        </div>

                        {/* Правая боковая панель */}
                        <div
                            className="xl:w-1/3 sm:w-[90%] xl:mr-[10vw]  sm:order-1 xl:order-2 h-fit p-8 bg-gray-100 rounded-3xl ">
                            <div className="mb-6">
                                {details.is_completed ?
                                    <Button
                                        className="w-full py-1 border-2 border-green-600 text-green-600 font-semibold rounded-3xl cursor-default">
                                        {t('collection_captions_end')}
                                    </Button>
                                    :
                                    <a href={details.link} target="_blank"
                                       rel="noopener noreferrer">
                                        <Button
                                            className="w-full py-1 border-2 uppercase border-dark-blue text-dark-blue font-semibold rounded-3xl cursor-default">
                                            {t('sign')}
                                        </Button>
                                    </a>

                                }
                            </div>

                            <h3 className="text-lg font-montserratRegular mb-4 uppercase">{t('share_petition')}:</h3>
                            <div className="mt-2 flex justify-center space-x-6">
                                <a href="#" aria-label="Facebook">
                                    <FontAwesomeIcon icon={['fab', 'facebook-f']} className="h-6 w-6"/>
                                </a>
                                <a href="#" aria-label="Instagram">
                                    <FontAwesomeIcon icon={['fab', 'instagram']} className="h-7 w-7"/>
                                </a>
                                <a href="#" aria-label="Twitter">
                                    <FontAwesomeIcon icon={['fab', 'x-twitter']} className="h-6 w-6"/>
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
                                    {t('to_selectedUPPER')}
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
