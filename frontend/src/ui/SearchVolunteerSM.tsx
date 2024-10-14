import React, { useState } from 'react';

import Section1 from "../assets/images/SearchVolunteer1.png";
import Section2 from "../assets/images/SearchVolunteer2.png";
import Section3 from "../assets/images/SearchVolunteer3.png";
import Section4 from "../assets/images/SearchVolunteer4.png";

const SearchVolunteerSM = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: "Переглянь профілі:",
            image: Section1,
            description: "Спочатку ти можеш переглянути короткі описи різних волонтерів. Це як заглянути в їхні візитки.",
        },
        {
            title: "Оберіть свій вибір:",
            image: Section2,
            description: "Якщо якийсь волонтер тобі сподобався, ти можеш зайти на його сторінку, щоб дізнатися про нього більше.",
        },
        {
            title: "Подай запит:",
            image: Section3,
            description: "Сподобався волонтер? Просто натисни кнопку \"Подати запит\". Це як написати лист новому другу.",
        },
        {
            title: "Отримай відповідь:",
            image: Section4,
            description: "Волонтер отримає твоє повідомлення і зможе переглянути твою сторінку. Якщо він готовий допомогти, то відпише тобі.",
        },
    ];

    return (
        <section className="w-full h-auto flex flex-col items-center  select-none">
            <div className="flex items-center w-80 mb-8 mx-5 justify-center">
                {steps.map((_, index) => (
                    <React.Fragment key={index}>
                        <div className="cursor-pointer flex flex-col items-center" onClick={() => setActiveStep(index)}>
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full ${index === activeStep ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
                                {index + 1}
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="flex-grow h-[2px] bg-blue-200 mx-2"></div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Рендеринг SVG компонента напрямую */}
            <div className="h-52 w-64 mb-10 max-w-sm">
                <img src={steps[activeStep].image} alt="image" className='h-full w-full'/>
            </div>

            <h3 className="text-center text-blue-600 text-h5 font-kharkiv">{steps[activeStep].title}</h3>
            <p className="text-center font-montserratMedium mt-2 max-w-xs">
                {steps[activeStep].description}
            </p>
        </section>
    );
};

export default SearchVolunteerSM;
