import React, {useEffect, useState} from 'react';
import Placeholder from '../assets/images/Placeholder.svg?react';
import PlaceholderHorizontal from '../assets/images/PlaceholderHorizontal.svg?react';
import PlaceholderSquare from '../assets/images/PlaceholderSquare.svg?react';
import BlueCube from '../assets/images/Blue_cube.svg?react';
import VECTOR_1_1 from '../assets/images/vector_1_1.svg?react';
import VECTOR_1_2 from '../assets/images/vector_1_2.svg?react';
import VECTOR_2_1 from '../assets/images/vector_2_1.svg?react';
import VECTOR_2_2 from '../assets/images/vector_2_2.svg?react';
import VECTOR_3_1 from '../assets/images/vector_3_1.svg?react';
import VECTOR_3_2 from '../assets/images/vector_3_2.svg?react';
import VECTOR_4_1 from '../assets/images/vector_4_1.svg?react';
import VECTOR_4_2 from '../assets/images/vector_4_2.svg?react';

import VectorBlue from '../assets/images/VectorBlue.svg?react';
import FrameYouTube from '../assets/images/FrameYouTube.svg?react';
import FrameLogoApp from '../assets/images/FrameLogoApp.svg?react';
import GooglePlayImg from '../assets/images/GooglePlayImg.svg?react';
import AppStoreImg from '../assets/images/AppStoreImg.svg?react';


import Header from '../components/Header';
import {Button} from "../components/Button";
import Footer from "../components/Footer";
import DonationCard from "../components/DonationCard";
import DateRangeCalendarWithButton from "../components/Calendar";
import Review from "../components/Review.tsx";


const reviews = [
    {
        comment: 'I had an incredible experience with this product! It exceeded my expectations in every way. The quality is top-notch, and it has become an essential part of my daily routine. Highly recommended!',
        name: 'Emily Johnson',
        date: '02.03.2024'
    },
    {
        comment: 'Fantastic service and a product that truly delivers on its promises. I was a bit skeptical at first, but after using it for a few weeks, I am thoroughly impressed. Would definitely buy again!',
        name: 'Michael Brown',
        date: '15.02.2024'
    },
    {
        comment: 'This is easily the best purchase I have made this year. The attention to detail is evident, and the customer support was excellent. I couldn’t be happier with my decision!',
        name: 'Sophia Williams',
        date: '28.01.2024'
    },
    {
        comment: 'I am absolutely thrilled with this product! It has made a huge difference in my life, and I can’t imagine going back to how things were before. Five stars all the way!',
        name: 'William Davis',
        date: '05.02.2024'
    },
    {
        comment: 'Top-quality product with exceptional value for money. It arrived quickly, and the packaging was impeccable. I’ve already recommended it to all my friends and family!',
        name: 'Olivia Garcia',
        date: '10.02.2024'
    },
];



