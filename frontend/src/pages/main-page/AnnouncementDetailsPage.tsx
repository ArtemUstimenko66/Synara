import { SetStateAction, useEffect, useState} from 'react';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import Wrapper from "../../ui/Wrapper.tsx";
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import {Button} from "../../ui/Button.tsx";
import Footer from "../../components/Footer.tsx";
import Heart from '../../modules/gathering/assets/Heart.svg?react';
import FullHeart from '../../modules/gathering/assets/FullHeart.svg?react';
import LeftSlide from '../../modules/gathering/assets/LeftSlide.svg?react';
import RightSlide from '../../modules/gathering/assets/RightSlide.svg?react';
import Calendar from '../../modules/main-page/assets/Calendar.svg?react';
import User from '../../modules/main-page/assets/User.svg?react';
import PlaceMarker from '../../modules/main-page/assets/PlaceMarker.svg?react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTranslation} from "react-i18next";
import SearchComponent from "../../modules/main-page/components/ui/SearchComponent.tsx";
import {
    addAnnouncementToFavorites, cancelAnnouncement, doneAnnouncement,
    fetchAnnouncementDetails,
    getFilteredAnnouncements, incrementViews, respondAnnouncement,
} from "../../modules/main-page/api/mainPageService.ts";
import {getHelpToKey} from "../../data/helpTypesMap.ts";

import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../assets/animations/logoLoading.json';
import Announcement from "../../modules/main-page/components/Announcement.tsx";
import {urgencyTranslations} from "../../data/urgencyMap.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import Cookies from "js-cookie";
import ModalAsk from "../../modules/profile/components/ui/ModalAsk.tsx";
import {useMediaQuery} from "react-responsive";



interface AnnouncementDetails {
    id: number;
    user: { id: number; avatarUrl: string, firstName: string, lastName: string, phoneNumber: string };
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

