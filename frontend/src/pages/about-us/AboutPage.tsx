import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import WhyUsImg from '../../assets/images/WhyUsImg.png';
import WhyMeMainDesktop from '../../assets/images/WhyMeMainDesktop.png';
import CountUp from "react-countup";
import VectorBlue from '../../assets/images/VectorBlue.svg?react';
import {useTranslation} from "react-i18next";
import PlaceholderSquare from '../../assets/images/PlaceholderSquare.svg?react';
import DonatNaZSU from '../../assets/images/DonatNaZSU.png';
import GetHelp from '../../assets/images/GetHelp.png';
import BecomeVolunteer from '../../assets/images/BecomeVolunteer.png';
import Meta from '../../assets/images/meta.svg?react';
import Facebook from '../../assets/images/Facebook.svg?react';
import Instagram from '../../assets/images/Instagram.svg?react';
import Twitter from '../../assets/images/Twitter.svg?react';
import Telegram from '../../assets/images/Telegram.svg?react';
import HelpIcon from '../../assets/images/HelpIcon.svg?react';
import ComunityIcon from '../../assets/images/ComunityIcon.svg?react';
import SupportIcon from '../../assets/images/SupportIcon.svg?react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";


const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <MainHeader />
            <div className="min-h-screen mt-24 ml-[3%] mr-[3%] font-montserratRegular">
                <section className="w-full h-auto flex flex-col items-center px-4 md:px-8 mt-24">
                    <h2 className="text-h2 font-montserratMedium uppercase text-center">{t('about_us')}</h2>
                    <div className="flex flex-col md:flex-row items-center mt-12 space-y-6 md:space-y-0">
                        <div className="w-full">
                            <PlaceholderSquare className="w-full h-52"/>
                        </div>
                        <div className="text-md_body text-gray-700 font-montserratRegular md:ml-8">
                            <p>
                                Synara — це платформа, створена українцями для українців. У ці складні часи, коли наша
                                країна переживає випробування, ми об'єднуємо тих, хто потребує допомоги, з тими, хто
                                готовий її надати. Ми віримо в силу людської доброти та солідарності, і знаємо, що разом
                                ми можемо подолати будь-які труднощі.
                            </p>
                            <p className="mt-4">
                                Ця платформа працює 24/7. Ви можете скористатися нашими сервісами в
                                будь-який час і з будь-якого пристрою. Ми постійно працюємо над вдосконаленням нашої
                                платформи, щоб зробити її ще більш зручною для вас.
                            </p>
                        </div>
                    </div>
                </section>


                {/* Section 2: "Наші цінності" */}
                <section
                    className="w-[99.8vw] mt-24 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-blue-600 text-white py-16">
                    <div className="container mx-auto flex flex-row items-center justify-between">
                        {/* Левая колонка: текст */}
                        <div className="flex flex-col w-[35%]">
                            <h2 className="text-h2 font-kharkiv mb-4">НАШІ ЦІННОСТІ</h2>
                            <p className="text-xs-pl font-montserratRegular">
                                Ми об'єднуємо людей, щоб вони могли підтримувати один одного. Разом ми можемо досягти
                                всього, що захочемо!
                            </p>
                        </div>

                        {/* Правая колонка: иконки */}
                        <div className="flex flex-row w-1/2 justify-around  font-kharkiv mt-12 lg:mt-0">
                            <div className="flex flex-col items-center">
                                <SupportIcon className="w-32 h-32"/>
                                <h3 className="text-xl mt-4">Підтримка</h3>
                            </div>
                            <div className="flex flex-col items-center">
                                <ComunityIcon className="w-32 h-32"/>
                                <h3 className="text-xl mt-4">Спільнота</h3>
                            </div>
                            <div className="flex flex-col items-center">
                                <HelpIcon className="w-32 h-32"/>
                                <h3 className="text-xl mt-4">Допомога</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: "Наша мета" */}
                <section className="w-full h-auto flex flex-col items-center px-4 md:px-8 mt-32">

                    <div className="flex flex-row justify-between items-center w-full mt-12">
                        <Meta className="w-[70%] h-96"/>
                        <div className="flex flex-col items-start w-full">
                            <h2 className="text-h2 font-montserratMedium items-center ml-[25%] mb-8">НАША МЕТА</h2>
                            <p className="flex-1 text-md_body text-gray-700 font-montserratRegular ml-8">
                                Наша мета – об’єднати небайдужих людей, щоб разом ми могли зробити світ кращим. Ми
                                створили
                                платформу, де кожен може знайти допомогу або надати її іншим. Незалежно від того, чи ти
                                хочеш поділитися речами, які тобі більше не потрібні, запропонувати свої знання та
                                вміння,
                                або просто підтримати когось емоційно – на нашій платформі ти знайдеш однодумців.
                            </p>
                            <br/>
                            <p className="flex-1 text-md_body text-gray-700 font-montserratRegular ml-8">
                                Адже кожен з нас може зробити щось добре. Неважливо, чи це буде маленька допомога
                                сусіду, чи велика
                                акція для всієї спільноти. Головне – це наше бажання зробити світ кращим.
                            </p>
                        </div>

                    </div>
                </section>
                <section className="w-full h-auto flex flex-col items-center select-none mt-32">
                    <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h4 sm:text-h5  font-kharkiv sm:mb-8 md:mb-20 xl:mb-20 text-center">{t('why_usUPPER')}</h2>
                    <div className="flex xl:gap-12 md:gap-6 sm:ml-8 md:ml-0 xl:ml-0">
                        <div className="flex-1 flex flex-col xl:ml-6 md:ml-6">
                            <div className="flex flex-row sm:space-x-16 xl:space-x-12 md:space-x-6">
                                <div
                                    className="xl:text-h1 sm:text-h3 md:text-relative-h1 text-md_h1 font-bold font-montserratMedium">
                                    <CountUp end={10}/>k<span
                                    className="text-dark-blue font-bold">+</span></div>
                                <div
                                    className="xl:text-h1 sm:text-h3 md:text-relative-h1 text-md_h1 font-bold font-montserratMedium">
                                    <CountUp end={4}/>k<span
                                    className="text-dark-blue font-bold">+</span></div>
                                <div
                                    className="xl:text-h1 sm:text-h3 md:text-relative-h1 text-md_h1 font-bold font-montserratMedium">
                                    <CountUp end={20}/>k<span
                                    className="text-dark-blue font-bold">+</span></div>
                            </div>
                            <div
                                className="flex sm:text-xs sm:space-x-10 flex-row font-bold font-montserratMedium xl:space-x-20 md:space-x-6 xl:text-pl md:text-relative-pxl text-md_body xl:mt-0 md:mt-2 text-gray-500">
                                <div>{t('users')}</div>
                                <div>{t('volunteers')}</div>
                                <div>{t('count_of_help')}</div>
                            </div>
                            <div>
                                <img src={WhyUsImg} className="md:hidden xl:hidden sm:block sm:w-[90%] sm:h-auto sm:mt-6"/>
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
                            <img src={WhyMeMainDesktop}
                                className="sm:hidden md:block xl:block xl:ml-20 md:ml-12 xl:mt-2 md:mt-24 xl:w-full      xl:h-full md:w-96 md:h-72 "/>
                        </div>
                    </div>
                </section>
                <section className="w-full h-auto flex flex-col items-center mt-32 px-4 md:px-8 select-none">
                    <h2 className="xl:text-h2 sm:text-h4 md:text-relative-h3xl sm:mb-8 sm:text-h5  font-kharkiv xl:mb-24 md:mb-16 text-center">{t('JOIN_TO_US_UPPER')}</h2>
                    <div
                        className="flex flex-col xl:flex-row  md:flex-row justify-center items-center space-y-10 xl:space-y-0 md:space-y-0 xl:space-x-32 md:space-x-16">

                        {/* Card 1 */}
                        <div
                            className="flex xl:flex-col md:flex-col sm:flex-row  xl:items-center max-w-xs md:max-w-sm xl:max-w-md">
                            <div className="">
                                <img src={BecomeVolunteer}
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
                                <img src={GetHelp}
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
                                <img src={DonatNaZSU}
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
                <section className="w-full flex flex-col items-center mt-32 mb-8">
                    <h2 className=" text-h2 font-kharkiv mb-12">НАШІ СОЦМЕРЕЖІ</h2>
                    <div className="flex space-x-36">
                        {/* Facebook */}
                        <div className="bg-blue-500 rounded-2xl w-20 h-20 flex items-center justify-center">
                            <Facebook className="text-white w-10 h-10"/>
                        </div>
                        {/* Instagram */}
                        <div className="bg-blue-500 rounded-2xl w-20 h-20 flex items-center justify-center">
                            <Instagram className="text-white w-10 h-10"/>
                        </div>
                        {/* Twitter */}
                        <div className="bg-blue-500 rounded-2xl w-20 h-20 flex items-center justify-center">
                            <Twitter className="text-white w-10 h-10"/>
                        </div>
                        {/* Telegram */}
                        <div className="bg-blue-500 rounded-2xl w-20 h-20 flex items-center justify-center">
                            <Telegram className="text-white w-10 h-10"/>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </Wrapper>
    );
};

export default AboutPage;
