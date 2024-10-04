import { SetStateAction, useEffect, useState} from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import {
    addGatheringToFavorites,
    fetchGatheringDetails,
    fetchGatherings
} from "../../modules/gathering/api/gatheringPageService.ts";
import Wrapper from "../../ui/Wrapper.tsx";
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import {Button} from "../../ui/Button.tsx";
import SearchGathering from "../../modules/gathering/ui/SearchGathering.tsx";
import Footer from "../../components/Footer.tsx";
import Calendar from '../../modules/main-page/assets/Calendar.svg?react';
import Heart from '../../modules/gathering/assets/Heart.svg?react';
import FullHeart from '../../modules/gathering/assets/FullHeart.svg?react';
import LeftSlide from '../../modules/gathering/assets/LeftSlide.svg?react';
import RightSlide from '../../modules/gathering/assets/RightSlide.svg?react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {format} from 'date-fns';
import {uk} from 'date-fns/locale';
import GatheringCard from "../../modules/gathering/ui/GatheringCard.tsx";

interface GatheringDetails {
    id: number;
    name: string;
    description: string;
    collected: string;
    goal: string;
    is_favorite: boolean;
    detail: string;
    startGathering: string;
    endGathering: string;
    createdAt: string;
    whereMoneyWillUsed: string;
    whoNeedHelp: string;
    user: { avatarUrl: string, firstName: string, lastName: string, phoneNumber: string, email: string };
    files: Array<{ id: number, fileName: string, fileUrl: string, fileType: string }>;
}

// Функция для форматирования числа с пробелами
const formatNumber = (number: string) => {
    return new Intl.NumberFormat('uk-UA').format(Number(number));
};

// Функция для форматирования даты
const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'd MMMM', {locale: uk});
};


