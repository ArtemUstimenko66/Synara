import { SetStateAction, useEffect, useState} from 'react';
import { useParams, useSearchParams} from 'react-router-dom';
import Wrapper from "../../ui/Wrapper.tsx";
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import {Button} from "../../ui/Button.tsx";
import Footer from "../../components/Footer.tsx";
import Heart from '../../modules/gathering/assets/Heart.svg?react';
import LeftSlide from '../../modules/gathering/assets/LeftSlide.svg?react';
import RightSlide from '../../modules/gathering/assets/RightSlide.svg?react';
import Calendar from '../../modules/main-page/assets/Calendar.svg?react';
import User from '../../modules/main-page/assets/User.svg?react';
import PlaceMarker from '../../modules/main-page/assets/PlaceMarker.svg?react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTranslation} from "react-i18next";
import SearchComponent from "../../modules/main-page/components/ui/SearchComponent.tsx";
import {
    fetchAnnouncementDetails,
    getFilteredAnnouncements,
} from "../../modules/main-page/api/mainPageService.ts";
import {getHelpToKey} from "../../data/helpTypesMap.ts";

import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../assets/animations/logoLoading.json';
import Announcement from "../../modules/main-page/components/Announcement.tsx";
import {urgencyTranslations} from "../../data/urgencyMap.ts";
import {useAuth} from "../../hooks/useAuth.ts";

interface AnnouncementDetails {
    id: number;
    user: { avatarUrl: string, firstName: string, lastName: string, phoneNumber: string };
    date_posted: Date;
    description: string;
    type_help: string;
    viewsCount: number;
    responsesCount: number;
    is_urgent: string;
    currentLocation: string;
    createdAt: Date;
    details: string;
    title: string;
    files: Array<{ id: number, fileName: string, fileUrl: string, fileType: string }>;
}


