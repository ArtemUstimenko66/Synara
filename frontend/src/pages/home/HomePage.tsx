import React, {useEffect, useRef, useState} from 'react';
import { useSwipeable } from 'react-swipeable';
import { useMediaQuery } from 'react-responsive';

import CountUp from 'react-countup';


import PlaceholderHorizontal from '../../assets/images/PlaceholderHorizontal.svg?react';
import PlaceholderSquare from '../../assets/images/PlaceholderSquare.svg?react';
import DonatNaZSU from '../../assets/images/DonatNaZSU.svg?react';
import GetHelp from '../../assets/images/GetHelp.svg?react';
import WhyUsImg from '../../assets/images/WhyUsImg.svg?react';
import WhyMeMainDesktop from '../../assets/images/WhyMeMainDesktop.svg?react';
import Section1 from '../../assets/images/section1.svg?react';
import Section2 from '../../assets/images/section2.svg?react';
import Section3 from '../../assets/images/section3.svg?react';
import Section4 from '../../assets/images/section4.svg?react';
import MobileLogo from '../../assets/images/mobileLogo.svg?react';

import VECTOR_1_1 from '../../assets/images/vector_1_1.svg?react';
import VECTOR_1_2 from '../../assets/images/vector_1_2.svg?react';
import VECTOR_2_1 from '../../assets/images/vector_2_1.svg?react';
import VECTOR_2_2 from '../../assets/images/vector_2_2.svg?react';
import VECTOR_3_1 from '../../assets/images/vector_3_1.svg?react';
import VECTOR_3_2 from '../../assets/images/vector_3_2.svg?react';
import VECTOR_4_1 from '../../assets/images/vector_4_1.svg?react';
import VECTOR_4_2 from '../../assets/images/vector_4_2.svg?react';

import VectorBlue from '../../assets/images/VectorBlue.svg?react';
import FrameYouTube from '../../assets/images/FrameYouTube.svg?react';
import GooglePlayImg from '../../assets/images/GooglePlayImg.svg?react';
import AppStoreImg from '../../assets/images/AppStoreImg.svg?react';


import Header from '../../components/Header.tsx';
import {Button} from "../../ui/Button.tsx";
import Footer from "../../components/Footer.tsx";
import DonationCard from "../../components/DonationCard.tsx";
import DateRangeCalendarWithButton from "../../ui/Calendar.tsx";
import Review from "../../components/Review.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import HowItWorksSM from "../../ui/HowItWorksSM.tsx";
import {useTranslation} from "react-i18next";


