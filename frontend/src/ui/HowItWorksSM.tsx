import React, { useState } from 'react';
import { Button } from "./Button.tsx";
import {useTranslation} from "react-i18next";

// const steps = [
//     {
//         title: "Зареєструйтесь:",
//         description: "Створіть обліковий запис та оберіть свою роль: 'Потерпілий' або 'Волонтер'.",
//     },
//     {
//         title: "Допомога поруч:",
//         description: "Створіть оголошення або знайдіть допомогу.",
//     },
//     {
//         title: "Зв'яжіться та допоможіть:",
//         description: "Спілкуйтеся з іншими користувачами через чат або відеозв'язок та організуйте допомогу.",
//     },
//     {
//         title: "Залиште відгук:",
//         description: "Поділіться своїм досвідом та допоможіть іншим користувачам зробити правильний вибір.",
//     },
// ];

const HowItWorksSM = () => {
    const [activeStep, setActiveStep] = useState(0);
    const {t}=useTranslation();

    const steps = [
        {
            title: `${t('registration')}:`,
            description:t('under_register'),
        },
        {
            title: t('help_is_nearby'),
            description: t('under_help_is_nearby'),
        },
        {
            title: t('get_in_touch_and_help'),
            description: t('under_get_in_touch_and_help'),
        },
        {
            title: t('leave_a_review'),
            description: t('under_leave_a_review'),
        },
    ];

    return (
        <section className="w-full h-auto flex flex-col items-center mt-16">
            <h2 className="text-h5 font-kharkiv mb-10 mt-10 text-center">{t('how_it_works')}</h2>
            <div className="flex items-center w-80 mb-8 mx-5 justify-center">
                {steps.map((step, index) => (
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
            <div className="border-4 border-blue-600 p-4 rounded-3xl h-52 w-64 mb-10 max-w-sm"/>
            <h3 className="text-center text-blue-600 text-h5 font-kharkiv">{steps[activeStep].title}</h3>
            <p className="text-center font-montserratMedium mt-2 max-w-xs">
                {steps[activeStep].description}
            </p>
            <div className="mt-8">
                <Button isFilled={true}>{t('more_detailsUPPER')}</Button>
            </div>
        </section>
    );
};

export default HowItWorksSM;