const HomePage: React.FC = () => {

    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                setHoveredIndex(prevIndex => {
                    if (prevIndex !== null) {
                        return (prevIndex + 1) % (reviews.length * 2);
                    }
                    return 0;
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const handleMouseEnter = (index: number) => {
        setIsPaused(true);
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    const calculatePercentage = (goal: number, raised: number) => {
        return (raised / goal) * 100;
    };

    const goal1 = 100000;
    const raised1 = 65000;
    const percentage1 = calculatePercentage(goal1, raised1);

    const goal2 = 80000;
    const raised2 = 40000;
    const percentage2 = calculatePercentage(goal2, raised2);

    const goal3 = 50000;
    const raised3 = 25000;
    const percentage3 = calculatePercentage(goal3, raised3);

    return (
        <div className="w-full relative">

            {/* Header */}
            <Header/>

            {/* Main div */}
            <div className="relative z-10 flex flex-col items-center justify-center pt-2">

                {/* First section - who are we */}
                <section className='w-full flex justify-center flex-col xl:flex-row md:flex-row'>
                    <div
                        className="relative text-center order-2 xl:order-1 xl:text-left md:text-left xl:w-11/12 xl:mt-64 mt-12 mr-16 md:mt-32">
                        <h1 className='xl:text-h1 font-kharkiv whitespace-pre-line mt-6 mb-0 tracking-tight
                        md:text-h3 md:text-left
                        '>{`LOREM IPSUM - \nЭТО ТЕКСТ-"РИБА"`}</h1>
                        <p className='text-medium-gray font-montserratRegular mt-1 mb-4 whitespace-pre-line xl:text-pl
                        md:text-ps md:text-left'>
                            {`Часто Використовуваний У Пресі Та Веб-Дизайні. \nЄ Стандартною "Рибою" Для Текстів.`}
                        </p>
                        <Button isFilled={true}>ПРИЄДНАТИСЯ</Button>
                    </div>
                    <div className="hidden xl:w-1/2 xl:mt-20 xl:flex xl:order-2 md:flex md:order-2 md:mt-10 md:w-1/2">
                        <Placeholder className="xl:w-11/12 xl:h-auto md:w-64 md:h-auto md:ml-36 md:mt-10"/>
                    </div>
                </section>

                {/* Second section - about us */}
                <section className='w-full flex justify-center flex-col xl:flex-row md:flex-row xl:mt-36 md:mt-4'>
                    <div className="hidden xl:flex xl:order-1 md:flex md:order-1 xl:w-1/2 md:w-1/2 xl:mt-16 ">
                        <PlaceholderHorizontal className="xl:w-full xl:h-auto md:w-72 md:h-auto md:mt-28 md:ml-14"/>
                    </div>
                    <div
                        className="relative text-center order-2 xl:order-2 md:order-2 xl:text-left md:text-left xl:ml-24 xl:w-11/12 xl:mt-32 md:mt-24">
                        <h1 className='xl:text-h1 text-almost-white font-kharkiv xl:whitespace-pre-line mt-6 mb-0 xl:tracking-tight
            md:text-h3'>
                            {`ХТО МИ?`}
                        </h1>
                        <p className='text-almost-white font-montserratRegular xl:text-pl md:text-psm xl:mt-1 xl:mb-4 md:mb-4 whitespace-pre-line md:whitespace-pre-line'>
                            {`Lorem Ipsum - це текст-"риба", який часто використовують у пресі та веб-
            дизайні. Lorem Ipsum є стандартною "рибою" для текстів на латиниці з початку
            XVI століття. У той час якийсь безіменний друкар створив велику колекцію
            розмірів і форм шрифтів, використовуючи Lorem.

            змін п'ять століть, але й переступив в електронний дизайн. Його популяризації в 
            новий час послужили публікація аркушів Letraset зі зразками Lorem Ipsum у 60-х 
            роках і, в більш недавній час.`}
                        </p>
                        <Button hasBorder={true}>ЧИТАТИ ДАЛІ</Button>
                    </div>
                </section>

                {/* Third section - the last collections of money*/}
                <section className="w-full h-auto flex flex-col items-center xl:mt-64 md:mt-44">
                    <h2 className="text-h2 font-kharkiv mb-16 md:text-h3">ОСТАННІ ЗБОРИ</h2>
                    <div
                        className="flex flex-col xl:flex-row md:flex-row justify-center items-center space-y-10 xl:space-y-0 md:space-y-0 xl:space-x-16 md:space-x-10">

                        {/* Card 1 */}
                        <DonationCard
                            title="Збір на авто для 36 бригади"
                            description="Lorem Ipsum - Це Текст-'Риба', Часто Використовуваний У Пресі Та Веб-Дизайні."
                            goal={goal1}
                            raised={raised1}
                            percentage={percentage1}
                        />

                        {/* Card 2 */}
                        <DonationCard
                            title={`Збір для притулку "Ліда"`}
                            description="Lorem Ipsum - Це Текст-'Риба', Часто Використовуваний У Пресі Та Веб-Дизайні."
                            goal={goal2}
                            raised={raised2}
                            percentage={percentage2}
                        />

                        {/* Card 3 */}
                        <DonationCard
                            title="Збір на авто для 36 бригади"
                            description="Lorem Ipsum - Це Текст-'Риба', Часто Використовуваний У Пресі Та Веб-Дизайні."
                            goal={goal3}
                            raised={raised3}
                            percentage={percentage3}
                        />
                    </div>
                    <div className="mt-16">
                        <Button isFilled={true}>ПЕРЕГЛЯНУТИ ІНШІ</Button>
                    </div>
                </section>

                {/* Fourth section - join us */}
                <section className="w-full h-auto flex flex-col items-center mt-32 px-4 md:px-8">
                    <h2 className="text-h2 font-kharkiv xl:mb-24 md:text-h3 md:mb-16 text-center">ПРИЄДНУЙСЯ ДО НАС</h2>
                    <div
                        className="flex flex-col xl:flex-row md:flex-row justify-center items-center space-y-10 xl:space-y-0 md:space-y-0 xl:space-x-32 md:space-x-16">

                        {/* Card 1 */}
                        <div className="flex flex-col items-center max-w-xs md:max-w-sm xl:max-w-md">
                            <PlaceholderSquare className="w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40"/>
                            <h3 className="text-center text-h3 font-kharkiv mt-4 w-full max-w-xs md:max-w-sm xl:max-w-md">Ставай
                                волонтером</h3>
                            <p className="text-1 text-center font-montserratRegular mt-2 w-full max-w-xs md:max-w-sm xl:max-w-md">
                                Lorem Ipsum - Це Текст-"Риба", Часто Використовуваний У Пресі Та Веб-Дизайні.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="flex flex-col items-center max-w-xs md:max-w-sm xl:max-w-md">
                            <PlaceholderSquare className="w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40"/>
                            <h3 className="text-center text-h3 font-kharkiv mt-4 w-full max-w-xs md:max-w-sm xl:max-w-md">Отримуй
                                допомогу</h3>
                            <p className="text-1 text-center font-montserratRegular mt-2 w-full max-w-xs md:max-w-sm xl:max-w-md">
                                Lorem Ipsum - Це Текст-"Риба", Часто Використовуваний У Пресі Та Веб-Дизайні.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="flex flex-col items-center max-w-xs md:max-w-sm xl:max-w-md">
                            <PlaceholderSquare className="w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40"/>
                            <h3 className="text-center text-h3 font-kharkiv mt-4 w-full max-w-xs md:max-w-sm xl:max-w-md">Донать
                                на ЗСУ</h3>
                            <p className="text-1 text-center font-montserratRegular mt-2 w-full max-w-xs md:max-w-sm xl:max-w-md">
                                Lorem Ipsum - Це Текст-"Риба", Часто Використовуваний У Пресі Та Веб-Дизайні.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Fifth section - how it works */}
                <section className="w-full h-auto flex flex-col items-center mt-44">
                    <h2 className="text-h2 font-kharkiv mb-24 text-center">ЯК ЦЕ ПРАЦЮЄ</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                        {/* Card 1 */}
                        <div className="flex flex-col md:flex-row items-start ">
                            <div className="flex flex-row items-start mt-24">
                                <div
                                    className="text-h_num text-center text-perfect-yellow font-bold font-montserratMedium mr-12">
                                    1
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-left text-h3 font-kharkiv text-dark-blue">Зареєструйтесь:</h3>
                                    <p className="text-left text-h4  font-montserratMedium mt-2 w-full">
                                        Створіть обліковий запис та оберіть свою роль: "Потерпілий" або "Волонтер".
                                    </p>
                                </div>
                            </div>
                        </div>
                        <BlueCube className="ml-16"/>

                        {/* Card 2 */}
                        <BlueCube className="mr-16"/>
                        <div className="flex flex-col md:flex-row items-start ">
                            <div className="flex flex-row items-start mt-24">
                                <div
                                    className="text-h_num text-center text-perfect-yellow font-bold font-montserratMedium mr-12">
                                    2
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-left text-h3 font-kharkiv text-dark-blue">Допомога поруч:</h3>
                                    <p className="text-left text-h4  font-montserratMedium mt-2 w-full">
                                        Створіть оголошення або знайдіть допомогу."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="flex flex-col md:flex-row items-start ">
                            <div className="flex flex-row items-start mt-24">
                                <div
                                    className="text-h_num text-center text-perfect-yellow font-bold font-montserratMedium mr-12">
                                    3
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-left text-h3 font-kharkiv text-dark-blue">Зв'яжіться та
                                        допоможіть:</h3>
                                    <p className="text-left text-h4  font-montserratMedium mt-2 w-full">
                                        Спілкуйтеся з іншими користувачами через чат або відеозв'язок та організуйте
                                        допомогу.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <BlueCube className="ml-16"/>

                        {/* Card 4 */}
                        <BlueCube className="mr-16"/>
                        <div className="flex flex-col md:flex-row items-start ">
                            <div className="flex flex-row items-start mt-24">
                                <div
                                    className="text-h_num text-center text-perfect-yellow font-bold font-montserratMedium mr-12">
                                    4
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-left text-h3 font-kharkiv text-dark-blue">Залиште відгук:</h3>
                                    <p className="text-left text-h4  font-montserratMedium mt-2 w-full">
                                        Поділіться своїм досвідом та допоможіть іншим користувачам зробити правильний
                                        вибір.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-16">
                        <Button isFilled={true}>ДЕТАЛЬНІШЕ</Button>
                    </div>
                </section>

                {/* Sixth section - why us */}
                <section className="w-full h-auto flex flex-col items-center mt-32">
                    <h2 className="text-h2 font-kharkiv mb-24 text-center">ЧОМУ САМЕ МИ</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Left Side */}
                        <div className="flex flex-col">
                            <div className="flex flex-row space-x-8">
                                <div className="text-h1 font-bold font-montserratMedium">10k<span
                                    className="text-dark-blue font-bold">+</span></div>
                                <div className="text-h1 font-bold font-montserratMedium ">4k<span
                                    className="text-dark-blue font-bold">+</span></div>
                                <div className="text-h1 font-bold font-montserratMedium">20k<span
                                    className="text-dark-blue font-bold">+</span></div>
                            </div>
                            <div
                                className="flex flex-row font-bold font-montserratMedium space-x-8 text-body mt-2 text-gray-500">
                                <div>Користувачів</div>
                                <div>Волонтерів</div>
                                <div>Раз допомогли</div>
                            </div>
                            <div className="mt-8 space-y-4 font-bold font-montserratRegular">
                                <div className="flex items-center">
                                    <VectorBlue/>
                                    <p className="ml-4 font-montserratRegular">Lorem Ipsum Є Стандартною "Рибою" Для
                                        Текстів На.</p>
                                </div>
                                <div className="flex items-center">
                                    <VectorBlue/>
                                    <p className="ml-4 font-montserratRegular">Lorem Ipsum Є Стандартною "Рибою" Для
                                        Текстів Латиницею З Початку XVI Століття.</p>
                                </div>
                                <div className="flex items-center">
                                    <VectorBlue/>
                                    <p className="ml-4 font-montserratRegular">Lorem Ipsum Є Стандартною "Рибою".</p>
                                </div>
                                <div className="flex items-center">
                                    <VectorBlue/>
                                    <p className="ml-4 font-montserratRegular">Lorem Ipsum Є Стандартною "Рибою" Для
                                        Текстів.</p>
                                </div>
                                <div className="flex items-center">
                                    <VectorBlue/>
                                    <div className="ml-4 font-montserratRegular">Lorem Ipsum Є Стандартною "Рибою" Для
                                        Текстів Латиницею З Початку XVI Століття.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <BlueCube className="ml-24"/>
                    </div>
                </section>

                {/* Seventh section - our statistics */}
                <section className="w-full h-auto flex flex-col items-center mt-44">
                    <h2 className="text-h2 font-kharkiv mb-16 text-center">НАША СТАТИСТИКА</h2>

                    <div className="w-full grid grid-cols-3 gap-x-2 gap-y-2 pr-16">

                        {/* Statistic 1 */}
                        <div className="relative w-64 h-64 mx-auto ml-36 flex items-center justify-center">
                            <div className="absolute inset-0 animate-move-in-circle-2">
                                <VECTOR_1_2/>
                            </div>
                            <div
                                className="mt-10 ml-6 absolute inset-0 animate-move-in-circle">
                                <VECTOR_1_1/>
                            </div>
                            <div
                                className="mt-24 ml-20 absolute inset-0 flex flex-col items-center justify-center text-white text-h3 text-center">
                                <h2 className="mb-4 font-montserratMedium text-white font-extrabold text-5xl">350</h2>
                                <p className="text-xl font-montserratRegular text-white">Гуманітарної допомоги</p>
                            </div>
                        </div>

                        {/* Centered "За період" */}
                        <div className="relative w-64 h-64 mx-auto flex items-center justify-center mt-48 ml-44">
                            <div className="text-center mt-12">
                                <div className="text-h3 font-kharkiv mb-4">За період</div>
                                <DateRangeCalendarWithButton/>
                            </div>
                        </div>

                        {/* Statistic 2 */}
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            <div className="absolute inset-0 animate-move-in-circle">
                                <VECTOR_2_2/>
                            </div>
                            <div
                                className="mt-8 ml-12 absolute inset-0 animate-move-in-circle-2">
                                <VECTOR_2_1/>
                            </div>
                            <div
                                className="mt-8 ml-16 absolute inset-0 flex flex-col items-center justify-center text-white text-h3 text-center">
                                <h2 className="font-montserratMedium font-extrabold text-white text-5xl">285</h2>
                                <p className="mt-4 text-xl font-montserratRegular text-white">Інформаційної допомоги</p>
                            </div>
                        </div>

                        {/* Statistic 3 */}
                        <div className="relative w-64 h-64 mx-auto ml-64 flex items-center justify-center">
                            <div className="absolute inset-0 animate-move-in-circle">
                                <VECTOR_3_2/>
                            </div>
                            <div
                                className="mt-14 ml-12 absolute inset-0 animate-move-in-circle-2">
                                <VECTOR_3_1/>
                            </div>
                            <div
                                className="mt-40 ml-40 absolute inset-0 flex flex-col items-center justify-center text-white text-h3 text-center">
                                <h2 className="font-montserratMedium font-extrabold text-white text-5xl">435k</h2>
                                <p className="mt-4 text-xl font-montserratRegular text-white">Гривень на ЗСУ</p>
                            </div>
                        </div>

                        {/* Empty div to center "За період" */}
                        <div className="relative w-64 h-64 mx-auto flex items-center justify-center"></div>

                        {/* Statistic 4 */}
                        <div className="mr-32 relative w-64 h-64 flex items-center justify-center">
                            <div className="absolute inset-0 animate-move-in-circle-2">
                                <VECTOR_4_2/>
                            </div>
                            <div
                                className="mt-4 ml-10 absolute inset-0 animate-move-in-circle">
                                <VECTOR_4_1/>
                            </div>
                            <div
                                className="mt-12 ml-56 absolute inset-0 flex flex-col items-center justify-center text-white text-h3 text-center">
                                <h2 className="font-montserratMedium font-extrabold text-white text-5xl">543</h2>
                                <p className="mt-4 text-xl font-montserratRegular text-white">Психологічної допомоги</p>
                            </div>
                        </div>

                        {/* Empty div to create more even spacing in the second row */}
                        <div className="relative w-64 h-64 mx-auto flex items-center justify-center"></div>
                    </div>
                </section>

                {/* Eighth section - our feedbacks */}
                <section className="w-full h-auto flex flex-col items-center mt-16">
                    <h2 className="text-h2 font-kharkiv mb-24 md:text-h3 text-center">ВІДГУКИ ПРО НАС</h2>

                    <div className="relative w-full overflow-hidden">
                        <style>
                            {`
                                .scrolling-container {
                                    display: flex;
                                    animation: scrollLeft 30s linear infinite;
                                    animation-play-state: ${isPaused ? 'paused' : 'running'};
                                }
                                @keyframes scrollLeft {
                                    0% { transform: translateX(0); }
                                    100% { transform: translateX(-50%); } 
                                }
                            `}
                        </style>
                        <div className="scrolling-wrapper">
                            <div className="scrolling-container py-12">
                                {reviews.concat(reviews).map((review, index) => (
                                    <div
                                        key={index}
                                        className={`review-item ${hoveredIndex === index ? 'hovered' : ''}`}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="mx-auto max-w-md">
                                            <Review comment={review.comment} name={review.name} date={review.date}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ninth section - download our mobile app */}
                <section className="w-full h-auto flex items-center justify-center xl:mt-44 md:mt-24 px-8 mb-14">
                    {/* YouTube Frame */}
                    <div className="flex-shrink-0">
                        <FrameYouTube className="xl:w-[600px] xl:h-auto md:w-[450px] md:h-auto"/>
                    </div>

                    {/* App Details */}
                    <div className="ml-16 flex flex-col justify-center">
                        <h3 className="xl:text-h5 md:text-h5 font-kharkiv text-black w-30 whitespace-pre-line">{`Завантажуйте\n безкоштовно додаток Synara`}</h3>

                        {/* App Icon and Text */}
                        <div className="flex items-start xl:mb-4 md:mb-1 xl:mt-10 md:mt-4">
                            <FrameLogoApp className="xl:w-24 xl:h-24 md:w-14 md:h-14 rounded-2xl mr-4 xl:mt-0 md:mt-2 "/>
                            <div className="w-60">
                                <h3 className="font-montserratMedium text-blue-500 text-p font-bold xl:mt-2 md:mt-0">Synara</h3>
                                <p className="font-montserratMedium xl:text-sm md:text-ps leading-snug">Lorem Ipsum є стандартною
                                    "рибою" для текстів латиницею.</p>
                            </div>
                        </div>

                        {/* App Store / Google PlayMarket buttons */}
                        <div className="flex items-center mt-8 space-x-4">
                            <AppStoreImg className="xl:w-[150px] md:w-[110px] h-auto mr-4"/>
                            <GooglePlayImg className="xl:w-[150px] md:w-[110px] h-auto "/>
                        </div>
                    </div>
                </section>

            </div>

            {/* Footer */}
            <Footer/>
        </div>
    );
};


export default HomePage;