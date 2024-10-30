import React from 'react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import NotFound404 from '../../assets/images/NotFound404.png';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {useMediaQuery} from "react-responsive";
import {useTranslation} from "react-i18next";

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const {t} = useTranslation();
    const isSmallScreen = useMediaQuery({ query: '(max-width: 1025px)' });
    const handleGoHome = () => {
        navigate('/main'); // Redirect to the /main route
    };

    // @ts-ignore
    return (
        <>
            <Helmet>
                <title>{t('helmet_not_found')}</title>
                <meta name="description" content="Вибачте, але сторінка, яку ви шукаєте, не знайдена. Перевірте URL або поверніться на головну." />
                <meta name="keywords" content="404, не знайдено, Synara, помилка, головна" />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="canonical" href="https://synara.help/*" />
            </Helmet>

            <MainHeader/>
            <div className="flex justify-center items-center h-screen">

                <div className="flex flex-col sm:items-center md:items-start xl:items-start sm:space-y-1 md:space-y-4 xl:space-y-4">
                        <img src={NotFound404} className="w-[100%] h-[100%] px-10 sm:block xl:hidden md:hidden"/>
                    <h1 className="xl:text-6xl md:text-6xl sm:text-h3 font-kharkiv">Упс....</h1>
                    <h2 className="xl:text-2xl md:text-2xl font-montserratMedium">Здається, ви заблукали</h2>
                    <p className="xl:text-lg sm:text-xs-pl md:text-lg max-w-xs font-montserratRegular">
                        Сторінка, яку ви шукаєте, не існує або була переміщена. Пропонуємо вам повернутись на головну
                        сторінку.
                    </p>
                    <button onClick={handleGoHome}
                            className="bg-perfect-yellow px-6 py-2 rounded-full font-montserratMedium mt-4 hover:bg-yellow-600">
                        НА ГОЛОВНУ
                    </button>
                </div>
                <div className="ml-16 sm:hidden xl:block md:block">
                    <div className="ml-16 sm:hidden xl:block md:block">
                        {isSmallScreen ?
                            <img
                                src={`${NotFound404}`}
                                className="w-96 h-96"
                                alt="SVG Image"
                            />
                            :
                            <img
                                src="/NotFound.gif"
                                className="w-96 h-96"
                                alt="Desktop GIF Image"
                                loading="lazy"
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
