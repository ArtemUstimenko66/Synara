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

const HowItWorksPage: React.FC = () => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 1025px)' });
    const { t } = useTranslation();

    // @ts-ignore
    return (
        <Wrapper>
            <MainHeader/>
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
                        <img src={`${PropositionImg}`} alt="Blue Cube" className="xl:w-[22vw] sm:w-[100vw] h-auto rounded-lg"/>
                    </div>
                </section>

                {/* ПОШУК ВОЛОНТЕРА */}
                <section className="w-full h-auto flex flex-col items-center mt-32 select-none">
                    <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5  font-kharkiv mb-20 text-center">ПОШУК
                        ВОЛОНТЕРА</h2>
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
                                    <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">Переглянь профілі:</h3>
                                    <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                        Спочатку ти можеш переглянути короткі описи різних волонтерів. Це як заглянути в їхні візитки.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <img
                            src={`${Section1}`}
                            className="xl:ml-[8vw] sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-[65%] xl:h-auto md:w-relative-xlg md:h-auto"
                            alt="SVG Image"
                        />

                        {/* Card 2 */}
                        <img
                            src={`${Section2}`}
                            className="xl:ml-[4vw] sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-[65%] xl:h-auto md:w-relative-xlg md:h-auto"
                            alt="SVG Image"
                        />
                        <div className="flex flex-col md:flex-row items-start ">
                            <div className="flex flex-row items-start xl:mt-20 md:mt-12 xl:ml-auto md:-ml-6">
                                <div
                                    className="xl:text-h_num md:text-h_s_num text-center text-perfect-yellow font-bold font-montserratMedium mr-6">
                                    2
                                </div>
                                <div className="ml-2">
                                    <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">Оберіть свій вибір:</h3>
                                    <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                        Якщо якийсь волонтер тобі сподобався, ти можеш зайти на його сторінку, щоб
                                        дізнатися про нього більше.
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
                                    <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">Подай
                                        запит:</h3>
                                    <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                        Сподобався волонтер? Просто натисни кнопку "Подати запит". Це як написати лист
                                        новому другу.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <img
                            src={`${Section3}`}
                            className="xl:ml-[10vw] sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-[65%] xl:h-auto md:w-relative-xlg md:h-auto"
                            alt="SVG Image"
                        />

                        {/* Card 4 */}

                        <img
                            src={`${Section4}`}
                            className="xl:ml-[2vw] sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-[55%] xl:h-auto md:w-relative-xlg md:h-auto"
                            alt="SVG Image"
                        />

                        <div className="flex flex-col md:flex-row items-start">
                            <div className="flex flex-row items-start xl:mt-20 md:mt-12 xl:ml-auto md:-ml-6">
                                <div
                                    className="xl:text-h_num md:text-h_s_num text-center text-perfect-yellow font-bold font-montserratMedium mr-6">
                                    4
                                </div>
                                <div className="ml-2">
                                    <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">Отримай
                                        відповідь:</h3>
                                    <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                        Волонтер отримає твоє повідомлення і зможе переглянути твою сторінку. Якщо він
                                        готовий допомогти, то відпише тобі.
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
                        <img src={`${GatheringImg}`} alt="Blue Cube" className="xl:w-[50%] mt-[5vh] xl:h-auto rounded-lg"/>
                    </div>
                    <div className="md:w-1/2 w-full flex flex-col justify-center items-start">
                        <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5 font-kharkiv xl:ml-[20%] sm:ml-[40%] my-[10vh] mb-8">ЗБОРИ</h2>
                        <p className="text-pd font-montserratRegular mx-[5vw] mb-4">
                            Хочеш зробити світ кращим? На нашому сайті ти можеш знайти безліч цікавих проектів і
                            підтримати ті, які тобі близькі. Маєш ідею, як зробити життя кращим?

                        </p>
                        <p className="text-pd font-montserratRegular mx-[5vw] mb-4">
                            Створи свій збір і об'єднай людей навколо неї! Як це працює? Все дуже просто. Ти можеш
                            переглядати різні проекти, дізнаватися про них більше і підтримати ті, які тобі подобаються.
                            Або ж створи свій власний збір, розказавши про свою ідею іншим. Це як онлайн-скарбничка,
                            куди кожен може додати свою цеглинку.Ти можеш змінити світ: Навіть невеликий внесок може
                            зробити велику різницю.
                        </p>
                    </div>

                </section>

                {/* ПЕТИЦІЇ */}
                <section className="w-full h-auto flex flex-col items-center mt-32 select-none">
                    <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5 font-kharkiv mb-1 text-center">ПЕТИЦІЇ</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:gap-48 sm:gap-0 relative">
                        {/* First Column */}
                        <div className="flex flex-col items-center relative">
                            <div className="text-[250px] text-dark-blue  relative">
                                <p className="opacity-15 font-montserratMedium font-bold">1</p>
                                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-montserratMedium text-center text-xs-ps w-[180%] mt-4 text-black">
                                    Переглядай тисячі петицій на різні теми. Якщо тебе щось зацікавить, натисни на
                                    петицію, щоб детальніше дізнатися про що вона.
                                </p>
                            </div>
                        </div>

                        {/* Second Column */}
                        <div className="flex flex-col items-center relative">
                            <div className="text-[250px] text-dark-blue   relative">
                                <p className="opacity-15 font-montserratMedium font-bold">2</p>
                                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-montserratMedium text-center text-xs-ps w-[110%] mt-4 text-black">
                                    Якщо ти погоджуєшся з цією ідеєю, натисни кнопку "Підписати". Тебе перенаправлять на
                                    сайт, де ти зможеш офіційно підтримати петицію.
                                </p>
                            </div>
                        </div>

                        {/* Third Column */}
                        <div className="flex flex-col items-center relative">
                            <div className="text-[250px] text-dark-blue relative">
                                <p className="opacity-15 font-montserratMedium font-bold">3</p>
                                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 font-montserratMedium -translate-y-1/2 text-center text-xs-ps w-[110%] mt-4 text-black">
                                    Ти сам знаєш про важливу петицію? Створи власне оголошення! Заповни просту форму та
                                    встав посилання на петицію.
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