const reviews = [
    {
        comment: 'Я отримала неймовірну психічну підтримку завдяки цій організації! Вони допомогли мені подолати найважчі моменти в моєму житті. Фахівці дуже уважні, і я відчувала себе дійсно почутою. Дуже рекомендую всім, хто потребує допомоги!',
        name: 'Оксана Коваленко',
        date: '02.03.2024',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
        comment: 'Ця організація надала мені гуманітарну допомогу в той момент, коли я цього найбільше потребував. Завдяки їхній підтримці моя родина змогла пережити важкі часи. Дуже вдячний за їхню роботу!',
        name: 'Михайло Бойко',
        date: '15.02.2024',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
        comment: 'Матеріальна допомога, яку я отримала, була життєво необхідною для мене та моїх дітей. Ця організація дійсно дбає про людей і робить все можливе, щоб підтримати тих, хто цього потребує. Дуже рекомендую!',
        name: 'Софія Левченко',
        date: '28.01.2024',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    {
        comment: 'Інформаційна підтримка, яку надає ця організація, допомогла мені зрозуміти, як отримати допомогу, на яку я маю право. Завдяки їхнім консультаціям я змогла отримати необхідні послуги.',
        name: 'Володимир Кравченко',
        date: '05.02.2024',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    {
        comment: 'Ця організація зробила більше, ніж я міг очікувати. Вони надали нам їжу, одяг і найнеобхідніше, коли ми опинилися в скрутному становищі. Вдячний за їхню доброту і підтримку!',
        name: 'Олександр Тарасенко',
        date: '12.02.2024',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
        comment: 'Надзвичайно вдячна за психологічну допомогу, яку я отримала тут. Фахівці допомогли мені знайти внутрішні сили, щоб продовжувати боротися. Це змінило моє життя на краще!',
        name: 'Олена Шевченко',
        date: '20.02.2024',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    {
        comment: 'Отримав матеріальну допомогу для моєї родини, коли ми залишилися без засобів до існування. Ця допомога була дуже своєчасною і значною. Велике спасибі за вашу підтримку!',
        name: 'Ігор Паламар',
        date: '25.02.2024',
        avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    {
        comment: 'Організація надає безцінну інформаційну підтримку. Завдяки їхнім порадникам, я зміг знайти потрібні контакти та ресурси для моєї ситуації. Дуже задоволений їхньою роботою!',
        name: 'Людмила Сорока',
        date: '05.03.2024',
        avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
    },
];

const calculatePercentage = (goal: number, raised: number) => {
    return (raised / goal) * 100;
};

const goal1 = 100000;
const raised1 = 65000;
const percentage1 = calculatePercentage(goal1, raised1);

const goal2 = 72000;
const raised2 = 21600;
const percentage2 = calculatePercentage(goal2, raised2);

const goal3 = 378000;
const raised3 = 181440;
const percentage3 = calculatePercentage(goal3, raised3);

const donationCard=[
    {
        title:"Збір на авто для 36 бригади",
        description:"Допоможіть забезпечити 36 бригаду надійним транспортом для швидкого пересування, евакуації поранених та доставки боєприпасів.",
        goal: goal1,
        raised:raised1,
        percentage:percentage1
    },
    {
        title:"Зимовий одяг для ВПО",
        description:"Допоможіть внутрішньо переміщеним особам пережити зиму в теплі.Кожна ваша пожертва - це крок до комфорту та гідності.",
        goal: goal2,
        raised:raised2,
        percentage:percentage2
    },
    {
        title:"Протези для поранених",
        description:"Наші захисники заслуговують на найкраще. Допоможіть їм отримати сучасні протези та повернутися до активного життя.",
        goal: goal3,
        raised:raised3,
        percentage:percentage3
    },
    {
        title:"Транспорт для медичної допомоги",
        description:"Ваша допомога потрібна для забезпечення медичної бригади новим транспортом для швидкої евакуації поранених і доставки медичних засобів.",
        goal: goal3,
        raised:raised3,
        percentage:percentage3
    }
];


const HomePage: React.FC = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [isPausedDonation, setIsPausedDonation] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [hoveredIndexDonation, setHoveredIndexDonation] = useState<number | null>(null);
    const scrollingContainerRef = useRef<HTMLDivElement>(null);
    const scrollingContainerRefDonation = useRef<HTMLDivElement>(null);


    const { t } = useTranslation();


    const handleMouseEnter = (index: number) => {
        setIsPaused(true);
        setHoveredIndex(index);
        console.log(`Mouse entered index ${index}`);
    };

    const handleMouseEnterDonation = (index: number) => {
        setIsPausedDonation(true);
        setHoveredIndexDonation(index);
        console.log(`Mouse entered index ${index}`);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        setHoveredIndex(null);
        console.log('Mouse left');
    };

    const handleMouseLeaveDonation = () => {
        setIsPausedDonation(false);
        setHoveredIndexDonation(null);
        console.log('Mouse left');
    };

    const handleSwipe = (direction: 'left' | 'right') => {
        console.log(`Swiped ${direction}`);
        if (scrollingContainerRef.current && isSmallScreen) {
            const scrollAmount = scrollingContainerRef.current.clientWidth;
            if (direction === 'left') {
                scrollingContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
                scrollingContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }else if (scrollingContainerRef.current && !isSmallScreen){
            const scrollAmount = scrollingContainerRef.current.clientWidth/2;
            if (direction === 'left') {
                scrollingContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
                scrollingContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const handleSwipeDonation = (direction: 'left' | 'right') => {
        console.log(`Swiped ${direction}`);
        if (scrollingContainerRefDonation.current) {
            const scrollAmount = scrollingContainerRefDonation.current.clientWidth;
            if (direction === 'left') {
                scrollingContainerRefDonation.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
                scrollingContainerRefDonation.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }else if (scrollingContainerRef.current && !isSmallScreen){
            const scrollAmount = scrollingContainerRef.current.clientWidth/2;
            if (direction === 'left') {
                scrollingContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
                scrollingContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
        trackMouse: true,
    });

    const swipeHandlersDonation = useSwipeable({
        onSwipedLeft: () => handleSwipeDonation('left'),
        onSwipedRight: () => handleSwipeDonation('right'),
        trackMouse: true,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused && scrollingContainerRef.current) {
                scrollingContainerRef.current.scrollBy({
                    left: scrollingContainerRef.current.clientWidth / 2,
                    behavior: 'smooth'
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const isSmallScreen = useMediaQuery({ query: '(max-width: 1025px)' });

    return (
        <div className="w-full relative">
            <Wrapper>
                {/* Header */}
                <Header/>

                {/* Main div */}
                <div className="relative z-10 flex flex-col items-center justify-center pt-2">

                    {/* First section - who are we */}
                    <section className='w-full flex justify-center flex-col xl:flex-row md:flex-row'>
                        <div
                            className="relative text-center order-2 xl:order-1 xl:text-left  md:text-left xl:w-11/12 mt-12 xl:mt-64 mr-16 md:mt-relative-smlg">
                            <h1 className='xl:text-h1 sm:text-h5 sm:text-center select-none xl:w-2/3 sm:ml-12 md:ml-0 md:mr-[40vw] xl:ml-0 font-kharkiv whitespace-pre-line mt-6 mb-0 tracking-tight md:text-relative-h3xl md:text-left'>
                                {t('hope_on_wings_returns')}
                            </h1>
                            <p className='text-medium-gray font-montserratRegular select-none sm:ml-8 md:ml-0 md:mr-[40vw] sm:text-xs-ps xl:ml-0  mt-1 mb-4 whitespace-pre-line xl:text-pl md:text-relative-pxl md:text-left'>
                                {t('under_hope_on_wings_returns')}

                            </p>
                            <Button className="sm:ml-8 xl:ml-0 md:ml-0 md:mt-0 select-none sm:mt-6 xl:mt-0"
                                    isFilled={true}>{t('joinUPPER')}</Button>
                        </div>
                    </section>

                    {/* Second section - about us */}
                    <section
                        className='w-full flex justify-center select-none sm:mt-[70vh] md:mt-[20vh] bg-transparent  flex-col xl:flex-row md:flex-row xl:mt-[20vw]  '>
                        <div
                            className="hidden xl:flex xl:order-1 md:flex md:order-1 xl:w-1/2 md:w-relative-1/2">
                            <PlaceholderHorizontal
                                className="xl:w-96 xl:h-auto md:w-relative-elg md:h-auto md:ml-[5vw] xl:mr-0 md:mr-relative-md"/>
                        </div>
                        <div
                            className="relative text-center order-2 xl:order-2 md:order-2 xl:text-left md:text-left xl:ml-24 xl:w-11/12">
                            <h1 className='xl:text-h1 sm:text-h4 sm:mb-4 sm:mt-8 md:mt-0  md:mb-0 xl: text-almost-white font-kharkiv xl:whitespace-pre-line xl:mt-6 mb-0 xl:tracking-tight md:text-relative-h3xl'>
                                {t('who_are_we')}
                            </h1>
                            <p className='text-almost-white sm:text-left sm:m-4 md:m-0 xl:m-0 sm:text-xs-ps font-montserratRegular xl:text-pl md:text-relative-pxl xl:mt-1 xl:mb-4 md:mb-relative-sm whitespace-pre-line md:whitespace-pre-line'>
                                {t('description_synara')}
                            </p>
                            <PlaceholderHorizontal className="xl:hidden md:hidden sm:w-[80%] sm:mx-auto"/>
                            <Button className="sm:hidden xl:flex md:flex" hasBorder={true}>{t('read_moreUPPER')}</Button>
                        </div>
                    </section>

                    {/* Third section - the last collections of money*/}
                    <section className="w-full h-auto flex flex-col items-center xl:mt-64 md:mt-[10vw] select-none">
                        <h2 className="xl:text-h2 sm:mt-24 xl:mt-0 sm:text-h5  md:text-relative-h3xl font-kharkiv xl:mb-16 md:mb-16 sm:mb-4">{t('last_collectionUPPER')}</h2>
                        <div
                            className="sm:hidden md:block xl:block sm:space-y-[2vh] xl:space-y-0 md:justify-center xl:ml-0 md:ml-[23vw] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 xl:flex xl:flex-row xl:gap-16 justify-center items-center">

                            {/* Card 1 */}
                            <DonationCard
                                title="Збір на авто для 36 бригади"
                                description="Допоможіть забезпечити 36 бригаду надійним транспортом для швидкого пересування, евакуації поранених та доставки боєприпасів."
                                goal={goal1}
                                raised={raised1}
                                percentage={percentage1}
                                className="w-fixed-width"
                            />

                            {/* Card 2 */}
                            <DonationCard
                                title={`Зимовий одяг для ВПО`}
                                description="Допоможіть внутрішньо переміщеним особам пережити зиму в теплі.Кожна ваша пожертва - це крок до комфорту та гідності."
                                goal={goal2}
                                raised={raised2}
                                percentage={percentage2}
                                className="w-fixed-width"
                            />

                            {/* Card 3 */}
                            <DonationCard
                                title="Протези для поранених"
                                description="Наші захисники заслуговують на найкраще. Допоможіть їм отримати сучасні протези та повернутися до активного життя."
                                goal={goal3}
                                raised={raised3}
                                percentage={percentage3}
                                className="w-fixed-width"
                            />

                        </div>
                        <div
                            className="sm:block md:hidden xl:hidden relative sm:w-full overflow-hidden"
                            {...swipeHandlersDonation}
                            onMouseEnter={() => setIsPausedDonation(true)}
                            onMouseLeave={() => setIsPausedDonation(false)}
                        >
                            <style>
                                {`
    .scrolling-container {
      display: flex;
      overflow: hidden;
      animation-play-state: ${isPausedDonation ? 'paused' : 'running'};
    }

    @keyframes scrollLeft {
      0% {transform: translateX(0);}
      100% {transform: translateX(-50%);}
    }

    .scrolling-wrapper {
      width: 100%;
      overflow: hidden;
    }

    .review-item {
      flex: 0 0 auto;
      width: 90%; 
      max-width: 400px;
      scroll-snap-align: center;
      position: relative;
      box-sizing: border-box;
      padding: 1rem;
      transition: transform 0.3s ease;
      height: auto; 
      overflow: visible;
    }

    .review-item .avatar {
      position: relative;
      z-index: 1;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 1rem;
    }

    .review-item.hovered {
      transform: scale(1.05);
      overflow: visible; 
    }

   

    @media (min-width: 768px) and (max-width: 1024px) {
      .scrolling-wrapper {
        padding-bottom: 1rem; 
      }
      .review-item {
        width: 80%; 
        padding: 0.5rem;
      }
      h2 {
        font-size: 1.5rem; 
        margin-bottom: 16px;
      }
    }
    `}
                            </style>
                            <div className="scrolling-wrapper">
                                <div className="scrolling-container py-10" ref={scrollingContainerRefDonation}>
                                    {donationCard.map((donation, index) => (
                                        <div
                                            key={index}
                                            className={`review-item fixed-height ${hoveredIndexDonation === index ? 'hovered' : ''}`}
                                            onMouseEnter={() => handleMouseEnterDonation(index)}
                                            onMouseLeave={() => handleMouseLeaveDonation()}
                                        >
                                            <div className="mx-auto max-w-md">
                                                <DonationCard
                                                    title={donation.title}
                                                    description={donation.description}
                                                    goal={donation.goal}
                                                    raised={donation.raised}
                                                    percentage={donation.percentage}
                                                    className="w-fixed-width"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="xl:mt-16 md:mt-16 sm:mt-4">
                            <Button isFilled={true}>{t('VIEW_OTHERS_UPPER')}</Button>
                        </div>
                    </section>


                    {/* Fourth section - join us */}
                    <section className="w-full h-auto flex flex-col items-center mt-32 px-4 md:px-8 select-none">
                        <h2 className="xl:text-h2 sm:text-h4 md:text-relative-h3xl sm:mb-8 sm:text-h5  font-kharkiv xl:mb-24 md:mb-16 text-center">{t('JOIN_TO_US_UPPER')}</h2>
                        <div
                            className="flex flex-col xl:flex-row  md:flex-row justify-center items-center space-y-10 xl:space-y-0 md:space-y-0 xl:space-x-32 md:space-x-16">

                            {/* Card 1 */}
                            <div
                                className="flex xl:flex-col md:flex-col sm:flex-row  xl:items-center max-w-xs md:max-w-sm xl:max-w-md">
                                <div className="">
                                    <PlaceholderSquare
                                        className="w-24 sm:w-40 md:ml-8 sm:mr-8 xl:mr-0 sm:h-40 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40"/>
                                </div>
                                <div className="sm:flex-row">
                                    <h3 className="xl:text-center sm:text-center xl:text-h3 md:text-relative-h3xl font-kharkiv mt-4 w-full max-w-xs md:max-w-sm xl:max-w-md">{t('Become_a_volunteer')}</h3>
                                    <p className="sm:text-xs xl:text-xs-pxl text-center font-montserratRegular mt-2 w-full max-w-xs md:max-w-sm xl:max-w-md">
                                        {t('Under_Become_a_volunteer')}
                                    </p>

                                </div>
                            </div>

                            {/* Card 2 */}
                            <div
                                className="flex xl:flex-col md:flex-col sm:flex-row-reverse items-center max-w-xs md:max-w-sm xl:max-w-md select-none">
                                <div className="sm:flex sm:justify-start">
                                    {/* Картинка справа на экранах sm */}
                                    <GetHelp
                                        className="sm:block sm:w-40 sm:h-40 sm:ml-8 sm:mr-8 w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40"/>
                                </div>
                                <div className="sm:flex sm:flex-col sm:justify-center">
                                    {/* Текст слева на экранах sm */}
                                    <h3 className="xl:text-center sm:text-left xl:text-h3 md:text-relative-h3xl font-kharkiv mt-4 w-full max-w-xs md:max-w-sm xl:max-w-md">{t('get_help')}</h3>
                                    <p className="sm:text-left xl:text-center sm:text-xs xl:text-xs-pxl font-montserratRegular mt-2 w-full max-w-xs md:max-w-sm xl:max-w-md">
                                        {t('under_get_help')}
                                    </p>
                                </div>
                            </div>


                            {/* Card 3 */}
                            <div
                                className="flex xl:flex-col md:flex-col sm:flex-row items-center max-w-xs md:max-w-sm xl:max-w-md select-none">
                                <div className="">
                                    <DonatNaZSU
                                        className="w-24 sm:w-40 md:ml-8 sm:mr-8 xl:mr-0 sm:h-40 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40"/>
                                </div>
                                <div className="sm:flex-row">
                                    <h3 className="xl:text-center sm:text-center xl:text-h3 md:text-relative-h3xl font-kharkiv mt-4 w-full max-w-xs md:max-w-sm xl:max-w-md">{t('donate_ZSU')}</h3>
                                    <p className="sm:text-xs xl:text-xs-pxl text-center font-montserratRegular mt-2 w-full max-w-xs md:max-w-sm xl:max-w-md">
                                        {t('under_donate_ZSU')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Fifth section - how it works */}

                    {isSmallScreen ? (
                        <HowItWorksSM/>
                    ) : (
                        <section className="w-full h-auto flex flex-col items-center mt-32 select-none">
                            <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5  font-kharkiv mb-20 text-center">{t('how_it_works')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 xl:ml-3 md:ml-6">

                                {/* Card 1 */}
                                <div className="flex flex-col md:flex-row items-start">
                                    <div className="flex flex-row items-start xl:mt-20 md:mt-12">
                                        <div
                                            className="xl:text-h_num md:text-h_s_num text-center text-perfect-yellow font-bold font-montserratMedium xl:mr-8 md:mr-12">
                                            1
                                        </div>
                                        <div className="ml-2 md:ml-4">
                                            <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">{t('register')}</h3>
                                            <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                                {t('under_register')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Section1
                                    className="xl:ml-12  sm:w-[50%] md:ml-16 xl:mt-auto md:mt-10 xl:w-auto xl:h-auto md:w-relative-xlg md:h-auto"/>

                                {/* Card 2 */}
                                <Section2
                                    className="xl:mr-12 sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-auto xl:h-auto md:w-relative-xlg md:h-auto"/>
                                <div className="flex flex-col md:flex-row items-start ">
                                    <div className="flex flex-row items-start xl:mt-20 md:mt-12 xl:ml-auto md:-ml-6">
                                        <div
                                            className="xl:text-h_num md:text-h_s_num text-center text-perfect-yellow font-bold font-montserratMedium mr-6">
                                            2
                                        </div>
                                        <div className="ml-2">
                                            <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">{t('help_is_nearby')}</h3>
                                            <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                                {t('under_help_is_nearby')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="flex flex-col md:flex-row items-start">
                                    <div className="flex flex-row items-start xl:mt-20 md:mt-12">
                                        <div
                                            className="xl:text-h_num md:text-h_s_num text-center text-perfect-yellow font-bold font-montserratMedium mr-8 md:mr-12">
                                            3
                                        </div>
                                        <div className="ml-2 md:ml-4">
                                            <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">{t('get_in_touch_and_help')}</h3>
                                            <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                                {t('under_get_in_touch_and_help')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Section3
                                    className="xl:ml-12 sm:w-[50%] md:ml-16 xl:mt-auto md:mt-10 xl:w-auto xl:h-auto md:w-relative-xlg md:h-auto"/>

                                {/* Card 4 */}
                                <Section4
                                    className="xl:mr-12 sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-auto xl:h-auto md:w-relative-xlg md:h-auto"/>
                                <div className="flex flex-col md:flex-row items-start">
                                    <div className="flex flex-row items-start xl:mt-20 md:mt-12 xl:ml-auto md:-ml-6">
                                        <div
                                            className="xl:text-h_num md:text-h_s_num text-center text-perfect-yellow font-bold font-montserratMedium mr-6">
                                            4
                                        </div>
                                        <div className="ml-2">
                                            <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">{t('leave_a_review')}</h3>
                                            <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                                {t('under_leave_a_review')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="mt-12 md:mt-16">
                                <Button isFilled={true}>{t('more_detailsUPPER')}</Button>
                            </div>
                        </section>
                    )}


                    {/* Sixth section - why us */}
                    <section className="w-full h-auto flex flex-col items-center select-none mt-32">
                        <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h4 sm:text-h5  font-kharkiv sm:mb-8 md:mb-20 xl:mb-20 text-center">{t('why_usUPPER')}</h2>
                        <div className="flex xl:gap-12 md:gap-6 sm:ml-8 md:ml-0 xl:ml-0">
                            <div className="flex-1 flex flex-col xl:ml-6 md:ml-6">
                                <div className="flex flex-row sm:space-x-16 xl:space-x-12 md:space-x-6">
                                    <div
                                        className="xl:text-h1 sm:text-h3 md:text-relative-h1 text-md_h1 font-bold font-montserratMedium"> <CountUp end={10} />k<span
                                        className="text-dark-blue font-bold">+</span></div>
                                    <div
                                        className="xl:text-h1 sm:text-h3 md:text-relative-h1 text-md_h1 font-bold font-montserratMedium"><CountUp end={4} />k<span
                                        className="text-dark-blue font-bold">+</span></div>
                                    <div
                                        className="xl:text-h1 sm:text-h3 md:text-relative-h1 text-md_h1 font-bold font-montserratMedium"><CountUp end={20} />k<span
                                        className="text-dark-blue font-bold">+</span></div>
                                </div>
                                <div
                                    className="flex sm:text-xs sm:space-x-10 flex-row font-bold font-montserratMedium xl:space-x-20 md:space-x-6 xl:text-pl md:text-relative-pxl text-md_body xl:mt-0 md:mt-2 text-gray-500">
                                    <div>{t('users')}</div>
                                    <div>{t('volunteers')}</div>
                                    <div>{t('count_of_help')}</div>
                                </div>
                                <div>
                                    <WhyUsImg className="md:hidden xl:hidden sm:block sm:w-[90%] sm:h-auto sm:mt-6"/>
                                </div>
                                <div
                                    className=" xl:mt-16 md:mt-8 sm:mt-6 space-y-8 md:space-y-4 sm:space-y-4 font-bold font-montserratRegular">
                                    <div className="flex items-center">
                                        <VectorBlue
                                            className="xl:w-10 xl:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10 sm:mr-4 md:mr-0 xl:mr-0"/>
                                        <p className="xl:ml-8 md:ml-4 sm:text-xs-ps font-montserratRegular xl:text-pl md:text-relative-pxl">{t('why_us_1')}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <VectorBlue
                                            className="xl:w-10 xl:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10 sm:mr-4 md:mr-0 xl:mr-0"/>
                                        <p className="xl:ml-8 md:ml-4 sm:text-xs-ps font-montserratRegular xl:text-pl md:text-relative-pxl">{t('why_us_2')}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <VectorBlue
                                            className="xl:w-8 xl:h-8 md:w-8 md:h-8 sm:w-8 sm:h-8 sm:mr-4 md:mr-0 xl:mr-0"/>
                                        <p className="xl:ml-8 md:ml-4 sm:text-xs-ps font-montserratRegular xl:text-pl md:text-relative-pxl">{t('why_us_3')}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <VectorBlue
                                            className="xl:w-10 xl:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10 sm:mr-4 md:mr-0 xl:mr-0"/>
                                        <p className="xl:ml-8 md:ml-4 sm:text-xs-ps font-montserratRegular xl:text-pl md:text-relative-pxl">{t('why_us_4')}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <VectorBlue
                                            className="xl:w-8 xl:h-8 md:w-8 md:h-8 sm:w-8 sm:h-8 sm:mr-4 md:mr-0 xl:mr-0"/>
                                        <p className="xl:ml-8 md:ml-4 sm:text-xs-ps font-montserratRegular xl:text-pl md:text-relative-pxl">{t('why_us_5')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Правая сторона */}
                            <div className="">
                                <WhyMeMainDesktop
                                    className="sm:hidden md:block xl:block xl:ml-20 md:ml-12 xl:mt-2 md:mt-24 xl:w-full      xl:h-full md:w-96 md:h-72 "/>
                            </div>
                        </div>
                    </section>

                    {/* Seventh section - our statistics */}
                    <section className="w-full h-auto flex flex-col items-center select-none mt-40">
                        <h2 className="xl:text-h2 sm:text-h3 md:text-relative-h2 sm:text-h5  font-kharkiv sm:mb-4 md:mb-16 xl:mb-16 text-center">{t('our_statisticUPPER')}</h2>

                        <div className="flex flex-col md:hidden xl:hidden sm:block">
                            <div className="sm:text-pxll sm:text-center font-kharkiv">{t('during_the_period')}</div>
                            <DateRangeCalendarWithButton/>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-2 pr-12">

                            {/* Statistic 1 */}
                            <div
                                className="relative w-64 h-64 mx-auto sm:mt-8 md:mt-0 xl:mt-0 sm:ml-8 xl:ml-28 md:ml-8 flex items-center justify-center">
                                <div className="absolute inset-0 animate-move-in-circle-2">
                                    <VECTOR_1_2
                                        className="sm:w-[80%] sm:h-[80%] xl:w-auto xl:h-auto md:w-[115%] md:h-[115%]"/>
                                </div>
                                <div
                                    className="xl:mt-10 md:mt-3 xl:ml-6 md:ml-0 absolute inset-0 animate-move-in-circle">
                                    <VECTOR_1_1
                                        className="sm:w-[80%] sm:h-[80%] xl:w-auto xl:h-auto md:w-[105%] md:h-[105%]"/>
                                </div>
                                <div
                                    className="xl:mt-24 sm:mr-12 md:mr-0 xl:mr-0 sm:mb-8 md:mb-0 xl:mb-0 xl:ml-16 md:mt-6 md:ml-2 absolute inset-0 flex flex-col items-center justify-center text-white text-h3 text-center">
                                    <h2 className="xl:mb-4 sm:text-h3 md:mb-2 font-montserratMedium text-white font-extrabold xl:text-5xl md:text-relative-h1">350</h2>
                                    <p className="xl:text-xl sm:text-xs-pxl md:text-relative-h4 font-montserratRegular text-white whitespace-pre-line">{t('humanitarian_aid')}</p>
                                </div>
                            </div>

                            {/* Centered "За період" */}
                            <div
                                className="sm:hidden md:block xl:block relative w-64 h-64 mx-auto flex items-center justify-center xl:mt-48 xl:ml-32 md:mt-32 md:ml-8">
                                <div className="text-center mt-24">
                                    <div className="xl:text-h3 md:text-relative-h3 font-kharkiv mb-4">{t('during_the_period')}</div>
                                    <DateRangeCalendarWithButton/>
                                </div>
                            </div>

                            {/* Statistic 2 */}
                            <div
                                className="relative w-64 md:mt-0 md:ml-0 xl:mt-0 xl:ml-0 sm:-mt-2 sm:ml-28 h-64 flex items-center justify-center">
                                <div className="absolute inset-0 animate-move-in-circle xl:ml-auto md:xl-ml-4">
                                    <VECTOR_2_2
                                        className="sm:w-[90%] sm:h-[90%] xl:w-auto xl:h-auto md:w-[105%] md:h-[105%]"/>
                                </div>
                                <div className="mt-8 ml-12 absolute inset-0 animate-move-in-circle-2">
                                    <VECTOR_2_1
                                        className="sm:w-[90%] sm:h-[90%] xl:w-auto xl:h-auto md:w-[105%] md:h-[105%]"/>
                                </div>
                                <div
                                    className="xl:mt-8 xl:ml-12 md:mt-0 md:ml-2 absolute inset-0 flex flex-col items-center justify-center text-white text-h3 text-center">
                                    <h2 className="font-montserratMedium sm:text-h3 font-extrabold text-white xl:text-5xl md:text-relative-h1">285</h2>
                                    <p className="xl:mt-4 md:mt-2 sm:text-xs-pxl xl:text-xl md:text-relative-h4 font-montserratRegular whitespace-pre-line text-white">{t('informational_help')}</p>
                                </div>
                            </div>

                            {/* Statistic 3 */}
                            <div
                                className="relative w-64 h-64 mx-auto xl:ml-56 md:ml-4 sm:-mt-2 sm:ml-8 flex items-center justify-center xl:mt-0 md:-mt-12">
                                <div className="absolute inset-0 animate-move-in-circle">
                                    <VECTOR_3_2
                                        className="sm:w-[80%] sm:h-[80%] xl:w-auto xl:h-auto md:w-[120%] md:h-[120%]"/>
                                </div>
                                <div
                                    className="xl:mt-14 xl:ml-12 md:mt-0 md:ml-0 absolute inset-0 animate-move-in-circle-2">
                                    <VECTOR_3_1
                                        className="sm:w-[80%] sm:h-[80%] xl:w-auto xl:h-auto md:w-[105%] md:h-[105%] md:mt-8 md:ml-8 xl:mt-0 xl:ml-0"/>
                                </div>
                                <div
                                    className="xl:mt-40 xl:ml-40 md:mt-10 md:ml-10 sm:-mt-4 sm:-ml-10 absolute inset-0 flex flex-col items-center justify-center text-white text-h3 text-center">
                                    <h2 className="font-montserratMedium sm:text-h3 font-extrabold text-white xl:text-5xl md:text-relative-h1">435k</h2>
                                    <p className="xl:mt-4 sm:text-xs-pxl md:mt-2 xl:text-xl md:text-relative-h4 whitespace-pre-line font-montserratRegular text-white">{t('hryvnia_to_ZSU')}</p>
                                </div>
                            </div>

                            {/* Empty div to center "За період" */}
                            <div
                                className="relative xl:w-64 md:w-1 xl:h-64 md:h-64 sm:-h-12 mx-auto flex items-center justify-center"></div>

                            {/* Statistic 4 */}
                            <div
                                className="xl:mr-24 md:mr-0 relative w-64 h-64 sm:-mt-16 sm:ml-28 flex items-left justify-center xl:mt-0 md:-mt-12 xl:ml-0 md:ml-0">
                                <div className="absolute inset-0 animate-move-in-circle-2">
                                    <VECTOR_4_2
                                        className="sm:w-[90%] sm:h-[90%] md:-ml-4 xl:w-auto xl:h-auto md:w-[120%] md:h-[120%]"/>
                                </div>
                                <div className="mt-4 ml-8 absolute inset-0 animate-move-in-circle">
                                    <VECTOR_4_1
                                        className="sm:w-[90%] sm:h-[90%] xl:w-auto xl:h-auto md:w-[110%] md:h-[110%]"/>
                                </div>
                                <div
                                    className="xl:mt-12 md:mt-1 xl:ml-56 md:ml-24 sm:mt-0 sm:ml-0 absolute inset-0 flex flex-col items-center justify-center text-white text-h3 text-center">
                                    <h2 className="font-montserratMedium sm:text-h3 font-extrabold text-white xl:text-5xl md:text-relative-h1">543</h2>
                                    <p className="xl:mt-4 sm:text-xs-pxl md:mt-2 xl:text-xl md:text-relative-h4 whitespace-pre-line font-montserratRegular text-white">{t('psychological_help')}</p>
                                </div>
                            </div>

                            {/* Empty div to create more even spacing in the second row */}
                            <div
                                className="relative w-64 xl:h-64 md:h-32 mx-auto flex items-center justify-center"></div>
                        </div>
                    </section>


                    {/* Eighth section - our feedbacks */}
                    <section className="w-full h-auto flex flex-col items-center select-none mt-16">
                        <h2 className="xl:text-h2 md:text-relative-h2 sm:text-h5 font-kharkiv mb-12 text-center">{t('reviews_about_usUPPER')}</h2>

                        <div
                            className="relative w-full overflow-hidden"
                            {...swipeHandlers} // Apply swipe handlers here
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <style>
                                {`
                                .scrolling-container {
                                display: flex;
                                overflow: hidden;
                                animation-play-state: ${isPaused ? 'paused' : 'running'};
                            }
    
                                @keyframes scrollLeft {
                                0 % {transform: translateX(0);}
                                100% {transform: translateX(-50%);}
                            }
    
                                .scrolling-wrapper {
                                width: 100%;
                                overflow: hidden;
                            }
    
                                .review-item {
                                flex: 0 0 auto;
                                width: 90%; 
                                max-width: 400px;
                                scroll-snap-align: center;
                                position: relative;
                                box-sizing: border-box;
                                padding: 1rem;
                                transition: transform 0.3s ease;
                                height: auto; 
                                overflow: visible; 
                            }
    
                                .review-item .avatar {
                                position: relative;
                                z-index: 1; /* Bring avatar to the front */
                                width: 50px;
                                height: 50px;
                                border-radius: 50%;
                                overflow: hidden;
                                margin-bottom: 1rem;
                            }
    
                                .review-item.hovered {
                                transform: scale(1.05);
                                overflow: visible; 
                            }
    
                                @media (min-width: 768px) and (max-width: 1024px) {
                                .scrolling-wrapper {
                                padding-bottom: 1rem; 
                            }
                                .review-item {
                                width: 80%; 
                                padding: 0.5rem;
                            }
                                h2 {
                                font-size: 1.5rem; 
                                margin-bottom: 16px;
                            }
                            }
                             `}
                            </style>
                            <div className="scrolling-wrapper">
                                <div className="scrolling-container py-10" ref={scrollingContainerRef}>
                                    {reviews.concat(reviews).map((review, index) => (
                                        <div
                                            key={index}
                                            className={`review-item ${hoveredIndex === index ? 'hovered' : ''}`}
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={() => handleMouseLeave}
                                        >
                                            <div className="mx-auto max-w-md">
                                                <Review avatar={review.avatar} comment={review.comment}
                                                        name={review.name} date={review.date}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/*/ Ninth section - download our mobile app */}
                    <section
                        className="sm:mt-12 w-full sm:flex-col select-none md:flex-row xl:flex-row h-auto flex items-center justify-center xl:mt-44 md:mt-24 px-8 mb-14">
                        {/* YouTube Frame */}
                        <div className="">
                            <FrameYouTube
                                className="sm:h-[200px] sm:w-auto xl:w-[600px] xl:h-auto md:w-[110%] md:h-auto"/>
                        </div>

                        {/* App Details */}
                        <div className="md:ml-16 xl:ml-16 flex flex-col justify-center">
                            <h3 className="xl:text-h5 sm:text-h5 sm:mt-6 xl:mt-0 md:mt-0 md:text-left  xl:text-left sm:text-center md:text-relative-h3 font-kharkiv text-black w-30 whitespace-pre-line">{t('download_Synara_for_free')}</h3>

                            {/* App Icon and Text */}
                            <div className="sm:mt-8 flex items-start xl:mb-4 md:mb-1 xl:mt-10 md:mt-4">
                                <MobileLogo
                                    className="xl:w-24 xl:h-24 md:w-[32%] md:h-[32%] sm:w-[32%] sm:h-[32%]  rounded-2xl mr-4 xl:mt-0 md:mt-2 "/>
                                <div className="w-60">
                                    <h3 className="font-montserratMedium text-blue-500 text-p font-bold xl:mt-2 md:mt-0">Synara</h3>
                                    <p className="font-montserratMedium sm:text-xs-ps xl:text-sm md:text-ps leading-snug">Lorem
                                        Ipsum є
                                        стандартною "рибою" для текстів латиницею.</p>
                                </div>
                            </div>

                            {/* App Store / Google PlayMarket buttons */}
                            <div className="flex items-center mt-8 space-x-4">
                                <AppStoreImg className="xl:w-[150px] md:w-[62%] h-auto mr-4"/>
                                <GooglePlayImg className="xl:w-[150px] md:w-[62%] h-auto"/>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Footer */}
                <Footer/>
            </Wrapper>
        </div>
    );
};


export default HomePage;