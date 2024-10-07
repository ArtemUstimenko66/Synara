import React from 'react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import Section1 from "../../assets/images/section1.svg";
import Section2 from "../../assets/images/section2.svg";
import Section3 from "../../assets/images/section3.svg";
import Section4 from "../../assets/images/section4.svg";
import {Button} from "../../ui/Button.tsx";
import {useTranslation} from "react-i18next";
import Request from "../../assets/images/request.svg";
import Map from "../../assets/images/Map.svg";
import Message from "../../assets/images/Message.svg";
import Blue from "../../assets/images/Blue_cube.svg";
import Footer from '../../components/Footer.tsx';

const HowItWorksPage: React.FC = () => {
    const { t } = useTranslation();

    // @ts-ignore
    return (
        <Wrapper>
            <MainHeader/>
            <div>
                {/* Новая секция с информацией на основе изображения */}
                <section className="w-full h-auto flex flex-col items-center mt-32 select-none">
                    <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5 font-kharkiv mb-20 text-center">ОГОЛОШЕННЯ</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 xl:ml-3 md:ml-6">
                        <div className="flex flex-col items-center">
                            <img src={`${Request}`} alt="Icon" className="w-24 h-24"/>
                            <h3 className="text-2xl font-montserratRegular text-dark-blue">Створення оголошення</h3>
                            <p className="text-center text-xs-ps w-[80%]">Якщо вам потрібна допомога, створіть
                                оголошення. Заповніть просту форму, опишіть свою проблему і вкажіть всі потрібні
                                деталі.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={`${Map}`} alt="Icon" className="w-24 h-24"/>
                            <h3 className="text-2xl font-montserratRegular text-dark-blue">Карта допомоги</h3>
                            <p className="text-center text-xs-ps w-[80%]">На карті ви побачите всі активні оголошення
                                гуманітарної допомоги. Знайдіть найближчу до вас проблему і запропонуйте свою
                                допомогу.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={`${Message}`} alt="Icon" className="w-24 h-24"/>
                            <h3 className="text-2xl font-montserratRegular text-dark-blue">Зв'язок</h3>
                            <p className="text-center text-xs-ps w-[80%]">Переглядайте оголошення та відгукніться, якщо
                                хочете допомогти. Ви зможете зв'язатися з автором через чат та обговорити деталі.</p>
                        </div>
                    </div>
                </section>
                <section className="w-full h-auto flex flex-col md:flex-row items-center mt-32 select-none">
                    <div className="md:w-1/2 w-full flex flex-col justify-center items-start">
                        <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5 font-kharkiv ml-[20%] mb-8">ПРОПОЗИЦІЇ</h2>
                        <p className="text-pd font-montserratRegular mb-4">
                            Що таке пропозиції? Це як оголошення, тільки для багатьох людей. Вони можуть бути як для тих
                            хто хоче надавати допомогу, так і для тих хто потребує її.
                        </p>
                        <p className="text-pd font-montserratRegular mb-4">
                            Створи свою пропозицію, якщо ти хочеш запропонувати допомогу, просто заповни спеціальну
                            форму. Опиши допомогу, вкажи всі деталі та для кого розрахована ця пропозиція.
                            Приєднуйся до ініціатив, якщо ти бачиш цікаву пропозицію, до якої хочеш долучитись, просто
                            натисни кнопку "Приєднатися". Також є карта пропозицій, з нею завжди легко знайти оффлайн
                            пропозиції в вашому регіоні.
                        </p>
                    </div>
                    <div className="w-1/2 flex justify-center items-center mt-12 md:mt-0">
                        <img src={`${Blue}`} alt="Blue Cube" className="w-full h-[200px] rounded-lg"/>
                    </div>
                </section>
                <section className="w-full h-auto flex flex-col items-center mt-32 select-none">
                    <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5  font-kharkiv mb-20 text-center">ПОШУК
                        ВОЛОНТЕРА</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 xl:ml-3 md:ml-6">

                        {/* Card 1 */}
                        <div className="flex flex-col md:flex-row items-start">
                            <div className="flex flex-row items-start xl:mt-20 md:mt-12">
                                <div
                                    className="xl:text-h_num md:text-h_s_num text-center text-perfect-yellow font-bold font-montserratMedium xl:mr-8 md:mr-12">
                                    1
                                </div>
                                <div className="ml-2 md:ml-4">
                                    <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">Переглянь
                                        профілі:</h3>
                                    <p className="text-left xl:text-h4 md:text-relative-md font-montserratMedium mt-2 w-full">
                                        Спочатку ти можеш переглянути короткі описи різних волонтерів. Це як заглянути в
                                        їхні візитки.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <img
                            src={`${Section1}`}
                            className="xl:mr-12 sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-auto xl:h-auto md:w-relative-xlg md:h-auto"
                            alt="SVG Image"
                        />

                        {/* Card 2 */}
                        <img
                            src={`${Section2}`}
                            className="xl:mr-12 sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-auto xl:h-auto md:w-relative-xlg md:h-auto"
                            alt="SVG Image"
                        />
                        <div className="flex flex-col md:flex-row items-start ">
                            <div className="flex flex-row items-start xl:mt-20 md:mt-12 xl:ml-auto md:-ml-6">
                                <div
                                    className="xl:text-h_num md:text-h_s_num text-center text-perfect-yellow font-bold font-montserratMedium mr-6">
                                    2
                                </div>
                                <div className="ml-2">
                                    <h3 className="text-left xl:text-h3 md:text-relative-h3xl font-kharkiv text-dark-blue">Оберіть
                                        свій вибір:</h3>
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
                            className="xl:mr-12 sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-auto xl:h-auto md:w-relative-xlg md:h-auto"
                            alt="SVG Image"
                        />

                        {/* Card 4 */}

                        <img
                            src={`${Section4}`}
                            className="xl:mr-12 sm:w-[50%] md:mr-16 xl:mt-auto md:mt-10 xl:w-auto xl:h-auto md:w-relative-xlg md:h-auto"
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
                    <div className="mt-12 md:mt-16">
                        <Button isFilled={true}>{t('more_detailsUPPER')}</Button>
                    </div>
                </section>
                <section className="w-full h-auto flex flex-col md:flex-row items-center mt-32 select-none">
                    <div className="w-1/2 flex justify-center items-center mt-12 md:mt-0">
                        <img src={`${Blue}`} alt="Blue Cube" className="w-full h-[200px] rounded-lg"/>
                    </div>
                    <div className="md:w-1/2 w-full flex flex-col justify-center items-start">
                        <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5 font-kharkiv ml-[20%] mb-8">ЗБОРИ</h2>
                        <p className="text-pd font-montserratRegular mb-4">
                            Хочеш зробити світ кращим? На нашому сайті ти можеш знайти безліч цікавих проектів і
                            підтримати ті, які тобі близькі. Маєш ідею, як зробити життя кращим?

                        </p>
                        <p className="text-pd font-montserratRegular mb-4">
                            Створи свій збір і об'єднай людей навколо неї! Як це працює? Все дуже просто. Ти можеш
                            переглядати різні проекти, дізнаватися про них більше і підтримати ті, які тобі подобаються.
                            Або ж створи свій власний збір, розказавши про свою ідею іншим. Це як онлайн-скарбничка,
                            куди кожен може додати свою цеглинку.Ти можеш змінити світ: Навіть невеликий внесок може
                            зробити велику різницю.
                        </p>
                    </div>

                </section>
                <section className="w-full h-auto flex flex-col items-center mt-32 select-none">
                    <h2 className="xl:text-h2 md:text-relative-h3xl sm:text-h5 font-kharkiv mb-1 text-center">ПЕТИЦІЇ</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-48 relative">
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
