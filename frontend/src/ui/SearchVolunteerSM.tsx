import React, { useState } from 'react';

import Section1 from "../assets/images/SearchVolunteer1.png";
import Section2 from "../assets/images/SearchVolunteer2.png";
import Section3 from "../assets/images/SearchVolunteer3.png";
import Section4 from "../assets/images/SearchVolunteer4.png";
import {useTranslation} from "react-i18next";

const SearchVolunteerSM = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { t } = useTranslation();
    const steps = [
        {
            title: `${t('profile_look')}`,
            image: Section1,
            description:  `${t('profile_text')}`,
        },
        {
            title: `${t('make_choice')}`,
            image: Section2,
            description: `${t('make_choice_text')}`,
        },
        {
            title: `${t('submit_request')}`,
            image: Section3,
            description: `${t('submit_request_text')}`,
        },
        {
            title: `${t('get_an_answer')}`,
            image: Section4,
            description: `${t('get_an_answer_text')}`,
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
