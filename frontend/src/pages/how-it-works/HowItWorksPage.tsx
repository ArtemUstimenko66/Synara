import React from 'react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import Section1 from "../../assets/images/SearchVolunteer1.png";
import Section2 from "../../assets/images/SearchVolunteer2.png";
import Section3 from "../../assets/images/SearchVolunteer3.png";
import Section4 from "../../assets/images/SearchVolunteer4.png";
import GatheringImg from "../../assets/images/GatheringsImg.png";
import PropositionImg from "../../assets/images/PropositionsImg.png";
import Request from "../../assets/images/request.svg";
import Map from "../../assets/images/Map.svg";
import Message from "../../assets/images/Message.svg";
import Footer from '../../components/Footer.tsx';
import SearchVolunteerSM from "../../ui/SearchVolunteerSM.tsx";
import {useMediaQuery} from "react-responsive";
import {useTranslation} from "react-i18next";
import Header from "../../components/Header.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";

const HowItWorksPage: React.FC = () => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 1025px)' });
    const { t } = useTranslation();
    const { isAuthenticated} = useAuth();

    const fadeInLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
        exit: { opacity: 0, x: -100, transition: { duration: 0.6 } },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
        exit: { opacity: 0, x: 100, transition: { duration: 0.6 } },
    };

    // @ts-ignore
    return (
        <Wrapper>
            <Helmet>
                <title>Як це працює - Synara</title>
                <meta name="description" content="Зв'яжіться з нами для отримання допомоги або інформації про нашу платформу Synara." />
                <meta name="keywords" content="Synara, як це працює, контакти, підтримка, допомога, українці" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://synara.help/how-it-works" />
            </Helmet>

            {
                isAuthenticated
                    ?
                    <MainHeader />
                    :
                    <Header />
            }
            <div>
                {/* ОГОЛОШЕННЯ */}
                <section className="w-full h-auto flex flex-col items-center mt-32 select-none">
                    <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5 font-kharkiv mb-20 text-center">{t('announcementUPPER')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 xl:ml-3 md:ml-6">
                        <div className="flex flex-col items-center">
                            <img src={`${Request}`} alt="Icon" className="w-24 h-24"/>
                            <h3 className="text-2xl font-montserratRegular text-dark-blue">{t('creating_of_announcement')}</h3>
                            <p className="text-center text-xs-ps w-[80%]">{t('creating_of_announcement_desc')}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={`${Map}`} alt="Icon" className="w-24 h-24"/>
                            <h3 className="text-2xl font-montserratRegular text-dark-blue">{t('map_of_helpLower')}</h3>
                            <p className="text-center text-xs-ps w-[80%]">{t('connection_desc')}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={`${Message}`} alt="Icon" className="w-24 h-24"/>
                            <h3 className="text-2xl font-montserratRegular text-dark-blue">{t('connection')}</h3>
                            <p className="text-center text-xs-ps w-[80%]">{t('connection_desc')}</p>
                        </div>
                    </div>
                </section>

                {/* ПРОПОЗИЦІЇ */}
                <section className="w-full h-auto flex flex-col md:flex-row items-center mt-32 select-none">
                    <div className="md:w-1/2 w-full flex flex-col justify-center items-start">
                        <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5 font-kharkiv ml-[20%] mb-8">{t('propositionUPPER')}</h2>
                        <p className="text-pd font-montserratRegular mx-[5vw] mb-4">
                            {t('proposition_desc')}
                        </p>
                        <p className="text-pd font-montserratRegular mx-[5vw] mb-4">
                            {t('create_proposition')}
                        </p>
                    </div>
                    <div className="w-1/2 flex justify-center items-center mt-12 md:mt-0">
                        {isSmallScreen ?
                            <img src={`${PropositionImg}`} alt="Blue Cube"
                                 className="xl:w-[22vw] sm:w-[100vw] h-auto rounded-lg"/>
                            :
                            <img
                                src="/PropositionAnim.gif"
                                className="xl:ml-[10vw] sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-[65%] xl:h-auto md:w-relative-xlg md:h-auto"
                                alt="Desktop GIF Image"
                                loading="lazy"
                            />
                        }

                    </div>
                </section>

                {/* ПОШУК ВОЛОНТЕРА */}
                <section className="w-full h-auto flex flex-col items-center mt-32 select-none">
                    <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5  font-kharkiv mb-20 text-center">{t('volunteer_search')}</h2>
                    {isSmallScreen ? (
                        <SearchVolunteerSM/>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 xl:ml-3 md:ml-6">

                            {/* Card 1 */}
                            <div className="flex flex-col md:flex-row items-start">
                                <div className="flex flex-row items-start xl:mt-20 md:mt-12">
                                    <div
                                        className="xl:text-h_num md:text-h_s_num text-center text-perfect-yellow font-bold font-montserratMedium xl:mr-8 md:mr-12">
                                        1
                                    </div>
                                    <div className="ml-2 md:ml-4">
                                        <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">{t('profile_look')}</h3>
                                        <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                            {t('profile_text')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                className="flex flex-col md:flex-row items-start"
                                initial="hidden"
                                whileInView="visible"
                                variants={fadeInRight}
                                viewport={{once: true}}
                            >
                                <img
                                    src={`${Section1}`}
                                    className="xl:ml-[8vw] sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-[65%] xl:h-auto md:w-relative-xlg md:h-auto"
                                    alt="SVG Image"
                                />
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                className="flex flex-col md:flex-row items-start"
                                initial="hidden"
                                whileInView="visible"
                                variants={fadeInLeft}
                                viewport={{once: true}}
                            >
                                <img
                                    src={`${Section2}`}
                                    className="xl:ml-[4vw] sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-[65%] xl:h-auto md:w-relative-xlg md:h-auto"
                                    alt="SVG Image"
                                />
                            </motion.div>
                                <div className="flex flex-col md:flex-row items-start ">
                                    <div className="flex flex-row items-start xl:mt-20 md:mt-12 xl:ml-auto md:-ml-6">
                                        <div
                                            className="xl:text-h_num md:text-h_s_num text-center text-perfect-yellow font-bold font-montserratMedium mr-6">
                                            2
                                        </div>
                                        <div className="ml-2">
                                            <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">{t('make_choice')}</h3>
                                            <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                                {t('make_choice_text')}
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
                                            <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">{t('submit_request')}</h3>
                                            <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                                {t('submit_request_text')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {isSmallScreen ?
                                    <img
                                        src={`${Section3}`}
                                        className="xl:ml-[10vw] sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-[65%] xl:h-auto md:w-relative-xlg md:h-auto"
                                        alt="SVG Image"
                                    />
                                    :
                                    <img
                                        src="/EmailBird.gif"
                                        className="xl:ml-[10vw] sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-[65%] xl:h-auto md:w-relative-xlg md:h-auto"
                                        alt="Desktop GIF Image"
                                        loading="lazy"
                                    />
                                }

                                {/* Card 4 */}


                                {isSmallScreen ?
                                    <img
                                        src={`${Section4}`}
                                        className="xl:ml-[2vw] sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-[55%] xl:h-auto md:w-relative-xlg md:h-auto"
                                        alt="SVG Image"
                                    />
                                    :
                                    <img
                                        src="/StartWihtContinue.gif"
                                        className="xl:ml-[2vw] sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-[55%] xl:h-auto md:w-relative-xlg md:h-auto"
                                        alt="Desktop GIF Image"
                                        loading="lazy"
                                    />
                                }

                                <div className="flex flex-col md:flex-row items-start">
                                    <div className="flex flex-row items-start xl:mt-20 md:mt-12 xl:ml-auto md:-ml-6">
                                        <div
                                            className="xl:text-h_num md:text-h_s_num text-center text-perfect-yellow font-bold font-montserratMedium mr-6">
                                            4
                                        </div>
                                        <div className="ml-2">
                                            <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">{t('get_an_answer')}</h3>
                                            <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                                {t('get_an_answer_text')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                        </div>
                        )}
                </section>

                {/* ЗБОРИ */}
                <section className="w-full h-auto flex flex-col md:flex-row items-center mt-32 select-none">
                    <div className="w-1/2 flex justify-center items-center mt-12 md:mt-0">

                        {isSmallScreen ?
                            <img src={`${GatheringImg}`} alt="Blue Cube"
                                 className="xl:w-[50%] mt-[5vh] xl:h-auto rounded-lg"/>
                            :
                            <img
                                src="/Gatherings.gif"
                                className="xl:w-[50%] mt-[5vh] xl:h-auto rounded-lg"
                                alt="Desktop GIF Image"
                                loading="lazy"
                            />
                        }
                    </div>
                    <div className="md:w-1/2 w-full flex flex-col justify-center items-start">
                        <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5 font-kharkiv xl:ml-[20%] sm:ml-[25%] my-[10vh] mb-8">{t('gatherings')}</h2>
                        <p className="text-pd font-montserratRegular mx-[5vw] mb-4">
                            {t('gatherings_text_1')}

                        </p>
                        <p className="text-pd font-montserratRegular mx-[5vw] mb-4">
                            {t('gatherings_text_2')}
                        </p>
                    </div>

                </section>

                {/* ПЕТИЦІЇ */}
                <section className="w-full h-auto flex flex-col items-center mt-32 select-none">
                    <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5 font-kharkiv mb-1 text-center">{t('petitions_uppercase')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:gap-48 sm:gap-0 relative">
                        {/* First Column */}
                        <div className="flex flex-col items-center relative">
                            <div className="text-[250px] text-dark-blue  relative">
                                <p className="opacity-15 font-montserratMedium font-bold">1</p>
                                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-montserratMedium text-center text-xs-ps w-[180%] mt-4 text-black">
                                    {t('petitions_text1')}
                                </p>
                            </div>
                        </div>

                        {/* Second Column */}
                        <div className="flex flex-col items-center relative">
                            <div className="text-[250px] text-dark-blue   relative">
                                <p className="opacity-15 font-montserratMedium font-bold">2</p>
                                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-montserratMedium text-center text-xs-ps w-[110%] mt-4 text-black">
                                    {t('petitions_text2')}
                                </p>
                            </div>
                        </div>

                        {/* Third Column */}
                        <div className="flex flex-col items-center relative">
                            <div className="text-[250px] text-dark-blue relative">
                                <p className="opacity-15 font-montserratMedium font-bold">3</p>
                                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 font-montserratMedium -translate-y-1/2 text-center text-xs-ps w-[110%] mt-4 text-black">
                                    {t('petitions_text3')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
            <Footer/>
        </Wrapper>
    );
};

export default HowItWorksPage;
