import React, { useState, useEffect } from 'react';
import CookieBird from '../assets/images/BirdWithBanner.svg?react';
import CookieTabletBird from '../assets/images/Birdtablet.svg?react';
import CookieMobileBird from '../assets/images/BirdMobile.svg?react';
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Cookies from 'js-cookie';
import {useTranslation} from "react-i18next";

const CookieBanner: React.FC = () => {
    const isMobileScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const isTabletScreen = useMediaQuery({ query: '(max-width: 1025px)' });
    const {t} = useTranslation();

    const [isBannerVisible, setIsBannerVisible] = useState(true);

    useEffect(() => {
        const isBannerClosed = Cookies.get('cookieBannerClosed');
        if (isBannerClosed) {
            setIsBannerVisible(false);
        }
    }, []);

    const handleCloseBanner = () => {
        Cookies.set('cookieBannerClosed', 'true', { expires: 30 });
        setIsBannerVisible(false);
    };

    if (!isBannerVisible) return null;

    return (
        <div className="xl:w-[85%] z-30 md:w-full sm:w-full  xl:max-w-full md:max-w-full h-auto bottom-4 xl:right-4 md:right-2 lg:right-12 rounded-3xl bg-emerald-900 fixed">
            <div className="flex flex-col justify-center items-center h-auto">
                <div className="mt-[10vh] flex justify-center absolute bottom-2 right-8 xl:right-[7%] w-[90%] xl:w-full h-auto rounded-3xl p-4 xl:p-8">
                    {isMobileScreen ? (
                        <CookieMobileBird className="h-[110%] ml-[5vw]" />
                    ) : isTabletScreen ? (
                        <CookieTabletBird className="h-[100%]" />
                    ) : (
                        <CookieBird className="h-[60%]" />
                    )}
                </div>

                <div className="absolute bottom-2 right-8 xl:right-[7%] sm:right-[2%] xl:w-full sm:mb-[4vh] md:mb-0 xl:mb-0 h-auto xl:p-8">
                    <p className="font-montserratRegular xl:text-relative-ps md:text-relative-pxl sm:text-relative-h5sm md:ml-[15vw] text-center xl:mx-[10%] md:mx-[10%] mt-4 sm:mx-[15%]">
                        {t('our_site_use_cookie')}
                    </p>
                    <p className="font-montserratRegular xl:text-relative-ps md:text-relative-pxl sm:text-relative-h5sm text-center xl:mx-4 md:mx-[10%] my-4 sm:mx-[15%]">
                        {t('settings_cookie')}
                        <Link to="/cookie-policy" className="font-semibold"> {t('learn_more')}</Link>
                    </p>
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={handleCloseBanner} className="font-montserratRegular xl:text-relative-ps md:text-relative-pxl sm:text-relative-h2 font-semibold relative">
                            {t('close')}
                        </button>
                        <div className="w-[6%] rounded-3xl xl:mb-[2vh] md:mb-[2vh] sm:mb-0 h-0.5 bg-blue-600 " />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
