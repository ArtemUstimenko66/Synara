import React from 'react';
import Header from '../components/Header';
import {Button} from "../components/Button";
import { ReactComponent as Placeholder } from '../assets/images/Placeholder.svg';
import { ReactComponent as PlaceholderHorizontal } from '../assets/images/PlaceholderHorizontal.svg';
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
    return (
        <div className="w-full relative">

            {/* Header */}
            <Header/>

            {/* Main div */}
            <div className="relative z-10 flex flex-col items-center justify-center pt-2">

                {/* First section - join us */}
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
                <section className='w-full h-56 mt-48'>

                </section>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