    const limit = 3;
    const {t} = useTranslation();
    const { role, isLoading } = useAuth();
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [hasShowMore, setShowHasMore] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isCanceled, setIsCancel] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', action: () => {} });
    const navigate = useNavigate();

    const {userId}=useAuth();
    const isTabletScreen = useMediaQuery({ query: '(max-width: 1025px)' });

    const hasViewedAnnouncement = (announcementId: number) => {
        const viewedAnnouncements = Cookies.get('viewedAnnouncements');
        if (viewedAnnouncements) {
            const viewedArray = JSON.parse(viewedAnnouncements);
            return viewedArray.includes(announcementId);
        }
        return false;
    };

    const markAsViewed = (announcementId: number) => {
        const viewedAnnouncements = Cookies.get('viewedAnnouncements');
        let viewedArray = viewedAnnouncements ? JSON.parse(viewedAnnouncements) : [];
        if (!viewedArray.includes(announcementId)) {
            viewedArray.push(announcementId);
            Cookies.set('viewedAnnouncements', JSON.stringify(viewedArray), { expires: 7 });
        }
    };

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
                setIsFavorite(data.is_favorite);
                setIsDone(data.is_completed);
                if (!hasViewedAnnouncement(Number(id))) {
                    await incrementViews(Number(id));
                    markAsViewed(Number(id));
                }
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


    const handleAddToFavorites = async () => {
        const isSuccess = await addAnnouncementToFavorites(details.id);
        if (isSuccess) {
            setIsFavorite(true);
        }
    };

    const handleRespond = async () => {
        if (!details || !details.user) return;

        try {
            const chatId = await respondAnnouncement(details.user.id, details.id);
            console.log('Chat created successfully:', chatId);
            navigate(`/chat/${chatId}`);
        } catch (error) {
            console.error('Failed to create chat:', error);
            navigate(`/chat`);
        }
    };

    let isMyAnnouncement = userId == details.user.id;

    const handleDoneAnnouncement = async () => {
        const isSuccess = await doneAnnouncement(details.id);
        if (isSuccess) {
            setIsDone(true);
        }
    };

    const handleCancelAnnouncement = async () => {
        const isSuccess = await cancelAnnouncement(details.id);
        if (isSuccess) {
            setIsCancel(true);
            navigate('/profile');
        }
    };

    const openModalForDone = () => {
        setModalContent({
            title: t('end_announcement'),
            message: t('you_had_needed_help_and_want_close_ad'),
            action: handleDoneAnnouncement
        });
        setModalOpen(true);
    };

    const openModalForCancel = () => {
        setModalContent({
            title: t('cancel_ad'),
            message: t('are_you_sure_to_cancel_ad'),
            action: handleCancelAnnouncement
        });
        setModalOpen(true);
    };

    return (
        <>
            <Wrapper>
                <MainHeader />
                <div className="w-full max-w-[80vw] mx-auto mt-[9vh]">
                    <div className="flex xl:flex-row md:flex-row sm:flex-col xl:space-x-4 md:space-x-4  sm:space-x-0 sm:space-y-4 md:space-y-0 xl:space-y-0 items-center  justify-center">
                        <div className="w-full md:w-2/6 xl:w-1/4 flex flex-col items-center mb-[1vh] justify-start">
                            {/* Help Map Button */}
                            <Button hasBlue={true}
                                    className="uppercase text-relative-h5 px-8 py-3 xl:my-5 sm:my-0 w-full xl:w-full">
                                {t('map_of_help')}
                            </Button>
                        </div>

                        <div className="w-full  md:w-4/6 xl:w-3/4 flex flex-col items-center justify-end">
                            {/* Search Component */}
                            <div className="w-full xl:mt-4 sm:mb-0 sm:mt-0 xl:mb-3 md:mt-0">
                                <SearchComponent/>
                            </div>
                        </div>
                    </div>

                    {/* Main part */}
                    <div className="max-w-screen-lg h-auto mx-auto p-4">
                        {/* Заголовок по центру */}
                        <h1 className="xl:text-relative-h4 sm:text-relative-h1 font-kharkiv uppercase text-center">
                            {details.title}
                        </h1>


                        {/* Main part */}
                        <div className="flex sm:flex-col xl:flex-row h-auto gap-8 mt-8">
                            {/* Left part (2/3 width) */}
                            <div className="w-full h-auto xl:w-2/3 sm:order-2 xl:order-1 ">
                                <p className="font-montserratRegular xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 mt-4">{details.description}</p>
                                <p className="font-medium xl:text-relative-pl sm:text-relative-h2  font-montserratMedium mt-4">{t('details')}:</p>
                                <p className="font-montserratRegular xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 mt-4">{details.details}</p>
                            </div>

                            {/* Right part (1/3 width) */}
                            <div
                                className="w-full xl:w-1/3  sm:order-1 xl:order-2  flex flex-col bg-gray-100 h-auto rounded-3xl pr-[2vw] py-[4vh] flex-1">


                                <div className="flex justify-between w-full items-center">
                                    <span
                                        className="bg-blue-500 text-white font-montserratRegular xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 px-4 pr-[5vw] py-1 rounded-r-full">
                                        {t(getHelpToKey(details.type_help))}
                                    </span>
                                    {isDateInFuture && details.is_urgent && diffDays <= 5 && (
                                        <div
                                            className="text-blue-500 border-2 border-dark-blue rounded-full xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 px-[2vw]">
                                            {diffDays} {diffDays === 1 ? t('day_announcement') : t('day_announcement_v_2')}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center pl-[2vw]  mt-4">
                                    <Calendar className="mr-2 sm:h-8 sm:w-8"/>
                                    <p className="font-montserratRegular font-semibold xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 ">
                                        {`${formattedDateCreated} -
                                        ${formattedDate}`}</p>
                                </div>

                                <div className="flex items-center pl-[2vw] mt-4">
                                    <PlaceMarker className="mr-2 sm:h-8 sm:w-8"/>
                                    <p className="font-montserratRegular font-semibold xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3">
                                        {t('place')}: {details.currentLocation}
                                    </p>
                                </div>

                                <div className="flex items-center pl-[2vw]">
                                    <User className="mr-2 sm:h-8 sm:w-8"/>
                                    <div className="flex flex-col items-start mt-4">
                                        <p className="font-montserratRegular font-semibold xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 mt-4">
                                            {t('review_ad')}: {details.viewsCount}
                                        </p>
                                        <p className="font-montserratRegular font-semibold xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 mt-4">
                                            {t('responded')}: {details.responsesCount}
                                        </p>
                                    </div>
                                </div>


                                <div className="flex items-center justify-start p-4 mb-2 mt-4 ml-4">
                                    <img
                                        src={details.user.avatarUrl || 'https://via.placeholder.com/150'}
                                        alt="User Avatar"
                                        className="w-16 h-16 rounded-full object-cover mr-3"
                                    />
                                    <div className="pl-[2vw]">
                                        <p className="xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 font-montserratMedium font-semibold uppercase">{t('ad_author')}: </p>
                                        <h4 className=" xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 font-montserratMedium">{details.user.firstName} {details.user.lastName}</h4>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center pl-[2vw]">
                                    <p className="font-semibold xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 font-montserratMedium uppercase">{t('contacts')}:</p>
                                    <p className="font-montserratRegular xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 pl-[1vw] uppercase"> {details.user.phoneNumber}</p>
                                </div>

                                {/* Social media icons */}
                                <p className="uppercase mt-4 pl-[2vw] xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3">{t('share')}:</p>
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

                                {/* Donate and to favorite buttons */}
                                <div className="flex flex-col pl-[2vw] justify-between space-y-3 mt-4">
                                    { isMyAnnouncement ?

                                        <>
                                            {isDone ? (
                                                <h1 className="xl:text-relative-h4 sm:text-relative-h2 md:text-relative-h3 mt-[1vh] font-kharkiv uppercase text-center">{t('done')}</h1>
                                            ) : isCanceled ? (
                                                <h1 className="xl:text-relative-h4 sm:text-relative-h2 md:text-relative-h3 mt-[1vh] font-kharkiv uppercase text-center">{t('canceled')}</h1>
                                            ) : (
                                                <>
                                                    <div className="mt-8 w-full">
                                                        <Button
                                                            onClick={openModalForDone}
                                                            className="flex xl:text-relative-ps sm:text-relative-h2 md:text-relative-h3 items-center uppercase justify-center text-center w-full bg-perfect-yellow rounded-3xl font-montserratRegular"
                                                        >
                                                            {t('done')}
                                                        </Button>
                                                    </div>
                                                    <Button hasBlue={true} className="py-1 px-4 uppercase" onClick={openModalForCancel}>
                                                        {t('cancel')}
                                                    </Button>
                                                </>
                                            )}
                                            <ModalAsk
                                                isOpen={modalOpen}
                                                onClose={() => setModalOpen(false)}
                                                onConfirm={() => {
                                                    modalContent.action();
                                                    setModalOpen(false);
                                                }}
                                                title={modalContent.title}
                                                message={modalContent.message}
                                            />
                                        </>

                                        :
                                        <>
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
                                                    {t('to_favoriteUPPER')}
                                                </Button>
                                            </div>
                                            <Button hasBlue={true} className="py-1 px-4 uppercase"
                                                    onClick={handleRespond}>
                                                {t('to_respond')}
                                            </Button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* images */}
                        {details.files.length > 0 ?
                            <>
                                <div className="flex justify-center my-[4vh]">
                                    <div className="flex items-center">
                                        {selectedImageIndex > 0 && (
                                            !isTabletScreen ? (
                                                <div
                                                    className={`justify-center flex w-[25vw] mx-[1vw]  ${isTabletScreen ? "w-full h-auto": " w-[25vw] h-[28vh]"}`}
                                                    onClick={() => openModal(selectedImageIndex - 1)}
                                                >
                                                    <img
                                                        src={details.files[selectedImageIndex - 1].fileUrl}
                                                        alt={details.files[selectedImageIndex].fileName}
                                                        className="w-full h-auto rounded-lg cursor-pointer"
                                                    />
                                                </div>
                                            ) : null
                                        )}
                                        <div
                                            className={`justify-center flex w-[25vw] mx-[1vw] ${isTabletScreen ? "w-full h-auto": " w-[25vw] h-[28vh]"}`}
                                            onClick={() => openModal(selectedImageIndex)}
                                        >
                                            <img
                                                src={details.files[selectedImageIndex].fileUrl}
                                                alt={details.files[selectedImageIndex].fileName}
                                                className="w-full h-auto rounded-lg cursor-pointer"
                                            />
                                        </div>
                                        {selectedImageIndex < details.files.length - 1 && (
                                            !isTabletScreen ? (
                                                <div
                                                    className={`justify-center flex mx-[1vw] ${isTabletScreen ? "w-full h-auto": " w-[25vw] h-[28vh]"}`}
                                                    onClick={() => openModal(selectedImageIndex + 1)}
                                                >
                                                    <img
                                                        src={details.files[selectedImageIndex + 1].fileUrl}
                                                        alt={details.files[selectedImageIndex].fileName}
                                                        className="w-full h-auto rounded-lg cursor-pointer"
                                                    />
                                                </div>
                                            ) : null
                                        )}
                                    </div>
                                </div>


                                {/* stripes under images */}
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

                                {/* modal img */}
                                {isModalOpen && (
                                    <div
                                        className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
                                        onClick={closeModal}>
                                        <div className="relative">

                                            <img
                                                src={details.files[selectedImageIndex].fileUrl}
                                                alt={details.files[selectedImageIndex].fileName}
                                                className="flex w-[65vw] mx-[1vw] xl:h-[70vh] sm:h-auto rounded-lg"
                                            />

                                        </div>


                                        {/* left arrow */}
                                        {selectedImageIndex > 0 && (
                                            <div
                                                className="absolute left-[4vw] top-1/2 ь transform -translate-y-1/2 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePrevImage();
                                                }}
                                            >
                                                <LeftSlide className="xl:h-10 xl:w-10 sm:h-8 sm:w-8 text-white"/>
                                            </div>
                                        )}

                                        {/* right arrow */}
                                        {selectedImageIndex < details.files.length - 1 && (
                                            <div
                                                className="absolute right-[4vw] top-1/2 transform -translate-y-1/2 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleNextImage();
                                                }}
                                            >
                                                <RightSlide className="xl:h-10 xl:w-10 sm:h-8 sm:w-8 text-white"/>
                                            </div>
                                        )}
                                    </div>
                                )}</>
                            :
                            <></>
                        }
                    </div>
                    {hasShowMore
                        ?
                        <>
                            <h1 className="xl:text-relative-h4 sm:text-relative-h1 font-kharkiv uppercase mt-[10vh] text-center">
                                {t('similar_ad')}
                            </h1>

                            <div className="flex flex-col w-full">
                                <div className="w-full flex justify-between">
                                    <div className="w-full mt-4 ml-4 flex flex-wrap justify-start">
                                        {(filteredAnnouncements || announcements).length > 0 ? (
                                            (filteredAnnouncements || announcements).map((announcement, index) => (
                                                <div key={index}
                                                     className="w-full md:w-[48%] xl:w-[32%] mr-[1vw] p-2 mt-4">
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