const AnnouncementDetailsPage = () => {
    const {id} = useParams();
    const [details, setDetails] = useState<AnnouncementDetails | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [filteredAnnouncements, ] = useState<any[] | null>(null);
    const [searchParams, ] = useSearchParams();

    const limit = 4;
    const {t} = useTranslation();
    const { role, isLoading } = useAuth();
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [hasShowMore, setShowHasMore] = useState(true);

    // get announcements by search/filters
    useEffect(() => {
        const fetchAnnouncements = async () => {
            if (isLoading || !role) return;

            const query = searchParams.get('query') || '';
            const data = await fetchAnnouncementDetails(Number(id));
            const types = Array.isArray(data.type_help) ? data.type_help : [data.type_help];
            const urgencyParam = searchParams.get('isUrgent');
            const urgency = urgencyParam === 'true' ? true : urgencyParam === 'false' ? false : undefined;

            setOffset(0);


            try {
                let dataFetched = await getFilteredAnnouncements(query, types, limit, 0, 'ASC', urgency);
                if(dataFetched.length > 0) {
                    setShowHasMore(true);
                }else{
                    setShowHasMore(false);
                }
                const filteredData = dataFetched.filter((item: { id: any; }) => item.id !== data.id);

                setAnnouncements(filteredData);
                setOffset(limit);

                if (data.length < limit) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, [role, searchParams, isLoading]);

    // pagination
    const loadMoreAnnouncements = async () => {
        const data = await fetchAnnouncementDetails(Number(id));
        const types = Array.isArray(data.type_help) ? data.type_help : [data.type_help];
        const query = searchParams.get('query') || '';
        const urgencyParam = searchParams.get('isUrgent');
        const urgency = urgencyParam === 'true' ? true : (urgencyParam === 'false' ? false : undefined);
        try {
            const data = await getFilteredAnnouncements(query, types, limit, offset, 'ASC', urgency);
            setAnnouncements(prev => [...prev, ...data]);
            setOffset(offset + limit);
            if (data.length < limit) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading more announcements:', error);
        }
    };


    useEffect(() => {
        const loadDetails = async () => {
            if (id) {
                const data = await fetchAnnouncementDetails(Number(id));
                console.log(data);
                setDetails(data);
            }
        };
        loadDetails();
    }, [id]);


    if (!details) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Player
                    autoplay
                    loop
                    src={loadingAnimation}
                    style={{ height: '200px', width: '200px' }}
                />
            </div>
        );
    }


    const handleImageSelect = (index: number) => {
        setSelectedImageIndex(index);
    };

    const openModal = (index: SetStateAction<number>) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleNextImage = () => {
        if (selectedImageIndex < details.files.length - 1) {
            setSelectedImageIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex((prevIndex) => prevIndex - 1);
        }
    };

    const formattedDate = new Date(details.date_posted).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long'
    });

    const formattedDateCreated = new Date(details.createdAt).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long'
    });

    const currentDate = new Date();
    const postedDate = new Date(details.date_posted);
    const diffTime = postedDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const isDateInFuture = diffTime > 0;

    return (
        <>
            <Wrapper>
                <MainHeader />
                <div className="w-full max-w-[80vw] mx-auto mt-[9vh]">
                    <div className="flex flex-row space-x-4 items-center  justify-center">
                        <div className="w-full md:w-1/2 xl:w-1/4 flex flex-col items-center mb-[1vh] justify-start">
                            {/* Help Map Button */}
                            <Button hasBlue={true}
                                    className="uppercase text-relative-h5 px-8 py-3 my-5 w-full xl:w-full">
                                {t('map_of_help')}
                            </Button>
                        </div>

                        <div className="w-full  md:w-1/2 xl:w-3/4 flex flex-col items-center justify-end">
                            {/* Search Component */}
                            <div className="w-full mt-4  mb-3 md:mt-0">
                                <SearchComponent/>
                            </div>
                        </div>
                    </div>

                    {/* Main part */}
                    <div className="max-w-screen-lg h-auto mx-auto p-4">
                        {/* Заголовок по центру */}
                        <h1 className="text-relative-h4 font-kharkiv uppercase text-center">
                            {details.title}
                        </h1>


                        {/* Основной контент: левая и правая часть */}
                        <div className="flex flex-row h-auto gap-8 mt-8">
                            {/* Левая часть (2/3 ширины) */}
                            <div className="w-full h-auto md:w-7/12">
                                <p className="font-montserratRegular text-relative-ps mt-4">{details.description}</p>
                                <p className="font-medium text-relative-pl font-montserratMedium mt-4">Деталі:</p>
                                <p className="font-montserratRegular text-relative-ps mt-4">{details.details}</p>
                            </div>

                            {/* Правая часть (1/3 ширины) */}
                            <div
                                className="w-full md:w-5/12 flex flex-col bg-gray-100 h-auto rounded-3xl pr-[2vw] py-[4vh] flex-1">


                                <div className="flex justify-between w-full items-center">
                                    <span
                                        className="bg-blue-500 text-white font-montserratRegular text-relative-ps px-4 pr-[5vw] py-1 rounded-r-full">
                                        {t(getHelpToKey(details.type_help))}
                                    </span>
                                    {isDateInFuture && details.is_urgent && diffDays <= 5 && (
                                        <div
                                            className="text-blue-500 border-2 border-dark-blue rounded-full text-relative-ps px-[2vw]">
                                            {diffDays} {diffDays === 1 ? t('day_announcement') : t('day_announcement_v_2')}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center pl-[2vw]  mt-4">
                                    <Calendar className="mr-2"/>
                                    <p className="font-montserratRegular font-semibold text-relative-ps ">
                                        {`${formattedDateCreated} -
                                        ${formattedDate}`}</p>
                                </div>

                                <div className="flex items-center pl-[2vw] mt-4">
                                    <PlaceMarker className="mr-2"/>
                                    <p className="font-montserratRegular font-semibold text-relative-ps">
                                        Місце: {details.currentLocation}
                                    </p>
                                </div>

                                <div className="flex items-center pl-[2vw]">
                                    <User className="mr-2"/>
                                    <div className="flex flex-col items-start mt-4">
                                        <p className="font-montserratRegular font-semibold text-relative-ps mt-4">
                                            Переглянули оголошення: {details.viewsCount}
                                        </p>
                                        <p className="font-montserratRegular font-semibold text-relative-ps mt-4">
                                            Відгукнулись: {details.responsesCount}
                                        </p>
                                    </div>
                                </div>


                                <div className="flex items-center justify-start p-4 mb-2 mt-4 ml-4">
                                    <img
                                        src={details.user.avatarUrl}
                                        alt="User Avatar"
                                        className="w-16 h-16 rounded-full object-cover mr-3"
                                    />
                                    <div className="pl-[2vw]">
                                        <p className="text-relative-ps font-montserratMedium font-semibold uppercase">Автор
                                            оголошення:</p>
                                        <h4 className=" text-relative-ps font-montserratMedium">{details.user.firstName} {details.user.lastName}</h4>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center pl-[2vw]">
                                    <p className="font-semibold text-relative-ps font-montserratMedium uppercase">Контакти:</p>
                                    <p className="font-montserratRegular text-relative-ps pl-[1vw] uppercase"> {details.user.phoneNumber}</p>
                                </div>

                                {/* Social media icons */}
                                <p className="uppercase mt-4 pl-[2vw] text-relative-ps">Поділіться:</p>
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

                                {/* Donate and to favorite buttons */}
                                <div className="flex flex-col pl-[2vw] justify-between space-y-3 mt-4">
                                    <Button hasBlue={true} className="py-3 px-4 uppercase bg-almost-white">
                                        Задонатити зараз
                                    </Button>
                                    <Button isFilled={true} className="py-3 px-4 justify-between uppercase">
                                        <div className="flex flex-row justify-center">
                                            <Heart className="h-6 w-6 mx-3"/>
                                            В обране
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Изображение с соседними картинками */}

                        <div className="flex justify-center my-[4vh]">
                            <div className="flex items-center">
                                {selectedImageIndex > 0 && (
                                    <div
                                        className="justify-center flex w-[25vw] mx-[1vw] h-[28vh]"
                                        onClick={() => openModal(selectedImageIndex - 1)}
                                    >
                                        <img
                                            src={details.files[selectedImageIndex - 1].fileUrl}
                                            alt={details.files[selectedImageIndex].fileName}
                                            className="w-full h-auto rounded-lg cursor-pointer"
                                        />
                                    </div>
                                )}
                                <div
                                    className="justify-center flex w-[25vw] mx-[1vw] h-[28vh]"
                                    onClick={() => openModal(selectedImageIndex)}
                                >
                                    <img
                                        src={details.files[selectedImageIndex].fileUrl}
                                        alt={details.files[selectedImageIndex].fileName}
                                        className="w-full h-auto rounded-lg cursor-pointer"
                                    />
                                </div>
                                {selectedImageIndex < details.files.length - 1 && (
                                    <div
                                        className="justify-center flex w-[25vw] mx-[1vw] h-[28vh]"
                                        onClick={() => openModal(selectedImageIndex + 1)}
                                    >
                                        <img
                                            src={details.files[selectedImageIndex + 1].fileUrl}
                                            alt={details.files[selectedImageIndex].fileName}
                                            className="w-full h-auto rounded-lg cursor-pointer"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Полоски выбора изображений */}
                        <div className="flex justify-center mt-2 space-x-2">
                            {details.files.length >= 3 ?
                                (details.files.map((_, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleImageSelect(index)}
                                        className={`h-2 cursor-pointer rounded-full transition-all duration-500 ease-in-out
                                                    ${selectedImageIndex === index ? 'bg-dark-blue w-12' : 'bg-baby-blue w-8'}`}
                                    ></div>
                                )))
                                :
                                <></>
                            }
                        </div>

                        {/* Модальное окно для отображения выбранного изображения */}
                        {isModalOpen && (
                            <div
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
                                onClick={closeModal}>
                                <div className="relative">

                                    <img
                                        src={details.files[selectedImageIndex].fileUrl}
                                        alt={details.files[selectedImageIndex].fileName}
                                        className="flex w-[65vw] mx-[1vw] h-[70vh] rounded-lg"
                                    />

                                </div>


                                {/* Левая стрелка */}
                                {selectedImageIndex > 0 && (
                                    <div
                                        className="absolute left-[4vw] top-1/2 ь transform -translate-y-1/2 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Предотвращаем закрытие модального окна
                                            handlePrevImage();
                                        }}
                                    >
                                        <LeftSlide className="h-10 w-10 text-white"/>
                                    </div>
                                )}

                                {/* Правая стрелка */}
                                {selectedImageIndex < details.files.length - 1 && (
                                    <div
                                        className="absolute right-[4vw] top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Предотвращаем закрытие модального окна
                                            handleNextImage();
                                        }}
                                    >
                                        <RightSlide className="h-10 w-10 text-white"/>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {hasShowMore
                        ?
                        <>
                            <h1 className="text-relative-h4 font-kharkiv uppercase mt-[10vh] text-center">
                                Схожі оголошення
                            </h1>

                            <div className="flex flex-col">
                                <div className="w-full flex justify-between">
                                    <div className="w-full mt-4 ml-4 flex flex-wrap justify-start">
                                        {(filteredAnnouncements || announcements).length > 0 ? (
                                            (filteredAnnouncements || announcements).map((announcement, index) => (
                                                <div key={index} className="w-full md:w-[48%] xl:w-[32%] mr-[1vw] p-2 mt-4">
                                                    <Announcement
                                                        id={`${announcement.id}`}
                                                        userName={`${announcement.user.firstName} ${announcement.user.lastName}`}
                                                        avatar={announcement.user.avatarUrl || 'https://via.placeholder.com/150'}
                                                        datePosted={announcement.date_posted}
                                                        description={announcement.description}
                                                        typeHelp={announcement.type_help}
                                                        is_urgent={urgencyTranslations[announcement.is_urgent] || announcement.is_urgent}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex items-center justify-center my-[20%] w-full text-gray-500">
                                                <div className="text-center font-montserratMedium">
                                                    {t('no_announcements_by_this_filters')}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {hasMore && (
                                <div className="w-full flex justify-center mt-8">
                                    <Button isFilled={true} className="uppercase" onClick={loadMoreAnnouncements}>
                                        {t('show_more')}
                                    </Button>
                                </div>
                            )}
                        </>
                        :
                        <></>
                    }


                </div>
            <Footer/>
        </Wrapper>
    </>
    );
};

export default AnnouncementDetailsPage;
