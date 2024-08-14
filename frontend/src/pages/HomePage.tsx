import React from 'react';

import { ReactComponent as Placeholder } from '../assets/images/Placeholder.svg';
import { ReactComponent as PlaceholderHorizontal } from '../assets/images/PlaceholderHorizontal.svg';
import { ReactComponent as PlaceholderSquare } from '../assets/images/PlaceholderSquare.svg';
import { ReactComponent as BlueCube } from '../assets/images/Blue_cube.svg';

import { ReactComponent as VECTOR_1_1 } from '../assets/images/vector_1_1.svg';
import { ReactComponent as VECTOR_1_2 } from '../assets/images/vector_1_2.svg';
import { ReactComponent as VECTOR_2_1 } from '../assets/images/vector_2_1.svg';
import { ReactComponent as VECTOR_2_2 } from '../assets/images/vector_2_2.svg';
import { ReactComponent as VECTOR_3_1 } from '../assets/images/vector_3_1.svg';
import { ReactComponent as VECTOR_3_2 } from '../assets/images/vector_3_2.svg';
import { ReactComponent as VECTOR_4_1 } from '../assets/images/vector_4_1.svg';
import { ReactComponent as VECTOR_4_2 } from '../assets/images/vector_4_2.svg';

import Header from '../components/Header';
import {Button} from "../components/Button";
import Footer from "../components/Footer";
import DonationCard from "../components/DonationCard";
import DateRangeCalendarWithButton from "../components/Calendar";

const HomePage: React.FC = () => {

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
                <section className='w-full flex justify-center flex-col xl:flex-row'>
                    <div
                        className="relative text-center order-2 xl:order-1 xl:text-left xl:w-11/12 xl:mt-64 mt-12 mr-16">
                        <h1 className='text-h1 font-kharkiv xl:whitespace-pre-line mt-6 mb-0 xl:tracking-tight'>{`LOREM IPSUM - \nЭТО ТЕКСТ-"РИБА"`}</h1>
                        <p className='text-medium-gray font-montserratRegular mt-1 mb-4 whitespace-pre-line'>
                            {`Часто Використовуваний У Пресі Та Веб-Дизайні. \nЄ Стандартною "Рибою" Для Текстів.`}
                        </p>
                        <Button isFilled={true}>ПРИЄДНАТИСЯ</Button>
                    </div>
                    <div className="hidden w-1/2 mt-20 xl:flex xl:order-2">
                        <Placeholder/>
                    </div>
                </section>

                {/* Second section - about us */}
                <section className='w-full flex justify-center flex-col xl:flex-row mt-36'>
                    <div className="hidden w-1/2 xl:flex xl:order-1 mt-16">
                        <PlaceholderHorizontal/>
                    </div>
                    <div
                        className="relative text-center order-2 xl:order-2 xl:text-left xl:w-11/12 mt-12 ml-16">
                        <h1 className='text-h1 text-almost-white font-kharkiv xl:whitespace-pre-line mt-6 mb-0 xl:tracking-tight'>
                            {`ХТО МИ?`}
                        </h1>
                        <p className='text-almost-white font-montserratRegular mt-1 mb-4 whitespace-pre-line'>
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
                <section className="w-full h-auto flex flex-col items-center mt-64">
                    <h2 className="text-h2 font-kharkiv mb-16">ОСТАННІ ЗБОРИ</h2>
                    <div
                        className="flex flex-col xl:flex-row justify-center items-center space-x-24 space-y-10 xl:space-y-0 xl:space-x-16">

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
                <section className="w-full h-auto flex flex-col items-center mt-32">
                    <h2 className="text-h2 font-kharkiv mb-24 text-center">ПРИЄДНУЙСЯ ДО НАС</h2>
                    <div
                        className="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-32">

                        {/* Card 1 */}
                        <div className="flex flex-col items-center">
                            <PlaceholderSquare/>
                            <h3 className="text-center text-h3 font-kharkiv mt-4 w-52">Ставай волонтером</h3>
                            <p className="text-1 text-center font-montserratRegular mt-2 w-80">
                                Lorem Ipsum - Це Текст-"Риба", Часто Використовуваний У Пресі Та Веб-Дизайні.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="flex flex-col items-center">
                            <PlaceholderSquare/>
                            <h3 className="text-center text-h3 font-kharkiv mt-4 w-52">Отримуй допомогу</h3>
                            <p className="text-1 text-center font-montserratRegular mt-2 w-80">
                                Lorem Ipsum - Це Текст-"Риба", Часто Використовуваний У Пресі Та Веб-Дизайні.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="flex flex-col items-center">
                            <PlaceholderSquare/>
                            <h3 className="text-center text-h3 font-kharkiv mt-4 w-48">Донать на ЗСУ</h3>
                            <p className="text-1 text-center font-montserratRegular mt-2 w-80">
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
                <section className="w-full h-auto flex flex-col items-center mt-44">
                    <h2 className="text-h2 font-kharkiv mb-24 text-center">ЧОМУ САМЕ МИ</h2>
                    <div>

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
                <section className="w-full h-auto flex flex-col items-center mt-44">
                    <h2 className="text-h2 font-kharkiv mb-24 text-center">ВІДГУКИ ПРО НАС</h2>
                    <div>

                    </div>
                </section>

                {/* Ninth section - download our mobile app */}
                <section className="w-full h-auto flex flex-col items-center mt-44">
                    <h2 className="text-h2 font-kharkiv mb-24 text-center">Завантажуйте безкоштовно додаток Synara</h2>
                    <div>

                    </div>
                </section>

            </div>

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default HomePage;