const GatheringDetailsPage = () => {
    const {id} = useParams();
    const [details, setDetails] = useState<GatheringDetails | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadDetails = async () => {
            if (id) {
                const data = await fetchGatheringDetails(Number(id));
                console.log(data);
                setDetails(data);
                setIsFavorite(data.is_favorite);
            }
        };
        loadDetails();
    }, [id]);



    const [gatherings, setGatherings] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const limit = 4;
    const [searchParams] = useSearchParams();
    const [hasMore, setHasMore] = useState(true);
    const [hasShowMore, setShowHasMore] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    const fetchFilteredGatherings = async () => {

        const query = searchParams.get('query') || '';
        const types = searchParams.getAll('typeEnding');
        const moneyTo = parseFloat(searchParams.get('moneyTo') || 'NaN');
        const moneyFrom = parseFloat(searchParams.get('moneyFrom') || 'NaN');

        setOffset(0);
        const data = await fetchGatheringDetails(Number(id));
        try {
            const dataFetched = await fetchGatherings(query, types, limit, 0, moneyFrom, moneyTo, 'ASC', true);
            if(dataFetched.length > 0) {
                setShowHasMore(true);
            }else{
                setShowHasMore(false);
            }
            const filteredData = dataFetched.filter((item: { id: any; }) => item.id !== data.id);
            setGatherings(filteredData);
            setOffset(limit);

            if (data.length < limit) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        } catch (error) {
            console.error('Error fetching gatherings:', error);
        }
    };

    useEffect(() => {
        fetchFilteredGatherings();
    }, [searchParams]);


    const loadMoreGatherings = async () => {
        const query = searchParams.get('query') || '';
        const types = searchParams.getAll('typeEnding');
        const moneyTo = parseFloat(searchParams.get('moneyTo') || 'NaN');
        const moneyFrom = parseFloat(searchParams.get('moneyFrom') || 'NaN');

        try {
            const data = await fetchGatherings(query, types, limit, offset, moneyFrom, moneyTo, 'ASC', true);
            setGatherings(prev => [...prev, ...data]);
            setOffset(prev => prev + limit);

            setHasMore(data.length >= limit);
        } catch (error) {
            console.error('Error loading more gatherings:', error);
        }
    };

    if (!details) {
        return <div>Loading...</div>;
    }

    const calculatePercentage = (goal: number, raised: number) => {
        return (raised / goal) * 100;
    };

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

    const handleAddToFavorites = async () => {
        const isSuccess = await addGatheringToFavorites(details.id);
        if (isSuccess) {
            setIsFavorite(true);
        }
    };

    return (
        <>
            <Wrapper>
                <MainHeader />
                <div className="w-full max-w-[80vw] mx-auto mt-[9vh]">
                    <div className="w-full mb-8 space-y-4">
                        {/* Top part */}
                        <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                            <div className="w-3/12">
                                <Link to="/add-gathering" className="w-full md:w-1/2 xl:w-auto">
                                    <Button hasBlue={true} className="px-4 text-relative-h5 w-full">
                                        <span className="text-montserratMedium uppercase text-relative-h5">
                                            Створити збір
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                            <div className="w-9/12 h-[50px] ml-[1vw] flex justify-center">
                                <SearchGathering />
                            </div>
                        </div>
                    </div>

                    {/* Main part */}
                    <div className="max-w-screen-lg h-auto mx-auto p-4">
                        {/* Заголовок по центру */}
                        <h1 className="text-relative-h4 font-kharkiv uppercase text-center">
                            {details.name}
                        </h1>


                        {/* Основной контент: левая и правая часть */}
                        <div className="flex flex-row h-auto gap-8 mt-8">
                            {/* Левая часть (2/3 ширины) */}
                            <div className="w-full h-auto md:w-7/12">
                                <p className="font-montserratRegular text-relative-ps mt-4">{details.description}</p>
                                <p className="font-medium text-relative-pl font-montserratMedium mt-4">Деталі збору:</p>
                                <p className="font-montserratRegular text-relative-ps mt-4">{details.detail}</p>
                                <p className="font-medium text-relative-pl font-montserratMedium mt-4">Кому потрібна
                                    допомога:</p>
                                <p className="font-montserratRegular text-relative-ps mt-4">{details.whoNeedHelp}</p>
                                <p className="font-medium text-relative-pl font-montserratMedium mt-4">На що підуть
                                    кошти:</p>
                                <p className="font-montserratRegular text-relative-ps mt-4">{details.whereMoneyWillUsed}</p>
                            </div>

                            {/* Правая часть (1/3 ширины) */}
                            <div className="w-full md:w-5/12 flex flex-col bg-gray-100 h-auto rounded-3xl p-4 flex-1">
                                {/* Percentage of collected sum */}
                                <div
                                    className="w-full  bg-almost-white h-11 border-2 border-dark-blue rounded-3xl mt-[1vh]">
                                    <div
                                        className="bg-dark-blue h-10 rounded-3xl flex items-center justify-center"
                                        style={{
                                            width: `${Math.floor(
                                                calculatePercentage(
                                                    parseFloat(details.goal),
                                                    parseFloat(details.collected)
                                                )
                                            )}%`,
                                        }}
                                    >
                                        <span className="text-white font-montserratMedium">
                                            {`${Math.floor(
                                                calculatePercentage(
                                                    parseFloat(details.goal),
                                                    parseFloat(details.collected)
                                                )
                                            )}%`}
                                        </span>
                                    </div>
                                </div>

                                {/* Money goal and collected */}
                                <div className="mt-4 flex flex-row items-center justify-center space-x-4">
                                    <p className="font-montserratRegular font-semibold text-relative-pl mt-4">Ціль: {formatNumber(details.goal)} </p>
                                    <p className="font-montserratRegular text-relative-ps mt-4">зібрано: {formatNumber(details.collected)} </p>
                                </div>

                                {/* Dates */}
                                <div className="mt-4 flex flex-row items-center justify-center space-x-2">
                                    <Calendar className="h-8 w-8"/>
                                    <p className="font-montserratRegular font-semibold text-relative-ps">{formatDate(details.startGathering)}</p>
                                    <p className="font-montserratRegular font-semibold text-relative-ps">-</p>
                                    <p className="font-montserratRegular font-semibold text-relative-ps">{formatDate(details.endGathering)}</p>
                                </div>

                                {/* Donate and to favorite buttons */}
                                <div className="flex flex-col px-[1vw] justify-between space-y-3 mt-4">
                                    <Button hasBlue={true} className="py-2 px-4 uppercase bg-almost-white">
                                        Задонатити зараз
                                    </Button>
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

                                {/* Author */}
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

                                <div className="flex flex-row items-center pl-[2vw]">
                                    <p className="font-semibold text-relative-ps font-montserratMedium uppercase">Email:</p>
                                    <p className="font-montserratRegular text-relative-ps pl-[1vw]"> {details.user.email}</p>
                                </div>

                                {/* Social media icons */}
                                <p className="uppercase mt-4 pl-[2vw] text-relative-ps">Поділіться збором:</p>
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
                            </div>
                        </div>

                        {/* Изображение с соседними картинками */}
                        {details.files.length>0
                            ?
                            <>
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
                                    e.stopPropagation();
                                    handleNextImage();
                                }}
                            >
                                <RightSlide className="h-10 w-10 text-white"/>
                            </div>
                        )}
                    </div>
                    )}
                            </>
                            :
                            <></>
                        }

                        {hasShowMore
                            ?
                            <>
                                <h1 className="text-relative-h4 font-kharkiv uppercase mt-[10vh] text-center">
                                    Термінові збори
                                </h1>

                                <div className="flex flex-col">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="w-full flex justify-between">
                                            <div className="w-full mt-4 ml-4 flex flex-wrap justify-start">
                                                {gatherings.length > 0 ? (
                                                    gatherings.map((gathering, index) => (
                                                        <Link to={`/gathering/${gathering.id}`} key={index}
                                                              className="w-full md:w-[48%] xl:w-[32%] mr-[1vw] p-2 mt-4">
                                                            <GatheringCard
                                                                id={gathering.id}
                                                                title={gathering.name}
                                                                description={gathering.description}
                                                                goal={parseFloat(gathering.goal)}
                                                                raised={parseFloat(gathering.collected)}
                                                                percentage={calculatePercentage(
                                                                    parseFloat(gathering.goal),
                                                                    parseFloat(gathering.collected)
                                                                )}

                                                            />
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <div
                                                        className="flex items-center justify-center my-[20%] w-full text-gray-500">
                                                        <div className="text-center font-montserratMedium">
                                                            Наразі немає зборів за обраними фільтрами
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {hasMore && (
                                        <div className="flex justify-center mt-6">
                                            <button
                                                onClick={loadMoreGatherings}
                                                className="bg-perfect-yellow text-black hover:bg-yellow-600 px-6 py-2 font-montserratRegular rounded-3xl"
                                            >
                                                ПОКАЗАТИ ЩЕ
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                            :
                            <></>
                        }
                    </div>
                </div>
                <Footer/>
            </Wrapper>
        </>
    );
};

export default GatheringDetailsPage;
